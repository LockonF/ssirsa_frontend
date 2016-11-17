/**
 * Created by franciscojaviercerdamartinez on 04/11/16.
 */


(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('PuntoVentaController', PuntoVentaController);

    function PuntoVentaController(Cabinet, Helper, Servicios,PuntoDeVenta, MarcaCabinet, $mdDialog, $scope, Translate, toastr) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables
        $scope.form = {};
        vm.etapa = {};
        vm.tiposTrabajo = [
            {value: 'Mayor'},
            {value: 'Medio'},
            {value: 'Menor'},
            {value: 'Cambio de Equipo'},
            {value: 'Otro'}

        ]

        vm.showInsumosSection = true;
        vm.catalogoInsumos = null;//array con todos los caatalogos de insumo disponibles de la etapa
        vm.catalogoSelected = {};//Elemento del tipo Catalogo de Insumo del insumo que se deseará agregar
        vm.editable = true;
        vm.showInsumo = false;
        vm.insumosToArray = [];
        vm.cabinet = null;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.cabinetid = null;
        vm.insumo = {
            id: "",
            nombre: "",
            cantidad: "",
            catalogo: "",
            notas: ""
        };
        vm.insumos_lote = [];// Arreglo que posera los Insumos de Lote que serán utilizados en la etapa de servicio
        vm.insumoLote = {};
        vm.insumos_loteUsados = [];//Arreglo que ya posee el arreglo como es necesario para agregar los insumos al formato de arreglo para agregarlos a la etapa
        vm.insumos_sinStock = [];
        vm.puntoVenta = {};

        //Declaracion de Funciones


        vm.crearPuntodeVenta = crearPuntodeVenta; //Crea una nueva etapa de servicio
        vm.cancel = cancel;//Limpiar campos
        vm.eliminarEtapaServicio = eliminarEtapaServicio;//
        vm.editar = editar;
        vm.getInsumosLote = getInsumosLote;
        vm.crearInsumo = crearInsumo;
        vm.AddInsumoArray = AddInsumoArray;
        vm.DeleteInsumoArray = DeleteInsumoArray;
        vm.filterModels = filterModels;


        // Funciones


        function buscaPuntoDeVenta(){
            if (vm.etapas!=null){
                vm.etapa=_.findWhere(vm.etapas, {nombre: 'E7'});
            }
            console.log(vm.etapa);
        }

        function editar() {
            vm.editable = !vm.editable;
        }


        function filterModels() {
            if (vm.marca != null) {
                console.log("Entre a Buscar Modelos")
                vm.modelos = MarcaCabinet.getModels(vm.marca).then(function (res) {
                    if (res.length > 0) {
                        vm.modelos = Helper.filterDeleted(res, true);
                    }
                }).catch(function () {
                    vm.modelos = [];
                });
            }
        }

        //Funcion Activate al iniciar la vista
        function activate() {
            vm.marca = null;
            MarcaCabinet.listObject().then(function (res) {
                vm.marcas = Helper.filterDeleted(res, true);
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
                vm.marcas = [];
            });
            vm.modelos = [];
            vm.modelo={};
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.notInsumos = Translate.translate('MAIN.MSG.ERROR_NOTINSUMOSTITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput = Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.notAllow = Translate.translate('MAIN.MSG.NOT_ALLOWED');
            vm.confirmDelete = Translate.translate('ETAPA_SERVICIO.ARE_U_SURE');
            vm.delete = Translate.translate('ETAPA_SERVICIO.DELETE');
            vm.cancelar = Translate.translate('ETAPA_SERVICIO.CANCEL');
            vm.accepted = Translate.translate('ETAPA_SERVICIO.ACCEPT');
            vm.dialogTitle = Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage = Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.dialogMessage = Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.notStepsMessage = Translate.translate('MAIN.DIALOG.NOT_STEPS');
            vm.cabinetDeleted = Translate.translate('MAIN.MSG.ERROR_DISABLED_CABINET');
            vm.errorNotInsumos = Translate.translate('MAIN.MSG.NOT_INSUMOS');
            vm.errorNotpuntoVenta = Translate.translate('MAIN.MSG.NOT_STEPCREATED');
            vm.successAddInsumo = Translate.translate('MAIN.MSG.INSUMOADDED');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.messageNotEntrada = Translate.translate('MAIN.MSG.MSGNOTENTRADA');
            vm.messageNotTipoEquipo = Translate.translate('MAIN.MSG.NOTTIPOEQUIPO');

        }


        function eliminaNoSeleccionados() {

            var paraAgregar = _.where(vm.insumos_loteUsados, {agregar: true});
            vm.puntoVenta.insumos_lote = paraAgregar;

        }


        function getInsumosLote() {
            vm.insumos_loteUsados=[];
            buscaPuntoDeVenta();
            console.log(vm.modelo);
            console.log(vm.modelo.tipo);

            var data = {
                idTipo: '',
                idEtapa: ''
            };
            data.idTipo = vm.modelo.tipo;
            data.idEtapa = vm.etapa.id;
            if (data.idTipo) {

            }
            else {

                notifyError(407);
            }
            console.log(data);
            var promise = Servicios.BusquedaCatalogoTypeStep(data);
            promise.then(function (res) {
                vm.insumosLote = res;
                console.log("Insumos lote obtenidos");
                console.log(vm.insumosLote);
                transformArrayCatalogoInsumos();
            }).catch(function (res) {
                notifyError(res.status);
            })
        }

        //function filter para determinar las cantidades adecuadas del catalogo insumos porq endpoint regresa los valores para todos los tipo de equipo

        function filterInsumosLotebyType(tipos_equipo) {
            var elemento;
            elemento = _.findWhere(tipos_equipo, {tipo_equipo: vm.modelo.tipo});
            console.log(elemento);
            return elemento;

        }

        function transformArrayCatalogoInsumos() {
            var elemento;
            vm.insumosLote.forEach(function (insulote, index) {


                vm.insumoLote.catalogo_insumos = insulote.id;
                elemento = filterInsumosLotebyType(insulote.tipos_equipo);

                vm.insumoLote.cantidad = elemento.cantidad;

                vm.insumoLote.nombre = insulote.descripcion;
                vm.insumoLote.notas = elemento.descripcion;
                vm.insumoLote.agregar = false;
                if (insulote.cantidad >= vm.insumoLote.cantidad) {
                    vm.insumos_loteUsados.push(vm.insumoLote);
                }
                else {
                    vm.insumos_sinStock.push(vm.insumoLote);
                }
                vm.insumoLote = null;
                vm.insumoLote = {};
            })
            console.log("Insumos lote obtenidos en array");
            console.log(vm.insumos_loteUsados);
            console.log(vm.insumos_lote.length);
            if (vm.insumos_loteUsados.length == 0) {

                notifyError(998);
            }
        }

        function crearInsumo() {
            if (vm.puntoVenta.insumos_unicos[0].no_serie) {
                vm.puntoVenta.insumos_unicos[0].cantidad = 1;
                vm.crearEtapaServicio();
            }
        }


        function notifyError(status) {
            switch (status) {
                case 400:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    cancel();
                    break;
                case 405:
                    toastr.warning(vm.notAllow, vm.errorTitle);
                    break;
                case 406:
                    toastr.warning(vm.messageNotEntrada, vm.errorTitle);
                    cancel();
                    break;
                case 407:
                    toastr.warning(vm.messageNotTipoEquipo, vm.errorTitle);
                    break;
                case 444:
                    toastr.warning(vm.notAllow, vm.errorNotpuntoVenta);
                    break;
                case 900:
                    toastr.warning(vm.notInsumos, vm.errorMessage);
                    break;
                case 998:
                    toastr.warning(vm.errorMessage, vm.errorNotInsumos);
                    break;
                case 999:
                    toastr.warning(vm.cabinetDeleted, vm.errorMessage);
                    break;
                case 1000:
                    toastr.warning(vm.notFoundMessage, vm.notStepsMessage);
                    break;
                case 1001:
                    toastr.success(vm.successCreateMessage, vm.successAddInsumo);
                    break;
                case 500:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;


            }
        }

        function AddInsumoArray() {
            vm.showInsumo = true;
            if (vm.puntoVenta.insumos_unicos[0].no_serie != null) {
                vm.puntoVenta.insumos_unicos[0].cantidad = 1;
                console.log(vm.puntoVenta.insumos_unicos[0]);
                notifyError(1001);
            }
        }

        function DeleteInsumoArray() {
            vm.puntoVenta.insumos_unicos[0].no_serie = null;
            vm.puntoVenta.insumos_unicos[0].notas = null;
            vm.puntoVenta.insumos_unicos[0].cantidad = null;
            vm.showInsumo = false;
        }


        function cancel() {
            vm.etapa = {
                diagnostico: '',
                validado: false,
                actual_etapa: '',
                siguiente_etapa: ''

            };
            vm.showInsumosSection = true;
            vm.catalogoInsumos = null;//array con todos los caatalogos de insumo disponibles de la etapa
            vm.catalogoSelected = {};//Elemento del tipo Catalogo de Insumo del insumo que se deseará agregar
            vm.editable = true;
            vm.idCabinet = null;
            vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa para md table
            vm.insumosToArray = [];
            vm.cabinet = null;// Informacion general del cabinet al cual se le asignara una nueva etapa
            vm.diagnostico = null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
            vm.etapa = null;
            vm.puntoVenta = null;
            vm.insumo = {
                id: "",
                nombre: "",
                cantidad: "",
                catalogo: "",
                notas: ""
            };// Insumo por agregar al cabinet en cuestion
            //Nuevas VariablesUsadas
            vm.insumos_lote = [];// Arreglo que posera los Insumos de Lote que serán utilizados en la etapa de servicio
            vm.insumoLote = {};
            vm.insumos_loteUsados = [];//Arreglo que ya posee el arreglo como es necesario para agregar los insumos al formato de arreglo para agregarlos a la etapa
            vm.insumos_sinStock = [];
            vm.dataEtapa = null;//Variable que posera los datos de la etapa para el precargado de Template (id etapa, idTipoEquipo)
            $scope.Buscar.$setPristine();
            $scope.Buscar.$setUntouched();
            $scope.sigStep.$setPristine();
            $scope.sigStep.$setUntouched();


        }


        function eliminarEtapaServicio(ev) {
            if (vm.puntoVenta != null) {
                if (vm.puntoVenta.id != null) {

                    var confirm = $mdDialog.confirm()
                        .title(vm.delete)
                        .textContent(vm.confirmDelete)
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok(vm.accepted)
                        .cancel(vm.cancelar);
                    $mdDialog.show(confirm).then(function () {

                        var promise = PuntoDeVenta.remove(vm.puntoVenta);
                        promise.then(function (res) {
                            toastr.success(vm.successDeleteMessage, vm.successTitle);
                            vm.cancel();
                        }).catch(function (res) {
                            notifyError(res.status);
                        })
                    });
                }
                else {
                    notifyError(444);
                }
            }
        }


        function crearEtapaServicio() {
            var puntoVenta;

            vm.puntoVenta.insumos_lote = vm.insumos;
            vm.puntoVenta.modelo=vm.modelo.id;
            vm
            if (vm.puntoVenta.id == null) {

                eliminaNoSeleccionados();

                vm.puntoVenta.insumos_lote = vm.insumos_loteUsados;
                vm.puntoVenta.insumos = vm.insumos;

                var promise = PuntoDeVenta.create(vm.puntoVenta);
                promise.then(function (res) {
                    toastr.success(vm.successTitle, vm.successCreateMessage);
                    vm.puntoVenta = res;
                    vm.cancel();

                }).catch(function (res) {


                    notifyError(res.status);
                });
            }
            else {
                eliminaNoSeleccionados();
                var promise = PuntoDeVenta.modify(vm.puntoVenta);
                promise.then(function (res) {

                    toastr.success(vm.successTitle, vm.successUpdateMessage);
                    vm.puntoVenta = res;
                    vm.cancel();
                }).catch(function (res) {
                    notifyError(res.status);
                });

            }
            vm.cancel();
        }


    }

})();
