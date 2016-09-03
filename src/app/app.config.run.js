/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth, AuthService,$window){
        $rootScope.$on('$stateChangeStart',function(event,rejection){

            if(AuthService.isAuthenticated()) {
                AuthService.getUser();

            }
        });
        $rootScope.$on('oauth:error',function(event, rejection) {
            console.log("Error");
            if ('invalid_grant' === rejection.data.error) {
                console.log("invalid_grant");
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                console.log("Invalidado");
                return OAuth.getRefreshToken();
            }
            return $window.location.href = '/login';
        });
        /*$rootScope.$on('$stateChangeStart',function(event,destination){
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
        });*/


    }
})();
