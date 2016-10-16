(function() {
    'use strict';

    angular
        .module('app')
        .factory('Cabinet', Cabinet);

    /* @ngInject */
    function Cabinet($q, Restangular) {
        return {
            create: create,
            createClean:createClean,
            get: get,
            getAll: getAll,
            getEconomics:getEconomics,
            remove: remove,
            modify: modify,
            loadByModel:loadByModel
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

        function createClean(data){
            return Restangular.all('cabinet').all('clean').customPOST(data);
        }

        function get(no_serie) {
            var deferred = $q.defer();
            Restangular.one('cabinet', no_serie).customGET().then(function (res) {
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

        function getEconomics(){
            return Restangular.all("cabinet").all("clean").all("economico").getList().$object;
        }

        function remove(cabinet) {
            var deferred = $q.defer();

            Restangular.one('cabinet', cabinet.economico).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function modify(cabinet) {
            var deferred = $q.defer();
            Restangular.one('cabinet', cabinet.economico).customPUT(cabinet).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                console.log(err);
            });
            return deferred.promise;
        }

        function loadByModel(model){
            return Restangular.all('cabinet').one('model',model.id).getList().$object;
        }
    }
})();
