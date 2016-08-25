/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular.module('app.mainApp').factory('tipoEquipo',tipoEquipo);
    function tipoEquipo(Restangular){
        return {
            list:list
        };
        function list(){
            return Restangular.all('tipo_equipo').customGET();//prueba
        }
    }
})();