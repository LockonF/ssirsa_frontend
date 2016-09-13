/**
 * Created by lockonDaniel on 9/8/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Categoria',Categoria);

    function Categoria(Restangular)
    {
        var baseCategoria = Restangular.all('categoria');

        var service = {
            list:list,
            update:update,
            create:create,
            remove:remove
        };


        function list(){
            return baseCategoria.getList().$object;
        }

        function update(object)
        {
            return object.put();
        }

        function create(object){
            return baseCategoria.post(object);
        }

        function remove(object) {
            return baseCategoria.customDELETE(object.id,null,{'content-type':'application/json'});
        }






        return service;
    }

})();