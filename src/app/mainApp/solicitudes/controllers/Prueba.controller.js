/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('Prueba',buscarSolicitudController);

    function buscarSolicitudController(){
        var vm = this;

        vm.desserts = {
            "count": 9,
            "data": [
                {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": { "value": 237.0 },
                    "fat": { "value": 9.0 },
                    "carbs": { "value": 37.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 129.0 },
                    "calcium": { "value": 8.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Eclair",
                    "type": "Pastry",
                    "calories": { "value":  262.0 },
                    "fat": { "value": 16.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value":  6.0 },
                    "sodium": { "value": 337.0 },
                    "calcium": { "value":  6.0 },
                    "iron": { "value": 7.0 }
                }, {
                    "name": "Cupcake",
                    "type": "Pastry",
                    "calories": { "value":  305.0 },
                    "fat": { "value": 3.7 },
                    "carbs": { "value": 67.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 413.0 },
                    "calcium": { "value": 3.0 },
                    "iron": { "value": 8.0 }
                }, {
                    "name": "Jelly bean",
                    "type": "Candy",
                    "calories": { "value":  375.0 },
                    "fat": { "value": 0.0 },
                    "carbs": { "value": 94.0 },
                    "protein": { "value": 0.0 },
                    "sodium": { "value": 50.0 },
                    "calcium": { "value": 0.0 },
                    "iron": { "value": 0.0 }
                }, {
                    "name": "Lollipop",
                    "type": "Candy",
                    "calories": { "value": 392.0 },
                    "fat": { "value": 0.2 },
                    "carbs": { "value": 98.0 },
                    "protein": { "value": 0.0 },
                    "sodium": { "value": 38.0 },
                    "calcium": { "value": 0.0 },
                    "iron": { "value": 2.0 }
                }, {
                    "name": "Honeycomb",
                    "type": "Other",
                    "calories": { "value": 408.0 },
                    "fat": { "value": 3.2 },
                    "carbs": { "value": 87.0 },
                    "protein": { "value": 6.5 },
                    "sodium": { "value": 562.0 },
                    "calcium": { "value": 0.0 },
                    "iron": { "value": 45.0 }
                }, {
                    "name": "Donut",
                    "type": "Pastry",
                    "calories": { "value": 452.0 },
                    "fat": { "value": 25.0 },
                    "carbs": { "value": 51.0 },
                    "protein": { "value": 4.9 },
                    "sodium": { "value": 326.0 },
                    "calcium": { "value": 2.0 },
                    "iron": { "value": 22.0 }
                }, {
                    "name": "KitKat",
                    "type": "Candy",
                    "calories": { "value": 518.0 },
                    "fat": { "value": 26.0 },
                    "carbs": { "value": 65.0 },
                    "protein": { "value": 7.0 },
                    "sodium": { "value": 54.0 },
                    "calcium": { "value": 12.0 },
                    "iron": { "value": 6.0 }
                }
            ]
        };

        vm.editComment = function (event, dessert) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    if(input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if(input.$modelValue === 'Bernie Sanders') {
                        return dessert.comment = 'FEEL THE BERN!'
                    }
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a comment',
                validators: {
                    'md-maxlength': 30
                }
            };

            var promise;

            if(vm.options.largeEditDialog) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };


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