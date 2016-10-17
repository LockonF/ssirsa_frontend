/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController(Cabinet, Servicios, $mdDialog, $scope, Insumo, Translate, toastr) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables
        $scope.form = {};
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
        vm.etapaActual = null;
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
        vm.dataEtapa = null;//Variable que posera los datos de la etapa para el precargado de Template (id etapa, idTipoEquipo)
        vm.etapas;//Arreglo de las diferentes etapas que componen el proceso de fabricacion de Cabinets
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


        // Funciones

        function editar() {
            vm.editable = !vm.editable;
        }

        function getEtapasList() {
            var promise = Servicios.etapaList();
            promise.then(function (res) {
                vm.etapas = res;
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
            getEtapasList();

        }


        function buscar() {
            if (vm.idCabinet != null) {
                var promise = Cabinet.get(vm.idCabinet);
                promise.then(function (res) {
                    vm.cabinet = res;
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
                                promise = Servicios.consultarAllInsumosCabinetEtapa(vm.etapaActual);
                                promise.then(function (res) {

                                    vm.insumos = res;
                                    getInsumosLote();


                                }).catch(function (res) {
                                    notifyError(res.status);
                                });
                                vm.insumos = vm.etapaActual.insumos;

                                if ((vm.etapaActual.actual_etapa == 'EC') || (vm.etapaActual.actual_etapa == 'ED') || (vm.etapaActual.actual_etapa == 'EO')) {

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
                                vm.etapaActual.insumos = null;
                            }


                        }).catch(function (res) {
                            notifyError(res.status);
                        })
                    }).catch(function (res) {
                        notifyError(res.status);
                    })
                }).catch(function (res) {
                    notifyError(res.status);
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
            data.idEtapa = vm.etapaActual.actual_etapa;
            var promise = Servicios.BusquedaCatalogoTypeStep(data);
            promise.then(function (res) {
                vm.insumosLote = res;
                transformArrayCatalogoInsumos();
            }).catch(function (res) {
                notifyError(res.status);
            })


        }

        function transformArrayCatalogoInsumos() {
            vm.insumosLote.forEach(function (insulote, index) {


                vm.insumoLote.id = insulote.id;
                vm.insumoLote.cantidad = insulote.tipos_equipo[0].cantidad;
                vm.insumoLote.nombre = insulote.descripcion;
                vm.insumoLote.notas = insulote.tipos_equipo[0].cantidad;

                vm.insumos_loteUsados.push(vm.insumoLote);
                vm.insumoLote = null;
                vm.insumoLote = {};
            })
        }

        function selectInsumo(insumotmp) {


            var insumoAUsar = null;
            if (insumotmp != null) {

                if (vm.catalogoSelected.tipo = "U") {

                    insumoAUsar = _.findWhere(insumotmp, {"usado": false});
                }
                if (vm.catalogoSelected.tipo = "L") {

                    insumoAUsar = _.findWhere(insumotmp, {"usado": true});
                }

                vm.insumo.id = insumoAUsar.id;
                vm.insumo.catalogo = insumoAUsar.catalogo;
                vm.insumo.nombre = vm.catalogoSelected.descripcion;

                add();


            }

        }


        function notifyError(status) {
            switch (status) {
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    break;
                case 405:
                    toastr.warning(vm.notAllow, vm.errorTitle);
                    break;
                case 900:
                    toastr.warning(vm.notInsumos, vm.errorMessage);
                    break;
                case 1000:
                    toastr.warning(vm.notFoundMessage, vm.notStepsMessage);
                    break;
                case 500:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;


            }
        }


        function getInsumos() {
            var promise = Servicios.consultarInsumosEtapa(vm.diagnostico);
            promise.then(function (res) {
            });
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
            vm.etapaActual = null;
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
            vm.dataEtapa = null;//Variable que posera los datos de la etapa para el precargado de Template (id etapa, idTipoEquipo)
            $scope.insumoFormEtapa.$setPristine();
            $scope.insumoFormEtapa.$setUntouched();


        }


        function eliminarEtapaServicio(ev) {
            if (vm.etapaActual != null) {

                var confirm = $mdDialog.confirm()
                    .title(vm.delete)
                    .textContent(vm.confirmDelete)
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok(vm.accepted)
                    .cancel(vm.cancelar);
                $mdDialog.show(confirm).then(function () {

                    var promise = Servicios.eliminarEtapaServicio(vm.etapaActual);
                    promise.then(function (res) {
                        vm.diagnostico = res;
                        vm.cancel();
                    }).catch(function (res) {
                        notifyError(res.status);
                    })
                });
            }
        }

        function crearEtapaServicio() {
            vm.etapaActual.insumos = vm.insumos;
            vm.etapaActual.diagnostico = vm.diagnostico.id;


            if (vm.etapaActual.id == null) {
                vm.etapaActual.insumos_lote=vm.insumos_loteUsados;
                vm.etapaActual.insumos = vm.insumos;

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

                var promise = Servicios.editarEtapaServicio(vm.etapaActual);
                promise.then(function (res) {

                    toastr.success(vm.successTitle, vm.successUpdateMessage);
                    vm.etapaActual = res;
                    vm.cancel();
                }).catch(function (res) {
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
            $scope.form.insumoFormEtapa.$setPristine();
            $scope.form.insumoFormEtapa.$setUntouched();


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
            $scope.form.insumoFormEtapa.$setPristine();
            $scope.form.insumoFormEtapa.$setUntouched();


        }

        function editCatalogoInsumo(insu) {
            var newCatalogoInsumo = {
                id:null,
                descripcion:'',
                cantidad:0,
                notas:''
            };
            vm.catalogoSelected={
                id:'',
                descripcion:'',
                tipos_equipo:[{
                    cantidad:'',
                    descripcion:''
                }]
            }
            if (insu != null) {
                console.log("voy a editar");
                console.log(insu);

                vm.catalogoSelected.id = insu.id;
                vm.catalogoSelected.descripcion = insu.nombre;
                vm.catalogoSelected.tipos_equipo[0].cantidad = parseFloat(insu.cantidad);
                vm.catalogoSelected.tipos_equipo[0].descripcion =insu.notas;
                console.log(vm.catalogoSelected);

                newCatalogoInsumo.id = vm.catalogoSelected.id;
                newCatalogoInsumo.nombre = vm.catalogoSelected.descripcion;
                newCatalogoInsumo.cantidad = parseFloat(vm.catalogoSelected.tipos_equipo[0].cantidad);
                newCatalogoInsumo.notas = vm.catalogoSelected.tipos_equipo[0].descripcion;
            }
            else
                notifyError(404);
            vm.catalogoSelected = null;
            vm.insumo = null;
            $scope.form.insumoFormEtapa.$setPristine();
            $scope.form.insumoFormEtapa.$setUntouched();


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


    }

})();
