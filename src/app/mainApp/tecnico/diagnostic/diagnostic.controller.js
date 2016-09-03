/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('diagnosticController', diagnosticController);

    function diagnosticController(Cabinet, ModeloCabinet,toastr,Translate,Helper,Upload,EnvironmentConfig,OAuthToken,MarcaCabinet,EntradaSalida) {
        var vm = this;
        vm.diagnostico = {};
        vm.cabinets=null;
        vm.status = 'idle';  // idle | uploading | complete
        vm.guardar = guardar;
        vm.searchCabinet = searchCabinet;
        vm.selectionFile=selectionFile;
        activate();
        vm.statu = [
            {
                id:0,
                value:"Reparacion Mayor"
            },
            {
                id:1,
                value:"Sistema Tapado"
            },
            {
                id:2,
                value:"Reparacion Media"
            },
            {
                id:3,
                value:"Reparacion Menor"
            },
            {
                id:4,
                value:"Fuga Interna"
            },
            {
                id:5,
                value:"Obsoleto"
            }
        ];
         /*var diagnosico = {
            tipo: 'entrada',
            rodajas: null,
            canastillas: null,
            puertas: null,
            rejillas: null,
            sticker: false,
            pintura: false,
            lavado: false,
            emplayado: false,
            lubricacion: false,
            listo_mercado: false,
            fecha:moment().format('YYYY-MM-DD'),
            tipo_insumo: 'bicicleta',
            cabinet_entrada_salida: null
        };
        vm.diagnostico=angular.copy(diagnostico);*/

        function guardar() {
            vm.status = 'uploading';
            if(vm.cabinetStatus!=4 || vm.cabinetStatus!=5){
                vm.picFile=null;
            }
            if(vm.picFile!=null) {
                vm.cabinets.foto = vm.picFile;
            }else{
                delete vm.cabinets.foto;
            }

            if(!vm.cabinets.capitalizado){
                vm.cabinets.status="N/A";
            }else{
                vm.cabinets.status=vm.statu[vm.cabinetStatus].value;
            }
            console.log(vm.cabinets);


            Upload.upload({
                url: EnvironmentConfig.site.rest.api+'cabinet/'+vm.cabinet,
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'PUT',
                data: vm.cabinets
            }).then(function (res) {
                vm.status = 'idle';
                vm.cabinet=null;
                vm.cabinets=null;
                vm.picFile=null;
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.diagnostico=null;
            }, function (resp) {
                vm.status = 'idle'; 
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn=file.name.split(".").pop();
                if(file.size/1000000>1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFile = null

                }else if (!Helper.acceptFile(file.type))  {
                    if (!Helper.acceptFile(extn))  {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFile = null;
                    }
                }
            }

        }
        function activate() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCCESS_DIAGNOSTIC_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
        }

        function searchCabinet() {
            Cabinet.get(vm.cabinet).then(function (res) {
                vm.cabinets=res;

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