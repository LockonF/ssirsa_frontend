/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('DiagnosticController', DiagnosticController);

    function DiagnosticController(Cabinet,cabinet, OPTIONS, toastr,$scope, Translate,$mdDialog, Helper, Upload, EnvironmentConfig, OAuthToken) {
        var vm = this;
        vm.diagnostico = {};
        vm.cabinets = null;
        vm.cabinet=null;
        vm.status = 'idle';  // idle | uploading | complete
        vm.cerrarDialog=cerrarDialog;
        vm.guardar = guardar;
        vm.searchCabinet = searchCabinet;
        vm.selectionFile = selectionFile;
        activate();
        vm.antiguedad = OPTIONS.antiguedad;
        vm.statu = OPTIONS.estatus_cabinet;

        function guardar() {

            if ((vm.cabinets.status!='Fuga Interna' && vm.cabinets.status!='Obsoleto') || vm.cabinets.foto==null || !vm.cabinets.capitalizado) {
                delete vm.cabinets.foto;
            }else{
                vm.status = 'uploading';
            }
            vm.cabinets.id_unilever=!vm.cabinets.capitalizado?null:vm.cabinets.id_unilever;
            vm.cabinets.status = !vm.cabinets.capitalizado?"N/A":vm.cabinets.status;
            Upload.upload({
                url: EnvironmentConfig.site.rest.api + 'cabinet/' + vm.cabinet,
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'PUT',
                data: vm.cabinets
            }).then(function () {
                vm.status = 'idle';
                cerrarDialog();
                clear();

                toastr.success(vm.successCreateMessage, vm.successTitle);
            }, function (err) {
                if(err.status==400){
                    toastr.warning(err.data[0], vm.errorTitle);
                }else{
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                }
                vm.status = 'idle';
            });
        }
        function cerrarDialog(){
            console.log("voy a cerrar");
            $mdDialog.cancel();
        }
        function clear() {
            if(cabinet){
            $scope.registerForm.$setPristine();
            $scope.registerForm.$setUntouched();
            $scope.searchCabinetForm.$setPristine();
            $scope.searchCabinetForm.$setUntouched();
            }
            vm.cabinet = null;
            vm.cabinets = null;
            vm.diagnostico = null;
        }
        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    vm.cabinets.foto = null;
                    toastr.warning(vm.errorSize, vm.errorTitle);
                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.cabinets.foto = null;
                    }
                }
            }
        }

        function activate() {
            console.log(cabinet);
            if (cabinet!=null) {
                vm.cabinet = cabinet;
                vm.searchCabinet();
            }
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCCESS_DIAGNOSTIC_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput = Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.errorDisabled = Translate.translate('MAIN.MSG.ERROR_DISABLED_CABINET');
        }

        function searchCabinet() {
            Cabinet.get(vm.cabinet).then(function (res) {
                if(!res.deleted){
                    vm.cabinets = res;
                }else{
                    toastr.warning(vm.errorDisabled, vm.errorTitle);
                }

            }).catch(function (res) {
                notifyError(res.status);
            });
        }

        function notifyError(status) {
            switch (status) {
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    break;
                case 500:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;
            }
        }


    }


})();
