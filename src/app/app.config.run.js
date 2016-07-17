/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth, OAuthToken, $http){



        $rootScope.$on('$stateChangeSuccess',function(event,dest){
            $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;


            //console.log('funciona');
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