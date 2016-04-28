(function() {
    'use strict';

    angular
        .module('app.examples.maps')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, uiGmapGoogleMapApiProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.admin-default.maps-fullwidth', {
            url: '/maps/fullwidth',
            templateUrl: 'app/examples/maps/maps-fullwidth.tmpl.html',
            controller: 'MapController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.maps-demos', {
            url: '/maps/demos',
            templateUrl: 'app/examples/maps/maps-demo.tmpl.html'
        });

        uiGmapGoogleMapApiProvider.configure({
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });

        triMenuProvider.addMenu({
            name: 'Maps',
            icon: 'zmdi zmdi-pin',
            type: 'dropdown',
            priority: 7.1,
            children: [{
                name: 'Fullwidth',
                state: 'triangular.admin-default.maps-fullwidth',
                type: 'link'
            },{
                name: 'Demos',
                state: 'triangular.admin-default.maps-demos',
                type: 'link'
            }]
        });
    }
})();
