(function () {
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
    function reportMenuItemController($scope, $state, Reportes, ReportSelected, menuReport, $mdSidenav, $rootScope, EVENTS_GENERAL, $filter, triBreadcrumbsService) {
        var reportMenuItem = this;
        // load a template for this directive based on the type ( link | dropdown )

        reportMenuItem.selected = ReportSelected;
        reportMenuItem.selectedElement = null;
        reportMenuItem.item.template = 'app/mainApp/components/menuReport/menu-item-dropdown.tmpl.html';
        reportMenuItem.toggleDropdownMenu = toggleDropdownMenu;
        // add a check for open event
        $scope.$on('toggleDropdownMenuReport', function (event, item, open) {
            // if this is the item we are looking for

            if (reportMenuItem.item === item) {
                reportMenuItem.item.open = open;
                if (reportMenuItem.item.open) {

                    Reportes.getRelatedModels(reportMenuItem.item.model_id, reportMenuItem.item.path, reportMenuItem.item.field_name).then(function (res) {
                        reportMenuItem.item.related_fields = res;
                        res.forEach(function (value) {
                            menuReport.addMenu(value);
                        });
                    });
                    Reportes.getFields(reportMenuItem.item.model_id, reportMenuItem.item.path, reportMenuItem.item.field_name).then(function (res) {
                        ReportSelected.create(reportMenuItem.item.field_name);
                        reportMenuItem.selectedElement = reportMenuItem.item.field_name;
                        checkItemActive();
                        $rootScope.$broadcast(EVENTS_GENERAL.load_fields, {fields: res,menu:reportMenuItem.item.field_name});
                    });
                }
            }
            else {
                reportMenuItem.item.open = false;
            }
        });
        // this event is emitted up the tree to open parent menus
        $scope.$on('openParentsReport', function () {
            // openParents event so open the parent item
            reportMenuItem.item.open = true;
        });


        function checkItemActive() {
            // first check if the state is the same
            var res = _.findWhere(menuReport.menu, {
                'field_name': reportMenuItem.selectedElement
            });
            reportMenuItem.item.active = res != null;

            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if (reportMenuItem.item.active) {
                /*triBreadcrumbsService.reset();
                 triBreadcrumbsService.addCrumb(reportMenuItem.item);*/
                $scope.$emit('openParentsReport');
            }
        }

        function toggleDropdownMenu() {
            reportMenuItem.item.active = true;
            $scope.$parent.$parent.$broadcast('toggleDropdownMenuReport', reportMenuItem.item, !reportMenuItem.item.open);
        }

    }
})();
