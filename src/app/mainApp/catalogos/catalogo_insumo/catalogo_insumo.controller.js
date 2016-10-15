/**
 * Created by lockonDaniel on 9/12/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('CatalogoInsumoController',CatalogoInsumoController);

    function CatalogoInsumoController(CatalogoInsumo,Etapa,$mdDialog,Categoria,Proveedor, toastr, Translate, $scope)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.selected=[];
        vm.catalogo_insumo_list = null;
        vm.catalogo_insumo =  {
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
        vm.showEquipment=showEquipment;

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
            listCatalogoInsumos();
            listCategorias();
            listProveedores();
            listEtapas();
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
            vm.catalogo_insumo_list  = CatalogoInsumo.list();

        }


        function listEtapas()
        {
            vm.etapa_list  = Etapa.list();
        }
        function listCategorias()
        {
            vm.categoria_list  = Categoria.list();
        }



        function listProveedores()
        {
            vm.proveedor_list  = Proveedor.list();
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
            vm.catalogo_insumo = null;
        }

        function update(){
            CatalogoInsumo.update(vm.catalogo_insumo).then(function(res){
                vm.catalogo_insumo = res;
                vm.catalogo_insumo.costo = parseFloat(vm.catalogo_insumo.costo);
                vm.catalogo_insumo.cantidad =parseFloat(vm.catalogo_insumo.cantidad);
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listCatalogoInsumos();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            CatalogoInsumo.create(vm.catalogo_insumo).then(function(res){
                listCatalogoInsumos();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function remove()
        {
            CatalogoInsumo.remove(vm.catalogo_insumo).then(function(res){
                listCatalogoInsumos();
                cancel();
                toastr.success(vm.successDeleteMessage,vm.successTitle)
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

    }

})();
