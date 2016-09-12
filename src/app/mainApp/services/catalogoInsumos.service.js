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
        return {

            getAllCatalogoInsumos:getAllCatalogoInsumos,
            getCatalogoInsumo:getCatalogoInsumo,
            getCatalogoByZone:getCatalogoByZone,
            getCatalogoByWord:getCatalogoByWord
        };


        function getCatalogoInsumo(catalogo) {
            var deferred = $q.defer();
            Restangular.one('catalogo_insumos', catalogo).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });
            return deferred.promise;
        }

        function getCatalogoByZone(etapa) {
            var deferred = $q.defer();
            Restangular.all('catalogo_insumos').one('zone',etapa).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });
            return deferred.promise;
        }

        function getCatalogoByWord(word) {
            var deferred = $q.defer();
            Restangular.all('catalogo_insumos').one('lookup',word).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });
            return deferred.promise;
        }

        function getAllCatalogoInsumos() {
            var deferred = $q.defer();
            Restangular.all('catalogo_insumos').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });
            return deferred.promise;
        }


    }
});