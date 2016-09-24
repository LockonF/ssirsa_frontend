/**
 * Created by Emmanuel on 21/09/2016.
 */

(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('PersonaCapturista',PersonaCapturista);

    function PersonaCapturista($q, Restangular){
        var baseModelo=Restangular.all('persona_capturista');

        return{
            list:list,
            modify:modify,
            remove:remove,
            create:create
        };



        function list(){
            return baseModelo.getList().$object;
        }

        function modify(data){


            var form_data = new FormData();

            form_data.append('id',data.id);
            form_data.append('nombre',data.nombre);
            form_data.append('apellido_paterno',data.apellido_paterno);
            form_data.append('apellido_materno',data.apellido_materno);
            form_data.append('direccion',data.direccion);
            form_data.append('telefono',data.telefono);
            if(data.ife!=null)
                form_data.append('ife',data.ife);
            if(data.foto!=null)
                form_data.append('foto',data.foto);


            var defer= $q.defer();
            Restangular.one('persona_capturista',data.id).withHttpConfig({transformRequest: angular.identity}).customPUT(form_data,"",{},{'Content-Type':undefined}).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            return defer.promise;

        }

        function remove(object){
            return baseModelo.customDELETE(object.id,null,{'content-type':'application/json'});
        }

        function create(object){
            return baseModelo.post(object);
        }


    }
})();