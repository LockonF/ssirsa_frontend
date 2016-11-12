/**
 * Created by franciscojaviercerdamartinez on 11/11/16.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .factory('PuntoDeVenta', PuntoDeVenta);

    function PuntoDeVenta(Restangular) {
        var baseURL=Restangular.all('servicio_punto_venta');

        var service = {
            list: list,
            modify: modify,
            create: create,
            remove: remove,
            listObject:listObject
        };

        function listObject() {
            return baseURL.getList();
        }

        function list(){
            return baseURL.getList().$object;
        }

        function modify(object){
            return baseURL.all(object.id).customPUT(object);
        }

        function create(object){
            return baseURL.post(object);
        }

        function remove(object){
            return baseURL.customDELETE(object.id,null,{'content-type':'application/json'});
        }

        return service;
    }

})();
