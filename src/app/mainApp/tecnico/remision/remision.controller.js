/**
 * Created by Adan on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('remisionController', remisionController);

    function remisionController($http, EntradaSalida, Helper, toastr, Translate) {
        var vm = this;
        vm.selectedEntrada = selectedEntrada;
        vm.generarRemision = generarRemision;
        activate();
        function activate() {
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.successRemission = Translate.translate('MAIN.MSG.SUCCESS_REMISSION');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            EntradaSalida.getSalidas().then(function (res) {
                vm.entradas = res;
                vm.entradas = Helper.sortByAttribute(vm.entradas, 'id');
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            })


        }

        function selectedEntrada(item) {
            vm.selectedEntradaList = item;
        }

        function generarRemision() {


            $http.get('app/mainApp/tecnico/remision/formato.json').success(function (col) {
                EntradaSalida.getRemision(vm.selectedEntradaList.id).then(function (res) {
                    col.content[0].table.body[1][0].stack[2].text = res.oficinas_generales;//oficinas generales
                    col.content[0].table.body[1][1].stack[2].text = res.udn.agencia + "\n" + res.udn.direccion;//Direccion UDN
                    col.content[0].table.body[1][2].stack[2].text = res.almacen_general;//Almacen general
                    col.content[0].table.body[2][1].stack[2].text = res.cliente;//Datos del cliente
                    col.content[0].table.body[2][2].stack[2].text = moment(res.fecha, "YYYY-MM-DD").format("DD-MM-YYYY HH:mm:ss");//Fecha de envio
                    col.content[0].table.body[2][3].stack[2].text = res.id;//Remisión No.
                    col.content[4].table.body[1][4].text = "Sello de recepción " + res.udn.agencia + "\n \n \n \n \n \n \n \n \n \n";  //add cabinets
                    res.cabinets.forEach(function (value, index) {
                        var arreglo = [];
                        if (value.diagnostico != null) {
                            var puertas = value.diagnostico.puertas == true ? 'Si' : 'No';
                            arreglo = [index.toString(), value.economico, value.modelo.marca.descripcion, value.no_serie, "", puertas, value.diagnostico.canastillas.toString()];
                        } else {
                            arreglo = [index.toString(), value.economico, value.modelo.marca.descripcion, value.no_serie, " ", "N/A", "N/A"];
                        }
                        col.content[4].table.body.splice(1, 0, arreglo);
                    });
                    toastr.success(vm.successRemission, vm.successTitle);
                    pdfMake.createPdf(col).download("Remision-Folio-" + vm.selectedEntradaList.id.toString() + ".pdf");
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });

            });
        }
    }


})();
