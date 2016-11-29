/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('ProveedorController',ProveedorController);

    function ProveedorController(Proveedor, toastr, Translate, $scope, Helper, $mdDialog)
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
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.duplicateMessage=Translate.translate('Provider.duplicate');
            listProveedores();
        }

        function listProveedores()
        {
            Proveedor.listObject().then(function(res){
                vm.proveedor_list = Helper.filterDeleted(res, true);
                vm.proveedor_list = Helper.sortByAttribute(vm.proveedor_list, 'razon_social');
            }).catch(function(err){

            });
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.proveedor_list,function(item){
                return item.razon_social.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            vm.selected_proveedor = item.clone();

        }

        function clickRepeater(item){
            vm.proveedor = item.clone();
            vm.selected_proveedor = vm.proveedor;
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.proveedor = null;
            vm.selected_proveedor = null;
        }

        function update(){
            Proveedor.update(vm.selected_proveedor).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listProveedores();
            }).catch(function(err){
                if(err.status==400 && err.data.razon_social != undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function create()
        {
            vm.selected_proveedor.razon_social = vm.selected_proveedor.razon_social.toUpperCase();
            Proveedor.create(vm.selected_proveedor).then(function(res){
                listProveedores();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                if(err.status==400 && err.data.razon_social != undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);

                }
                else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
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
                Proveedor.remove(vm.selected_proveedor).then(function(res){
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }

    }

})();