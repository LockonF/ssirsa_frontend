/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('MarcaCabinetController',MarcaCabinetController);

    function MarcaCabinetController(MarcaCabinet, toastr, Translate, Helper, $scope, $mdDialog)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.marca_cabinet_list = null;
        vm.marca_cabinet = null;

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
            vm.duplicateMessage=Translate.translate('Cabinet_Brand.duplicate');
            listMarcas();
        }

        function listMarcas()
        {
            MarcaCabinet.listPromise().then(function (res) {
                vm.marca_cabinet_list = Helper.filterDeleted(res, true);
                vm.marca_cabinet_list = Helper.sortByAttribute(vm.marca_cabinet_list, 'descripcion')

            }).catch(function (err) {

            })

        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.marca_cabinet_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {

        }

        function clickRepeater(item){
            vm.marca_cabinet = item.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();

            vm.marca_cabinet = null;
        }

        function update(){
            MarcaCabinet.update(vm.marca_cabinet).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listMarcas();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            vm.marca_cabinet.categoria = vm.marca_cabinet.categoria.toUpperCase();
            vm.marca_cabinet.descripcion = vm.marca_cabinet.descripcion.toUpperCase();
            MarcaCabinet.create(vm.marca_cabinet).then(function(res){
                listMarcas();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                if(err.status==400 && err.data.descripcion!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else {
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
                MarcaCabinet.remove(vm.marca_cabinet).then(function (res) {
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