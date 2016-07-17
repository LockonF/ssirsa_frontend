/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, $state, OAuth){
        $rootScope.$on('$stateChangeSuccess',function(event,dest){
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