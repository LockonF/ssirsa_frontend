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
    function Servicios($q, Restangular, toastr) {
        return {
            crearEtapaServicio: crearEtapaServicio,
            consultarEtapaServicio: consultarEtapaServicio,
            editarEtapaServicio: editarEtapaServicio,
            eliminarEtapaServicio: eliminarEtapaServicio,
            consultarInsumosEtapa: consultarInsumosEtapa,
            getAllEtapasServicio: getAllEtapasServicio,
            getEtapaValidable: getEtapaValidable,
            getDiagnosticoFromCabinet: getDiagnosticoFromCabinet
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

        //etapa_servicio/id
        function editarEtapaServicio(etapa) {

            var deferred = $q.defer();

            Restangular.one('etapa_servicio', etapa.id).customPOST(etapa).then(function (res) {
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

        //etapa_servicio/diagnostic/latest/can_validate/
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

        //diagnostico/latest/id
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