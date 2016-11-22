/**
 * Created by amezc on 20/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Notification', Notification);

    /* @ngInject */
    function Notification(PusherClient,$q) {
        return {
            subscribePrivateChannel: subscribePrivateChannel,
            unsubscribePrivateChannel:unsubscribePrivateChannel,
            subscribePresenceChannel: subscribePresenceChannel,
            unsubscribePresenceChannel:unsubscribePresenceChannel
        };
        function subscribePrivateChannel(channel) {
            var deferred = $q.defer();
            var canal = PusherClient.pusher.subscribe('private-' + channel);
            deferred.resolve(canal);
            return deferred.promise;
        }
        function unsubscribePrivateChannel(channelName) {
            PusherClient.pusher.unsubscribe('private-'+channelName);
        }
        function subscribePresenceChannel(channel) {
            return PusherClient.pusher.subscribe('presence-' + channel);

        }
        function unsubscribePresenceChannel(channelName) {
            PusherClient.pusher.unsubscribe('presence-'+channelName);
        }
    }

})();
