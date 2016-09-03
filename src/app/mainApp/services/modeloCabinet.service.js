(function() {
    'use strict';

    angular
        .module('app')
        .factory('ModeloCabinet', ModeloCabinet);

    /* @ngInject */
    function ModeloCabinet($q, Restangular, toastr) {
        return {
            create: create,
            get: get,
            getAll: getAll,
            remove: remove,
            modify: modify
        };

        function create(request) {
            var deferred = $q.defer();
            Restangular.all('modelo_cabinet').customPOST(request).then(function (res) {
                deferred.resolve(res);
                toastr.succes("Modelo de cabinet creado correctamente","Exito");
            }).catch(function (err) {
                deferred.reject(err);
                toastr.error("Error al crear modelo de cabinet","Error");
            });
            return deferred.promise;
        }

        function get(id) {
            var deferred = $q.defer();
            Restangular.one('modelo_cabinet', id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getAll() {
            var deferred = $q.defer();
            Restangular.all('modelo_cabinet').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function remove(request) {
            var deferred = $q.defer();

            Restangular.one('modelo_cabinet', request.no_serie).customDELETE().then(function (res) {
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
