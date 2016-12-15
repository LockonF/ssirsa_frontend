/**
 * Created by personal on 20-Oct-16.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('MarcaDialogController',MarcaDialogController);
    function MarcaDialogController($mdDialog, MarcaCabinet, Translate, toastr){
        var vm = this;

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;
        
        //Translates
        vm.succesTitle=Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.successMessage=Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
        vm.errorTitle=Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorMessage=Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        vm.duplicateMessage=Translate.translate('INPUT.Dialogs.Brand.Duplicate');

        //Blank variables templates
        vm.marca = {
            "categoria":"",
            "descripcion":""
        };


        function create(){
            vm.marca.categoria = vm.marca.categoria.toUpperCase();
            vm.marca.descripcion = vm.marca.descripcion.toUpperCase();
            MarcaCabinet.create(vm.marca).then(function(){
                toastr.success(vm.successMessage,vm.succesTitle);
                $mdDialog.hide();
            }).catch(function(err){
                if(err.status==400 && err.data.descripcion!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function cancelClick(){
            $mdDialog.cancel(null);
        }


    }
})();
