(function() {
    'use strict';

    angular
        .module('app')
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
})();
