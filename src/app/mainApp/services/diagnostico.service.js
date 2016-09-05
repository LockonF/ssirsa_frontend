(function() {
    'use strict';

    angular
        .module('app')
        .factory('Diagnostico', Diagnostico);

    /* @ngInject */
    function Diagnostico($q, Restangular) {
        return {
            create: create,
            get: get,
            getAllByCabinet: getAllByCabinet,
            remove: remove,
            modify: modify,
            lastDiagnosticInput:lastDiagnosticInput,
            lastDiagnosticOutput:lastDiagnosticOutput
        };

        function lastDiagnosticInput(id) {
            var deferred = $q.defer();
            Restangular.all('diagnostico').one('latest',id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function lastDiagnosticOutput(id) {
            var deferred = $q.defer();
            Restangular.all('diagnostico').one('latest_salida',id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function create(request) {
            var deferred = $q.defer();
            Restangular.all('diagnostico_cabinet').customPOST(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function get(id) {
            var deferred = $q.defer();
            Restangular.one('diagnostico_cabinet',id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getAllByCabinet(id) {
            var deferred = $q.defer();
            Restangular.all('diagnostico').one('all',id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function remove(id) {
            var deferred = $q.defer();

            Restangular.one('diagnostico_cabinet',id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function modify(request) {
            var deferred = $q.defer();
            Restangular.one('diagnostico_cabinet', request.id).customPUT(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
