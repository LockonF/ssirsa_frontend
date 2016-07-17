/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Bienvenida',Bienvenida);

    function Bienvenida($q,Restangular){
        return{
            getPersona:getPersona
        };

        function getPersona(){
            return Restangular.all('persona').customGET();
        }
    }
})();