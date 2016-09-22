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
            list: list,
            modify: modify,
            create: create,
            remove: remove
        };

        var baseURL=Restangular.all('persona_capturista');

        function list(){
            return baseURL.getList().$object;
        }

        function modify(object){
            return object.put();
        }

        function create(object){
            return baseURL.post(object);
        }

        function remove(object){
            return object.remove();
        }

        return service;
    }

})();