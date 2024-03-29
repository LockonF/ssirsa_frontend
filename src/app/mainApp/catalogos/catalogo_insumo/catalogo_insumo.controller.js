/**
 * Created by lockonDaniel on 9/12/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('CatalogoInsumoController',CatalogoInsumoController);

    function CatalogoInsumoController(Helper,OPTIONS,unidad,Sucursal,CatalogoInsumo,Session,$mdDialog,Categoria,Proveedor, toastr, Translate, $scope)
    {
        var vm=this;
        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.selected=[];
        vm.catalogo_insumo_list = null;
        var catalogo_insumo =  {
            cantidad: null,
            unidades: null,
            descripcion: null,
            costo: null,
            tipo: null,
            palabra_clave:null,
            categoria: null,
            proveedor: null,
            sucursal: null,
            etapas: [],
            tipos_equipo: []
        };
        vm.tipos = [{'display':'Lote','value':'L'},{'display':'Único','value':'U'}];
        vm.categoria_list = null;
        vm.proveedor_list = null;

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.update = update;
        vm.create = create;
        vm.remove = remove;
        vm.clickRepeater = clickRepeater;
        vm.showSteps=showSteps;
        vm.addUnidad=addUnidad;
        vm.showEquipment=showEquipment;
        vm.disabled=disabled;
        vm.toggleDeletedFunction = toggleDeletedFunction;
        vm.restore = restore;

        vm.catalogo_insumo=angular.copy(catalogo_insumo);
        vm.profile=Session.userInformation;
        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};
        vm.toggleDeleted = true;

        //vm.unidades=OPTIONS.units;

        activate();


        function activate(){

            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.createUnit=Translate.translate('Consumable_Catalog.CREATE');
            vm.successRestoreMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_RESTORE');
            vm.dialogRestoreTitle=Translate.translate('MAIN.DIALOG.RESTORE_TITLE');
            vm.dialogRestoreMessage=Translate.translate('MAIN.DIALOG.RESTORE_MESSAGE');
            vm.restoreButton=Translate.translate('MAIN.BUTTONS.RESTORE');
            listSucursales();
            listCatalogoInsumos();
            listCategorias();
            listProveedores();
            listUnidades();

        }
        function listUnidades() {
            unidad.listObject().then(function (res) {
                vm.unidades  =Helper.filterDeleted(res,true);
                vm.unidades=_.sortBy( vm.unidades, 'nombre');
            });
        }
        function listSucursales()
        {
            Sucursal.listObject().then(function (res) {
                vm.sucursal_list  =Helper.filterDeleted(res,true);
                vm.sucursal_list=_.sortBy( vm.sucursal_list, 'nombre');
            });
        }

        function toggleDeletedFunction() {
            listCatalogoInsumos();
            cancel();
        }
        function restore() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogRestoreTitle)
                .textContent(vm.dialogRestoreMessage)
                .ariaLabel('Confirmar restauración')
                .ok(vm.restoreButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                vm.catalogo_insumo.deleted=false;
                CatalogoInsumo.update(vm.catalogo_insumo).then(function (res) {
                    toastr.success(vm.successRestoreMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    vm.catalogo_insumo.deleted=true;
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }


        function showSteps() {
            $mdDialog.show({
                controller: 'EtapaDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/catalogos/catalogo_insumo/modal/etapa.modal.tmpl.html',
                focusOnOpen: false,
                locals: {
                    catalogo: vm.catalogo_insumo
                }
            }).then(function (res) {
                vm.catalogo_insumo.etapas=res;
            });
        }
        function addUnidad() {
            $mdDialog.show({
                controller: 'UnidadModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/catalogos/catalogo_insumo/modal/unidad.modal.tmpl.html',
                focusOnOpen:  false
            }).then(function () {
                listUnidades();
                toastr.success(vm.createUnit,vm.successTitle);
            });
        }
        function disabled(id,tipoArray,disabled) {
            if(disabled==false) {
                if (id != null) {
                    if (tipoArray === "categoria") {
                        return Helper.searchByField(vm.categoria_list, id).deleted;
                    } else {
                        return Helper.searchByField(vm.proveedor_list, id).deleted;
                    }

                }
            }else{
                return disabled;
            }
        }
        function showEquipment() {
            $mdDialog.show({
                controller: 'TipoEquipoDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/catalogos/catalogo_insumo/modal/tipoEquipo.modal.tmpl.html',
                focusOnOpen: false,
                locals: {
                    catalogo: vm.catalogo_insumo
                }
            }).then(function (res) {

                vm.catalogo_insumo.tipos_equipo=res;
            });
        }

        function listCatalogoInsumos()
        {
            vm.loadingPromise =CatalogoInsumo.listObject().then(function (res) {

                vm.catalogo_insumo_list=Helper.filterDeleted(res,vm.toggleDeleted);
                vm.catalogo_insumo_list=_.sortBy(vm.catalogo_insumo_list, 'descripcion');
            });

        }


        function listCategorias()
        {
            Categoria.listObject().then(function (res) {
                vm.categoria_list  =res;
                vm.categoria_list=_.sortBy(vm.categoria_list, 'descripcion');
            });
        }



        function listProveedores()
        {
            Proveedor.listObject().then(function (res) {
                vm.proveedor_list  =res;
                vm.proveedor_list = Helper.sortByAttribute(vm.proveedor_list, 'razon_social');
            });
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.catalogo_insumo_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase()) || item.palabra_clave.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            if(item!=null){
                item.costo = parseFloat(item.costo);
                item.cantidad =parseFloat(item.cantidad);
                vm.catalogo_insumo = item.clone();
            }
        }

        function clickRepeater(catalogo_insumo){
            catalogo_insumo.costo = parseFloat(catalogo_insumo.costo);
            catalogo_insumo.cantidad =parseFloat(catalogo_insumo.cantidad);
            vm.catalogo_insumo = catalogo_insumo.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();
            vm.catalogo_insumo=angular.copy(catalogo_insumo);
            vm.searchText=null;
        }
        function update(){
            CatalogoInsumo.update(vm.catalogo_insumo).then(function(res){
                vm.catalogo_insumo = res;
                vm.catalogo_insumo.costo = parseFloat(vm.catalogo_insumo.costo);
                vm.catalogo_insumo.cantidad =parseFloat(vm.catalogo_insumo.cantidad);
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                cancel();
                listCatalogoInsumos();
            }).catch(function(err){
                if(err.status==400 && err.data.message!=undefined) {
                    var tipos=err.data.items.map(function(obj){return obj;}).join(', ');
                    toastr.error(err.data.message[0]+ " : "+tipos, vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });
        }

        function create()
        {
            vm.catalogo_insumo.sucursal=Session.userInformation.sucursal!=null?Session.userInformation.sucursal:vm.catalogo_insumo.sucursal;

            CatalogoInsumo.create(vm.catalogo_insumo).then(function(res){
                listCatalogoInsumos();
                toastr.success(vm.successCreateMessage,vm.successTitle);
                cancel();
            }).catch(function(err){
                if(err.status==400 && err.data.message!=undefined) {
                    var tipos=err.data.items.map(function(obj){return obj;}).join(', ');
                    toastr.error(err.data.message[0]+ " : "+tipos, vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });
        }

        function remove()
        {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {

                CatalogoInsumo.remove(vm.catalogo_insumo).then(function(res){
                    listCatalogoInsumos();
                    cancel();
                    toastr.success(vm.successDeleteMessage,vm.successTitle)
                }).catch(function(err){
                    toastr.error(vm.errorMessage,vm.errorTitle);
                });
            }, function() {

            });
        }

    }

})();
