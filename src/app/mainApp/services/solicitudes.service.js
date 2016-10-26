/**
 * Created by Luis Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitudes',Solicitudes);

    function Solicitudes($q, Restangular){
        return{
            create:create,
            list:list,
            modify:modify,
            consultaEsp:consultaEsp
        };

        function create(object){
            var deferred=$q.defer();

            Restangular.all('solicitud').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud').customGET();
        }

        function modify(object){
            var deferred=$q.defer();//Genera la promesa
            Restangular.one('solicitud',object.id).customPUT(object).then(function(resp){
                deferred.resolve(resp);
            }).catch(function(error){
                deferred.reject(error);
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
            }
            return Restangular.one('solicitud', tipoConsulta).customGET();
        }

    }
})();
