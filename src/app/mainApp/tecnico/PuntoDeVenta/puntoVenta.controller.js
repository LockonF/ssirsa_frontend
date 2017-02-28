/**
 * Created by franciscojaviercerdamartinez on 04/11/16.
 */


(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('PuntoVentaController', PuntoVentaController);

    function PuntoVentaController( Helper, Servicios,PuntoDeVenta, MarcaCabinet, $mdDialog, $scope, Translate, toastr) {
        var vm = this;
        vm.activate = activate();
        //Inicializando Variables
        $scope.form = {};
        vm.reporte={
            fecha:moment().format('YYYY-MM-DD'),
            hora:moment(new Date(),'HH:mm:ss').toDate()

        };
        vm.completed=0;
        vm.servicio={
            fecha:moment().format('YYYY-MM-DD'),
            hora:moment(new Date(),'HH:mm:ss').toDate()

        };
        vm.recepcion={
            hora:moment(new Date(),'HH:mm:ss').toDate()
        };
        vm.etapa = {};
        vm.formato="DD-MM-YYYY";
        vm.tiposTrabajo = [
            {value: 'Mayor'},
            {value: 'Medio'},
            {value: 'Menor'},
            {value: 'Cambio de Equipo'},
            {value: 'Otro'}

        ];

        vm.showInsumosSection = true;
        vm.catalogoInsumos = null;//array con todos los caatalogos de insumo disponibles de la etapa
        vm.catalogoSelected = {};//Elemento del tipo Catalogo de Insumo del insumo que se deseará agregar
        vm.editable = true;
        vm.showInsumo = false;
        vm.insumos=[];
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
        vm.puntoVenta = {insumos:[]};

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
        vm.checkFinished = checkFinished;
        vm.next=next;
        vm.prev=prev;
        vm.validaMax=validaMax;


        // Funciones
        function checkFinished() {
            var completed = 0;
            if (vm.puntoVenta.semana != null )
                completed += 1;
            if (vm.recepcion.hora != null)
                completed += 1;
            if (vm.puntoVenta.km != null )
                completed += 1;
            if (vm.puntoVenta.nombre_establecimiento != null)
                completed += 1;
            if (vm.puntoVenta.direccion != null)
                completed += 1;
            if (vm.reporte.fecha != null)
                completed += 1;
            if (vm.reporte.hora != null )
                completed += 1;
            if (vm.servicio.fecha != null )
                completed += 1;
            if (vm.servicio.hora != null )
                completed += 1;
            if (vm.puntoVenta.activo != null)
                completed += 1;
            if (vm.puntoVenta.serie != null )
                completed += 1;
            if (vm.marca != null )
                completed += 1;
            if (vm.modelo != null )
                completed += 1;
            if (vm.puntoVenta.descripcion_trabajo != null )
                completed += 1;
            if (vm.puntoVenta.observaciones_cliente != null )
                completed += 1;
            if (vm.puntoVenta.observaciones_tecnicas!= null)
                completed += 1;
            completed = (completed / 16) * 100;
            completed = completed.toFixed(0);
            vm.completed=completed;
            return completed;
        }



        function next(){
            $scope.triWizard.nextStep();
            vm.checkFinished();
        }
        function prev(){
            $scope.triWizard.prevStep();
            vm.checkFinished();
        }


        function buscaPuntoDeVenta(){
            if (vm.etapas!=null){
                vm.etapa=_.findWhere(vm.etapas, {nombre: 'E7'});
            }

        }

        function editar() {
            vm.editable = !vm.editable;
        }


        function filterModels() {
            if (vm.marca != null) {

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
            vm.puntoVenta={};
            MarcaCabinet.listObject().then(function (res) {
                vm.marcas = Helper.filterDeleted(res, true);
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
                vm.marcas = [];
            });

            if( vm.puntoVenta.hora_recepcion != null) {
                vm.recepcion.hora=moment(vm.puntoVenta.hora_recepcion,"HH:mm:ss").toDate();
            }

            if( vm.puntoVenta.fecha_reporte != null) {
                vm.reporte.fecha=moment(vm.puntoVenta.fecha_reporte,"YYYY-MM-DD").toDate();
                vm.reporte.hora=moment(vm.puntoVenta.fecha_reporte,"HH:mm:ss").toDate();
            }

            if( vm.puntoVenta.fecha_servicio != null) {
                vm.servicio.fecha=moment(vm.puntoVenta.fecha_servicio,"YYYY-MM-DD").toDate();
                vm.servicio.hora=moment(vm.puntoVenta.fecha_servicio,"HH:mm:ss").toDate();
            }
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
            vm.puntoVenta.insumos_lote =  _.where(vm.insumos_loteUsados, {agregar: true});
        }


        function getInsumosLote() {
            vm.insumos_loteUsados=[];
            buscaPuntoDeVenta();
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

            var promise = Servicios.BusquedaCatalogoTypeStep(data);
            promise.then(function (res) {
                vm.insumosLote = res;
                transformArrayCatalogoInsumos();
            }).catch(function (res) {
                // notifyError(res.status);
            })
        }

        //function filter para determinar las cantidades adecuadas del catalogo insumos porq endpoint regresa los valores para todos los tipo de equipo

        function filterInsumosLotebyType(tipos_equipo) {
            return _.findWhere(tipos_equipo, {tipo_equipo: vm.modelo.tipo});
        }

        function transformArrayCatalogoInsumos() {
            var elemento;
            vm.insumosLote.forEach(function (insulote, index) {


                vm.insumoLote.catalogo_insumos = insulote.id;
                elemento = filterInsumosLotebyType(insulote.tipos_equipo);

                vm.insumoLote.cantidad = elemento.cantidad;
                vm.insumoLote.cantidadMax = elemento.cantidad;
                vm.insumoLote.error=false;
                vm.insumoLote.nombre = insulote.descripcion;
                vm.insumoLote.notas = elemento.descripcion;
                vm.insumoLote.agregar = false;
                if (parseFloat(insulote.cantidad) >= parseFloat(vm.insumoLote.cantidad)) {
                    vm.insumos_loteUsados.push(vm.insumoLote);
                }
                else {
                    vm.insumos_sinStock.push(vm.insumoLote);
                }
                vm.insumoLote = null;
                vm.insumoLote = {};
            });
            if (vm.insumos_loteUsados.length == 0) {
                notifyError(998);
            }
        }

        function crearInsumo() {
            if (vm.puntoVenta.insumos[0].no_serie) {
                vm.puntoVenta.insumos[0].cantidad = 1;
                vm.crearEtapaServicio();
            }
        }


        function notifyError(status) {
            switch (status) {
                case 400:
                    toastr.warning(vm.errorMessage, vm.error);
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
            if (vm.puntoVenta.insumos[0].no_serie != null) {
                vm.puntoVenta.insumos[0].cantidad = 1;
                notifyError(1001);
            }
        }

        function DeleteInsumoArray() {
            vm.puntoVenta.insumos[0].no_serie = null;
            vm.puntoVenta.insumos[0].notas = null;
            vm.puntoVenta.insumos[0].cantidad = null;
            vm.showInsumo = false;
        }


        function cancel() {
            vm.reporte={
            };
            vm.servicio={

            };
            vm.recepcion={

            };
            vm.filtradoNoSelected=[];
            vm.etapa = {};
            vm.formato="DD-MM-YYYY";
            vm.tiposTrabajo = [
                {value: 'Mayor'},
                {value: 'Medio'},
                {value: 'Menor'},
                {value: 'Cambio de Equipo'},
                {value: 'Otro'}

            ];
            vm.completed=0;
            vm.marca=null;
            vm.modelo=null;
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
            vm.puntoVenta = {insumos:[]};

            $scope.generalInfo.$setPristine();
            $scope.generalInfo.$setUntouched();
            $scope.localData.$setPristine();
            $scope.localData.$setUntouched();
            $scope.cabinetInfo.$setPristine();
            $scope.cabinetInfo.$setUntouched();
            $scope.observationsData.$setPristine();
            $scope.observationsData.$setUntouched();


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
                        promise.then(function () {
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


        function crearPuntodeVenta() {
            var fecha=null;
            var hora=null;
            var promise=null;

            vm.filtradoNoSelected=_.where(vm.insumos_loteUsados,{agregar:true});

            vm.puntoVenta.insumos_lote =vm.filtradoNoSelected;
            vm.puntoVenta.modelo=vm.modelo.id;
            if (vm.reporte!=null) {
                fecha = moment(vm.reporte.fecha).subtract(1,"day");
                hora = moment(vm.reporte.hora);
                fecha.set({
                    hour: hora.get('hour'),
                    minute: hora.get('minute'),
                    second: hora.get('second'),
                    millisecond: hora.get('millisecond')
                });
                vm.puntoVenta.fecha_reporte = fecha.toISOString();
            }
            if (vm.servicio!=null) {
                fecha = moment(vm.servicio.fecha).subtract(1,"day");
                hora = moment(vm.servicio.hora);
                fecha.set({
                    hour: hora.get('hour'),
                    minute: hora.get('minute'),
                    second: hora.get('second'),
                    millisecond: hora.get('millisecond')
                });
                vm.puntoVenta.fecha_servicio = fecha.toISOString();
            }
            if (vm.recepcion!=null) {
                vm.puntoVenta.hora_recepcion = moment(vm.reporte.hora).format('HH:mm:ss')
            }
            if (vm.puntoVenta.id == null) {

                eliminaNoSeleccionados();
                vm.filtradoNoSelected=_.where(vm.insumos_loteUsados,{agregar:true});
                vm.puntoVenta.insumos_lote = vm.filtradoNoSelected;
                promise = PuntoDeVenta.create(vm.puntoVenta);
                promise.then(function (res) {
                    toastr.success(vm.successTitle, vm.successCreateMessage);
                    vm.puntoVenta = res;
                    vm.cancel();

                }).catch(function (res) {


                    vm.error=res.data.errors[0].message;
                    /// console.log(res.data.errors[0].message);
                    notifyError(res.status);


                });
            }
            else {
                eliminaNoSeleccionados();
                promise = PuntoDeVenta.modify(vm.puntoVenta);
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
        function validaMax(index) {
            if (parseFloat(vm.insumos_loteUsados[index].cantidad) > parseFloat(vm.insumos_loteUsados[index].cantidadMax)){

                vm.insumos_loteUsados[index].agregar = false;
                vm.insumos_loteUsados[index].error = true;

            }
            else{
                vm.insumos_loteUsados[index].error = false;

            }

        }
    }

})();