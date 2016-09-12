/**
 * Created by franciscojaviercerdamartinez on 11/09/16.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('CatalogoInsumo', CatalogoInsumo);

    /* @ngInject */
    function CatalogoInsumo($q, Restangular) {
        var baseCatalogoInsumo = Restangular.all('catalogo_insumos');

        return {

            getAllCatalogoInsumos:getAllCatalogoInsumos,
            getCatalogoInsumo:getCatalogoInsumo,
            getCatalogoByZone:getCatalogoByZone,
            getCatalogoByWord:getCatalogoByWord,
            list:list,
            update:update,
            create:create,
            remove:remove
        };


        function getCatalogoInsumo(catalogo) {
            var deferred = $q.defer();
            Restangular.one('catalogo_insumos', catalogo).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (res) {
                deferred.reject(res);
                console.log(res);
            });
            return deferred.promise;
        }

       
        function getCatalogoByZone(etapa) {
            var deferred = $q.defer();
           
            Restangular.all('catalogo_insumos').one('zone', etapa).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                console.log(err);
            });

            return deferred.promise;
        }

        function getCatalogoByWord(word) {
            var deferred = $q.defer();
            Restangular.all('catalogo_insumos').one('lookup',word).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(res);
                console.log(err);
            });
            return deferred.promise;
        }

        function getAllCatalogoInsumos() {
            var deferred = $q.defer();
            Restangular.all('catalogo_insumos').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(res);
                console.log(err);
            });
            return deferred.promise;
        }

        function list(){
            return baseCatalogoInsumo.getList().$object;
        }

        function update(object)
        {
            return object.put();
        }

        function create(object){
            return baseCatalogoInsumo.post(object);
        }

        function remove(object) {
            return baseCatalogoInsumo.customDELETE(object.id,null,{'content-type':'application/json'});
        }








    }
})();