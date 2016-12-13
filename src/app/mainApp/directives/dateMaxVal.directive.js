(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('dateMaxVal', dateValidate);
    function dateValidate() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs,ngModel) {
                scope.dateMaxVal = attrs.dateMaxVal;
                scope.mdpFormat = attrs.mdpFormat;
                ngModel.$validators.maxDates = function(modelValue, viewValue) {
                    return  maxDateValidator(viewValue, scope.mdpFormat, attrs.dateMaxVal);
                };
            }
        };
    }
    function maxDateValidator(value, format, dateMaxVal) {
        if(!angular.isUndefined(dateMaxVal)) {
            var dateMaxVal = moment(dateMaxVal, "YYYY-MM-DD", true);
            var date = angular.isDate(value) ? moment(value) : moment(value, format, true);
            if (dateMaxVal.isValid() && date.isValid()) {
                return date <= dateMaxVal;
            }
        }
        return true;
    }
})();
