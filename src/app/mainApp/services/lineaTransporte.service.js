(function() {
    'use strict';

    angular
        .module('app')
        .factory('LineaTransporte', LineaTransporte);

    /* @ngInject */
    function LineaTransporte(Restangular) {

        var baseModelo = Restangular.all('linea_transporte');

        return {
            list:list,
            update:update,
            create:create,
            get:get,
            remove: remove
        };

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
