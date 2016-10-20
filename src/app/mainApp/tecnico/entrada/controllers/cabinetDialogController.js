/**
 * Created by Emmanuel on 15/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController($mdDialog, Cabinet, MarcaCabinet, cabinetID, Helper, Translate, toastr){
        var vm = this;

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;
        vm.filterModels=filterModels;

        //Blank variables templates
        var cabinet = {
            "economico": "",
            "deleted": false,
            "status": "N/A",
            "id_unilever": "",
            "antiguedad": null,
            "activo": false,
            "capitalizado": false,
            "no_serie": "",
            "tipo_entrada": "",
            "year": null,
            "no_incidencias": "1",
            "linea_x": null,
            "linea_y": null,
            "linea_z": null,
            "foto": null,
            "modelo": null,
            "insumo": null
        };

        //Translates
        vm.errorTitle=Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorMessage=Translate.translate('MAIN.MSG.ERROR_CATALOG');

        activate();

        function activate(){
            vm.cabinet=angular.copy(cabinet);
            vm.marca=null;
            vm.cabinet.economico=cabinetID;
            MarcaCabinet.listObject().then(function(res){
                vm.marcas=Helper.filterDeleted(res,true);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
                vm.marcas=[];
            });
            vm.modelos=[];
        }

        function filterModels(){
            vm.modelos=MarcaCabinet.getModels(vm.marca);
        }

        function create(){
            Cabinet.createClean(vm.cabinet).then(function(res){
                $mdDialog.hide(vm.cabinet.economico);
            }).catch(function(err){
                $mdDialog.cancel(err);
            });
        }

        function cancelClick(){
            $mdDialog.cancel(null);
        }

    }
})();
