(function() {
    'use strict';

    angular
        .module('app')
        .factory('EntradaSalida', EntradaSalida);

    /* @ngInject */
    function EntradaSalida($q, Restangular) {
        return {
            getLastEntradaByCabinet: getLastEntradaByCabinet
        };


        function getLastEntradaByCabinet(request) {
            var deferred = $q.defer();
            Restangular.all('entrada_salida').one('cabinet',request).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
