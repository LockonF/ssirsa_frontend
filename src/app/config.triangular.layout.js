(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(triLayoutProvider) {
        
        triLayoutProvider.setDefaultOption('toolbarSize', 'default');
        triLayoutProvider.setDefaultOption('toolbarShrink', false);
        triLayoutProvider.setDefaultOption('toolbarClass', '');
        triLayoutProvider.setDefaultOption('contentClass', 'full-image-background mb-bg-fb-08');
        triLayoutProvider.setDefaultOption('sideMenuSize', 'hidden');
        triLayoutProvider.setDefaultOption('footer', true);
    }
})();