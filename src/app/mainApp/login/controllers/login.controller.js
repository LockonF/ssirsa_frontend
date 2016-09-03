(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController($state, triSettings,$mdDialog,Session,Socket,AuthService) {
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
            var options={
                secure:false
            };

            AuthService.login(vm.user).then(function(res){
                Socket.emit('join', {canal: vm.user.username, username: vm.user.username});
                $state.go('triangular.admin-default.bienvenida');
            }).catch(function(err){
                console.log(err);
                toastr.error('Usuario o Contraseña incorrectos','Error',err.error);
                console.log(err);
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
                //$state.go('triangular.admin-default.tecnico');
            });

        }

    }
})();
