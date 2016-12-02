/**
 * Created by amezc on 01/12/2016.
 */

(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('unidad',unidad);
    function unidad(Restangular){

        var baseUdn = Restangular.all('unidad');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove,
            listObject:listObject
        };
        function listObject() {
            return baseUdn.getList();
        }

        function list(){
            return baseUdn.getList().$object;
        }

        function update(object)
        {
            return baseUdn.all(object.id).customPUT(object);
        }

        function create(object){
            return baseUdn.post(object);
        }

        function remove(object) {
            return baseUdn.customDELETE(object.id,null,{'content-type':'application/json'});
        }
    }
})();

