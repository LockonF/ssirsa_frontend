/**
 * Created by lockonDaniel on 9/12/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('CategoriaController',CategoriaController);

    function CategoriaController(Categoria, toastr, Translate, $scope, Helper, $mdDialog)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.categoria_list = null;
        vm.categoria = null;

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
            vm.duplicateMessage=Translate.translate('Category.duplicate');
            listCategorias();
        }

        function listCategorias()
        {
            Categoria.listObject().then(function(res){
                vm.categoria_list  = Helper.filterDeleted(res,true);
                vm.categoria_list  = _.sortBy(vm.categoria_list, 'descripcion');
            }).catch(function(err){

            });
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.categoria_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase()) || item.nombre.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {
            vm.selected_categoria = item.clone();
        }

        function clickRepeater(categoria){
            vm.categoria = categoria.clone();
            vm.selected_categoria = vm.categoria;
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            $scope.inputForm.$setUntouched();
            vm.categoria = null;
            vm.selected_categoria = null;
        }

        function update(){
            Categoria.update(vm.selected_categoria).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listCategorias();
            }).catch(function(err){
                if(err.status == 400 && err.data.nombre != undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function create()
        {
            vm.selected_categoria.nombre = vm.selected_categoria.nombre.toUpperCase();
            vm.selected_categoria.descripcion = vm.selected_categoria.descripcion.toUpperCase();
            Categoria.create(vm.selected_categoria).then(function(res){
                listCategorias();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                if(err.status == 400 && err.data.nombre != undefined)
                {
                    toastr.error(vm.duplicateMessage, vm.errorTitle);
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
                Categoria.remove(vm.selected_categoria).then(function(res){
                    listCategorias();
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