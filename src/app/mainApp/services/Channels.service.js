/**
 * Created by amezc on 21/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Channel', Channel);

    /* @ngInject */
    function Channel() {

        var channels_reference = [];

        return {
            add:add,
            get:get,
            all:all,
            clear:clear
        };
        function all() {
            return channels_reference;
        }
        function clear() {
            channels_reference=[];
        }
        function add(channel) {
            channels_reference.push(channel);
        }
        function get(channel_name) {
            return _.filter(channel_name, function (obj) {
                return !(obj.name == channel_name);
            });
        }
    }

})();
