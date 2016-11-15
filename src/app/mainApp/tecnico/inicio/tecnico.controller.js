/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('tecnicoController', tecnicoController);

    function tecnicoController( $scope,$rootScope,AUTH_EVENTS) {
        var vm = this;
        vm.tecnicoAVisibility = false;
        vm.tecnicoBVisibility = false;
        vm.tecnicoCVisibility = false;
        vm.tecnicoDVisibility = false;
        vm.tecnicoEVisibility = false;

        


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
            console.log(vm.role);
            if(vm.role==="Administrador"){
                vm.tecnicoAVisibility = true;
                vm.tecnicoBVisibility = true;
                vm.tecnicoCVisibility = true;
                vm.tecnicoDVisibility = true;
                vm.tecnicoEVisibility = true;

            }
            if (vm.role==="Tecnico A"|| vm.role==="Administrador"){
                vm.tecnicoBVisibility = true;
                vm.tecnicoCVisibility = true;
                vm.tecnicoDVisibility = true;
                vm.tecnicoEVisibility = true;

            }
            else{
                if(vm.role==="Tecnico B"){
                    vm.tecnicoBVisibility = true;
                    vm.tecnicoCVisibility = true;
                    vm.tecnicoDVisibility = true;


                }
                else{
                    if(vm.role==="Tecnico C"){
                        vm.tecnicoCVisibility = true;
                        vm.tecnicoDVisibility = true;


                    }
                    else{
                        if(vm.role==="Tecnico D"){

                            vm.tecnicoDVisibility = true;


                        }
                        else{
                            if(vm.role==="Tecnico E")
                            vm.tecnicoEVisibility = true;
                        }
                    }
                }
            }
        }
    }


})();
