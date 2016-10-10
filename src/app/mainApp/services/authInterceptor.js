/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .service('AuthInterceptor', AuthInterceptor);

    /* @ngInject */
    function AuthInterceptor($injector, $q) {
        return {
            request: request,
            response: response,
            responseError: responseError
        };

        function request(config) {
            //var $state = $injector.get('$state');
            var Auth = $injector.get('AuthService');
            var OAuthToken = $injector.get('OAuthToken');
            var $http=$injector.get('$http');
            if(!Auth.isAuthenticated()){
                 Auth.refreshToken().then(
                    function(){
                        $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
                    }
                ).catch(
                    function(){
                        console.log("Error3");
                        //Uncomment for enable user validation
                       // $state.go('login');
                    }
                );
            }
            return config;
        }

        function response(res) {
            return res;
        }

        function responseError(response) {
           var $state = $injector.get('$state');
            var Auth = $injector.get('AuthService');

            if (response.status === 403) {
                if(Auth.isAuthenticated())
                {
                    var promise =  Auth.refreshToken();
                    promise.then(function(res){
                    }).catch(function(err)
                    {
                        console.log(err);
                        $injector.get('AuthService').logout();
                        console.log("Error");
                        //$state.go('auth.login');
                    });
                }
                else
                {
                    $injector.get('AuthService').logout();
                    //$state.go('auth.login');
                    console.log("Error2");
                }
            }
            return $q.reject(response);
        }
    }
})();
