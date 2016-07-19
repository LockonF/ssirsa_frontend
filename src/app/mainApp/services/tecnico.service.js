/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Tecnico',Tecnico);

    function Tecnico($q,Restangular){
        return{
            getRole:getRole
        };

        function getRole(){
            return Restangular.all('my_groups').customGET().then(function(res){
                return res;
            }).catch(function(err){
                console.log(err);
            });
        }
    }
})();