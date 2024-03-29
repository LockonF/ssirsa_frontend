/**
 * Created by Luis_Olvera on 21/07/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitudes_Admin', Solicitudes_Admin);

    function Solicitudes_Admin(Restangular,$q) {
        var base=Restangular.all('solicitud_admin');
        return {
            list: list,
            consultaEsp: consultaEsp,
            consultaEspUnconfirmed: consultaEspUnconfirmed,
            updateSolicitud: updateSolicitud,
            create:create,
            borrarSol:borrarSol,
            getOne:getOne
        };
        function updateSolicitud(request) {
            var deferred = $q.defer();
            Restangular.one('solicitud_admin', request.id).customPUT(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function consultaEsp(object) {
            var tipoConsulta = null;
            switch (object) {
                case "No Confirmada":
                    tipoConsulta = "unconfirmed";
                    break;
                case "Confirmada":
                    tipoConsulta = "confirmed";
                    break;
                case "Cancelada":
                    tipoConsulta = "canceled";
                    break;
                case "Cerrada":
                    tipoConsulta = "closed";
                    break;
            }
            return Restangular.one('solicitud_admin', tipoConsulta).customGET();
        }

        function consultaEspUnconfirmed() {
            return Restangular.one('solicitud_admin', "unconfirmed").customGET();
        }

        function create(object){
            var deferred=$q.defer();
            Restangular.all('solicitud_admin').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud_admin').customGET();
        }

        function borrarSol(object){
            return Restangular.one("solicitud_admin",object).customDELETE(undefined,undefined,{'Content-Type': 'application/json'}).then(function(resp){
                return resp;
            }).catch(function(error){
            })
        }
        function getOne(id) {
            return base.all(id).customGET();
        }
    }
})();
