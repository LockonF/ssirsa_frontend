/**
 * Created by Emmanuel on 17/07/2016.
 */
/**
 * Modify by Luis Olvera on 19/07/2016.
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
            modify:modify
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
            return Restangular.one('solicitud',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;

            }).catch(function(err){
                console.log(err);
            })
        }

    }
})();