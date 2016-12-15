/**
 * Created by Adan on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('salidaListadoController', salidaListadoController)
        .filter('moment', momentFecha) ;

    function salidaListadoController($http,CabinetEntradaSalida, EntradaSalida,$mdDialog,Sucursal, udn, Helper, toastr, Translate,TipoTransporte, LineaTransporte) {
        var vm = this;
        vm.selectedSalida = selectedSalida;
        vm.generarRemision = generarRemision;
        vm.selectedItemChange=selectedItemChange;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.remove=remove;
        vm.selectedCabinets=[];
        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};
        vm.searchText = '';
        activate();
        function sortByDate(array) {
            return _.sortBy(array, function(o) { var dt = new Date(o.fecha); return -dt; })
        }


        function activate() {
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.successRemission = Translate.translate('MAIN.MSG.SUCCESS_REMISSION');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE_CABINETS');
            vm.successDelete=Translate.translate('OUTPUT_LIST.FORM.DIALOG.DELETED_CABIENTS');

            getOutput();
            LineaTransporte.listObject().then(function (res) {
                vm.lineasTransporte = Helper.filterDeleted(res, true);
                vm.lineasTransporte = _.sortBy(vm.lineasTransporte, 'razon_social');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            TipoTransporte.listObject().then(function (res) {
                vm.tiposTransporte = Helper.filterDeleted(res, true);
                vm.tiposTransporte = _.sortBy(vm.tiposTransporte, 'descripcion');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            Sucursal.listObject().then(function (res) {
                vm.Sucursales = Helper.filterDeleted(res, true);
                vm.Sucursales = _.sortBy(vm.Sucursales, 'nombre');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });

            udn.listObject().then(function (res) {
                vm.udns = Helper.filterDeleted(res, true);
                vm.udns = _.sortBy(vm.udns, 'agencia');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });


        }
        function remove(ev) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                var request={
                    cabinet_entrada_salida:vm.selectedCabinets
                };
                CabinetEntradaSalida.restore(request).then(function (res) {
                    if(vm.selectedCabinets.length==1){
                        getOutput();
                        vm.selectedSalidaList =null;
                    }

                    vm.selectedCabinets=[];
                    selectedItemChange(vm.selectedSalidaList);

                    toastr.success(vm.successDelete,vm.successTitle);
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });
        }
        function selectedSalida(item) {
            vm.selectedSalidaList = item;
            EntradaSalida.getCabinetsEntradaSalida(vm.selectedSalidaList.id).then(function (res) {
                vm.cabinets=res;
                _.each(vm.cabinets, function(element, index) {
                    _.extend(element, {id: element.id.toString()});
                });
            });
        }
        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.selectedSalidaList = angular.copy(item);
                EntradaSalida.getCabinetsEntradaSalida(vm.selectedSalidaList.id).then(function (res) {
                    vm.cabinets=res;
                });

            }else{
               // cancel();
            }
        }
        function generarRemision() {


            $http.get('app/mainApp/tecnico/salida/lista/formato.json').success(function (col) {
                EntradaSalida.getRemision(vm.selectedSalidaList.id).then(function (res) {
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
                    pdfMake.createPdf(col).download("Remision-Folio-" + vm.selectedSalidaList.id.toString() + ".pdf");
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });

            });
        }

        function getOutput() {
            EntradaSalida.getSalidas().then(function (res) {
                vm.salidas = res;
                vm.salidas = sortByDate(vm.salidas);
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function querySearch(query) {
            return query ? lookup(query) : vm.salidas;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.salidas, function (item) {
                return item.id.toString().toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }
    }

    function momentFecha() {
        return function (dateString, format) {
            return moment(dateString).format(format);
        }
    }

})();
