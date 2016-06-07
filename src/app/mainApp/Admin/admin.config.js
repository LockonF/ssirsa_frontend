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

            .state('triangular.admin-default.gestion_user', {
                url: '/gestion_user',
                templateUrl: 'app/mainApp/Admin/gestion_user.tmpl.html',
                controller: 'gestion_userController',
                controllerAs: 'vm'
            })
        triMenuProvider.addMenu({
            name: 'Administrador',
            icon: 'zmdi zmdi-case',
            type: 'dropdown',
            priority: 2.1,
            children: [{
                name: 'Gestion Usuarios',
                state: 'triangular.admin-default.gestion_user',
                type: 'link'
            }]
        });
    }
    
} )();