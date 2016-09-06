(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController($state, toastr, triSettings,$mdDialog,Session,Socket,AuthService) {
        var vm = this;

        vm.loginClick = loginClick;
        vm.loginTagClick = loginTagClick;
        vm.newDialog = {
            title: 'Login por TAG',
            content: 'Coloque su tarjeta cerca del lector',
            holder:'ID Tarjeta',
            ok: 'OK',
            cancel: 'Cancelar'
        };

        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            username: '',
            password: ''
        };

        function loginClick() {
            AuthService.login(vm.user).then(function(res){
                $state.go('triangular.admin-default.bienvenida');
            }).catch(function(err){
                toastr.error('Usuario o Contraseña incorrectos','Error',err.error);
            });

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
                var resp=result.split("$");
                vm.user.username=resp[0];
                vm.user.password=resp[1];
                AuthService.login(vm.user).then(function(res){
                    $state.go('triangular.admin-default.bienvenida');
                }).catch(function(err){
                    toastr.error('Usuario o Contraseña incorrectos','Error',err.error);
                });
            });

        }

    }
})();
