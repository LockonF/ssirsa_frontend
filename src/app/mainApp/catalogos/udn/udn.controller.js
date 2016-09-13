/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('UDNController',UDNController);

    function UDNController(udn, toastr, Translate, $scope)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.udn_list = null;
        vm.udn = null;

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
            listUdns();
        }

        function listUdns()
        {
            vm.udn_list = udn.newList()
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.udn_list,function(item){
                return item.zona.toLowerCase().includes(search_text.toLowerCase()) || item.agencia.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {

        }

        function clickRepeater(item){
            vm.udn = item.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            vm.udn = null;
        }

        function update(){
            udn.update(vm.udn).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listUdns();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            udn.create(vm.udn).then(function(res){
                listUdns();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function remove()
        {
            udn.remove(vm.udn).then(function(res){
                listUdns();
                cancel();
                toastr.success(vm.successDeleteMessage,vm.successTitle)
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

    }

})();