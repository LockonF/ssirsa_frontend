/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('ProveedorController',ProveedorController);

    function ProveedorController(Proveedor, toastr, Translate, $scope)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.proveedor_list = null;
        vm.proveedor = null;

        vm.text = 'Hola';

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.update = update;
        vm.create = create;
        vm.remove = remove;
        vm.clickRepeater = clickRepeater;

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
            listProveedores();
        }

        function listProveedores()
        {
            vm.proveedor_list  = Proveedor.list();
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.proveedor_list,function(item){
                return item.razon_social.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {

        }

        function clickRepeater(item){
            vm.proveedor = item.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            vm.proveedor = null;
        }

        function update(){
            Proveedor.update(vm.proveedor).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listProveedores();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            Proveedor.create(vm.proveedor).then(function(res){
                listProveedores();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function remove()
        {
            Proveedor.remove(vm.proveedor).then(function(res){
                listProveedores();
                cancel();
                toastr.success(vm.successDeleteMessage,vm.successTitle)
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

    }

})();