/**
 * Created by Luis Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitud_Servicio',Solicitud_Servicio);

    function Solicitud_Servicio($q, Restangular){
        return{
            create:create,
            list:list,
            updateSolicitud:updateSolicitud,
            borrarSolVenta:borrarSolVenta
        };

        function create(object){
            //Forma canonica
            var deferred=$q.defer();
            Restangular.all('solicitud_servicio').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud_servicio').customGET();
        }


        function borrarSolVenta(object){
            return Restangular.one("solicitud_servicio",object).customDELETE(undefined,undefined,{'Content-Type': 'application/json'}).then(function(resp){
                console.log(resp);
                return resp;
            }).catch(function(error){
                console.log(error);
            })
        }

        function updateSolicitud(request) {
            var deferred = $q.defer();
            Restangular.one('solicitud_servicio', request.id).customPUT(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

    }
})();
