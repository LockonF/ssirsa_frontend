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
            getPersona:getPersona,           
            getRole:getRole
        };

        function getPersona(){
            return Restangular.all('persona').customGET().then(function(res){
                return res;
            }).catch(function(err) {
                console.log(err);
            });
        }

        function getRole(){
            return Restangular.all('my_groups').customGET().then(function(res){
                return res;
            }).catch(function(err){
                console.log(err);
            });
        }

    }
})();