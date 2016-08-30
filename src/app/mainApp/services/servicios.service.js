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
            anadirInsumo:anadirInsumo,
            modificarInsumo:modificarInsumo,
            eliminarInsumo:eliminarInsumo
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
            Restangular.one('Insumos', etapa.actual_etapa).customGET(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }
        function consultarAllInsumosCabinetEtapa(etapa) {
            var deferred = $q.defer();
            Restangular.all('etapa_servicio').one('insumos', etapa.id).customGET(etapa.id).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });



            return deferred.promise;
        }


        function getEtapaValidable(idCabinet){
            var defer = $q.defer();
            getDiagnosticoFromCabinet(idCabinet).then(function(resp){
                Restangular.all("etapa_servicio").all("diagnostic").all("latest").one("can_validate",resp.id).customGET().then(function(res){
                    defer.resolve(res);
                }).catch(function(err){
                    defer.resolve(err);
                });
                return defer.promise;
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;

        }

        function getDiagnosticoFromCabinet(idCabinet){
            var defer = $q.defer();
            Restangular.all("diagnostico").all("latest").one(idCabinet).customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            //console.log(defer.promise);
            return defer.promise;
        }

        function anadirInsumo(insumo){
            var defer =$q.defer();
            Restangular.all("insumo_usado").customPOST(insumo).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
        }
        function modificarInsumo(insumo){
            var defer =$q.defer();
            Restangular.all("insumo_usado").one("",insumo.id).customPUT(insumo).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
        }
        function eliminarInsumo(insumo){
            var defer =$q.defer();
            Restangular.all("insumo_usado").one("",insumo.id).customDELETE().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            })
        }
        return service;

    }

})();
