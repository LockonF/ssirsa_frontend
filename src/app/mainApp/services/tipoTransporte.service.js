/**
 * Created by lockonDaniel on 9/8/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('TipoTransporte',TipoTransporte);

    function TipoTransporte(Restangular)
    {
        var baseTipoTransporte = Restangular.all('tipo_transporte');

        var service = {
            list:list,
            update:update,
            create:create,
            remove:remove
        };


        function list(){
            return baseTipoTransporte.getList().$object;
        }

        function update(object)
        {
            return object.put();
        }

        function create(object){
            return baseTipoTransporte.post(object);
        }

        function remove(object) {
            return object.remove();
        }






        return service;
    }

})();