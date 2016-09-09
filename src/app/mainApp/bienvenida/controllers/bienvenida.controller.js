/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp')
        .controller('bienvenidaController',bienvenidaController);

    function bienvenidaController( $scope,$rootScope,AUTH_EVENTS){
        var vm = this;

        vm.capturista=false;
        vm.tecnico=false;;
        vm.cliente=false;
        vm.Admin=false;;
        vm.role;

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
            vm.role=$scope.vmNode.currentUser.userRole;
            console.log(vm.role);
            showButtons();
        });
        $rootScope.$on(AUTH_EVENTS.sessionRestore, function(event) {
            vm.role=$scope.vmNode.currentUser.userRole;
            console.log(vm.role);
            showButtons();


        });
        function showButtons(){
            if (vm.role==="Administrador"){
                vm.capturista=true;
                vm.tecnico=true;
                vm.cliente=true;
                vm.admin=true;
            }
            else{
                if(vm.role==="Capturista"){
                    vm.capturista=true;
                    vm.cliente=true;
                }
                else{
                    if(vm.role==="Cliente"){
                    vm.cliente=true;
                }
                    else
                        vm.tecnico=true;
                }
            }
        }
    }

})();
