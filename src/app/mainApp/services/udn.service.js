/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular.module('app.mainApp').factory('udn',udn);
    function udn(Restangular){

        var baseUdn = Restangular.all('udn');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove
        };
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
