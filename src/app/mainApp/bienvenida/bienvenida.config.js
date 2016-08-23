/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.bienvenida')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider

            .state('triangular.admin-default.bienvenida', {
                url: '/bienvenida',
                templateUrl: 'app/mainApp/bienvenida/index.tmpl.html',
                controller: 'bienvenidaController',
                controllerAs: 'vm',
                resolve: {
                    promiseObj:function(Bienvenida, PersonaLocalService, dynamicMenu){
                        return Bienvenida.getPersona().then(function(res){
                            PersonaLocalService.persona = res;
                        return Bienvenida.getRole().then(function(res){
                            PersonaLocalService.role=res[0];
                            console.log('State changed, role ' +PersonaLocalService.role.name);                            
                            dynamicMenu.loadMenu();
                            console.log();
                        }).catch(function(err){
                            console.log(err);
                        })
                        }).catch(function(err){
                            console.log(err);
                        });


                    },
                    promiseObj2:function(PersonaLocalService, Bienvenida, dynamicMenu){

                    }
                }
            })
    }
    
} )();