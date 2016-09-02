/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController( Cabinet, Servicios, Diagnostico, Translate ) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables

        vm.etapa = {
            diagnostico: '',
            validado: false,
            actual_etapa: '',
            siguiente_etapa: ''

        };
        vm.etapaBuscada;
        vm.editable=true;
        vm.idCabinet = null;
        vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
        vm.cabinet=null;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.diagnostico=null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
        vm.insumo = {
            id: "",
            nombre: "",
            cantidad: "",
            notas: ""
        };// Insumo por agregar al cabinet en cuestion
        vm.etapas = [{
            nombre: 'Depuración',
            value: 'E1'
        }, {
            nombre: 'Diagnostico',
            value: 'E2'
        }, {
            nombre: 'Armado y Reparación',
            value: 'E3'
        }, {
            nombre: 'Limpieza',
            value: 'E3.1'
        }, {
            nombre: 'Armado',
            value: 'E3.2'
        }, {
            nombre: 'Vacío y Carga de Gas',
            value: 'E3.3'
        },{
            nombre: 'Terminado',
            value: 'E4'
        },{
            nombre: 'Bodega',
            value: 'E5'
        },{
            nombre: 'Carritos y Bicicletas',
            value: 'E6'
        },{
            nombre: 'Servicio en Punto de Venta',
            value: 'E7'
        },{
            nombre: 'Confinamiento',
            value: 'EC'
        },{
            nombre: 'Destrucción',
            value: 'ED'
        }
        ];//Arreglo de las diferentes etapas que componen el proceso de fabricacion de Cabinets
        //Declaracion de Funciones
        vm.crearInsumo = crearInsumo;
        vm.eliminarInsumo = eliminarInsumo;
        vm.crearEtapaServicio = crearEtapaServicio; //Crea una nueva etapa de servicio
        vm.cancel = cancel;//Limpiar campos
        vm.buscar = buscar;//Buscar Cabinet
        vm.eliminarEtapaServicio = eliminarEtapaServicio;//
        vm.obtenerEtapaActual = obtenerEtapaActual;
        vm.getInsumos = getInsumos;//
        vm.obtenerInformacionCabinet = obtenerInformacionCabinet;//
        vm.editar=editar;
        activate();
        


        // Funciones

        function editar(){
            vm.editable=!vm.editable;
        }
        //Funcion Activate al iniciar la vista
        function activate() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCCESS_LINE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');

        }
        function buscar(){
            if (vm.idCabinet!=null){
                var promise = Cabinet.get(vm.idCabinet);
                promise.then(function(res){
                    vm.cabinet=res;

                    //console.log(vm.cabinet);


                }).catch(function (res) {
                    notifyError(res.status);
                });
                promise = Servicios.getDiagnosticoFromCabinet(vm.idCabinet);
                promise.then(function(res){
                    vm.diagnostico=res;
                    //console.log(vm.cabinet);


                }).catch(function (res) {
                    notifyError(res.status);
                });
                promise = Servicios.consultarEtapaServicioDiagnostico(vm.diagnostico);
                promise.then(function(res){
                    vm.etapaActual=res;
                    //console.log(vm.cabinet);


                }).catch(function (res) {
                    notifyError(res.status);
                });

            }
            else{
                notifyError(404);
            }

        }
        function notifyError(status) {
            switch (status) {
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    break;
                default:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;

            }
        }
        function obtenerInformacionCabinet(){

        }
        function obtenerEtapaActual() {

        }

        function getInsumos(){

        }


        function cancel() {
            vm.etapa = {
                diagnostico: '',
                validado: false,
                actual_etapa: '',
                siguiente_etapa: ''

            };
            vm.editable=false;
            vm.etapaActual = null;//Objeto donde se almacenara la informacion de la etapa actual
            vm.etapaInsumo=null; //Objeto donde se almacena la etapa sobre la cual se esta trabajando
            vm.idCabinet = null;
            vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
            vm.insumosEtapaCabinet = null;//Arreglo de Insumos que posee el cabinet en diche etapa
            vm.cabinet;// Informacion general del cabinet al cual se le asignara una nueva etapa
            vm.diagnostico; // Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
            vm.insumo = {
                id: "",
                nombre: "",
                cantidad: "",
                notas: ""
            };// Insumo por agregar al cabinet en cuestion
            

        }


        function eliminarEtapaServicio() {
            if (vm.etapaActual != null) {
                var promise = Servicios.eliminarEtapaServicio(vm.etapaActual);
                promise.then(function (res) {
                    vm.diagnostico = res;
                });
            }
            else {
                console.log("No Es posible eliminar", "El registro que usted pretende afectar no puede ser eliminado");
            }
        }

        function crearEtapaServicio() {
            if (vm.etapaActual!= null) {
                vm.etapaActual.insumos=vm.insumos;
                console.log("Ya voy a crear");
                var promise = Servicios.crearEtapaServicio(vm.etapa);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.etapaActual = res;

                }).catch(function (err) {
                    console.log(vm.failureText, vm.failureStoreText);
                });
            }
            else {
                var promise = Servicios.editarEtapaServicio(vm.etapa);
                promise.then(function (res) {
                    console.log(vm.successText, vm.successUpdateText);
                    vm.etapaActual = res;
                }).catch(function (err) {
                    console.log(vm.failureText, vm.failureStoreText);
                });

            }
            vm.cancel();
        }

            function crearInsumo() {

            }

            // Eliminar Insumo


            function eliminarInsumo(insu) {


            }



    }

})();