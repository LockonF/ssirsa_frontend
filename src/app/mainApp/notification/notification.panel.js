/**
 * Created by amezc on 27/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('NotificationPanel', NotificationPanel);

    /* @ngInject */
    function NotificationPanel(EnvironmentConfig,$http,$q,OAuthToken) {

        return {
            getNotificationByUser: getNotificationByUser,
            createUser:createUser,
            markNotification: markNotification,
            createNotification:createNotification,
            createOffice:createOffice
        };
        function getNotificationByUser(user) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: EnvironmentConfig.site.notification.baseUrl+'api/notification/'+user,
                headers: {
                    'Authorization': OAuthToken.getAuthorizationHeader()
                }
            };
            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function createUser(request) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: EnvironmentConfig.site.notification.baseUrl+'api/user',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': OAuthToken.getAuthorizationHeader()
                },
                data: request
            };
            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function markNotification(notification_id) {
            var deferred = $q.defer();
            var req = {
                method: 'PUT',
                url: EnvironmentConfig.site.notification.baseUrl+'api/notification/user/'+notification_id,
                headers: {
                    'Authorization': OAuthToken.getAuthorizationHeader()
                }
            };
            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function createNotification(request) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: EnvironmentConfig.site.notification.baseUrl+'api/notification',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': OAuthToken.getAuthorizationHeader()
                },
                data: request
            };
            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function createOffice(request) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: EnvironmentConfig.site.notification.baseUrl+'api/office',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': OAuthToken.getAuthorizationHeader()
                },
                data: request
            };
            $http(req).then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

})();
