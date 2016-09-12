/**
 * Created by Emmanuel on 12/09/2016.
 */
/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .factory('Clientes', Clientes);

    function Clientes(Restangular) {
        var service = {
            getAll: getAll,
            put: put,
            post: post,
            remove: remove
        };

        var baseURL=Restangular.all('persona_capturista');

        function getAll(){
            return baseURL.getList().$object;
        }

        function put(object){
            return object.put();
        }

        function post(object){
            return baseURL.post(object);
        }

        function remove(object){
            return object.remove();
        }

        return service;
    }

})();