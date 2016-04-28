(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter, $http, triSettings) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;

        ////////////////

        function resetClick() {
            $mdToast.show(
                $mdToast.simple()
                .content($filter('triTranslate')('Your new password has been mailed'))
                .position('bottom right')
                .action($filter('triTranslate')('Login'))
                .highlightAction(true)
                .hideDelay(0)
            ).then(function() {
                $state.go('authentication.login');
            });
        }
    }
})();
