(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController($state, triSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.loginTagClick = loginTagClick;
        
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            $state.go('triangular.admin-default.bienvenida');
        }
        function loginTagClick(){
            //Define the route of the tag login
        }
    }
})();
