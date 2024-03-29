/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController(Cabinet, Helper, Servicios, $mdDialog, $scope, Insumo, Translate, toastr) {
        var vm = this;

        vm.activate = activate();

        //Inicializando Variables
        $scope.form2 = {};
        vm.etapa = {
            diagnostico: '',
            validado: false,
            actual_etapa: '',
            siguiente_etapa: ''

        };
        vm.disabledBuscar = false;
        vm.diagnosticoEntrada = {}
        vm.showInsumosSection = true;
        vm.catalogoInsumos = null;//array con todos los caatalogos de insumo disponibles de la etapa
        vm.catalogoSelected = {};//Elemento del tipo Catalogo de Insumo del insumo que se deseará agregar
        vm.editable = true;
        vm.showInsumo = false;
        vm.idCabinet = null;
        vm.insumosToArray = [];
        vm.cabinet = null;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.diagnostico = null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
        vm.etapa = null;
        vm.etapaActual = {};
        vm.cabinetid = null;
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
        vm.etapas;//Arreglo de las diferentes etapas que componen el proceso de fabricacion de Cabinets
        vm.firstEtapa = {};
        vm.compresor = {
            no_serie: '',
            notas: '',
            cantidad: 1
        }
        vm.insumoUnicoData=[];
        vm.inputDisabled=false;

        //Declaracion de Funciones


        vm.crearEtapaServicio = crearEtapaServicio; //Crea una nueva etapa de servicio
        vm.cancel = cancel;//Limpiar campos
        vm.buscar = buscar;//Buscar Cabinet
        vm.eliminarEtapaServicio = eliminarEtapaServicio;//
        vm.getInsumos = getInsumos;//
        vm.editar = editar;
        vm.buscarInsumosByCatalogo = buscarInsumosByCatalogo;
        vm.getEtapasList = getEtapasList;
        vm.getInsumosLote = getInsumosLote;
        vm.getModelByCabinet = getModelByCabinet;
        vm.editCatalogoInsumo = editCatalogoInsumo;
        vm.addCatalogoInsumo = addCatalogoInsumo;
        vm.eliminarCatalogoInsumo = eliminarCatalogoInsumo;
        vm.eliminarInsumo = eliminarInsumo;
        vm.showDiagnosticoDialog = showDiagnosticoDialog;
        vm.showPreCheckDialog = showPreCheckDialog;
        vm.eliminarSinModal = eliminarSinModal;
        vm.AddInsumoArray = AddInsumoArray;
        vm.DeleteInsumoArray = DeleteInsumoArray;
        vm.cleanInsumo = cleanInsumo;
        vm.validaMax=validaMax;


        // Funciones

        function editar() {
            vm.editable = !vm.editable;
        }

        function getEtapasList() {
            var promise = Servicios.etapaList();
            promise.then(function (res) {
                //vm.etapas = res;
                vm.etapas = Helper.filterDeleted(res, true);
                if (_.size(vm.etapas) == 0) {
                    notifyError(1000);
                }

            }).catch(function (res) {
                notifyError(res.status);
            });
        }

        //Funcion Activate al iniciar la vista
        function activate() {

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
            vm.errorNotEtapaActual = Translate.translate('MAIN.MSG.NOT_STEPCREATED');
            vm.successAddInsumo = Translate.translate('MAIN.MSG.INSUMOADDED');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.messageNotEntrada = Translate.translate('MAIN.MSG.MSGNOTENTRADA');
            vm.messageNotTipoEquipo = Translate.translate('MAIN.MSG.NOTTIPOEQUIPO');
            vm.errorNotDeleteFirstStep = Translate.translate('MAIN.MSG.NOTFIRSTSTEP')
            getEtapasList();
        }


        function buscar() {

            cancelwithoutId();
            vm.disabledBuscar = true;
            if (vm.idCabinet != null) {
                var promise = Cabinet.get(vm.idCabinet);
                promise.then(function (res) {
                    vm.cabinet = res;
                    if (vm.cabinet.deleted == true) {
                        notifyError(999);
                        vm.cancel();
                    }
                    else {
                        getModelByCabinet();

                        promise = Servicios.getDiagnosticoFromCabinet(vm.idCabinet);
                        promise.then(function (res) {
                            vm.diagnostico = res;

                            promise = Servicios.consultarEtapaServicioDiagnostico(vm.diagnostico);
                            promise.then(function (res) {
                                vm.etapa = res;
                                if (vm.etapa.validado == false) {

                                    vm.etapaActual = vm.etapa;

                                    if (vm.etapaActual.insumos === undefined) {
                                        vm.etapaActual.insumos = [];
                                    }


                                    if ((vm.etapaActual.actual_etapa.nombre == 'EC') || (vm.etapaActual.actual_etapa.nombre == 'ED') || (vm.etapaActual.actual_etapa.nombre == 'EO')) {

                                        vm.showInsumosSection = false;
                                    }
                                    else
                                        vm.showInsumosSection = true;


                                }
                                else {

                                    vm.etapaActual = vm.etapa;
                                    vm.etapaActual.id = null;
                                    vm.etapaActual.actual_etapa = vm.etapa.siguiente_etapa;
                                    vm.etapaActual.siguiente_etapa = null;
                                    vm.etapaActual.validado = true;
                                    vm.etapaActual.insumos = [];

                                }


                                getInsumosLote();
                                vm.etapaActual.validado = true;

                                if (_.findWhere(vm.etapas, {nombre: vm.etapaActual.actual_etapa.nombre}) == undefined) {

                                    vm.etapaActual.actual_etapa = _.findWhere(vm.etapas, {nombre: 'E1'})
                                }
                                if (vm.etapaActual.actual_etapa.nombre == 'E1') {
                                    vm.diagnostico.tipo = 'entrada';
                                    //vm.etapaActual.siguiente_etapa.id = 2;
                                }
                                if (vm.etapaActual.actual_etapa.nombre == 'E4') {
                                    vm.diagnostico.tipo = 'salida';
                                }
                                vm.etapaActual.validado = true;

                            }).catch(function (res) {
                                if (res.status == 404)
                                    notifyError(406);
                                else
                                    notifyError(res.status);

                            })
                        }).catch(function (res) {

                            notifyError(406);

                        })
                    }
                }).catch(function (res) {
                    notifyError(404);
                    vm.cancel();
                });
            }
            else {
                notifyError(404);
            }

        }

        function getModelByCabinet() {
            var promise = Servicios.cabinetByEconomic(vm.cabinet.economico);
            promise.then(function (res) {
                vm.modelo = res;

            }).catch(function (res) {
                notifyError(res.status);
            });
        }

        function eliminaNoSeleccionados() {

            var paraAgregar = _.where(vm.insumos_loteUsados, {agregar: true});
            vm.etapaActual.insumos_lote = paraAgregar;

        }

        function buscarInsumosByCatalogo() {
            vm.insumostmp;

            var promise = Insumo.getInsumosByCatalogo(vm.catalogoSelected.id);
            promise.then(function (res) {
                vm.insumotmp = res;

                selectInsumo(vm.insumotmp)


            }).catch(function (res) {
                notifyError(res.status);
            });

        }


        function getInsumosLote() {

            var data = {
                idTipo: '',
                idEtapa: ''
            };
            data.idTipo = vm.modelo.tipo;
            data.idEtapa = vm.etapaActual.actual_etapa.id;

            if (angular.isUndefined(data.idTipo) || data.idTipo == null) {
                notifyError(407);
                cancel();
            }
            else {
                vm.loadingPromise = Servicios.BusquedaCatalogoTypeStep(data).then(function (res) {
                    //vm.insumosLote = res;
                    vm.insumosLote = Helper.filterDeleted(res, true);
                    vm.insumosLote = Helper.sortByAttribute(vm.insumosLote, 'descripcion');
                    transformArrayCatalogoInsumos();
                    vm.disabledBuscar = false;
                }).catch(function (res) {
                    notifyError(res.status);
                    vm.disabledBuscar = false;
                });
            }
        }

        //function filter para determinar las cantidades adecuadas del catalogo insumos porq endpoint regresa los valores para todos los tipo de equipo

        function filterInsumosLotebyType(tipos_equipo) {
            var elemento;
            elemento = _.findWhere(tipos_equipo, {tipo_equipo: vm.modelo.tipo});
            return elemento;

        }


        function transformArrayCatalogoInsumos() {
            var elemento;
            vm.insumosLote.forEach(function (insulote, index) {


                vm.insumoLote.id = insulote.id;
                elemento = filterInsumosLotebyType(insulote.tipos_equipo);

                vm.insumoLote.cantidad = elemento.cantidad;
                vm.insumoLote.cantidadMax = elemento.cantidad;
                vm.insumoLote.error=false;
                vm.insumoLote.nombre = insulote.descripcion;
                vm.insumoLote.notas = elemento.descripcion;
                vm.insumoLote.agregar = false;
                vm.insumoLote.tipo=insulote.tipo;

                if (parseFloat(insulote.cantidad) >= parseFloat(vm.insumoLote.cantidad)) {
                    if(vm.insumoLote.tipo==='L'||vm.insumoLote.tipo==='l'){
                        vm.insumos_loteUsados.push(vm.insumoLote);

                    }
                    if(vm.insumoLote.tipo==='U'||vm.insumoLote.tipo==='u'){
                       
                        vm.insumoUnicoData[0]=vm.insumoLote;
                    }
                    vm.insumoLote = null;
                    vm.insumoLote = {};
                }
                else {

                    vm.insumos_sinStock.push(vm.insumoLote);
                    vm.insumoLote = null;
                    vm.insumoLote = {};
                }

            })
            if (vm.insumos_loteUsados.length == 0 && vm.insumos_sinStock.lenght == 0) {

                notifyError(998);
            }
        }
        function showDiagnosticoDialog(ev) {
            vm.cabinetid = vm.idCabinet;
            $mdDialog.show({
                controller: 'DiagnosticController',
                templateUrl: 'app/mainApp/tecnico/diagnostic/diagnostic.dialog.tmpl.html',
                controllerAs: 'vm',
                locals: {
                    cabinet: vm.idCabinet
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true,
                focusOnOpen: false,

            }).then(function (answer) {
                //Accepted
                $mdDialog.hide();
            }, function () {
                //Cancelled
                $mdDialog.cancel();
            });
        }

        function showPreCheckDialog(ev) {
            vm.cabinetid = vm.idCabinet;
            if (vm.etapaActual.actual_etapa.nombre == 'E4') {
                vm.diagnostico.tipo = 'salida';
                vm.diagnostico.isSalida = true;
            }
            $mdDialog.show({
                controller: 'checklistController',
                templateUrl: 'app/mainApp/tecnico/checklist/checklist.dialog.tmpl.html',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true,

                locals: {
                    cabinet: vm.idCabinet,
                    diagnosticoEtapa: vm.diagnostico
                }
            }).then(function (answer) {
                //Accepted
                vm.buscar();
                var promise = Servicios.getDiagnosticoFromCabinet(vm.idCabinet);
                promise.then(function (res) {
                    vm.diagnostico = res;
                    vm.buscar();
                });
                $mdDialog.hide();

            }, function () {
                //Cancelled
                vm.buscar();
                $mdDialog.cancel();
            });

        }

        function selectInsumo(insumotmp) {


            var insumoAUsar = null;
            if (insumotmp != null) {

                if (vm.catalogoSelected.tipo = "U") {

                    insumoAUsar = _.findWhere(insumotmp, {"usado": false});
                }
                if (vm.catalogoSelected.tipo = "L") {

                    insumoAUsar = _.findWhere(insumotmp, {"usado": true});
                    vm.insumo.catalogo = catalogoSelected.id;
                }
                vm.insumo.id = insumoAUsar.id;
                vm.insumo.nombre = vm.catalogoSelected.descripcion;
                add();
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
                    toastr.warning(vm.notAllow, vm.errorNotEtapaActual);
                    break;
                case 555:
                    toastr.warning(vm.notAllow, vm.errorNotDeleteFirstStep);
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
            vm.etapaActual.insumos = [];

            vm.etapaActual.insumos.push(vm.compresor);
            vm.etapaActual.insumos[0].no_serie = vm.compresor.no_serie;
            vm.etapaActual.insumos[0].notas = vm.compresor.notas
            vm.etapaActual.insumos[0].cantidad = 1;
            vm.etapaActual.insumos[0].catalogo=vm.insumoUnicoData[0].id;
            vm.etapaActual.insumos[0].agregar=true;

            if (vm.etapaActual.insumos[0].no_serie != null) {


                notifyError(1001);
            }
        }

        function cleanInsumo() {
            vm.compresor = {
                no_serie: '',
                notas: '',
                cantidad: 1
            };
        }

        function DeleteInsumoArray() {
            vm.etapaActual.insumos = null;
            vm.showInsumo = false;
        }

        function getInsumos() {
            var promise = Servicios.consultarInsumosEtapa(vm.diagnostico);
            promise.then(function (res) {
            });
        }

        function cancelwithoutId() {
            vm.inputDisabled=false;
            vm.etapa = {
                diagnostico: '',
                validado: false,
                actual_etapa: '',
                siguiente_etapa: ''

            };
            vm.filtradoNoSelected = [];
            vm.disabledBuscar = false;
            vm.disabledBuscar = false;
            vm.compresor = {
                no_serie: '',
                notas: '',
                cantidad: 1
            };
            vm.showInsumosSection = true;
            vm.catalogoInsumos = null;//array con todos los caatalogos de insumo disponibles de la etapa
            vm.catalogoSelected = {};//Elemento del tipo Catalogo de Insumo del insumo que se deseará agregar
            vm.editable = true;
            vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa para md table
            vm.insumosToArray = [];
            vm.cabinet = null;// Informacion general del cabinet al cual se le asignara una nueva etapa
            vm.diagnostico = null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
            vm.etapa = null;
            vm.etapaActual = {};
            vm.etapaActual.validado = true;
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
            vm.firstEtapa = {};
            vm.showInsumo = false;
            vm.insumoUnicoData=[];
            $scope.form2.Buscar.$setPristine();
            $scope.form2.Buscar.$setUntouched();
            $scope.form2.sigStep.$setPristine();
            $scope.form2.sigStep.$setUntouched();


        }

        function cancel() {
            vm.inputDisabled=false;
            vm.etapa = {
                diagnostico: '',
                validado: false,
                actual_etapa: '',
                siguiente_etapa: ''

            }
            vm.filtradoNoSelected = [];
            vm.showInsumo = false;
            vm.compresor = {
                no_serie: '',
                notas: '',
                cantidad: 1
            };
            vm.disabledBuscar = false
            vm.showInsumosSection = true;
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
            vm.etapaActual = {};
            vm.etapaActual.validado = true;
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
            vm.firstEtapa = {};
            vm.insumoUnicoData=[];
            $scope.form2.Buscar.$setPristine();
            $scope.form2.Buscar.$setUntouched();
            $scope.form2.sigStep.$setPristine();
            $scope.form2.sigStep.$setUntouched();
        }


        function eliminarEtapaServicio(ev) {
            var promise = Servicios.firstStepByDiagnostic(vm.diagnostico);
            promise.then(function (res) {
                vm.firstEtapa = res;
                if (vm.etapaActual.id != vm.firstEtapa.id) {

                    if (vm.etapaActual != null) {
                        if (vm.etapaActual.id != null) {

                            var confirm = $mdDialog.confirm()
                                .title(vm.delete)
                                .textContent(vm.confirmDelete)
                                .ariaLabel('Lucky day')
                                .targetEvent(ev)
                                .ok(vm.accepted)
                                .cancel(vm.cancelar);
                            $mdDialog.show(confirm).then(function () {

                                promise = Servicios.eliminarEtapaServicio(vm.etapaActual);
                                promise.then(function (res) {
                                    vm.diagnostico = res;
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
                else {
                    notifyError(555);
                }
            }).catch(function (res) {
                notifyError(res.status);
            });

        }

        function eliminarSinModal() {
            var promise = Servicios.eliminarEtapaServicio(vm.etapaActual);
            promise.then(function (res) {
                vm.diagnostico = res;
                vm.cancel();
            }).catch(function (res) {
                notifyError(res.status);
            })
        }


        function crearEtapaServicio() {
            var sigetapa, etapaactual;
            vm.etapaActual.diagnostico = vm.diagnostico.id;
            etapaactual = vm.etapaActual.actual_etapa.id;
            sigetapa = vm.etapaActual.siguiente_etapa.id;
            vm.etapaActual.actual_etapa = null;
            vm.etapaActual.siguiente_etapa = null;
            vm.etapaActual.actual_etapa = etapaactual;
            vm.etapaActual.siguiente_etapa = sigetapa;

            if (vm.etapaActual.id == null) {

                eliminaNoSeleccionados();


                vm.filtradoNoSelected = _.where(vm.insumos_loteUsados, {agregar: true});
                vm.etapaActual.insumos_lote = vm.filtradoNoSelected;
                if(vm.etapaActual.insumos==undefined){
                    vm.etapaActual.insumos=[];
                }
                if( vm.etapaActual.insumos.length!=0 && vm.etapaActual.insumos[0].agregar==false){

                    vm.etapaActual.insumos=[];
                }

                var promise = Servicios.crearEtapaServicio(vm.etapaActual);
                promise.then(function (res) {
                    toastr.success(vm.successTitle, vm.successCreateMessage);
                    vm.etapaActual = res;
                    vm.cancel();

                }).catch(function (res) {


                    notifyError(res.status);
                });
            }
            else {
                eliminaNoSeleccionados();
                var promise = Servicios.editarEtapaServicio(vm.etapaActual);
                promise.then(function (res) {

                    toastr.success(vm.successTitle, vm.successUpdateMessage);
                    vm.etapaActual = res;
                    vm.cancel();
                }).catch(function (res) {
                    if(res.status==400){
                        vm.errorMessage=res.data.errors[0].message;// checar condicion de campo de res
                       
                    }
                    notifyError(res.status);
                });

            }
            vm.cancel();
        }

        function add() {
            if (vm.insumo.id != null) {
                var newInsumo = _.clone(vm.insumo);
                newInsumo.insumo = newInsumo.id;
                delete newInsumo['id'];
                delete newInsumo['catalogo'];
                vm.insumos.push(newInsumo);


            }
            else
                notifyError(404);
            vm.catalogoSelected = null;
            vm.insumo = null;


        }

        function addCatalogoInsumo() {
            if (vm.catalogoSelected.id != null) {
                var newCatalogoInsumo = {};
                newCatalogoInsumo.id = vm.catalogoSelected.id;
                newCatalogoInsumo.nombre = vm.catalogoSelected.descripcion;
                newCatalogoInsumo.cantidad = parseFloat(vm.catalogoSelected.tipos_equipo[0].cantidad);
                newCatalogoInsumo.notas = vm.catalogoSelected.tipos_equipo[0].descripcion;
                vm.insumos_loteUsados.push(newCatalogoInsumo);


            }
            else
                notifyError(404);
            vm.catalogoSelected = null;
            vm.insumo = null;


        }


        function editCatalogoInsumo(insu) {
            var newCatalogoInsumo = {
                id: null,
                descripcion: '',
                cantidad: 0,
                notas: ''
            };
            vm.catalogoSelected = {
                id: '',
                descripcion: '',
                tipos_equipo: [{
                    cantidad: '',
                    descripcion: ''
                }]
            }
            if (insu != null) {


                vm.catalogoSelected.id = insu.id;
                vm.catalogoSelected.descripcion = insu.nombre;
                vm.catalogoSelected.tipos_equipo[0].cantidad = parseFloat(insu.cantidad);
                vm.catalogoSelected.tipos_equipo[0].descripcion = insu.notas;


                newCatalogoInsumo.id = vm.catalogoSelected.id;
                newCatalogoInsumo.nombre = vm.catalogoSelected.descripcion;
                newCatalogoInsumo.cantidad = parseFloat(vm.catalogoSelected.tipos_equipo[0].cantidad);
                newCatalogoInsumo.notas = vm.catalogoSelected.tipos_equipo[0].descripcion;
            }
            else
                notifyError(404);
            vm.catalogoSelected = null;
            vm.insumo = null;


        }

        //Dialog de Info de Etapa
        vm.verInfo = function () {
            $mdDialog.show({
                locals: {parent: vm},
                controller: function () {
                    this.parent = vm
                },
                templateUrl: 'app/mainApp/tecnico/etapa/dialogInfoEtapa.tmpl.html',
                parent: angular.element(document.body),
                controllerAs: 'vm',
                clickOutsideToClose: true
            })

        };

        // Eliminar Insumo

        function eliminarInsumo(insu) {
            var index;


            for (index = 0; index < vm.insumos.length; ++index) {
                if (vm.insumos[index].id == insu.id) {
                    vm.insumos.splice(index, 1);
                }
                else {
                    notifyError(404);
                }
            }
        }

        function eliminarCatalogoInsumo(insu) {
            var index;
            for (index = 0; index < vm.insumos_loteUsados.length; ++index) {
                if (vm.insumos_loteUsados[index].id == insu.id) {
                    vm.insumos_loteUsados.splice(index, 1);
                }
                else {
                    notifyError(404);
                }
            }
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
