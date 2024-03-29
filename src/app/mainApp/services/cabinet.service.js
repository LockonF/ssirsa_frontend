(function() {
    'use strict';

    angular
        .module('app')
        .factory('Cabinet', Cabinet);

    /* @ngInject */
    function Cabinet($q, Restangular) {
        var urlbase=Restangular.all("cabinet");
        var urlbase_clean=Restangular.all("cabinet_clean");
        return {
            create: create,
            createClean:createClean,
            updateClean:updateClean,
            removeClean:removeClean,
            get: get,
            getAll: getAll,
            getEconomics:getEconomics,
            remove: remove,
            modify: modify,
            loadByModel:loadByModel,
            loadByStatus:loadByStatus,
            lookup:lookup,
            modifyclear:modifyclear,
            getIfEntrada:getIfEntrada
        };

        function loadByStatus(status,economic) {
            return urlbase.one("status",status).all(economic).getList();
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
            return urlbase_clean.customPOST(data);
        }
        function updateClean(data){
            return urlbase_clean.one(data.economico).customPUT(data);
        }
        function removeClean(data){
            return urlbase_clean.customDELETE(data.economico,null,{'content-type':'application/json'});
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
            return urlbase.all("clean").all("economico").getList();
        }

        function remove(cabinet) {
            return urlbase.customDELETE(cabinet.economico,null,{'content-type':'application/json'});

        }


        function modify(cabinet) {
            var deferred = $q.defer();
            Restangular.one('cabinet', cabinet.economico).customPUT(cabinet).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function modifyclear(cabinet) {
            var deferred = $q.defer();
            Restangular.one('cabinet_clean', cabinet.economico).customPUT(cabinet).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function loadByModel(model){
            return urlbase.one('model',model.id).getList();
        }

        function lookup(economico) {
            return urlbase.one('lookup',economico).getList();
        }

        function getIfEntrada(economico) {
            return urlbase.one("can_enter",economico).customGET();
        }
    }
})();
