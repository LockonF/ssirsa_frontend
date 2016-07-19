/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.admin')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('triangular.admin-default.gestion_user', { //Nombre del state
                url: '/gestion_user', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Admin/gestion_user.tmpl.html', //Dirección del archivo a usar
                controller: 'gestion_userController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.buscarUsuario',{
                url:'/buscarUsuario',
                templateUrl:'app/mainApp/Admin/buscarUsuario.html',
                controller:'buscarUsuarioController',
                controllerAs:'vm'
            })
        
            triMenuProvider.addMenu({
                name: 'Administrador',
                icon: 'zmdi zmdi-case',
                type: 'dropdown',
                priority: 2.1,
                children: [{
                    name: 'Nuevo Usuarios',
                    state: 'triangular.admin-default.gestion_user',
                    type: 'link'
                }, {
                    name: 'Buscar Usuario',
                    state: 'triangular.admin-default.buscarUsuario',
                    type: 'link'
                }

                ]
            });
        
    }
    
} )();