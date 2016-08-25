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
            editarEtapaServicio: editarEtapaServicio,
            eliminarEtapaServicio: eliminarEtapaServicio,
            consultarAllEtapaServicioDiagnostico: consultarAllEtapaServicioDiagnostico,
            consultarEtapaServicioDiagnostico:consultarEtapaServicioDiagnostico,
            verEtapaNoValidada:verEtapaNoValidada,
            verEtapaValidada:verEtapaValidada,
            etapasValidablesByPerson:etapasValidablesByPerson,
            consultarInsumosEtapa:consultarInsumosEtapa,
            consultarAllInsumosCabinetEtapa:consultarAllInsumosCabinetEtapa,
            getEtapaValidable:getEtapaValidable,
            getDiagnosticoFromCabinet:getDiagnosticoFromCabinet,
            añadirInsumo:añadirInsumo;
        };



        function crearEtapaServicio(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('etapa_servicio').customPOST(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }


        function editarEtapaServicio(etapa) {

            var deferred = $q.defer();

            Restangular.one('etapa_servicio', etapa.id).customPUT(etapa).then(function (res) {
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
        function consultarAllEtapaServicioDiagnostico(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('etapa_servicio').one('diagnostic', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });



            return deferred.promise;
        }

        function consultarEtapaServicioDiagnostico(diagnostico) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('etapa_servicio').all('diagnostic').one('latest', diagnostico.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }



        function verEtapaNoValidada(etapa) {

            var deferred = $q.defer();

            Restangular.all('etapa_servicio').all('diagnostic').one('notvalidated', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })
            return deferred.promise;
        }
        function verEtapaValidada(etapa) {

            var deferred = $q.defer();

            Restangular.all('etapa_servicio').all('diagnostic').one('validated', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })
            return deferred.promise;

        }
        function etapasValidablesByPerson(etapa) {

            var deferred = $q.defer();

            Restangular.all('etapa_servicio').all('user').one('stage', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })
            return deferred.promise;

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
        function consultarAllInsumosCabinetEtapa() {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('etapa_servicio').one('insumos', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });



            return deferred.promise;
        }


        function getEtapaValidable(idCabinet){
            var defer = $q.defer();
            var diagnostico = getDiagnosticoFromCabinet(idCabinet);
            Restangular.all("etapa_servicio").all("diagnostic").all("latest").one("can_validate",diagnostico.id).customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            })
            return defer.promise;
        }
        function getDiagnosticoFromCabinet(idCabinet){
            var defer = $q.defer();
            Restangular.all("diagnostico").one("latest",idCabinet).customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
            //console.log(defer.promise);
            return defer.promise;
        }

        function añadirInsumo(etapa){
            var defer =$q.defer();
            Restangular.all("insumo").one("zone",etapa.id).customPOST(etapa).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
        }
        function modificarInsumo(etapa){
            var defer =$q.defer();
            Restangular.all("insumo").one("zone",etapa.id).customPOST(etapa).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
        }
    return service;

    }

})();