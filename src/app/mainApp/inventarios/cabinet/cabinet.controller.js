/**
 * Created by franciscojaviercerdamartinez on 20/07/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.inventario')
        .controller('cabinetController', cabinetController);

    function cabinetController(Translate, OPTIONS, MarcaCabinet, ModeloCabinet, udn, Cabinet, toastr, $scope, EntradaSalida, Helper) {
        var vm = this;
        vm.newCabinet = true;
        vm.marcas_cabinet = null;
        vm.udns = null;
        vm.selected_udn = null;
        vm.selected_marca = null;
        vm.selected_modelo = null;
        vm.selected_date = new Date();
        vm.modelos_cabinet = null;
        vm.modelos_choice_cabinet = null;
        vm.cabinet_list = null;
        vm.entradas = null;
        vm.show_entries = null;

        vm.blank_selected_cabinet = {
            economico: null,
            status: null,
            activo: false,
            capitalizado: false,
            no_serie: null,
            tipo_entrada: 'manual',
            year: null,
            no_incidencias: null,
            linea_x: null,
            linea_y: null,
            linea_z: null,
            insumo: null,
            modelo: null,
            id_unilever: null,
            antiguedad: null,
            diagnostico: {
                rejillas: 0,
                puertas: false,
                canastillas: 0
            },
            entrada_salida: null
        };

        vm.selected_cabinet = _.clone(vm.blank_selected_cabinet);

        vm.modelos_resolver = true;
        vm.modelos_choice_resolver = true;
        vm.create_update_resolver = true;
        vm.status = OPTIONS.estatus_cabinet;

        vm.antiguedad = OPTIONS.antiguedad;

        vm.loadModelos = loadModelos;
        vm.loadCabinets = loadCabinets;
        vm.selectedItemChange = selectedItemChange;
        vm.loadModelosToChoose = loadModelosToChoose;
        vm.loadEntradas = loadEntradas;
        vm.lookupEntriesByDate = lookupEntriesByDate;
        vm.create = create;
        vm.cancel = cancel;
        vm.update = update;
        vm.remove = remove;
        activate();


        function activate() {
            vm.udns = udn.list();
            MarcaCabinet.listObject().then(function(res){
                vm.marcas_cabinet = Helper.sortByAttribute(res,'descripcion');
                vm.marcas_cabinet = Helper.filterDeleted(vm.marcas_cabinet,true);
            }).catch(function(err){

            });

            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput = Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');


        }

        //Función para cargar modelos de cabinet una vez seleccionada la marca
        function loadModelos(marca) {
            vm.selected_modelo = null;
            vm.cabinet_list = null;
            vm.modelos_resolver = false;
            vm.modelos_cabinet = null;


            MarcaCabinet.getModels(marca.id).then(function (res) {
                vm.modelos_resolver = true;

                vm.modelos_cabinet = Helper.sortByAttribute(res,'nombre');
                vm.modelos_cabinet = Helper.filterDeleted(vm.modelos_cabinet,true);
            }).catch(function (err) {
                vm.modelos_resolver = true;
            });
        }

        function loadCabinets(model) {
            vm.cabinet_list = Cabinet.loadByModel(model);

        }

        function loadModelosToChoose() {
            vm.modelos_choice_resolver = false;
            vm.modelos_cabinet = null;
            vm.selected_cabinet.modelo = null;
            MarcaCabinet.getModels(vm.chosen_marca_cabinet).then(function (res) {
                vm.modelos_choice_resolver = false;
                vm.modelos_choice_cabinet = res;
            }).catch(function (err) {
                vm.modelos_choice_resolver = true;
            });
        }


        function selectedItemChange(cabinet) {
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.newCabinet = false;
            vm.selected_cabinet = cabinet.clone();
            vm.modelos_choice_resolver = false;

            if(vm.selected_cabinet.deleted)
            {
                MarcaCabinet.listObject().then(function(res){
                    vm.marcas_cabinet  = res;
                }).catch(function(err){

                });
            }


            ModeloCabinet.marca(vm.selected_cabinet.modelo).then(function (res) {
                vm.chosen_marca_cabinet = res.id;
                MarcaCabinet.getModels(vm.chosen_marca_cabinet).then(function (res) {
                    vm.modelos_choice_resolver = true;
                    vm.modelos_choice_cabinet = res;
                }).catch(function (err) {
                    vm.modelos_choice_resolver = true;
                });

            }).catch(function (err) {
                vm.modelos_choice_resolver = true;
            });
        }


        function update() {
            delete vm.selected_cabinet.entrada_salida;
            delete vm.selected_cabinet.diagnostico;
            vm.create_update_resolver = false;
            vm.selected_cabinet.partial = true;
            Cabinet.modify(vm.selected_cabinet).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                vm.selected_cabinet = res;
                vm.create_update_resolver = true;
            }).catch(function (err) {
                toastr.error(err.data, vm.errorTitle);
                vm.create_update_resolver = true;

            });

        }


        function create() {
            vm.selected_cabinet.linea_x = null;
            vm.selected_cabinet.linea_y = null;
            vm.selected_cabinet.linea_z = null;
            vm.create_update_resolver = false;

            Cabinet.create(vm.selected_cabinet).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.selected_cabinet = res;
                vm.newCabinet = false;
                vm.create_update_resolver = true;
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
                vm.create_update_resolver = true;
            });
        }

        function remove() {
            Cabinet.remove(vm.selected_cabinet).then(function (res) {
                toastr.success(vm.successDeleteMessage, vm.successTitle);
                cancel();
                if (vm.selected_modelo != null) {
                    loadCabinets(vm.selected_modelo);
                }
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);

            });
        }

        function cancel() {
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.newCabinet = true;
            vm.chosen_marca_cabinet = null;
            vm.selected_cabinet = _.clone(vm.blank_selected_cabinet);
            activate()
        }


        function loadEntradas(udn) {
            vm.entradas = EntradaSalida.byUdn(udn);
        }


        function lookupEntriesByDate() {
            /**
             * Esto es un pedazo de magia que busca por fecha usando moment JS con las zonas
             * horarias que ya provee Django :D
             **/
            vm.show_entries = _.filter(vm.entradas, function (entrada) {
                var searchYear = moment(vm.selected_date).format('YYYY');
                var searchMonth = moment(vm.selected_date).format('MM');
                var searchDay = moment(vm.selected_date).format('DD');
                var itemMonth = moment.parseZone(entrada.fecha).format('MM');
                var itemYear = moment.parseZone(entrada.fecha).format('YYYY');
                var itemDay = moment.parseZone(entrada.fecha).format('DD');

                return ((searchYear == itemYear) && (searchMonth == itemMonth) && (searchDay == itemDay))


            });
        }
    }


})();
