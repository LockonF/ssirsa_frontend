/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';//

    angular.module('app.mainApp').factory('udn',udn);
    function udn(Restangular){
        return {
            list:list
        };
        function list(){
            return Restangular.all('udn').customGET();//prueba
        }
    }
})();//funcion que se autollama
/* Forma canonica
(function(){
    'use_strickt';//

    angular.module('app.mainApp').factory('udn',udn);
    function udn(Restangular,$q){
        return {
            list:list
        };
        function list(){
            var deferred=$q.defer();//Genera la promesa
            //RestAngular
            //all solo agrega una /

            Restangular.all('udn').customGET().then(function(rest){
                deferred.resolve(rest);
            }).catch(function(error){
                deferred.reject(error);
            });
            //Restangular.all('solicitud').customPOST(object) - Es una promesa
            return deferred.promise;
        }
    }
})();//funcion que se autollama
    */