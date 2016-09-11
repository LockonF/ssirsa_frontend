/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController( Cabinet, Servicios, Diagnostico,ModeloCabinet, Translate,toastr ) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables

        vm.etapa = {
            diagnostico: '',
            validado: false,
            actual_etapa: '',
            siguiente_etapa: ''

        };

        vm.editable=true;
        vm.idCabinet = null;
        vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
        vm.cabinet=null;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.diagnostico=null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
        vm.etapa;
        vm.modelo;
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
        vm.getInsumos = getInsumos;//
        vm.editar=editar;
        vm.buscarModelo=buscarModelo;
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
        vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
        vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
        vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
        vm.notAllow=Translate.translate('MAIN.MSG.NOT_ALLOWED');
        
        


        // Funciones

        function editar(){
            vm.editable=!vm.editable;
        }
        //Funcion Activate al iniciar la vista
        function activate() {


        }
        function buscar(){
            if (vm.idCabinet!=null){
                var promise = Cabinet.get(vm.idCabinet);
                promise.then(function(res){
                    vm.cabinet=res;
                    promise = Servicios.getDiagnosticoFromCabinet(vm.idCabinet);
                    promise.then(function(res){
                        vm.diagnostico=res;
                        promise = Servicios.consultarEtapaServicioDiagnostico(vm.diagnostico);
                        promise.then(function(res){
                            vm.etapa=res;

                            console.log("De la Busqueda")
                            console.log(vm.etapa)
                            console.log("Despues de las condiciones")
                            if(vm.etapa.validado==false){
                                console.log("Soy una etapa no validada");
                                vm.etapaActual=vm.etapa;
                                vm.insumos=vm.etapaActual.insumos;
                            }
                            else{
                                console.log("Soy una etapa validada");
                                vm.etapaActual=vm.etapa;
                                vm.etapaActual.id=null;
                                vm.etapaActual.actual_etapa=vm.etapa.siguiente_etapa;
                                vm.etapaActual.siguiente_etapa=null;
                                vm.etapaActual.insumos=null;
                            }
                            console.log(vm.etapaActual);
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
            else{
                notifyError(404);
            }

        }
        function buscarModelo(){
            var promise = ModeloCabinet;//AQUI VOY
            promise.then(function(res){
                vm.modelos=res;


            }).catch(function (res) {
                notifyError(res.status);
            });

        }
        function notifyError(status) {
            switch (status) {
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    break;
                case 405:
                    toastr.warning(vm.notAllow, vm.errorTitle);
                default:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;

            }
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

            vm.editable=true;
            vm.idCabinet = null;
            vm.insumos = [];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
            vm.cabinet=null;// Informacion general del cabinet al cual se le asignara una nueva etapa
            vm.diagnostico=null;// Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
            vm.etapa;
            vm.modelo;
            vm.etapaActual=null;
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
                    vm.cancel();
                }).catch(function (res) {
                    notifyError(res.status);
                });
            }
        }

        function crearEtapaServicio() {
            vm.etapaActual.insumos=[];
            vm.etapaActual.diagnostico=vm.diagnostico.id;
            console.log(vm.etapaActual)


            if (vm.etapaActual.id==null) {
                console.log("voy a crear uno nuevo")
                vm.etapaActual.insumos=vm.insumos;
                console.log("Al editar/crear");
                console.log(vm.etapaActual);
                console.log("Ya voy a crear");
                var promise = Servicios.crearEtapaServicio(vm.etapaActual);
                promise.then(function (res) {
                    toastr.success(vm.successTitle, vm.successCreateMessage);
                    vm.etapaActual = res;
                    vm.cancel();

                }).catch(function (res) {

                    console.log(res);
                    notifyError(res.status);
                });
            }
            else {
                console.log("Voy a editar")
                var promise = Servicios.editarEtapaServicio(vm.etapaActual);
                promise.then(function (res) {
                    console.log(vm.successTitle, vm.successUpdateMessage);
                    toastr.success(vm.successTitle, vm.successUpdateMessage);
                    vm.etapaActual = res;
                    vm.cancel();
                }).catch(function (res) {

                    console.log(res);
                    notifyError(res.status);
                });

            }
            vm.cancel();
        }

            function crearInsumo() {
                if(vm.insumo.nombre!=null){

                }
                else{
                    notifyError(404);
                }

            }

            // Eliminar Insumo


            function eliminarInsumo(insu) {


            }



    }

})();