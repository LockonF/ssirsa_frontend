(function() {
    'use strict';

    angular
        .module('app')
        .factory('ModeloCabinet', ModeloCabinet);

    /* @ngInject */
    function ModeloCabinet( Restangular) {

        var baseModelo = Restangular.all('modelo_cabinet');

        return {
            list:list,
            update:update,
            create:create,
            get:get,
            remove: remove,
            marca:marca
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

        function remove(object) {
            return baseModelo.customDELETE(object.id);
        }

        function marca(id){
            return Restangular.one('modelo_cabinet').one('marca',id).customGET();
        }
    }

})();
