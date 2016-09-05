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
                console.log(error);
            });
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud').customGET();
        }

        function modify(object){
            return Restangular.one('solicitud',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;

            }).catch(function(err){
                console.log(err);
            })
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