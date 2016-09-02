(function() {
    'use strict';

    angular
        .module('app')
        .config(dateConfig)
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('SSSIR');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' Solid Solutions Servicios Integrales en Refrigeración');
        triSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('0.1');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('SSSIR');
        triRouteProvider.setSeparator('|');
    }
    function dateConfig($mdDateLocaleProvider)
    {
        var myShortMonths = ['Ene', 'Feb', 'Mar', 'Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        /**
         * DateTime
         */

        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miércoles','Jueves','Viernes','Sábado'];
        $mdDateLocaleProvider.shortDays = ['Dom', 'Lun', 'Mar', 'Mie','Jue','Vie','Sab'];
        $mdDateLocaleProvider.shortMonths = myShortMonths;

        // Can change week display to start on Monday.
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        // Example uses moment.js to parse and format dates.
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('L');
        };
        $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
            return myShortMonths[date.getMonth()] + ' ' + date.getFullYear();
        };
        // In addition to date display, date components also need localized messages
        // for aria-labels for screen-reader users.
        $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
            return 'Semaine ' + weekNumber;
        };
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir el Calendario';
    }
})();
