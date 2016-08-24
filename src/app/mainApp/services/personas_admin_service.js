/**
 * Created by Luis_Olvera on 23/08/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Persona_Admin',Persona_Admin);

    function Persona_Admin($q, Restangular){
        return{
            create:create,
            list:list,
            modify:modify
        };

        function create(object){
            //Forma canonica
            var deferred=$q.defer();//Genera la promesa
            //RestAngular
            //all solo agrega una /

            Restangular.all('persona_admin').customPOST(object).then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            //Restangular.all('solicitud').customPOST(object) - Es una promesa
            return deferred.promise;
        }

        function list(){
            return Restangular.all('persona_admin').customGET();
        }

        function modify(object){
            return Restangular.one('persona_admin',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;

            }).catch(function(err){
                console.log(err);
            })
        }

    }
})();