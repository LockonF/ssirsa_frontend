/**
 * Created by Emmanuel on 24/08/2016.
 */
(function () {

    'use strict';

    angular
        .module('app.mainApp')
        .factory('EntradaSalida', EntradaSalida);

    function EntradaSalida($q, Restangular, toastr) {
        var baseURL = Restangular.all('entrada_salida');
        return {
            postEntrada: postEntrada,
            postEntradaMasiva: postEntradaMasiva,
            postSalidaMasiva: postSalidaMasiva,
            getLastEntradaByCabinet: getLastEntradaByCabinet,
            byUdn: byUdn,
            getCabinetsEntrada: getCabinetsEntrada,
            normalizeCabinets:normalizeCabinets,
            getRemision:getRemision,
            getAll:getAll
        };
        function getAll() {
            return baseURL.getList().$object;
        }
        function getRemision(idEntradaSalida) {
            return baseURL.one('remision').customGET(idEntradaSalida);
        }
        function normalizeCabinets(idEntradaSalida) {
            //one('normalize',idEntradaSalida)
            return baseURL.one("normalize",idEntradaSalida).put();

        }
        function getLastEntradaByCabinet(idCabinet) {
            return baseURL.one('cabinet').customGET(idCabinet);
        }

        //entrada_salida
        function postEntrada(data) {
            return baseURL.withHttpConfig({transformRequest: angular.identity}).customPOST(data, "", {}, {'Content-type': undefined});
        }

        //entrada_salida/mass_upload
        function postEntradaMasiva(data) {
            return baseURL.all('mass_upload').withHttpConfig({transformRequest: angular.identity}).customPOST(data, "", {}, {'Content-type': undefined});
        }

        function postSalidaMasiva(data) {
            return baseURL.all('mass_exit').withHttpConfig({transformRequest: angular.identity}).customPOST(data, "", {}, {'Content-type': undefined});
        }

        function byUdn(id) {
            return baseURL.one('udn', id).getList().$object;
        }

        function getCabinetsEntrada() {
            return baseURL.all('cabinet_input').getList();
        }
    }
})();
