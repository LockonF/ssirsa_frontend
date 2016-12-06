/**
 * Created by amezc on 02/12/2016.
 */
/**
 * Created by Emmanuel on 22/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('rangeSpinner', rangeSpinner);

    function rangeSpinner() {
        return {
            restrict: 'AE',
            scope: {
                rangeMin: "@",
                rangeStep: "@",
                rangeMax: "@",
                rangeDefaultValue: "@",
                acceptDecimal: "@",
                rangeModel: "=",
                nameOfField: "@",
                idOfField: "@",
                rangeDecimalPrecision: "@",
                disabledField: "="
            },
            templateUrl: 'app/mainApp/directives/range-spinner/templates/rangeSpinner.html',
            controller: function ($scope, $element, $attrs) {

                //Initializing minRange, step and maxRange with default Value if not provided.
                $scope.minRange = +(angular.isDefined($attrs.rangeMin) ? $attrs.rangeMin : 0);
                $scope.step = +(angular.isDefined($attrs.rangeStep) ? $attrs.rangeStep : 0);
                $scope.maxRange = +(angular.isDefined($attrs.rangeMax) ? $attrs.rangeMax : 100);
                $scope.rangeDecPrec = +(angular.isDefined($attrs.rangeDecimalPrecision) ? $attrs.rangeDecimalPrecision : 1);

                //Initializing rangeModel with default Value if supplied rangeDefaultValue is not between minRange and maxRange.
                if (angular.isDefined($scope.rangeDefaultValue) && !isNaN($scope.rangeDefaultValue)) {
                    var rangeDefaultVal = parseFloat($scope.rangeDefaultValue);
                    if (rangeDefaultVal >= $scope.minRange && rangeDefaultVal <= $scope.maxRange) {
                        $scope.rangeModel = parseFloat($scope.rangeDefaultValue).toFixed($scope.rangeDecPrec);
                    } else {
                        $scope.rangeModel = parseFloat($scope.minRange).toFixed($scope.rangeDecPrec);
                    }
                }

                //Plus Button Method
                $scope.rangePlusFunc = function () {
                    if (angular.isUndefined($scope.rangeModel) || isNaN($scope.rangeModel) || $scope.rangeModel === "") {
                        $scope.rangeModel = $scope.minRange;
                    } else {
                        if ($scope.rangeModel < $scope.maxRange) {
                            if ($scope.acceptDecimal == 'true') {
                                $scope.rangeModel = (parseFloat(parseFloat($scope.rangeModel) + parseFloat($scope.step))).toFixed($scope.rangeDecPrec);
                            } else {
                                $scope.rangeModel = (parseInt(parseInt($scope.rangeModel) + parseInt($scope.step)));
                            }
                        }
                    }
                };

                //Minus Button Method
                $scope.rangeMinusFunc = function () {
                    if (angular.isUndefined($scope.rangeModel) || isNaN($scope.rangeModel) || $scope.rangeModel === "") {
                        $scope.rangeModel = $scope.minRange;
                    } else {
                        if ($scope.rangeModel > $scope.minRange) {
                            if ($scope.acceptDecimal == 'true') {
                                $scope.rangeModel = (parseFloat(parseFloat($scope.rangeModel) - parseFloat($scope.step))).toFixed($scope.rangeDecPrec);
                            } else {
                                $scope.rangeModel = (parseInt(parseInt($scope.rangeModel) - parseInt($scope.step)));
                            }

                        }
                    }
                };

                //For Direct Editing
                $scope.$watch(function () {
                    return $scope.rangeModel;
                }, function (newvalue, oldvalue) {

                    if (angular.isDefined($scope.rangeModel)) {
                        if (!isNaN($scope.rangeModel)) {
                            if ($scope.rangeModel > $scope.maxRange) {
                                $scope.rangeModel = $scope.maxRange;
                            } else if ($scope.rangeModel < $scope.minRange) {
                                $scope.rangeModel = $scope.minRange;
                            } else {

                                if ($scope.acceptDecimal == 'true') {
                                    var precision = String($scope.rangeModel).split(".");
                                    if (precision.length > 1 && precision[1].length > $scope.rangeDecPrec) {
                                        $scope.rangeModel = (parseFloat($scope.rangeModel)).toFixed($scope.rangeDecPrec);
                                    }
                                } else {
                                    $scope.rangeModel = parseInt($scope.rangeModel);
                                }
                            }
                        } else {
                            $scope.rangeModel = oldvalue;
                        }
                    }
                }, true);

            }
        };
    }
})();
