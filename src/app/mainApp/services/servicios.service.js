/**
 * Created by franciscojaviercerdamartinez on 17/07/16.
 */
/**
 * Created by franciscojaviercerdamartinez on 16/07/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Servicios', Servicios);

    /* @ngInject */
    function Servicios($q, Restangular) {
        var service = {
            crearEtapaServicio: crearEtapaServicio,
            consultarEtapaServicio: consultarEtapaServicio,
            editarEtapaServicio: editarEtapaServicio,
            eliminarEtapaServicio: eliminarEtapaServicio,
            validarEtapaServicio: validarEtapaServicio,
            consultarInsumosEtapa: consultarInsumosEtapa,
            getAllEtapasServicio: getAllEtapasServicio
        };


        
        function crearEtapaServicio(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('').customPOST(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function consultarEtapaServicio(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('Etapa', etapa.id).customGET(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function editarEtapaServicio(etapa) {

            var deferred = $q.defer();

            Restangular.all('etapaServicio').one('Update', etapa.id).customPOST(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function eliminarEtapaServicio(etapa) {
            var deferred = $q.defer();

            Restangular.one('etapa', etapa.id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function validarEtapaServicio(etapa) {

            var deferred = $q.defer();

            Restangular.all('ValidarEtapaServicio').one('Update', etapa.id).customPOST(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })

        }

        function consultarInsumosEtapa(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('Insumos', etapa.NoEtapa).customGET(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }
        function getAllEtapasServicio(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('Etapas', etapa.idCabinet).customGET(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

    }

})();