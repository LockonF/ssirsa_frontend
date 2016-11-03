/**
 * Created by Christian amezcua on 17/10/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .service('AuthInterceptor', AuthInterceptor);

    /* @ngInject */
    function AuthInterceptor($injector, $q,EnvironmentConfig) {
        var inFlightGet = null;
        var inFlightRefresh = null;
        return {
            request: request,
            response: response,
            responseError: responseError
        };

        function request(config) {
            //var $state = $injector.get('$state');
            var deferred=$q.defer();
            if ((config.url.indexOf(EnvironmentConfig.site.rest.api) !== -1) && (config.url.indexOf('token') == -1)){

                if(!inFlightGet){
                    inFlightGet=$injector.get('AuthService').getToken();
                }
                inFlightGet.then(function (token) {
                    config.headers.Authorization='Bearer '+token;
                    inFlightGet=null;
                    deferred.resolve(config);
                });

            }else{
                deferred.resolve(config);
            }
            return deferred.promise;
            /*return config;*/
        }

        function response(res) {
            return res;
        }

        function responseError(response) {
            if (response.status === 401 && response.data.error!=='invalid_grant') {
                var deferred = $q.defer();
                var $http = $injector.get('$http');
                if (!inFlightRefresh) {
                    inFlightRefresh = $injector.get('AuthService').refreshToken();
                }
                inFlightRefresh.then(function() {
                    inFlightRefresh = null;
                    $http(response.config).then(deferred.resolve, deferred.reject);
                });
                return deferred.promise
            }
            return $q.reject(response);
        }
    }
})();
