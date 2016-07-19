/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth, OAuthToken, $http, Bienvenida,PersonaLocalService){

        $rootScope.$on('$stateChangeSuccess',function(event,destination){
            $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;

            Bienvenida.getPersona().then(function(res){
                PersonaLocalService.persona = res;
            }).catch(function(err){
                console.log(err);
            });

            Bienvenida.getRole().then(function(res){
                PersonaLocalService.role=res[0];
            }).catch(function(){
                console.log(err);
            });

            if(!OAuth.isAuthenticated()){
                OAuth.getRefreshToken().then(
                    function(res){

                    }
                ).catch(
                    function(err){
                        //Uncomment for enable user validation
                        $state.go('login')
                    }
                )
            }
        });

    }
})();