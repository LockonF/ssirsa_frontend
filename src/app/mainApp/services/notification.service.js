/**
 * Created by amezc on 20/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Notification', Notification);

    /* @ngInject */
    function Notification(PusherClient) {


        return {
            subscribeChannel: subscribeChannel
        };
        function subscribeChannel(channel) {
            /*var request = {
                socket_id: PusherClient.pusher.connection.baseConnection.socket_id,
                channel: 'private-' + channel
            };
            var deferred = $q.defer();*/
            var canal = PusherClient.pusher.subscribe('private-' + channel);
            console.log(canal);
            canal.bind('pusher:subscription_succeeded', function() {
                console.log("exito");
            });
            return canal;
            //deferred.resolve(canal);
            //return deferred.promise;
        }
    }

})();
