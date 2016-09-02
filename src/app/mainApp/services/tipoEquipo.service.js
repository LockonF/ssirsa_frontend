/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';

    angular.module('app.mainApp').factory('modelo_cabinet',modelo_cabinet);
    function modelo_cabinet(Restangular){
        return {
            list:list
        };
        function list(){
            return Restangular.all('modelo_cabinet').customGET();//prueba
        }
    }
})();