(function() {
    'use strict';
    angular
        .module('app')
        .service('ReportSelected', ReportSelected);
    /* @ngInject */
    function ReportSelected() {
        this.create = function ( name) {
            this.name=name;
        };
        this.destroy = function () {
            this.name=null;
        };
    }
})();
