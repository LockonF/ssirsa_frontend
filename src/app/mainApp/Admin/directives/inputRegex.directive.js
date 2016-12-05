(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .directive('regexValidate', regexValidate);
    function regexValidate() {


        return {
            restrict: 'A',
            require: 'ngModel',

            link: function(scope, elem, attr, ctrl) {

                //get the regex flags from the regex-validate-flags="" attribute (optional)
                var flags = attr.regexValidateFlags || '';
                console.log(regex1);
                // create the regex obj.
                var regex1 = new RegExp(attr.regexValidate);
                //var regex2 = new RegExp(attr.regexValidateTwo);
                //var regex3 = new RegExp(attr.regexValidateThree);
                console.log(regex1);

                // add a parser that will process each time the value is
                // parsed into the model when the user updates it.
                ctrl.$parsers.unshift(function(value) {
                    //alert(value);
                    // test and set the validity after update.
                    var valid = regex1.test(value);
                    //var valid2 = regex2.test(value);
                    //var valid3 = regex3.test(value);
                    ctrl.$setValidity('regexValidate', valid);
                    //ctrl.$setValidity('regexValidateTwo', valid);
                    //ctrl.$setValidity('regexValidateThree', valid);

                    // if it's valid, return the value to the model,
                    // otherwise return undefined.
                    return valid ? value : undefined;
                });

                // add a formatter that will process each time the value
                // is updated on the DOM element.
                ctrl.$formatters.unshift(function(value) {
                    // validate.
                    ctrl.$setValidity('regexValidate', regex1.test(value));

                    // return the value or nothing will be written to the DOM.
                    return value;
                });
            }
        };
    }

})();
