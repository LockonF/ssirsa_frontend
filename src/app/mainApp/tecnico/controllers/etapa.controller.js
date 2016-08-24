/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('etapaController', etapaController);

    function etapaController($scope,$mdDialog,Servicios, toastr, Translate,ROUTES) {
        var vm = this;
        vm.activate = activate();

        //Inicializando Variables

        vm.etapa = {

        };
        vm.insumos=[];//Arreglo que poseera los Insumos que pueden ser usados en cierta etapa
        vm.insumosEtapaCabinet=[];//Arreglo de Insumos que posee el cabinet en diche etapa
        vm.cabinet;// Informacion general del cabinet al cual se le asignara una nueva etapa
        vm.diagnostico; // Informacion del diagnostico que propicio que entrara a un proceso de servicio tecnico
        vm.insumo = {
            id:"",
            nombre:"",
            cantidad: "",
            notas: ""
        };// Insumo por agregar al cabinet en cuestion
        vm.etapas = [{
            id: '1',
            nombre: 'Etapa 1',
        }, {
            id: '2',
            nombre: 'Etapa 2',
        }, {
            id: '3',
            nombre: 'Etapa 3',
        }, {
            id: '4',
            nombre: 'Etapa 4',
        },{
            id: '5',
            nombre: 'Etapa 5',
        },{
            id: '6',
            nombre: 'Etapa Bicicletas (Unica)',
        }
        ];//Arreglo de las diferentes etapas que componen el proceso de fabricacion de bicicletas
        //Declaracion de Funciones
        vm.crearInsumo=crearInsumo;
        vm.eliminarInsumo=eliminarInsumo;
        vm.getInsumos=getInsumos;
        vm.consultarInsumosEtapa=consultarInsumosEtapa;
        vm.obtenerInformacionCabinet=obtenerInformacionCabinet;
        vm.obteneretapaValidada=obteneretapaValidada;
        vm.crearEtapaServicio=crearEtapaServicio;
        vm.eliminarEtapaServicio=eliminarEtapaServicio;
        vm.buscarEtapaServicio=buscarEtapaServicio;
        vm.obtenerEtapaActual=obtenerEtapaActual;
        vm.cancel =cancel;//Limpiar campos
        // Funciones
        //Funcion Activate al iniciar la vista
        function activate()
        {
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
        function getEtapa() {
            var promise = Fondeo.getAllFondeos();
            promise.then(function (value) {
                vm.Fondeos=value;
            });
        }
        function cancel() {

            vm.selectedFondeo=null;
            vm.fondeo = null;
            vm.isNewFondeo=true;
            $scope.fondeoInfo.setPristine();
            $scope.fondeoFondeoDesc.setPristine();
            $scope.fondeoFondeoDesc.setPristine();
            $scope.fondeoSupport.setPristine();

        }

        //Funcion conocer etapa
        function obtenerEtapaActual(){


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
                    nombre:"",
                    cantidad: 0,
                    notas: ""
                };

                console.log("Los insumos son:");
                console.log(vm.etapa.insumos);
            }
        }

        // Eliminar Insumo


        function eliminarInsumo(insu) {

            vm.insumocopy=insu;
            var index=0;

            for (index = 0; index < vm.etapa.insumos.length; ++index) {

                console.log(vm.insumocopy);
                console.log(vm.etapa.insumos[index]);
                if (vm.etapa.insumos[index].id == vm.insumocopy.id) {
                    
                        console.log("voy a borrar");
                        console.log(vm.etapa.insumos[index]);
                        vm.etapa.insumos.splice(index, 1);

                }
                else{console.log("Aun no lo encuentro")}

            }

        }


    }


})();