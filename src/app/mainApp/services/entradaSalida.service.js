/**
 * Created by Emmanuel on 24/08/2016.
 */
(function(){

    'use strict';

    angular
        .module('app.mainApp')
        .factory('EntradaSalida',EntradaSalida);

    function EntradaSalida($q, Restangular, toastr){
        var baseURL=Restangular.all('entrada_salida');
        return {
            postEntrada:postEntrada,
            postEntradaMasiva:postEntradaMasiva,
            postSalidaMasiva:postSalidaMasiva,
            getLastEntradaByCabinet:getLastEntradaByCabinet,
            byUdn:byUdn
        };
        function getLastEntradaByCabinet(idCabinet) {
            return baseURL.one('cabinet').customGET(idCabinet);
        }

        //entrada_salida
        function postEntrada(data){
            var defer= $q.defer();
            baseURL.withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined}).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
                console.log(err);
            });
            return defer.promise;
        }

        //entrada_salida/mass_upload
        function postEntradaMasiva(data){
            var defer= $q.defer();
            baseURL.all('mass_upload').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined}).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            return defer.promise;
        }
        function postSalidaMasiva(data) {
            return baseURL.all('mass_exit').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined});
        }

        function byUdn(id){
           return baseURL.one('udn',id).getList().$object;
        }
    }
})();
