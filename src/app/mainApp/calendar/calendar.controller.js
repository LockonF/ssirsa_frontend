(function() {
    'use strict';

    angular
        .module('app.mainApp.calendar')
        .controller('CalendarController', CalendarController);

    /* @ngInject */
    function CalendarController($scope, $rootScope, $mdDialog, $mdToast, $filter, Solicitudes_Admin, triTheming, triLayout, uiCalendarConfig) {
        var vm = this;
        vm.addEvent = addEvent;
        vm.calendarOptions = {
            contentHeight: 'auto',
            selectable: true,
            editable: true,
            header: false,
            lang:'es-mx',
            viewRender: function(view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                console.log(view);
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10 calendar-background-month-' + vm.currentDay.month();
            },
            dayClick: function(date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function(calEvent, jsEvent, view) { //eslint-disable-line
                $mdDialog.show({
                    controller: 'EventDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/mainApp/calendar/event-dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'Edit Event',
                            confirmButtonText: 'Save'
                        },
                        event: calEvent,
                        edit: true
                    }
                })
                .then(function(event) {
                    var toastMessage = 'Event Updated';
                    if(angular.isDefined(event.deleteMe) && event.deleteMe === true) {
                        // remove the event from the calendar
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('removeEvents', event._id);
                        // change toast message
                        toastMessage = 'Event Deleted';
                    }
                    else {
                        // update event
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('updateEvent', event);
                    }

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

        function addEvent(event, $event) {
            var inAnHour = moment(vm.currentDay).add(1, 'h');
            $mdDialog.show({
                controller: 'EventDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/calendar/event-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    dialogData: {
                        title: 'Add-EVENT',
                        confirmButtonText: 'Add'
                    },
                    event: {
                        title: $filter('triTranslate')('New Event'),
                        allDay: false,
                        start: vm.currentDay,
                        end: inAnHour,
                        palette: 'cyan',
                        stick: true
                    },
                    edit: false
                }
            })
            .then(function(event) {
                vm.eventSources[0].events.push(event);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Event Created'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            });
        }



        // listeners

        $scope.$on('addEvent', addEvent);

        activate();
        function activate() {
            Solicitudes_Admin.consultaEspUnconfirmed().then(function (res) {
                res.forEach(function (value,index) {
                    console.log(value);
                    vm.eventSources[0].events.push({
                        title: value.descripcion,
                        allDay: false,
                        start: value.fecha_inicio,
                        end: value.fecha_termino,
                        //description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat! Libero ut in nam cum architecto error magnam, quidem beatae deleniti, facilis perspiciatis modi unde nostrum ea explicabo a adipisci!',

                        backgroundColor: triTheming.rgba(triTheming.palettes['orange']['500'].value),
                        borderColor: triTheming.rgba(triTheming.palettes['orange']['500'].value),
                        textColor: triTheming.rgba(triTheming.palettes['orange']['500'].contrast),
                        palette: 'orange'
                    });
                });
                //triTheming.palettes
                /*
                vm.eventSources[0].events.push({
                    title: eventNames[randomEvent],
                    allDay: false,
                    start: randomMonthDate,
                    end: inAnHour,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat! Libero ut in nam cum architecto error magnam, quidem beatae deleniti, facilis perspiciatis modi unde nostrum ea explicabo a adipisci!',

                    backgroundColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].value),
                    borderColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].value),
                    textColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].contrast),
                    palette: randomPalette
                });*/
            });
        }
    }
})();
