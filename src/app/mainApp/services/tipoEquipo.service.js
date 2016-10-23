/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('TipoEquipo',TipoEquipo);

    function TipoEquipo(Restangular){
        var baseURL=Restangular.all('tipo_equipo');
         return {
            list: list,
            update: update,
            create: create,
            remove: remove,
             listWitout:listWitout
        };



        function list(){
            return baseURL.getList().$object;
        }
        function listWitout(){
            return baseURL.getList();
        }

        function update(object){
            return baseURL.all(object.id).customPUT(object);
        }

        function create(object){
            return baseURL.post(object);
        }

        function remove(object){
            return baseURL.customDELETE(object.id,null,{'content-type':'application/json'});
        }

    } 
})();
