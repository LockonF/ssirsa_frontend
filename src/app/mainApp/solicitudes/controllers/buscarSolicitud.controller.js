/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('buscarSolicitudController',buscarSolicitudController);

    function buscarSolicitudController(){
        var vm = this;
        vm.flag=0;
        vm.id=null;
        vm.FechaFin=new Date();
        vm.requisito = {
            "id":null,
            "rUDN":null,
            "rFechaIni":null,
            "rFechaFin":null,
            "rDesc":null,
            "rTipo": null,
            "rEstatus": null,
            "rCantidad": null
        };
        vm.solicitud = [
            {
                "id":123,
                "rUDN": "UDN_2",
                "rFechaIni": "6/12/2016",
                "rFechaFin": "7/12/2016",
                "rTipo": "UDN_3",
                "rEstatus": "Dañado",
                "rCantidad": "10"
            },
            {
                "id":124,
                "rUDN": "UDN_2",
                "rFechaIni": "6/12/2016",
                "rFechaFin": "7/12/2016",
                "rTipo": "UDN_1",
                "rEstatus": "Dañado",
                "rCantidad": "1"
            },
            {
                "id":125,
                "rTipo": "UDN_2",
                "rEstatus": "Dañado",
                "rCantidad": "5"
            },
            {
                "id": 126,
                "rUDN": "UDN_2",
                "rFechaIni": "6/12/2016",
                "rFechaFin": "7/12/2016",
                //"rDesc": null,
                "rTipo": "UDN_3",
                "rEstatus": "Dañado",
                "rCantidad": "8"
            }
        ];

        vm.mostrarRequisito=mostrarRequisito;
        vm.eliminarRequisito=eliminarRequisito;
        vm.Requisitos = [];

        function mostrarRequisito() {
            if (vm.flag==0) {
                vm.flag = 1;
                //console.log(vm.flag);
            }
            console.log("Entre al flag: "+vm.flag);
            for(var k in vm.solicitud) {
                console.log("Entre al for ");
                console.log("vm.solicitud[k].id: "+vm.solicitud[k].id);
                console.log("vm.id: "+vm.id);
                console.log("k: "+k);
                if (vm.solicitud[k].id==vm.id)
                {
                    console.log("Entre al if- k: "+k);
                    console.log("vm.solicitud[k].id: "+vm.solicitud[k].id)
                    console.log("vm.solicitud[k].rUDN: "+vm.solicitud[k].rUDN);
                    console.log("vm.solicitud[k].rFechaIni: "+vm.solicitud[k].rFechaIni);
                    console.log("vm.solicitud[k].rFechaFin: "+vm.solicitud[k].rFechaFin);
                    console.log("vm.solicitud[k].rTipo: "+vm.solicitud[k].rTipo);
                    console.log("vm.solicitud[k].rEstatus: "+vm.solicitud[k].rEstatus);
                    vm.requisito = {
                        "id":vm.solicitud[k].id,
                        "rUDN":vm.solicitud[k].rUDN,
                        "rFechaIni":vm.solicitud[k].rFechaIni,
                        "rFechaFin":vm.solicitud[k].rFechaFin,
                        //"rDesc":vm.solicitud[k],
                        "rTipo": vm.solicitud[k].rTipo,
                        "rEstatus": vm.solicitud[k].rEstatus,
                        "rCantidad": vm.solicitud[k].rCantidad
                    };

               // console.log("Objeto: "+vm.requisito);
               // console.log("Tipo: "+vm.requisito.rTipo);
                console.log("el requisito es:"+vm.requisito.id);
                console.log("vm.requisito.id: "+vm.requisito.id)
                console.log("vm.requisito.rUDN: "+vm.requisito.rUDN);
                console.log("vm.requisito.rFechaFin: "+vm.requisito.rFechaFin);
                console.log("vm.requisito.rFechaIni: "+vm.requisito.rFechaIni);
                console.log("vm.requisito.rTipo: "+vm.requisito.rTipo);
                console.log("vm.requisito.rEstatus: "+vm.requisito.rEstatus);
                console.log("requisito:");
                console.log(vm.requisito);
                vm.Requisitos.push(vm.requisito);
                console.log("el arreglo tiene:",vm.Requisitos[0].id);
                console.log(vm.Requisitos);
                }
            }
            /*if (vm.requisito != null) {
                console.log("requisitos antes de agregarlo");
                console.log(vm.Requisitos);
                vm.id=vm.id+1;//ID
                console.log("El id es:"+vm.id);
                //vm.Requisitos.id=vm.id;
                vm.Requisitos.push(vm.requisito);
                console.log("requisitos despues de agregarlo");
                console.log(vm.Requisitos);

                vm.requisito = {
                    "id":vm.id,
                    "rUDN":null,
                    "rFechaIni":new Date(),
                    "rFechaFin":new Date(),
                    "rDesc":null,
                    "rTipo": tipo,
                    "rEstatus": null,
                    "rCantidad": null
                };

                console.log("Los requisitos son:");
                console.log(vm.Requisitos);
            }*/
        }

        // Eliminar Requisito


        function eliminarRequisito(requisito) {

            vm.requisitocopy=requisito;
            var index=0;

            for (index = 0; index < vm.Requisitos.length; ++index) {//Cambiar a un for each

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