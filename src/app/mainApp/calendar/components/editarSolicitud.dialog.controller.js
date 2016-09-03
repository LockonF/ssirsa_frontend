(function() {
    'use strict';

    angular
        .module('app.mainApp.calendar')
        .controller('EditarSolicitudDialogController', EditarSolicitudDialogController);

    /* @ngInject */
    function EditarSolicitudDialogController($mdDialog, triTheming, dialogData, event, edit,Solicitudes_Admin) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.colors = [];
        vm.colorChanged = colorChanged;
        vm.allDayChanged = allDayChanged;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        vm.selectedColor = null;
        // create start and end date of event
        vm.start =moment(event.solicitud.fecha_inicio,"YYYY-MM-DD").toDate();
        console.log(vm.start);
        //console.log(vm.start.format('YYYY-MM-DD'));
        if( event.solicitud.fecha_termino !== null) {
            vm.end = moment(event.solicitud.fecha_termino,"YYYY-MM-DD").toDate();
        }
        vm.statu = [
            {
                id:0,
                value:"No Confirmada"
            },
            {
                id:1,
                value:"Confirmada"
            },
            {
                id:2,
                value:"Cancelada"
            }
        ];

        ////////////////

        function colorChanged() {
            vm.event.backgroundColor = vm.selectedColor.backgroundColor;
            vm.event.borderColor = vm.selectedColor.backgroundColor;
            vm.event.textColor = vm.selectedColor.textColor;
            vm.event.palette = vm.selectedColor.palette;
        }

        function okClick() {
            vm.event.start = updateEventDateTime(vm.start);
            if(vm.event.solicitud.fecha_termino !== null) {
                vm.event.end = updateEventDateTime(vm.end);
            }
            vm.event.solicitud.fecha_inicio=vm.event.start.format('YYYY-MM-DD');
            vm.event.solicitud.fecha_termino=vm.event.end.format('YYYY-MM-DD');
            delete vm.event.solicitud.datos;
            Solicitudes_Admin.updateSolicitud(vm.event.solicitud).then(function (res) {
                $mdDialog.hide(vm.event);
            }).catch(function (res) {
                console.log(res);
            });

        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function allDayChanged() {
            // if all day turned on and event already saved we need to create a new date
            if(vm.event.allDay === false && vm.event.end === null) {
                vm.event.end = moment(vm.event.start);
                vm.event.end.endOf('day');
                vm.end = vm.event.end.toDate();
                vm.endTime = convertMomentToTime(vm.event.end);
            }
        }


        function updateEventDateTime(date) {
            return  moment(date);
        }

        // create colors
        angular.forEach(triTheming.palettes, function(palette, index) {
            var color = {
                name: index.replace(/-/g, ' '),
                palette: index,
                backgroundColor: triTheming.rgba(palette['500'].value),
                textColor: triTheming.rgba(palette['500'].contrast)
            };

            vm.colors.push(color);

            if(index === vm.event.palette) {
                vm.selectedColor = color;
                vm.colorChanged();
            }
        });
    }
})();
