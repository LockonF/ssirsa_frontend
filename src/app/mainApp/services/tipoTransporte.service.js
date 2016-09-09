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
        var service = {
            list:list
        };


        function list(){
            return Restangular.all('tipo_transporte').getList();
        }





        return service;
    }

})();