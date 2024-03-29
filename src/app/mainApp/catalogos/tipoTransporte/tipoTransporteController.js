/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoTransporteController',TipoTransporteController);

    function TipoTransporteController(TipoTransporte, toastr, Translate, $scope, Helper, $mdDialog)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.tipo_transporte_list = null;
        vm.tipo_transporte = null;

        vm.toggleDeleted = true;

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.update = update;
        vm.create = create;
        vm.remove = remove;
        vm.restore = restore;
        vm.clickRepeater = clickRepeater;
        vm.toggleDeletedFunction = toggleDeletedFunction;

        activate();


        function activate(){

            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.successRestoreMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_RESTORE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.restoreButton=Translate.translate('MAIN.BUTTONS.RESTORE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.dialogRestoreTitle=Translate.translate('MAIN.DIALOG.RESTORE_TITLE');
            vm.dialogRestoreMessage=Translate.translate('MAIN.DIALOG.RESTORE_MESSAGE');
            vm.duplicateMessage=Translate.translate('Transport_Kind.duplicate');
            listTipos();
        }

        function listTipos()
        {
            vm.loadingPromise = TipoTransporte.listObject().then(function(res){
                vm.tipo_transporte_list = Helper.filterDeleted(res, vm.toggleDeleted);
                vm.tipo_transporte_list = Helper.sortByAttribute(vm.tipo_transporte_list, 'descripcion')
            }).catch(function(err){

            });
        }

        function toggleDeletedFunction() {
            listTipos();
            cancel();
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.tipo_transporte_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            vm.selected_tipo_transporte = item.clone();
        }

        function clickRepeater(item){
            vm.selected_tipo_transporte = item.clone();
            vm.tipo_transporte = vm.selected_tipo_transporte;
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.tipo_transporte = null;
            vm.selected_tipo_transporte = null;
        }

        function update(){
            TipoTransporte.update(vm.selected_tipo_transporte).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listTipos();
            }).catch(function(err){
                if(err.status==400 && err.data.descripcion!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function create()
        {
            vm.selected_tipo_transporte.descripcion = vm.selected_tipo_transporte.descripcion.toUpperCase();
            TipoTransporte.create(vm.selected_tipo_transporte).then(function(res){
                listTipos();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                if(err.status==400 && err.data.descripcion!=undefined){
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else
                {
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
                TipoTransporte.remove(vm.selected_tipo_transporte).then(function(res){
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }

        function restore() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogRestoreTitle)
                .textContent(vm.dialogRestoreMessage)
                .ariaLabel('Confirmar restauración')
                .ok(vm.restoreButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                vm.selected_tipo_transporte.deleted=false;
                TipoTransporte.update(vm.selected_tipo_transporte).then(function (res) {
                    toastr.success(vm.successRestoreMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    vm.selected_tipo_transporte.deleted=true;
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }

    }

})();
