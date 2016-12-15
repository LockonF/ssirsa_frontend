/**
 * Created by lockonDaniel on 9/8/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Proveedor',Proveedor);

    function Proveedor(Restangular)
    {
        var baseProveedor = Restangular.all('proveedor');

        var service = {
            list:list,
            listObject:listObject,
            update:update,
            create:create,
            remove:remove
        };
        function listObject() {
            return baseProveedor.getList();
        }

        function list(){
            return baseProveedor.getList().$object;
        }

        function update(object)
        {
            return object.put();
        }

        function create(object){
            return baseProveedor.post(object);
        }

        function remove(object) {
            return baseProveedor.customDELETE(object.id,null,{'content-type':'application/json'});
        }






        return service;
    }

})();
