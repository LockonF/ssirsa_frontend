/**
 * Created by amezc on 04/11/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('FieldsReportModalController', FieldsReportModalController);

    function FieldsReportModalController( Reportes,EVENTS_GENERAL, $mdDialog) {
        var vm = this;
        //Function parsing
        vm.cancel = cancel;
        vm.thema="blue-grey";
        vm.capturistaMenu = [
            {
                name: 'MAIN.MENU.WELCOME',
                icon: 'zmdi zmdi-home',
                type: 'dropdown',
                priority: 1,
                children: [
                    {
                        name: 'MAIN.MENU.START',
                        state: 'triangular.admin-default.bienvenida',
                        type: 'link'
                    }
                ]
            },
            {
                name: 'MAIN.MENU.WELCOME',
                icon: 'zmdi zmdi-home',
                type: 'dropdown',
                priority: 1,
                children: [
                    {
                        name: 'MAIN.MENU.START',
                        state: 'triangular.admin-default.bienvenida',
                        type: 'link'
                    }
                ]
            },
            {
                name: 'MAIN.MENU.WELCOME',
                icon: 'zmdi zmdi-home',
                type: 'dropdown',
                priority: 1,
                children: [
                    {
                        name: 'MAIN.MENU.START',
                        state: 'triangular.admin-default.bienvenida',
                        type: 'link'
                    }
                ]
            }
        ];


        activate();

        function activate() {
            Reportes.getRelatedModels(26,'entradasalida__').then(function (res) {
                console.log(res);
            });
        }


        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
