(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('loopifyNumberPicker',loopifyNumberPicker);
    function loopifyNumberPicker(numberPickerService) {


        var config = {
                min: 0,
                max: Infinity,
                step: 1,
                enter: false,
                percent: false,
                label: undefined,
                methodRound: undefined
            },
            base = {
                restrict: 'E',
                scope: {
                    'value': '=',
                    'min': '@',
                    'max': '@',
                    'step': '@',
                    'enter': '@',
                    'percent': '@',
                    'label': '@',
                    'methodRound': '@'
                }
            };

        return angular.extend(base, {
            //check if number
            link: function (scope) {
                var opts = numberPickerService.assignExtend(scope, config);
                if (!numberPickerService.checkNumber([opts.min, opts.max, opts.step])) {
                    throw new Error('some value: (min, max or step) is not a valid number');
                }

                if (scope.percent) {
                    scope.percentLabel = '%';
                    scope.isPercent = true;
                }

                scope.id = numberPickerService.getId();

                //transform string to number
                numberPickerService.transform(opts);

                //change current value if min value is bigger
                if (opts.min > scope.value) {
                    scope.value = opts.min;
                }
                //change current value if max value is small
                if (opts.max < scope.value) {
                    scope.value = opts.max;
                }

                scope.incrementValue = function () {
                    if (scope.value >= (scope.isPercent ? 100 : opts.max)) {
                        return;
                    }
                    scope.value = +scope.value + opts.step;
                    scope.$broadcast('change');
                };
                scope.decrementValue = function () {
                    if (scope.value <= (scope.isPercent ? 0 : opts.min)) {
                        return;
                    }
                    scope.value = +scope.value - opts.step;
                    scope.$broadcast('change');
                };

                scope.togglePercentageValue = function () {
                    scope.isPercent = !scope.isPercent;
                    if (scope.isPercent) {
                        scope.percentLabel = '%';
                    } else {
                        scope.percentLabel = scope.label;
                    }
                };

                scope.$watch('percentLabel', function (newValue, oldValue) {
                    if (!newValue && !oldValue)
                        return false;
                    if (scope.isPercent) {
                        scope.value = scope.methodRound ? Math[scope.methodRound](scope.value / opts.max * 100) : scope.value / opts.max * 100;
                    } else {
                        scope.value = scope.methodRound ? Math[scope.methodRound](opts.max * scope.value / 100) : opts.max * scope.value / 100;
                    }
                });
            },
            templateUrl: 'app/mainApp/directives/loopify-number/templates/numberPicker.html'
        });
    }
})();
