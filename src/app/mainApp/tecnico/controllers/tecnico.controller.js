/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('tecnicoController', tecnicoController);

    function tecnicoController(Tecnico, PersonaLocalService) {
        var vm = this;
        vm.user = {
            name: 'Francisco Javier Cerda Martínez',
            level: 'SU',
            area: 'Todas'
        }
        vm.role = {
            name: "Rol de prueba"
        };
        vm.persona = {
            "id": 1,
            "nombre": "Persona",
            "apellido_paterno": "De",
            "apellido_materno": "Prueba",
            "direccion": "Calle X Número Y",
            "telefono": "12345678",
            "ife": null,
            "foto": null
        };
        activate();

        function activate() {
            loadUser();
            loadRole();
        }

        function loadUser() {
            vm.persona = PersonaLocalService.persona;
        }

        function loadRole() {
            vm.role = PersonaLocalService.role;
        }

        vm.tecnicoAVisibility = true;
        vm.tecnicoBVisibility = true;
        vm.tecnicoCVisibility = true;
        vm.tecnicoDVisibility = true;
        vm.tecnicoEVisibility = true;
    }


})();