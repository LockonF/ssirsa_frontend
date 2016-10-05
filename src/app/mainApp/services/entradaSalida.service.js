/**
 * Created by Emmanuel on 24/08/2016.
 */
(function(){

    'use strict';

    angular
        .module('app.mainApp')
        .factory('EntradaSalida',EntradaSalida);

    function EntradaSalida($q, Restangular, toastr){

        return {
            postEntrada:postEntrada,
            postEntradaMasiva:postEntradaMasiva,

            cabinetExist:cabinetExist,
            getLastEntradaByCabinet:getLastEntradaByCabinet,
            byUdn:byUdn
        };
        function getLastEntradaByCabinet(idCabinet) {
            var defer=$q.defer();
            Restangular.one('entrada_salida').one('cabinet').customGET(idCabinet).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            return defer.promise;
        }
        //entrada_salida
        function postEntrada(data){
            var defer= $q.defer();
            Restangular.all('entrada_salida').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined}).then(function(res){
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
            Restangular.all('entrada_salida').all('mass_upload').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined}).then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });
            return defer.promise;
        }
 

        //cabinet/id
        function cabinetExist(id){
            var defer=$q.defer();

            Restangular.one('cabinet',id).customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.reject(err);
            });

            return defer.promise;
        }

        function byUdn(id){
           return Restangular.all('entrada_salida').one('udn',id).getList().$object;
        }

    }

})();
