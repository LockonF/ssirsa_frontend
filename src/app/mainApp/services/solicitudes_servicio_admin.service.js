/**
 * Created by Luis Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Solicitud_Servicio_Admin',Solicitud_Servicio_Admin);

    function Solicitud_Servicio_Admin($q, Restangular){
        return{
            create:create,
            list:list,
            updateSolicitud:updateSolicitud,
            borrarSolVenta:borrarSolVenta
        };

        function create(object){
            //Forma canonica
            var deferred=$q.defer();
            Restangular.all('solicitud_servicio_admin').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud_servicio_admin').customGET();
        }


        function borrarSolVenta(object){
            return Restangular.one("solicitud_servicio_admin",object).customDELETE(undefined,undefined,{'Content-Type': 'application/json'}).then(function(resp){
                return resp;
            }).catch(function(error){
            })
        }

        function updateSolicitud(request) {
            var deferred = $q.defer();
            Restangular.one('solicitud_servicio_admin', request.id).customPUT(request).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

    }
})();
