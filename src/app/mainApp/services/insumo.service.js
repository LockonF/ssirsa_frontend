/**
 * Created by franciscojaviercerdamartinez on 11/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Insumo', Insumo);

    /* @ngInject */
    function Insumo($q, Restangular) {
        var path=Restangular.all('insumo');
        
        return {

            getInsumosByCatalogo: getInsumosByCatalogo,
            getUsedInsumos: getUsedInsumos,
            getNoUsedInsumos: getNotUsedInsumos,
            getAllInsumos: getAllInsumos, 
            create:create
        };

        function getInsumosByCatalogo(catalogo) {
            var deferred = $q.defer();
            Restangular.all('insumo').one('catalog', catalogo).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });
            return deferred.promise;
        }

        function getUsedInsumos() {
            var deferred = $q.defer();
            Restangular.all('insumo').all('used').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(res);
                console.log(err);
            });
            return deferred.promise;
        }

        function getNotUsedInsumos() {
            var deferred = $q.defer();
            Restangular.all('insumo').all('used').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(res);
                console.log(err);
            });
            return deferred.promise;
        }

        function getAllInsumos() {
            var deferred = $q.defer();
            Restangular.all('insumo').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(res);
                console.log(err);
            });
            return deferred.promise;
        }

        function create(object){
            return path.post(object);
        }

    }
})();