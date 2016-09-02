/**
 * Created by Luis_Olvera on 23/08/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Persona_Admin',Persona_Admin);

    function Persona_Admin($q, Restangular,toastr){
        return{
            create:create,
            createObject:createObject,
            list:list,
            modify:modify,
            deleteData:deleteData
        };

        function createObject(data){
            var defer= $q.defer();
            Restangular.all('persona_admin').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':'application/json'}).then(function(res){
                defer.resolve(res);
                toastr.success('Entrada registrada correctamente','Éxito');
            }).catch(function(err){
                defer.resolve(err);
                toastr.error('Error al registrar entrada', 'Error');
                console.log(err);
            });
            return defer.promise;
        }

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

        function deleteData(object){
            return Restangular.one("persona_admin",object.id).customDELETE().then(function(resp){
                console.log(resp);
                return resp;
            }).catch(function(error){
                console.log(error);
            })
        }

    }
})();