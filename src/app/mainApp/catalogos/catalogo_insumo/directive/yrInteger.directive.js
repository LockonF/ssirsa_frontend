(function () {
    'use strict';
    angular
        .module('app.mainApp.catalogos')
        .directive('numberOnlyInput', numberOnlyInput);
    function numberOnlyInput() {
        return {
            restrict: 'EA',
            template: '<input name="{{inputName}}" ng-model="inputValue" ng-required="true" />',
            scope: {
                inputValue: '=',
                inputName: '='
            },
            link: function (scope) {
                scope.$watch('inputValue', function(newValue,oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] === '.' )) return;
                    if (arr.length === 2 && newValue === '.') return;
                    if (isNaN(newValue)) {
                        scope.inputValue = oldValue;
                    }
                });
            }
        };
    }
})();
