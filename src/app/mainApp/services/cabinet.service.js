(function() {
    'use strict';

    angular
        .module('app')
        .factory('Cabinet', Cabinet);

    /* @ngInject */
    function Cabinet($q, Restangular) {
        var urlbase=Restangular.all("cabinet");
        return {
            create: create,
            createClean:createClean,
            get: get,
            getAll: getAll,
            getEconomics:getEconomics,
            remove: remove,
            modify: modify,
            loadByModel:loadByModel,
            loadByStatus:loadByStatus
        };

        function loadByStatus(status) {
            return urlbase.one("status",status).getList();
        }
        function create(request) {
            var deferred = $q.defer();
            urlbase.customPOST(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function createClean(data){
            return urlbase.all('clean').customPOST(data);
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
            return urlbase.getList().$object;
        }

        function getEconomics(){
            return urlbase.all("clean").all("economico").getList().$object;
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
            return urlbase.one('model',model.id).getList().$object;
        }
    }
})();
