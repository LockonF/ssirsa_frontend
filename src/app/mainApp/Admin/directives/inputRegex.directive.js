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
                var flags = attr.regexValidateFlags || '';
                console.log(regex1);
                var regex1 = new RegExp(attr.regexValidate);
                var flag=0;
                console.log(regex1);
                ctrl.$parsers.unshift(function(value) {
                    console.log(value);
                    if(value.length>0)
                    {
                        for(var i=0;i<value.length;i++){
                            if(value.charAt(i) != '0' && value.charAt(i) != '1' && value.charAt(i) != '2' && value.charAt(i) != '3' && value.charAt(i) != '4' && value.charAt(i) != '5' && value.charAt(i) != '6' && value.charAt(i) != '7' && value.charAt(i) != '8' && value.charAt(i) != '9'){
                                flag=1;
                                console.log(value.charAt(i));
                                break;
                            }else{
                                flag=0;
                            }

                        }
                        if (flag==1)
                        {
                            var valid = regex1.test(value);
                            console.log(valid);
                            ctrl.$setValidity('regexValidate', valid);
                            return valid ? value : undefined;
                        }

                    }else{
                        ctrl.$setValidity('regexValidate', true);
                    }
                    ctrl.$setValidity('regexValidate', false);
                        return undefined;
                });

                ctrl.$formatters.unshift(function(value) {

                    ctrl.$setValidity('regexValidate', regex1.test(value));

                    return value;
                });
            }
        };
    }

})();
