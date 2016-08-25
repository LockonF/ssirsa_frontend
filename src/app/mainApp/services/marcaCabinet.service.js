(function() {
    'use strict';

    angular
        .module('app')
        .factory('MarcaCabinet', MarcaCabinet);

    /* @ngInject */
    function MarcaCabinet($q, Restangular) {
        return {
            get: get
        };


        function get(id) {
            var deferred = $q.defer();
            Restangular.one('marca_cabinet', id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
