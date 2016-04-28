(function() {
    'use strict';

    angular
        .module('app.examples.elements')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.admin-default.elements-buttons', {
            url: '/elements/buttons',
            templateUrl: 'app/examples/elements/buttons.tmpl.html',
            controller: 'ButtonsController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.elements-icons', {
            url: '/elements/icons',
            templateUrl: 'app/examples/elements/icons.tmpl.html',
            controller: 'IconsController',
            controllerAs: 'vm',
            resolve: {
                icons: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons'
                    });
                },
                fa: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons-fa'
                    });
                }
            }
        })
        .state('triangular.admin-default.elements-checkboxes', {
            url: '/elements/checkboxes',
            templateUrl: 'app/examples/elements/checkboxes.tmpl.html'
        })
        .state('triangular.admin-default.elements-radios', {
            url: '/elements/radios',
            templateUrl: 'app/examples/elements/radios.tmpl.html'
        })
        .state('triangular.admin-default.elements-toolbars', {
            url: '/elements/toolbars',
            templateUrl: 'app/examples/elements/toolbars.tmpl.html'
        })
        .state('triangular.admin-default.elements-tooltips', {
            url: '/elements/tooltips',
            templateUrl: 'app/examples/elements/tooltips.tmpl.html'
        })
        .state('triangular.admin-default.elements-whiteframes', {
            url: '/elements/whiteframes',
            templateUrl: 'app/examples/elements/whiteframes.tmpl.html'
        })
        .state('triangular.admin-default.elements-sliders', {
            url: '/elements/sliders',
            templateUrl: 'app/examples/elements/sliders.tmpl.html'
        })
        .state('triangular.admin-default.elements-toasts', {
            url: '/elements/toasts',
            templateUrl: 'app/examples/elements/toasts.tmpl.html'
        })
        .state('triangular.admin-default.elements-progress', {
            url: '/elements/progress',
            templateUrl: 'app/examples/elements/progress.tmpl.html',
            controller: 'ProgressController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.elements-switches', {
            url: '/elements/switches',
            templateUrl: 'app/examples/elements/switches.tmpl.html',
            controller: function() {
                this.toggleAll = function(data, value) {
                    for(var x in data) {
                        data[x] = value;
                    }
                };
            },
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.elements-dialogs', {
            url: '/elements/dialogs',
            templateUrl: 'app/examples/elements/dialogs.tmpl.html',
            controller: 'DialogsController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.menus', {
            url: '/elements/menus',
            templateUrl: 'app/examples/elements/menus.tmpl.html'
        })
        .state('triangular.admin-default.elements-tabs', {
            url: '/elements/tabs',
            templateUrl: 'app/examples/elements/tabs.tmpl.html'
        })
        .state('triangular.admin-default.elements-sidebars', {
            url: '/elements/sidebars',
            templateUrl: 'app/examples/elements/sidebars.tmpl.html',
            controller: function($mdSidenav) {
                this.openSidebar = function(id) {
                    $mdSidenav(id).toggle();
                };
            },
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.elements-grids', {
            url: '/elements/grids',
            templateUrl: 'app/examples/elements/grids.tmpl.html'
        })
        .state('triangular.admin-default.fab-speed', {
            url: '/elements/fab-speed',
            templateUrl: 'app/examples/elements/fab-speed.tmpl.html'
        })
        .state('triangular.admin-default.fab-toolbar', {
            url: '/elements/fab-toolbar',
            templateUrl: 'app/examples/elements/fab-toolbar.tmpl.html'
        })
        .state('triangular.admin-default.elements-selects', {
            url: '/elements/selects',
            templateUrl: 'app/examples/elements/selects.tmpl.html'
        })
        .state('triangular.admin-default.elements-tables', {
            url: '/elements/tables',
            templateUrl: 'app/examples/elements/tables.tmpl.html'
        })
        .state('triangular.admin-default.elements-textangular', {
            url: '/elements/textangular',
            templateUrl: 'app/examples/elements/textangular.tmpl.html'
        })
        .state('triangular.admin-default.elements-lists', {
            url: '/elements/lists',
            templateUrl: 'app/examples/elements/lists.tmpl.html',
            controller: function(emails) {
                this.emails = emails.data.splice(0, 5);
            },
            controllerAs: 'vm',
            resolve: {
                emails: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'email/inbox'
                    });
                }
            }
        })
        .state('triangular.admin-default.elements-chips', {
            url: '/elements/chips',
            templateUrl: 'app/examples/elements/chips.tmpl.html',
            controller: 'ChipsController',
            controllerAs: 'vm',
            resolve: {
                contacts: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'email/contacts'
                    });
                }
            }
        })
        .state('triangular.admin-default.elements-cards', {
            url: '/elements/cards',
            templateUrl: 'app/examples/elements/cards.tmpl.html'
        })
        .state('triangular.admin-default.elements-upload', {
            url: '/elements/upload',
            templateUrl: 'app/examples/elements/upload.tmpl.html'
        })
        .state('triangular.admin-default.elements-loader', {
            url: '/elements/loader',
            templateUrl: 'app/examples/elements/loader.tmpl.html'
        })
        .state('triangular.admin-default.elements-datepicker', {
            url: '/elements/datepicker',
            templateUrl: 'app/examples/elements/datepicker.tmpl.html'
        });

        triMenuProvider.addMenu({
            name: 'Elements',
            icon: 'zmdi zmdi-graduation-cap',
            type: 'dropdown',
            priority: 3.1,
            children: [{
                name: 'Buttons',
                type: 'link',
                state: 'triangular.admin-default.elements-buttons'
            },{
                name: 'Cards',
                type: 'link',
                state: 'triangular.admin-default.elements-cards'
            },{
                name: 'Checkboxes',
                type: 'link',
                state: 'triangular.admin-default.elements-checkboxes'
            },{
                name: 'Chips',
                type: 'link',
                state: 'triangular.admin-default.elements-chips'
            },{
                name: 'Datepicker',
                type: 'link',
                state: 'triangular.admin-default.elements-datepicker'
            },{
                name: 'Dialogs',
                type: 'link',
                state: 'triangular.admin-default.elements-dialogs'
            },{
                name: 'FAB Speed Dial',
                type: 'link',
                state: 'triangular.admin-default.fab-speed'
            },{
                name: 'FAB Toolbar',
                type: 'link',
                state: 'triangular.admin-default.fab-toolbar'
            },{
                name: 'Grids',
                type: 'link',
                state: 'triangular.admin-default.elements-grids'
            },{
                name: 'Icons',
                type: 'link',
                state: 'triangular.admin-default.elements-icons'
            },{
                name: 'Lists',
                type: 'link',
                state: 'triangular.admin-default.elements-lists'
            },{
                name: 'Loader',
                type: 'link',
                state: 'triangular.admin-default.elements-loader'
            },{
                name: 'Menus',
                type: 'link',
                state: 'triangular.admin-default.menus'
            },{
                name: 'Progress',
                type: 'link',
                state: 'triangular.admin-default.elements-progress'
            },{
                name: 'Radios',
                type: 'link',
                state: 'triangular.admin-default.elements-radios'
            },{
                name: 'Selects',
                type: 'link',
                state: 'triangular.admin-default.elements-selects'
            },{
                name: 'Sidebars',
                type: 'link',
                state: 'triangular.admin-default.elements-sidebars'
            },{
                name: 'Sliders',
                type: 'link',
                state: 'triangular.admin-default.elements-sliders'
            },{
                name: 'Switches',
                type: 'link',
                state: 'triangular.admin-default.elements-switches'
            },{
                name: 'Tables',
                type: 'link',
                state: 'triangular.admin-default.elements-tables'
            },{
                name: 'Tabs',
                type: 'link',
                state: 'triangular.admin-default.elements-tabs'
            },{
                name: 'Textangular',
                type: 'link',
                state: 'triangular.admin-default.elements-textangular'
            },{
                name: 'Toasts',
                type: 'link',
                state: 'triangular.admin-default.elements-toasts'
            },{
                name: 'Toolbars',
                type: 'link',
                state: 'triangular.admin-default.elements-toolbars'
            },{
                name: 'Tooltips',
                type: 'link',
                state: 'triangular.admin-default.elements-tooltips'
            },{
                name: 'Whiteframes',
                type: 'link',
                state: 'triangular.admin-default.elements-whiteframes'
            },{
                name: 'Upload',
                type: 'link',
                state: 'triangular.admin-default.elements-upload'
            }]
        });
    }
})();
