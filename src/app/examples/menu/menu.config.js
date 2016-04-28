(function() {
    'use strict';

    angular
        .module('app.examples.menu')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.admin-default.menu-levels', {
            url: '/menu-levels/:level',
            controller: 'LevelController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/level.tmpl.html'
        })
        .state('triangular.admin-default.menu-dynamic', {
            url: '/menu/dynamic',
            controller: 'MenuDynamicController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/dynamic.tmpl.html'
        })
        .state('triangular.admin-default.menu-dynamic-dummy-page', {
            url: '/menu/dynamic-page',
            templateUrl: 'app/examples/menu/dynamic-page.tmpl.html'
        });

        triMenuProvider.addMenu({
            name: 'Menu',
            icon: 'zmdi zmdi-receipt',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'Dynamic Menu',
                type: 'link',
                state: 'triangular.admin-default.menu-dynamic'
            },{
                name: 'Level 1-1',
                type: 'dropdown',
                children: [{
                    name: 'Level 2-1',
                    type: 'dropdown',
                    children: [{
                        name: 'Level 3-1',
                        type: 'dropdown',
                        children: [{
                            name: 'Level 4-1',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-1'
                            }
                        },{
                            name: 'Level 4-2',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-2'
                            }
                        },{
                            name: 'Level 4-3',
                            type: 'link',
                            state: 'triangular.admin-default.menu-levels',
                            params: {
                                level: 'Item1-1-1-3'
                            }
                        }]
                    }]
                }]
            }]
        });
    }
})();
