(function () {
    'use strict';

    angular
        .module('app.mainApp.solicitudes')
        .controller('EditarSolicitudDialogController', EditarSolicitudDialogController);

    /* @ngInject */
    function EditarSolicitudDialogController($mdDialog, toastr, Translate, CONFIGS, OPTIONS, dialogData, event, Solicitudes_Admin) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.dialogData = dialogData;
        vm.event = event;
        vm.statu = OPTIONS.status;
        vm.options = CONFIGS.ADTConfig;
        vm.options_time = CONFIGS.ADTConfigTime;
        activate();
        function activate() {
            vm.start = moment(event.solicitud.fecha_inicio);
            vm.end = moment(event.solicitud.fecha_termino);
            vm.atendida = moment(event.solicitud.fecha_atendida);
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.errorDate = Translate.translate('CALENDAR.FORM.MSG.FECHA_START');
            vm.erroNumSolConf = Translate.translate('CALENDAR.FORM.MSG.ERRORNUMSOLCONF');
        }

        function okClick() {
            vm.event.start = moment(vm.start, 'DD/MM/YYYY');
            vm.event.end = moment(vm.end, 'DD/MM/YYYY');
            var fecha = moment(vm.atendida, 'DD/MM/YYYY hh:mm');
            vm.event.solicitud.fecha_inicio = vm.event.start.format('YYYY-MM-DD');
            vm.event.solicitud.fecha_termino = vm.event.end.format('YYYY-MM-DD');
            vm.event.solicitud.fecha_atendida = fecha.toISOString();
            console.log(vm.event.solicitud);
            delete vm.event.solicitud.datos;
            Solicitudes_Admin.updateSolicitud(vm.event.solicitud).then(function (res) {
                $mdDialog.hide(vm.event);
            }).catch(function (err) {
                if (err.status == 400) {
                    if (err.data.fecha_inicio != undefined) {
                        toastr.error(vm.errorDate, vm.errorTitle);
                    } else if (err.data.message == "Solo se pueden tener 4 solicitudes por día") {
                        toastr.error(vm.erroNumSolConf, vm.errorTitle);
                    }
                } else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });

        }

        function cancelClick() {
            $mdDialog.cancel();
        }
    }
})();
