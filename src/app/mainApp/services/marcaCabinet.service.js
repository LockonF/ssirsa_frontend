(function() {
    'use strict';

    angular
        .module('app')
        .factory('MarcaCabinet', MarcaCabinet);

    /* @ngInject */
    function MarcaCabinet($q, Restangular, toastr) {
        var baseMarca = Restangular.all('marca_cabinet');

        return {
            list:list,
            update:update,
            remove:remove,
            get: get,
            create:create,
            getModels:getModels,
            listPromise:listPromise
        };
        function get(id) {
            return baseMarca.get(id);
        }

        function listPromise() {
            return baseMarca.getList();
        }

        function list(){
            return baseMarca.getList().$object;
        }

        function update(object)
        {
            return baseMarca.all(object.id).customPUT(object);
        }

        function create(object){
            return baseMarca.post(object);
        }

        function remove(object) {
            return baseMarca.customDELETE(object.id,null,{'content-type':'application/json'});
        }

        function getModels(id){
            return baseMarca.one('models',id).getList().$object;
        }

    }

})();
