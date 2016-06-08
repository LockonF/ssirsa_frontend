/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('profileController',profileController);

    function profileController(){
        var vm = this;
        vm.usuario={
            nombre:'Francisco',
            apellidop:'Cerda',
            apellidom:'Martínez',
            typeuser:'Admin',
            avatar:'boss.jpg',
            fechanac:'07-02-1993'
        };
    }

})();
