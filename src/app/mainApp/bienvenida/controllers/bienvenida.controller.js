/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp')
        .controller('bienvenidaController',bienvenidaController);

    function bienvenidaController(PersonaLocalService, toastr){
        var vm = this;
        vm.role={
            id:1,
            name:"Rol de prueba",
            slug:"",
            description:"",
            parent_id:""
        };
        vm.persona={
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

        function activate(){
            loadUser();
            loadRole();
        }

        function loadUser(){
            vm.persona = PersonaLocalService.persona;
        }

        function loadRole(){

        }

    }

})();
