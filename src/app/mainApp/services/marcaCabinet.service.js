(function() {
    'use strict';

    angular
        .module('app')
        .factory('MarcaCabinet', MarcaCabinet);

    /* @ngInject */
    function MarcaCabinet($q, Restangular, toastr) {
        return {
            get: get,
            getAll:getAll,
            create:create,
            getModels:getModels
        };


        function get(id) {
            var deferred = $q.defer();
            Restangular.one('marca_cabinet', id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getAll() {
            var deferred = $q.defer();
            Restangular.all('marca_cabinet').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                toastr.error("Error al obtener marcas de cabinet","Error");
            });
            return deferred.promise;
        }

        function create(data){
            var deferred=$q.defer();
            Restangular.all('marca_cabinet').customPOST(data).then(function(res){
                deferred.resolve(res);
                toastr.success("Marca registrada correctamente","Éxito");
            }).catch(function(err){
                deferred.reject(err);
                toastr.error("Error al registrar la marca", "Error");
            });
            return deferred.promise;
        }

        function getModels(id){
            return Restangular.all('marca_cabinet').one('models',id).getList();
        }

    }
})();
