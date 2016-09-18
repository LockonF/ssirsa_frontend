/**
 * Created by Luis_Olvera on 23/08/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Persona_Admin',Persona_Admin);

    function Persona_Admin($q, Restangular){
        var baseModelo = Restangular.all('persona_admin');

        return {
            list:list,
            update:update,
            create:create,
            createObject:createObject,
            get:get,
            deleteData: remove
        };
        function createObject(data){
            var form_data = new FormData();

            form_data.append('user',angular.toJson(data.user));
            form_data.append('nombre',data.nombre);
            form_data.append('apellido_paterno',data.apellido_paterno);
            form_data.append('apellido_materno',data.apellido_materno);
            form_data.append('direccion',data.direccion);
            form_data.append('telefono',data.telefono);
            form_data.append('ife',data.ife);
            form_data.append('foto',data.foto);
            if(data.udn != undefined)
                form_data.append('udn',data.udn);


            var defer= $q.defer();
            Restangular.all('persona_admin').withHttpConfig({transformRequest: angular.identity}).customPOST(form_data,"",{},{'Content-Type':undefined}).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            return defer.promise;
        }
        function get(id) {
            return baseModelo.get(id);
        }
        function list(){
            return baseModelo.getList().$object;
        }

        function update(object)
        {
            return baseModelo.all(object.id).customPUT(object);
        }

        function create(object){
            return baseModelo.post(object);
        }

        function remove(object)  {
            return baseModelo.customDELETE(object.id,null,{'content-type':'application/json'});
        }


    }
})();
