/**
 * Created by amezc on 09/11/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .filter('titleCase',titleCase);

    function titleCase(){
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    }
})();
