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
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.profile', {
                url: '/profile',
                templateUrl: 'app/mainApp/bienvenida/profile.tmpl.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })

        triMenuProvider.addMenu({
            name: 'Bienvenida',
            icon: 'zmdi zmdi-home',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Inicio',
                state: 'triangular.admin-default.bienvenida',
                type: 'link'
            }]
        });
    }
    
} )();