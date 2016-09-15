/**
 * Created by Luis_Olvera on 23/08/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('Persona',Persona);

    function Persona($q, Restangular,toastr){
        return{
            list:list,
            modify:modify
        };




        function list(){
            return Restangular.all('persona').customGET();
        }

        function modify(object){
            return Restangular.one('persona',object.id).customPUT(object).then(function(resp){
                console.log(resp);
                return resp;
            }).catch(function(err){
                console.log(err);
            })
        }


    }
})();