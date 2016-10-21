/**
 * Created by personal on 20-Oct-16.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('ModeloDialogController',ModeloDialogController);
    function ModeloDialogController($mdDialog, Cabinet, MarcaCabinet, ModeloCabinet, Helper, Translate, toastr){
        var vm = this;
        
        //Translates
        vm.succesTitle=Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.successMessage=Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
        vm.errorTitle=Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorMessage=Translate.translate('MAIN.MSG.ERROR_MESSAGE');

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;

        activate();

        function activate(){
            vm.marca=null;
            MarcaCabinet.listObject().then(function(res){
                vm.marcas=Helper.filterDeleted(res,true);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
                vm.marcas=[];
            });
        }


        function create(){
            ModeloCabinet.create(vm.cabinet).then(function(res){
                toastr.success(vm.successMessage,vm.succesTitle);
                $mdDialog.hide(vm.cabinet.economico);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
                $mdDialog.cancel(err);
            });
        }

        function cancelClick(){
            $mdDialog.cancel(null);
        }

    }
})();
