/**
 * Created by franciscojaviercerdamartinez on 17/07/16.
 */
/**
 * Created by franciscojaviercerdamartinez on 16/07/16.
 */
(function () {
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
            consultarEtapaServicioDiagnostico: consultarEtapaServicioDiagnostico,
            consultarInsumosEtapa: consultarInsumosEtapa,
            consultarAllInsumosCabinetEtapa: consultarAllInsumosCabinetEtapa,
            getEtapaValidable: getEtapaValidable,
            getDiagnosticoFromCabinet: getDiagnosticoFromCabinet,
            anadirInsumo: anadirInsumo,
            modificarInsumo: modificarInsumo,
            eliminarInsumo: eliminarInsumo,
            consultarInfoCabinet: consultarInfoCabinet,
            consultarInsumobyNombre: consultarInsumobyNombre,
            getCatalogoInsumoById: getCatalogoInsumoById,
            BusquedaCatalogoTypeStep: BusquedaCatalogoTypeStep,
            etapaList: etapaList,
            BusquedaInsumosTypeStep: BusquedaInsumosTypeStep,
            cabinetByEconomic: cabinetByEconomic

        };
        var baseModelo = Restangular.all('etapa_servicio');


        function crearEtapaServicio(etapa) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.all('etapa_servicio').customPOST(etapa).then(function (res) {

                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
                console.log(err);
            });

            return deferred.promise;
        }


        function editarEtapaServicio(etapa) {

            var deferred = $q.defer();
            Restangular.one('etapa_servicio', etapa.id).customPUT(etapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(err);

            });


            return deferred.promise;
        }


        function eliminarEtapaServicio(object) {
            console.log(object);

            return baseModelo.customDELETE(object.id, null, {'content-type': 'application/json'});


        }

        function consultarAllEtapaServicioDiagnostico(etapa) {
            var deferred = $q.defer();

            Restangular.all('etapa_servicio').one('diagnostic', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function consultarEtapaServicioDiagnostico(diagnostico) {
            var deferred = $q.defer();

            Restangular.all('etapa_servicio').all('diagnostic').one('latest', diagnostico.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                console.log(err);
            });

            return deferred.promise;
        }

        function consultarAllInsumosCabinetEtapa(etapa) {
            var deferred = $q.defer();
            Restangular.all('etapa_servicio').one('insumos', etapa.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);

            });

            return deferred.promise;
        }


        function getEtapaValidable(idCabinet) {
            var defer = $q.defer();
            getDiagnosticoFromCabinet(idCabinet).then(function (resp) {
                Restangular.all("etapa_servicio").all("diagnostic").all("latest").one("can_validate", resp.id).customGET().then(function (res) {
                    defer.resolve(res);
                }).catch(function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;

        }

        function getDiagnosticoFromCabinet(idCabinet) {
            var defer = $q.defer();
            Restangular.all("diagnostico").all("latest").one(idCabinet).customGET().then(function (res) {
                defer.resolve(res);
            }).catch(function (err) {
                defer.reject(err);
            });
            //console.log(defer.promise);
            return defer.promise;
        }

        function anadirInsumo(insumo) {
            var defer = $q.defer();
            Restangular.all("insumo_usado").customPOST(insumo).then(function (res) {
                defer.resolve(res);
            }).catch(function (err) {
                defer.reject(err);
            })
        }

        function modificarInsumo(insumo) {
            var defer = $q.defer();
            Restangular.all("insumo_usado").one("", insumo.id).customPUT(insumo).then(function (res) {
                defer.resolve(res);
            }).catch(function (err) {
                defer.reject(err);
            })
        }

        function eliminarInsumo(insumo) {
            var defer = $q.defer();
            Restangular.all("insumo_usado").one("", insumo.id).customDELETE(insumo.id, null, {'content-type': 'application/json'}).then(function (res) {
                defer.resolve(res);
            }).catch(function (err) {
                defer.reject(err);
            })
        }

        function consultarInfoCabinet(idcabinet) {
            var deferred = $q.defer();
            //checar rutas :D
            Restangular.one('cabinet', idcabinet).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function consultarInsumobyNombre(cadena) {
            Restangular.all("catalogo_insumos").one("lookup", cadena).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })

        }

        function getCatalogoInsumoById(catalogo) {
            var deferred = $q.defer();
            Restangular.one("catalogo_insumos", catalogo.id).customGet().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })

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

        //Nuevos Endpoints por nuevos requerimentos y reeconstruccion Etapa Servicio
        function BusquedaCatalogoTypeStep(data) {
            var deferred = $q.defer();
            Restangular.all("catalogo_insumos").one("tipo", data.idTipo).all("etapa").customGET(data.idEtapa).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);

            });
            return deferred.promise;
        }

        function BusquedaInsumosTypeStep(data) {
            var deferred = $q.defer();
            Restangular.all("insumo").one("tipo", data.idTipo).one("etapa", data.idEtapa).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);

            });
            return deferred.promise;

        }

        function etapaList() {
            var deferred = $q.defer();
            Restangular.all("etapa").customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function cabinetByEconomic(economico) {
            var deferred = $q.defer();
            Restangular.all("model").one("cabinet", economico).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        }


        return service;

    }


})();
