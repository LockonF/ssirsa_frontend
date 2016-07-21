/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth, OAuthToken, $http, Bienvenida,PersonaLocalService,dynamicMenu){
        $rootScope.$on()
        //$rootScope.$on('$stateChangeSuccess',function(event,destination){
        $rootScope.$on('$stateChangeStart',function(event,destination){
            console.log('State change started');
            if(OAuthToken.getToken()!=undefined){
                $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
            }
            if(!OAuth.isAuthenticated()){
                console.log('Not authenticated');
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

            // Bienvenida.getPersona().then(function(res){
            //     PersonaLocalService.persona = res;
            //     console.log('Loading persona');
            //     console.log(PersonaLocalService.persona);
            // }).catch(function(err){
            //     console.log(err);
            // });
            //
            // Bienvenida.getRole().then(function(res){
            //     console.log('Loading role role');
            //     PersonaLocalService.role=res[0]
            //     console.log(PersonaLocalService.role.name);
            // }).catch(function(err){
            //     console.log(err);
            // });
            //
            // dynamicMenu.loadMenu();


            
        });

    }
})();