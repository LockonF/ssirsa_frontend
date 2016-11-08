/**
 * Created by Adan on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('remisionController', remisionController)
        .filter('moment', momentFecha);

    function remisionController($http, EntradaSalida, Helper, toastr, Translate) {
        var vm = this;
        vm.selectedEntrada = selectedEntrada;
        vm.generarRemision = generarRemision;
        activate();
        function sortByDate(array) {
            return _.sortBy(array, function(o) { var dt = new Date(o.fecha); return -dt; })
        }


        function activate() {
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.successRemission = Translate.translate('MAIN.MSG.SUCCESS_REMISSION');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            EntradaSalida.getSalidas().then(function (res) {
                vm.entradas = res;
                vm.entradas = sortByDate(vm.entradas);
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
                    col.content[0].table.body[1][0].stack[2].text = res.udn.agencia + "\n" + res.udn.direccion;//Direccion UDN
                    col.content[0].table.body[1][1].stack[2].text = res.sucursal.nombre + "\n " + res.sucursal.direccion;//Almacen general
                    col.content[0].table.body[2][0].stack[2].text = res.cliente == null ? "No tiene" : res.cliente;//Datos del cliente
                    col.content[0].table.body[2][1].stack[2].text = moment(res.fecha, "YYYY-MM-DD").format("DD-MM-YYYY HH:mm:ss");//Fecha de envio
                    col.content[0].table.body[2][2].stack[2].text = res.id.toString();//Remisión No.
                    col.content[4].table.body[1][4].text = "Sello de recepción " + res.udn.agencia + "\n \n \n \n \n \n \n \n \n \n";  //add cabinets
                    if (res.ife_chofer != null) {
                        col.content[8].columns[0].stack[0].image = "data:image/jpeg;base64," + res.ife_chofer;
                    } else {
                        col.content.splice(8, 1);
                    }
                    if (res.cabinets.length == 0) {
                        col.content[4].table.body.splice(0, 1);
                    }
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

    function momentFecha() {
        return function (dateString, format) {
            return moment(dateString).format(format);
        }
    }
})();
