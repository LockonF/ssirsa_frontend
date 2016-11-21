(function() {
    'use strict';
    angular
        .module('app')
        .service('PusherClient', PusherClient);
    /* @ngInject */
    function PusherClient($pusher,EnvironmentConfig,OAuthToken) {
        this.create = function () {
            var authOptions = {
                headers: {
                    'Authorization':OAuthToken.getAuthorizationHeader()
                }
            };
            var client =  new Pusher(EnvironmentConfig.site.pusher.key, {
                authEndpoint: EnvironmentConfig.site.rest.api+"pusher/auth",
                auth: authOptions
            });

            this.pusher = $pusher(client);
            this.pusher.logToConsole = true;
        };
        this.destroy = function () {
            this.pusher = null;
        };
    }
})();
