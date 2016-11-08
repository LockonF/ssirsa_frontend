(function() {
    'use strict';

    angular
        .module('app.mainApp')
        .directive('reportMenuItem', reportMenuItemDirective);

    /* @ngInject */
    function reportMenuItemDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            require: '^menuReport',
            scope: {
                item: '='
            },
            // replace: true,
            template: '<div ng-include="::reportMenuItem.item.template"></div>',
            controller: reportMenuItemController,
            controllerAs: 'reportMenuItem',
            bindToController: true
        };
        return directive;
    }

    /* @ngInject */
    function reportMenuItemController($scope, $mdSidenav, $state, $filter, triBreadcrumbsService) {
        var reportMenuItem = this;
        // load a template for this directive based on the type ( link | dropdown )
        reportMenuItem.item.template = 'app/mainApp/components/menuReport/menu-item-' + reportMenuItem.item.type + '.tmpl.html';

        switch(reportMenuItem.item.type) {
            case 'dropdown':
                // if we have kids reorder them by priority
                reportMenuItem.item.children = $filter('orderBy')(reportMenuItem.item.children, 'priority');
                reportMenuItem.toggleDropdownMenu = toggleDropdownMenu;
                // add a check for open event
                $scope.$on('toggleDropdownMenu', function(event, item, open) {
                    // if this is the item we are looking for
                    if(reportMenuItem.item === item) {
                        reportMenuItem.item.open = open;
                    }
                    else {
                        reportMenuItem.item.open = false;
                    }
                });
                // this event is emitted up the tree to open parent menus
                $scope.$on('openParents', function() {
                    // openParents event so open the parent item
                    reportMenuItem.item.open = true;
                    // also add this to the breadcrumbs
                    triBreadcrumbsService.addCrumb(reportMenuItem.item);
                });
                break;
            case 'link':
                reportMenuItem.openLink = openLink;

                // on init check if this is current menu
                checkItemActive($state.current.name, $state.params);

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
                    checkItemActive(toState.name, toParams);
                });
                break;
        }

        function checkItemActive() {
            // first check if the state is the same
            reportMenuItem.item.active = $state.includes(reportMenuItem.item.state, reportMenuItem.item.params);
            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if(reportMenuItem.item.active) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb(reportMenuItem.item);
                $scope.$emit('openParents');
            }
        }

        function toggleDropdownMenu() {
            $scope.$parent.$parent.$broadcast('toggleDropdownMenu', reportMenuItem.item, !reportMenuItem.item.open);
        }

        function openLink() {
            var params = angular.isUndefined(reportMenuItem.item.params) ? {} : reportMenuItem.item.params;
            $state.go(reportMenuItem.item.state, params);
            reportMenuItem.item.active = true;
            $mdSidenav('left').close();
        }
    }
})();
