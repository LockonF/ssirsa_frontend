/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('tecnicoController', tecnicoController);

    function tecnicoController( ) {
        var vm = this;
        vm.tecnicoAVisibility = true;
        vm.tecnicoBVisibility = true;
        vm.tecnicoCVisibility = true;
        vm.tecnicoDVisibility = true;
        vm.tecnicoEVisibility = true;
    }


})();
