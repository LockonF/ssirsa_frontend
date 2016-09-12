/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .factory('Proyectos', Proyectos);

    function Proyectos(Restangular) {
        var service = {
            getAll: getAll,
            put: put,
            post: post,
            remove: remove
        };

        var baseURL=Restangular.all('proyecto');

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