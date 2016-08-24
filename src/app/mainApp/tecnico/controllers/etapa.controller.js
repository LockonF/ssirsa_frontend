/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController($mdDialog, Servicios, Diagnostico, Translate) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables

        vm.etapa = {
            diagnostico: '',
            validado: false,
            actual_etapa: '',
            siguiente_etapa: ''

        };
        vm.etapaActual = null;
        vm.idCabinet = null;
        vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
        vm.insumosEtapaCabinet = [];//Arreglo de Insumos que posee el cabinet en diche etapa
        vm.cabinet;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.diagnostico; // Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
        vm.insumo = {
            id: "",
            nombre: "",
            cantidad: "",
            notas: ""
        };// Insumo por agregar al cabinet en cuestion
        vm.etapas = [{
            id: '1',
            nombre: 'Etapa 1',
            value: 'E1'
        }, {
            id: '2',
            nombre: 'Etapa 2',
            value: 'E2'
        }, {
            id: '3',
            nombre: 'Etapa 3',
            value: 'E3'
        }, {
            id: '4',
            nombre: 'Etapa 4',
            value: 'E4'
        }, {
            id: '5',
            nombre: 'Etapa 5',
            value: 'E5'
        }, {
            id: '6',
            nombre: 'Etapa Bicicletas (Unica)',
            value: 'E6'
        }
        ];//Arreglo de las diferentes etapas que componen el proceso de fabricacion de Cabinets
        //Declaracion de Funciones
        vm.crearInsumo = crearInsumo;
        vm.eliminarInsumo = eliminarInsumo;
        vm.crearEtapaServicio = crearEtapaServicio; //Crea una nueva etapa de servicio (Listo)
        vm.obtenerEtapaActual = obtenerEtapaActual;
        vm.cancel = cancel;//Limpiar campos (Listo)
        vm.buscar = buscar;//Buscar Cabinet (Listo)
        vm.eliminarEtapaServicio = eliminarEtapaServicio;//Listo
        vm.obtenerEtapaActual = obtenerEtapaActual;
        vm.buscarEtapaServicio = buscarEtapaServicio;//Listo
        vm.getInsumos = getInsumos;
        vm.consultarInsumosEtapa = consultarInsumosEtapa;
        vm.obtenerInformacionCabinet = obtenerInformacionCabinet;
        vm.obteneretapaValidada = obteneretapaValidada;
        vm.obtenerEtapaActual = obtenerEtapaActual;


        // Funciones
        //Funcion Activate al iniciar la vista
        function activate() {
            //mensajes del toastr

            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText = Translate.translate('DIALOGS.WARNING');
            vm.successText = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText = Translate.translate('DIALOGS.FAIL_DELETE');


        }


        function obtenerEtapaActual() {


        }


        function cancel() {
            vm.etapaActual = {};
            vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
            vm.insumosEtapaCabinet = [];//Arreglo de Insumos que posee el cabinet en diche etapa
            vm.cabinet;// Informacion general del cabinet al cual se le asignara una nueva etapa
            vm.diagnostico; // Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
            vm.insumo = {
                id: "",
                nombre: "",
                cantidad: "",
                notas: ""
            };// Insumo por agregar al cabinet en cuestion

        }

        function buscarEtapaServicio() {
            if (vm.etapaActual != null && vm.diagnostico.id != null) {
                var promise = Servicios.consultarEtapaServicioDiagnostico();
                promise.then(function (res) {
                    vm.etapaActual = res;
                });
            }
            else {
                toastr.error("Cabinet no Encontrado", "Error: El cabinet que usted esta buscando no se encuentra registrado.");
            }
        }

        function buscar() {
            if (vm.idCabinet != null) {
                var promise = Diagnostico.lastDiagnosticInput();
                promise.then(function (res) {
                    vm.diagnostico = res;
                });
            }
            else {
                toastr.error("Cabinet no Encontrado", "Error: El cabinet que usted esta buscando no se encuentra registrado.");
            }
        }

        function eliminarEtapaServicio() {
            if (vm.etapaActual != null && vm.etapaActual.validado != true) {
                var promise = Servicios.eliminarEtapaServicio(vm.etapaActual);
                promise.then(function (res) {
                    vm.diagnostico = res;
                });
            }
            else {
                toastr.error("No Es posible eliminar", "El registro que usted pretende afectar no puede ser eliminado");
            }
        }

        function crearEtapaServicio() {
            if (vm.diagnostico.id == null) {
                console.log("Ya voy a crear");
                var promise = Servicios.crearEtapaServicio(vm.etapa);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.etapaActual = res;

                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            else {
                var promise = Servicios.editarEtapaServicio(vm.etapa);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.etapaActual = res;
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });

            }

            //Funcion conocer etapa
            function obtenerEtapaActual() {
                

            }


            function crearInsumo() {

                console.log(vm.insumo)
                if (vm.insumo != null) {
                    console.log("insumos antes de agregarlo");
                    console.log(vm.etapa.insumos);
                    vm.etapa.insumos.push(vm.insumo);
                    console.log("insumos despues de agregarlo");
                    console.log(vm.etapa.insumos);

                    vm.insumo = {
                        id: "",
                        nombre: "",
                        cantidad: 0,
                        notas: ""
                    };

                    console.log("Los insumos son:");
                    console.log(vm.etapa.insumos);
                }
            }

            // Eliminar Insumo


            function eliminarInsumo(insu) {

                vm.insumocopy = insu;
                var index = 0;

                for (index = 0; index < vm.etapa.insumos.length; ++index) {

                    console.log(vm.insumocopy);
                    console.log(vm.etapa.insumos[index]);
                    if (vm.etapa.insumos[index].id == vm.insumocopy.id) {

                        console.log("voy a borrar");
                        console.log(vm.etapa.insumos[index]);
                        vm.etapa.insumos.splice(index, 1);

                    }
                    else {
                        console.log("Aun no lo encuentro")
                    }

                }

            }


        }
    }

})();