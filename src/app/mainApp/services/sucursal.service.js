/**
 * Created by Christian on 11/09/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Sucursal',Sucursal);

    function Sucursal(Restangular)
    {
        var baseSucursal = Restangular.all('sucursal');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove,
            listObject:listObject
        };
        function listObject() {
            return baseSucursal.getList();
        }


        function list(){
            return baseSucursal.getList().$object;
        }

        function update(object)
        {
            return baseSucursal.all(object.id).customPUT(object);
        }

        function create(object){
            return baseSucursal.post(object);
        }

        function remove(object) {
            return baseSucursal.customDELETE(object.id,null,{'content-type':'application/json'});
        }
    }

})();
