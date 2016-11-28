(function () {
    'use strict';

    angular
        .module('triangular.components')
        .controller('NotificationsPanelController', NotificationsPanelController);

    /* @ngInject */
    function NotificationsPanelController($scope, $window,$mdDialog,Reportes, $mdSidenav,NotificationPanel) {
        var vm = this;
        // sets the current active tab
        vm.close = close;
        vm.currentTab = 0;
        vm.click = click;


        ////////////////

        // add an event to switch tabs (used when user clicks a menu item before sidebar opens)
        $scope.$on('triSwitchNotificationTab', function ($event, tab) {
            vm.currentTab = tab;
        });
        function click(notification) {
            console.log(notification);
            var id=parseInt(notification.notification.idObject);
            if(notification.type==="Reporte"){

                Reportes.getReportObject(id).then(function (res) {
                    $window.open(res.report_file, '_blank', '');
                });
            }else{
                var config = {
                    controller: 'solicitudFullDetailDialogController',
                    controllerAs: 'vm',
                    bindToController: true,
                    templateUrl: 'app/mainApp/solicitudes/solicitud/view/solicitudDetailFull.dialog.tmpl.html',
                    parent: angular.element(document.body),
                    fullscreen: false,
                    locals: {
                        solicitud: notification.notification.idObject,
                        type:notification.type
                    }
                };
                $mdDialog.show(config);
            }

            /*NotificationPanel.markNotification(notification._id).then(function (res) {

            });*/
        }

        function close() {
            $mdSidenav('notifications').close();
        }
    }
})();
