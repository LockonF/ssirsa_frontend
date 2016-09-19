(function() {
    'use strict';

    angular
        .module('triangular')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, $state, $filter, $timeout, triRoute, triBreadcrumbsService, $translate) {
        var breadcrumbs = triBreadcrumbsService.breadcrumbs;

        // change title when language changes - when a menu item is clicked - on app init
        var menuTitleHandler = $rootScope.$on('changeTitle', function(){
            setFullTitle();
        });

        $rootScope.$on('$destroy', function(){
            menuTitleHandler();
        });

        function setFullTitle() {
            $timeout(function(){
                var title = triRoute.title;
                angular.forEach(breadcrumbs.crumbs, function(crumb){
                    var subtitle= $translate(crumb.name).then(function(res){
                        console.log(res);
                        title +=' ' + triRoute.separator + ' ' +res+' ';
                        $window.document.title = title;

                    });


                });

            });
        }
    }
})();
