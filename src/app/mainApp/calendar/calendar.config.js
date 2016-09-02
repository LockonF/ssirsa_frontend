(function() {
    'use strict';

    angular
        .module('app.mainApp.calendar')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.admin-default.calendar', {
            // set the url of this page
            url: '/calendar',
            // set the html template to show on this page
            templateUrl: 'app/mainApp/calendar/calendar.tmpl.html',
            // set the controller to load for this page
            controller: 'CalendarController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            // give the menu a name to show (should be translatable and in the il8n folder json)
            name: 'Calendario',

            // point this menu to the state we created in the $stateProvider above
            state: 'triangular.admin-default.calendar',
            // set the menu type to a link
            type: 'link',
            // set an icon for this menu
            icon: 'zmdi zmdi-calendar-alt',
            // set a proirity for this menu item, menu is sorted by priority
            priority: 2.3
        });
    }
})();

