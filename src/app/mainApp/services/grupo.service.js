/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';//

    angular.module('app.mainApp').factory('groups',groups);
    function groups(Restangular){
        return {
            list:list
        };
        function list(){
            return Restangular.all('groups').customGET();//prueba
        }
    }
})();