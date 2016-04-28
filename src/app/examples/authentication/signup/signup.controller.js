(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, triSettings) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        ////////////////

        function signupClick() {
            $mdToast.show(
                $mdToast.simple()
                .content($filter('triTranslate')('Confirmation sent'))
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
