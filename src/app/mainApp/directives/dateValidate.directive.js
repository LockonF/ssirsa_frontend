(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('dateValidate', dateValidate);
    function dateValidate() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs,ngModel) {
                scope.minDate = attrs.minDate;
                scope.maxFecha = attrs.maxFecha;
                scope.mdpFormat = attrs.mdpFormat;

                ngModel.$validators.minDates = function(modelValue, viewValue) {
                    return  minDateValidator(viewValue, scope.mdpFormat, scope.minDate);
                };
                ngModel.$validators.maxDates = function(modelValue, viewValue) {
                    return  maxDateValidator(viewValue, scope.mdpFormat, attrs.maxFecha);
                };
            }
        };
    }
    function minDateValidator(value, format, minDate) {
        if(!angular.isUndefined(minDate)) {
            var minDate = moment(minDate, "YYYY-MM-DD", true);
            var date = angular.isDate(value) ? moment(value) : moment(value, format, true);
            if (minDate.isValid() && date.isValid()) {
                return date > minDate;
            }
        }
        return true;
    }
    function maxDateValidator(value, format, maxFecha) {
        if(!angular.isUndefined(maxFecha)) {
            var maxFecha = moment(maxFecha, "YYYY-MM-DD", true);
            var date = angular.isDate(value) ? moment(value) : moment(value, format, true);
            if (maxFecha.isValid() && date.isValid()) {
                console.log(date);
                console.log(maxFecha);
                console.log(date < maxFecha);
                return date < maxFecha;
            }
        }
        return true;
    }
})();
