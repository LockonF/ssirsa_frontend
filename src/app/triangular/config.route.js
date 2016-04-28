(function() {
    'use strict';

    angular
        .module('triangular')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
        .state('triangular', {
            abstract: true,
            templateUrl: 'app/triangular/layouts/default/default.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('triangular-no-scroll', {
            abstract: true,
            templateUrl: 'app/triangular/layouts/default/default-no-scroll.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('triangular.admin-default', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateProvider: function($templateRequest, triLayout) {
                        return $templateRequest(triLayout.layout.sidebarLeftTemplateUrl);
                    },
                    controllerProvider: function(triLayout) {
                        return triLayout.layout.sidebarLeftController;
                    },
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateProvider: function($templateRequest, triLayout) {
                        return $templateRequest(triLayout.layout.sidebarRightTemplateUrl);
                    },
                    controllerProvider: function(triLayout) {
                        return triLayout.layout.sidebarRightController;
                    },
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateProvider: function($templateRequest, triLayout) {
                        return $templateRequest(triLayout.layout.toolbarTemplateUrl);
                    },
                    controllerProvider: function(triLayout) {
                        return triLayout.layout.toolbarController;
                    },
                    controllerAs: 'vm'
                },
                content: {
                    templateProvider: function($templateRequest, triLayout) {
                        return $templateRequest(triLayout.layout.contentTemplateUrl);
                    }
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        })
        .state('triangular.admin-default-no-scroll', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div flex ui-view layout="column" class="overflow-hidden"></div>'
                }
            }
        });
    }
})();
