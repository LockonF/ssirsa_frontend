/**
 * Created by Emmanuel on 24/08/2016.
 */
(function () {

    'use strict';

    angular
        .module('app.mainApp')
        .factory('CabinetEntradaSalida', CabinetEntradaSalida);

    function CabinetEntradaSalida( Restangular) {
        var baseURL = Restangular.all('cabinet_entrada_salida');
        return {
            getLastEntradaByCabinet: getLastEntradaByCabinet,
            create:create
        };
        function getLastEntradaByCabinet(idCabinet) {
            return baseURL.one('lastInput').all('cabinet',idCabinet).customGET();
        }
        function create(object){
            return baseURL.post(object);
        }

    }
})();
