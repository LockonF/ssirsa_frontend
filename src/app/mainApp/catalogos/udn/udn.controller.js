/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('UDNController',UDNController);

    function UDNController(udn, toastr,OPTIONS, Translate, $scope, Helper, $mdDialog)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.udn_list = null;
        vm.udn = null;
        vm.udns=OPTIONS.zone;

        vm.toggleDeleted = true;

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.update = update;
        vm.create = create;
        vm.remove = remove;
        vm.clickRepeater = clickRepeater;
        vm.restore = restore;
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
            vm.duplicateMessage=Translate.translate('UDN_CATALOG.duplicate');
            listUdns();
        }



        function listUdns()
        {

            vm.loadingPromise = udn.listObject().then(function(res){
                vm.udn_list = Helper.filterDeleted(res, vm.toggleDeleted);
                vm.udn_list = Helper.sortByAttribute(vm.udn_list, 'zona');

            }).catch(function(err){

            });
        }

        function toggleDeletedFunction() {
            listUdns();
            cancel();
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.udn_list,function(item){
                return item.zona.toLowerCase().includes(search_text.toLowerCase()) || item.agencia.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            vm.selected_udn = item.clone();
        }

        function clickRepeater(item){
            vm.selected_udn = item.clone();
            vm.udn = vm.selected_udn;
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.udn = null;
            vm.selected_udn = null;
        }

        function update(){
            udn.update(vm.selected_udn).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listUdns();
            }).catch(function(err){
                if(err.status == 400 && err.data.non_field_errors!=undefined){
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function create()
        {
            udn.create(vm.selected_udn).then(function(res){
                listUdns();
                toastr.success(vm.successCreateMessage,vm.successTitle);
                cancel();
            }).catch(function(err){
                if(err.status == 400 && err.data.non_field_errors!=undefined){
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
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
                udn.remove(vm.selected_udn).then(function(res){
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
                vm.selected_udn.deleted=false;
                udn.update(vm.selected_udn).then(function (res) {
                    toastr.success(vm.successRestoreMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    vm.selected_udn.deleted=true;
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }

    }

})();
