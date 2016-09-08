(function() {
    'use strict';

    angular
        .module('app')
        .factory('LineaTransporte', LineaTransporte);

    /* @ngInject */
    function LineaTransporte($q, Restangular) {
        return {
            create: create,
            get: get,
            getAll: getAll,
            remove: remove,
            modify: modify
        };

        function create(request) {
            var deferred = $q.defer();
            Restangular.all('linea_transporte').customPOST(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function get(id) {
            var deferred = $q.defer();
            Restangular.one('linea_transporte', id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getAll() {
            var deferred = $q.defer();
            Restangular.all('linea_transporte').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function remove(id) {
            var deferred = $q.defer();

            Restangular.one('linea_transporte', id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function modify(linea_transporte) {
            var deferred = $q.defer();
            Restangular.one('linea_transporte', linea_transporte.id).customPUT(linea_transporte).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                console.log(err);
            });
            return deferred.promise;
        }
    }
})();
