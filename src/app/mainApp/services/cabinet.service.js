(function() {
    'use strict';

    angular
        .module('app')
        .factory('Cabinet', Cabinet);

    /* @ngInject */
    function Cabinet($q, Restangular) {
        return {
            create: create,
            get: get,
            getAll: getAll,
            remove: remove,
            modify: modify
        };

        function create(request) {
            var deferred = $q.defer();
            Restangular.all('cabinet').customPOST(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function get(request) {
            var deferred = $q.defer();
            Restangular.one('cabinet', request.no_serie).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getAll() {
            var deferred = $q.defer();
            Restangular.all('cabinet').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function remove(request) {
            var deferred = $q.defer();

            Restangular.one('cabinet', request.no_serie).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function modify(request) {
            var deferred = $q.defer();
            Restangular.one('cabinet', request.no_serie).customPUT(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
