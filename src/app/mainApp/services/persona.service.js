/**
 * Created by Luis_Olvera on 23/08/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Persona',Persona);

    function Persona($q, Restangular,toastr){
        return{
            list:list,
            modify:modify
        };

        var baseURL=Restangular.all('persona');


        function list(){
            return Restangular.all('persona').customGET();
        }

        function modify(object){


            /*var form_data = new FormData();

            form_data.append('nombre',data.nombre);
            form_data.append('apellido_paterno',data.apellido_paterno);
            form_data.append('apellido_materno',data.apellido_materno);
            form_data.append('direccion',data.direccion);
            form_data.append('telefono',data.telefono);
            form_data.append('ife',data.ife);
            form_data.append('foto',data.foto);

            return Restangular.one('persona',object.id).withHttpConfig({transformRequest: angular.identity}).customPUT(form_data,"",{},{'Content-Type':undefined}).then(function(res){*/
            return Restangular.one('persona',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;
            }).catch(function(err){
                console.log(err);
            })
             //return baseURL.all(object.id).customPUT(object);
            //return object.put();
        }


    }
})();