/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoTransporteController',TipoTransporteController);

    function TipoTransporteController(TipoTransporte, toastr, Translate, $scope)
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
            listTipos();
        }

        function listTipos()
        {

            TipoTransporte.list().then(function(res){
                vm.tipo_transporte_list  = res;
            }).catch(function(err){

            });
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.tipo_transporte_list,function(item){
               return item.descripcion.includes(search_text);
            });
            return vm.search_items;
        }

        function selectedItemChange(tipo_transporte){

        }

        function  cancel(){
            $scope.inputForm.$setPristine();
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
            TipoTransporte.remove(vm.tipo_transporte).then(function(res){
                listTipos();
                toastr.success(vm.successDeleteMessage,vm.successTitle)
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

    }

})();