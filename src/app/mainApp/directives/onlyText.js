/**
 * Created by Emmanuel on 09/12/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('onlyText',onlyText);

    function onlyText(){
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^A-Za-zñÁ-Úá-úü ]+/, '');
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