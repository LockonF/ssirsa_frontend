(function() {
    'use strict';

    angular
        .module('app.mainApp')
        .directive('menuReport', triMenuDirective);

    /* @ngInject */
    function triMenuDirective($location, $mdTheming, triTheming) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<md-content><report-menu-item ng-repeat="item in reportMenuController.menu | orderBy:\'priority\'" item="::item"></report-menu-item></md-content>',
            scope: {},
            controller: reportMenuController,
            controllerAs: 'reportMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var $mdTheme = $element.controller('mdTheme'); //eslint-disable-line
            var menuColor = triTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
            var menuColorRGBA = triTheming.rgba(menuColor.value);
            $element.css({ 'background-color': menuColorRGBA });
            $element.children('md-content').css({ 'background-color': menuColorRGBA });
        }
    }

    /* @ngInject */
    function reportMenuController(menuReport,dynamicMenu,$rootScope,EVENTS_GENERAL) {
        var reportMenuController = this;

        $rootScope.$on(EVENTS_GENERAL.load_report_menu, function() {

            dynamicMenu.loadMenuReport();
            console.log(menuReport.menu);
            reportMenuController.menu = menuReport.menu;
        });
    }
})();
