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
            list:list
        };
        function create(object){
            //Forma canonica
            var deferred=$q.defer();//Genera la promesa
            //RestAngular
            //all solo agrega una /

            Restangular.all('solicitud').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            //Restangular.all('solicitud').customPOST(object) - Es una promesa
            return deferred.promise;
        }

        function list(){
            return Restangular.all('solicitud').customGET;
        }
    }
})();