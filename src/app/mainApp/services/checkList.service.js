/**
 * Created by franciscojaviercerdamartinez on 18/07/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('CheckList', CheckList);

    /* @ngInject */
    function CheckList($q, Restangular) {
        var service = {
            crearCheckListServicio: crearCheckListServicio,
            consultarCheckListServicio: consultarCheckListServicio,
            editarCheckListServicio: editarCheckListServicio,
            eliminarCheckListServicio: eliminarCheckListServicio,
            getAllCheckListServicio: getAllCheckListServicio
        };
        

        function crearCheckListServicio(CheckList) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('').customPOST(CheckList).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function consultarCheckListServicio(CheckList) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('CheckList', CheckList.id).customGET(CheckList).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function editarCheckListServicio(CheckList) {

            var deferred = $q.defer();

            Restangular.all('CheckList').one('CheckList', CheckList.id).customPOST(CheckList).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function eliminarCheckListServicio(CheckList) {
            var deferred = $q.defer();

            Restangular.one('CheckList', CheckList.id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }


        function getAllCheckListServicio(CheckList) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('CheckList', CheckList.idCabinet).customGET(CheckList).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

    }

})();