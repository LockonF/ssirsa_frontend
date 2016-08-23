(function() {
    'use strict';

    angular
        .module('triangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, triLoaderService) {
        // add a class to the body if we are on windows
        if($window.navigator.platform.indexOf('Win') !== -1) {
            $rootScope.bodyClasses = ['os-windows'];
        }

        // register listeners for loader
        var loadingListener = $rootScope.$on('$stateChangeStart', function() {
            triLoaderService.setLoaderActive(true);
        });

        var loadedListener = $rootScope.$on('$viewContentLoaded', function() {
            triLoaderService.setLoaderActive(false);
        });

        $rootScope.$on('$destroy', removeListeners);

        function removeListeners() {
            loadingListener();
            loadedListener();
        }
    }
})();
