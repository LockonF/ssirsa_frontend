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
            getLineasTransporte:getLineasTransporte,
            getTiposTransporte:getTiposTransporte,
            getSucursales:getSucursales,
            getProyectos:getProyectos,
            getUDN:getUDN,
            cabinetExist:cabinetExist
        };

        //entrada_salida
        function postEntrada(data){
            var defer= $q.defer();

            Restangular.all('entrada_salida').withHttpConfig({transformRequest: angular.identity}).customPOST(data,"",{},{'Content-type':undefined}).then(function(res){
                defer.resolve(res);
                toastr.success('Entrada registrada correctamente','Éxito');
            }).catch(function(err){
                defer.resolve(err);
                toastr.error('Error al registrar entrada', 'Error');
                console.log(err);
            });
            return defer.promise;
        }

        //linea_transporte
        function getLineasTransporte(){
            var defer=$q.defer();

            Restangular.all('linea_transporte').customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;
        }

        //tipo_transporte
        function getTiposTransporte(){
            var defer=$q.defer();

            Restangular.all('tipo_transporte').customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;
        }

        //sucursal
        function getSucursales(){
            var defer=$q.defer();

            Restangular.all('sucursal').customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;
        }

        //proyecto
        function getProyectos(){
            var defer=$q.defer();

            Restangular.all('proyecto').customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;
        }

        //udn
        function getUDN(){
            var defer=$q.defer();

            Restangular.all('udn').customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });
            return defer.promise;
        }

        //cabinet/id
        function cabinetExist(id){
            var defer=$q.defer();

            Restangular.one('cabinet',id).customGET().then(function(res){
                defer.resolve(res);
            }).catch(function(err){
                defer.resolve(err);
            });

            return defer.promise;
        }

    }

})();