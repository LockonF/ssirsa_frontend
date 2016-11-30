(function () {
    'use strict';

    angular
        .module('app.mainApp.solicitudes')
        .controller('EditarSolicitudDialogController', EditarSolicitudDialogController);

    /* @ngInject */
    function EditarSolicitudDialogController($mdDialog, OPTIONS, dialogData, event, Solicitudes_Admin) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.dialogData = dialogData;
        vm.event = event;
        vm.statu = OPTIONS.status;
        vm.formato = "DD-MM-YYYY";
        var atendida = {
            fecha: moment().format('YYYY-MM-DD'),
            hora: moment().toDate()
        };
        activate();
        function activate() {
            vm.start = event.solicitud.fecha_inicio;
            vm.end = event.solicitud.fecha_termino;
            vm.atendida = angular.copy(atendida);
            if (event.solicitud.fecha_atendida !== null) {
                vm.atendida.fecha = moment(event.solicitud.fecha_atendida, "YYYY-MM-DD").toDate();
                vm.atendida.hora = moment(event.solicitud.fecha_atendida, "HH:mm:ss").toDate();
            }
        }

        function okClick() {
            vm.event.start = updateEventDateTime(vm.start);
            if (vm.event.solicitud.fecha_termino !== null) {
                vm.event.end = updateEventDateTime(vm.end);
            }
            var fecha = updateEventDateTime(vm.atendida.fecha).subtract("day", 1);
            var hora = updateEventDateTime(vm.atendida.hora);
            fecha.set({hour: hora.get('hour'), minute: hora.get('minute'), second: hora.get('second'), millisecond: hora.get('millisecond')});
            vm.event.solicitud.fecha_inicio = vm.event.start.format('YYYY-MM-DD');
            vm.event.solicitud.fecha_termino = vm.event.end.format('YYYY-MM-DD');
            vm.event.solicitud.fecha_atendida = fecha.toISOString();
            delete vm.event.solicitud.datos;
            Solicitudes_Admin.updateSolicitud(vm.event.solicitud).then(function (res) {
                $mdDialog.hide(vm.event);
            }).catch(function (res) {
            });

        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function updateEventDateTime(date) {
            return moment(date);
        }
    }
})();
