/**
 * Created by Luis_Olvera on 21/07/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitudes_Admin', Solicitudes_Admin);

    function Solicitudes_Admin(Restangular,$q) {
        return {
            list: list,
            consultaEsp: consultaEsp,
            consultaEspUnconfirmed: consultaEspUnconfirmed,
            updateSolicitud: updateSolicitud

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
            switch (object.status) {
                case "No Confirmada":
                    tipoConsulta = "No Confirmada";
                    break;
                case "Confirmada":
                    tipoConsulta = "Confirmada";
                    break;
                case "Cancelada":
                    tipoConsulta = "Cancelada";
                    break;
            }
            return Restangular.one('solicitud_admin', tipoConsulta).customGET();
        }

        function consultaEspUnconfirmed() {
            return Restangular.one('solicitud_admin', "unconfirmed").customGET();
        }

        function list() {
            return Restangular.all('solicitud').customGET();
        }
    }
})();
