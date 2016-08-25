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
            modify:modify
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

        function modify(object){
            return Restangular.one('solicitud_servicio',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;

            }).catch(function(err){
                console.log(err);
            })
        }

    }
})();