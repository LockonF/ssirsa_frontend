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
            listTipos();
        }

        function listTipos()
        {
            TipoTransporte.listObject().then(function(res){
                vm.tipo_transporte_list  = Helper.filterDeleted(res, true);
                vm.tipo_transporte_list = Helper.sortByAttribute(vm.tipo_transporte_list, 'descripcion');

            }).catch(function(err){

            });
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.tipo_transporte_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.tipo_transporte = angular.copy(item);

            }else{
                cancel();
            }
        }

        function clickRepeater(tipo_transporte){
            vm.tipo_transporte = tipo_transporte.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.tipo_transporte = null;
        }

        function update(){
            TipoTransporte.update(vm.tipo_transporte).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listTipos();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            TipoTransporte.create(vm.tipo_transporte).then(function(res){
                listTipos();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
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
                TipoTransporte.remove(vm.tipo_transporte).then(function(res){
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
