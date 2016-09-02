(function () {
    'use strict';

    angular
        .module('app.mainApp.calendar')
        .controller('CalendarController', CalendarController);

    /* @ngInject */
    function CalendarController($rootScope, $mdDialog, $mdToast, $filter, Solicitudes_Admin, triTheming, triLayout, uiCalendarConfig) {
        var vm = this;
        vm.changeMonth = changeMonth;
        vm.calendarOptions = {
            contentHeight: 'auto',
            selectable: true,
            editable: true,
            header: false,
            lang: 'es-mx',
            timeFormat: ' ',
            viewRender: function (view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                activate();
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10 calendar-background-month-' + vm.currentDay.month();
            },
            dayClick: function (date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function (calEvent, jsEvent, view) { //eslint-disable-line
                
                $mdDialog.show({
                    controller: 'EditarSolicitudDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/mainApp/calendar/components/editarSolicitud.dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'Editar Solicitud',
                            confirmButtonText: 'Save'
                        },
                        event: calEvent,
                        edit: true
                    }
                }).then(function (event) {
                    var toastMessage = 'Se actualizo correctamente la solicitud';
                    uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('updateEvent', event);
                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('triTranslate')(toastMessage))
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                });
            }
        };

        vm.viewFormats = {
            'month': 'MMMM YYYY',
            'agendaWeek': 'w',
            'agendaDay': 'Do MMMM YYYY'
        };

        vm.eventSources = [{
            events: []
        }];

        function changeMonth(direction) {
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar(direction);
        }


        function activate() {
            vm.eventSources[0].events.splice(0, vm.eventSources[0].events.length);
            Solicitudes_Admin.consultaEspUnconfirmed().then(function (res) {
                res.forEach(function (value) {
                    var color = getBrackground(value.tipo_solicitud);
                    var mockup = {
                        title: value.descripcion,
                        allDay: false,
                        start: moment(value.fecha_inicio,"YYYY-MM-DD"),
                        end: moment(value.fecha_termino,"YYYY-MM-DD").add(1, 'days'),
                        solicitud: value,
                        backgroundColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                        borderColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                        textColor: triTheming.rgba(triTheming.palettes[color]['500'].contrast),
                        palette: color
                    };
                    vm.eventSources[0].events.push(mockup);
                });
            });
        }

        function getBrackground(status) {
            if (status === 'Envio') {
                return 'teal';
            } else if (status === 'Recoleccion') {
                return 'blue-grey';
            } else {
                return 'indigo';
            }

        }
    }
})();
