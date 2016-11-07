(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('loopifyInputNumberPicker', loopifyInputNumberPicker);
    function loopifyInputNumberPicker(numberPickerService) {

        return {
            link: function (scope, element) {
                var fn = function () {
                    var min = scope.isPercent ? 0 : +scope.min,
                        max = scope.isPercent ? 100 : +scope.max;

                    scope.canDown = scope.value > min;
                    scope.canUp = scope.value < max;
                    scope.isMaxValue = !scope.canUp;
                    scope.isMinValue = !scope.canDown;

                    if ((!numberPickerService.checkNumber(scope.value) || scope.value > max || scope.value < min) && scope.value !== '') {
                        //set oldValue or min value if oldValue isn't number when newValue isn't a number or newValue more than max or newValue less than min
                        scope.value = numberPickerService.checkNumber(scope.oldValue) ? scope.oldValue : scope.min;
                    }
                    scope.oldValue = scope.value;
                };
                element.on('change', function () {
                    fn();
                    scope.$apply();
                });
                scope.$on('change', fn);
                fn();
            }
        };
    }
})();
