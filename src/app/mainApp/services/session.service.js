(function() {
    'use strict';
    angular
        .module('app')
        .service('Session', Session);
    /* @ngInject */
    function Session() {
        this.create = function ( userInformation, userRole) {
            this.userInformation=userInformation;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.userRole = null;
            this.userInformation=null;
        };
    }
})();
