(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('regexValidate', regexValidate);
    function regexValidate() {


        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, elem, attrs, ngModel) {
                var regex = /^\d+$/;

                ngModel.$validators['validNumber'] = function(modelValue, viewValue) {

                    return !regex.test(viewValue);
                };
                ngModel.$validators['lengthPassword'] = function(modelValue, viewValue) {
                    return viewValue.length>=8;
                };
            }
        };
    }


})();
