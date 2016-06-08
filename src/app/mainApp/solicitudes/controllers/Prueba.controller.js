/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('Prueba',PruebaController);

    function PruebaController(){
        var vm = this;
        vm.id=0;
        vm.requisito = {
            "id":vm.id,
            "rTipo": null,
            "rEstatus": null,
            "rCantidad": null
        };
        vm.crearRequisito=crearRequisito;
        vm.eliminarRequisito=eliminarRequisito;
        vm.Requisitos = [];

        // Crear requisito

        function crearRequisito() {
            console.log(vm.requisito)
            if (vm.requisito != null) {
                console.log("requisitos antes de agregarlo");
                console.log(vm.Requisitos);
                vm.id=vm.id+1;//ID
                console.log("El id es:"+vm.id);
                vm.Requisitos.id=vm.id;
                vm.Requisitos.push(vm.requisito);
                console.log("requisitos despues de agregarlo");
                console.log(vm.Requisitos);

                vm.requisito = {
                    "id":vm.id,
                    "rTipo": null,
                    "rEstatus": null,
                    "rCantidad": null
                };

                console.log("Los requisitos son:");
                console.log(vm.Requisitos);
            }
        }

        // Eliminar Requisito


        function eliminarRequisito(requisito) {

            vm.requisitocopy=requisito;
            var index=0;

            for (index = 0; index < vm.Requisitos.length; ++index) {

                console.log("El requisito a borrar es:"+vm.requisitocopy.rTipo);
                console.log(vm.Requisitos[index]);
                if (vm.Requisitos[index].id == vm.requisitocopy.id) {

                    console.log(index);
                    //if(vm.Requisitos[index].Descripcion==vm.requisitocopy.Descripcion){
                        console.log("voy a borrar");
                        console.log(vm.Requisitos[index]);
                        vm.Requisitos.splice(index, 1);
                    //
                }
                else{console.log("Aun no lo encuentro")}

            }

        }

        function editarRequisito(requisito) {


        }

    }

})();