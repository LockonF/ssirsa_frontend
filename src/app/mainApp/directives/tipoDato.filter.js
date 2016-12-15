/**
 * Created by amezc on 09/11/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .filter('tipoDato',tipoDato);

    function tipoDato(OPTIONS){
        return function(input) {
            input = input || '';
            var res= _.findWhere(OPTIONS.types,{id:input});
            if(res!=null && res!= undefined){
                return res.text;
            }else {
                return input;
            }
        };
    }
})();
