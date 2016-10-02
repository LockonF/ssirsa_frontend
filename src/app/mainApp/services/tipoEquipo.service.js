/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('TipEquipo',TipEquipo);

    function TipEquipo(Restangular){
        var baseURL=Restangular.all('tipo_equipo');
         return {
            list: list,
            put: put,
            post: post,
            remove: remove
        };



        function list(){
            return baseURL.getList().$object;
        }

        function put(object){
            return baseURL.all(object.id).customPUT(object);
        }

        function post(object){
            return baseURL.post(object);
        }

        function remove(object){
            return baseURL.customDELETE(object.id);
        }

    }

})();
