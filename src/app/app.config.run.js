/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth, OAuthToken, $http, Bienvenida,PersonaLocalService,dynamicMenu){
        $rootScope.$on();
        //$rootScope.$on('$stateChangeSuccess',function(event,destination){
        $rootScope.$on('$stateChangeStart',function(event,destination){
            if(OAuthToken.getToken()!=undefined){
                $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
            }
            if(!OAuth.isAuthenticated()){
                OAuth.getRefreshToken().then(
                    function(res){
                        $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
                    }
                ).catch(
                    function(err){
                        //Uncomment for enable user validation
                        $state.go('login')
                    }
                )
            }
            else {
                dynamicMenu.loadMenu();
            }
        });

    }
})();
