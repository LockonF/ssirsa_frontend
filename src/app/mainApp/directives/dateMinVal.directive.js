(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('dateMinVal', dateValidate);
    function dateValidate() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs,ngModel) {
                scope.dateMinVal = attrs.dateMinVal;

                scope.mdpFormat = attrs.mdpFormat;

                ngModel.$validators.minDates = function(modelValue, viewValue) {
                    return  minDateValidator(viewValue, scope.mdpFormat, scope.dateMinVal);
                };

            }
        };
    }
    function minDateValidator(value, format, dateMinVal) {
        if(!angular.isUndefined(dateMinVal)) {
            var dateMinVal = moment(dateMinVal, "YYYY-MM-DD", true);
            var date = angular.isDate(value) ? moment(value) : moment(value, format, true);
            if (dateMinVal.isValid() && date.isValid()) {
                return date > dateMinVal;
            }
        }
        return true;
    }

})();
