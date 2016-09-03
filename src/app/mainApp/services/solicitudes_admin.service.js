/**
 * Created by Luis_Olvera on 21/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitudes_Admin',Solicitudes_Admin);

    function Solicitudes_Admin(Restangular,$q,toastr) {
        return {
            list: list,
            consultaEsp: consultaEsp,
            create:create,
            borrarSol:borrarSol
        };

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
            return Restangular.one('solicitud_admin', tipoConsulta).customGET();
        }

        function create(object){
            //Forma canonica
            var deferred=$q.defer();//Genera la promesa
            //RestAngular
            //all solo agrega una /

            Restangular.all('solicitud_admin').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
                console.log(error);
            });
            //Restangular.all('solicitud').customPOST(object) - Es una promesa
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud_admin').customGET();
        }

        function borrarSol(object){//solo el id
            console.log(object);//(path,parameters,headers)
            return Restangular.one("solicitud_admin",object).customDELETE(undefined,undefined,{'Content-Type': 'application/json'}).then(function(resp){
                toastr.success('exito al Borrar','exito');
                console.log(resp);
                return resp;
            }).catch(function(error){
                toastr.error('error al Borrar','error');
                console.log(error);
            })
        }
    }
})();