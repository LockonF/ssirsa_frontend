/**
 * Created by franciscojaviercerdamartinez on 16/07/16.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Translate', Translate);

    /* @ngInject */
    function Translate($translate,localStorageService) {
        var service ={
            translate:translate
        };

        function translate(key)
        {
            return $translate.instant(key);
        }

        return service;



    }


})();