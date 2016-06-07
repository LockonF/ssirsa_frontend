(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController($state, triSettings,$mdDialog) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.loginTagClick = loginTagClick;
        vm.newDialog = {
            title: 'Card Login',
            content: 'Hold you card near the reader',
            holder:'Card ID',
            ok: 'OK',
            cancel: 'Cancel'
        };
        
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            id: '',
            password: ''
        };

        function loginClick() {
            $state.go('triangular.admin-default.bienvenida');
        }
        function loginTagClick($event,dialog){
            var confirm=$mdDialog.prompt()
                .title(dialog.title)
                .clickOutsideToClose(true)
                .textContent(dialog.content)
                .placeholder(dialog.holder)
                .ok(dialog.ok)
                .cancel(dialog.cancel)
                .targetEvent($event);
            $mdDialog.show(confirm).then(function(result){
                $state.go('tecnico');
            });

        }


    }
})();
