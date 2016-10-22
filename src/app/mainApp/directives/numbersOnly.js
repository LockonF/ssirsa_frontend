/**
 * Created by Emmanuel on 22/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('numbersOnly',numbersOnly);

    function numbersOnly(){
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }
})();