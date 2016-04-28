(function() {
    'use strict';

    angular
        .module('app.examples.elements')
        .controller('Loader1Controller', Loader1Controller);

    /* @ngInject */
    function Loader1Controller($timeout, triLoaderService) {
        var vm = this;

        vm.showLoader = showLoader;
        vm.time = 5;

        ////////////

        function showLoader() {
            // turn the loader on
            triLoaderService.setLoaderActive(true);

            // wait for a while
            $timeout(function() {
                // now turn it off
                triLoaderService.setLoaderActive(false);
            }, vm.time * 1000);
        }
    }
})();
