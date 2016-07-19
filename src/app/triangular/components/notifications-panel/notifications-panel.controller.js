(function() {
    'use strict';

    angular
        .module('triangular.components')
        .controller('NotificationsPanelController', NotificationsPanelController);

    /* @ngInject */
    function NotificationsPanelController($scope, $http, $mdSidenav, $state, API_CONFIG) {
        var vm = this;
        // sets the current active tab
        vm.close = close;
        vm.currentTab = 0;
        vm.solicitudes = [{
            title:'Loncheria Martinez',
            type:'Servicio en Sucursal',
            icon:'fa fa-home',
            fecha:'06-08-2016'
        },
            {
                title:'La Tapatía',
                type:'Servicio en Sucursal',
                icon:'fa fa-home',
                fecha:'06-07-2016'
            },
            {
                title:'Unilever',
                type:'Recolección',
                icon:'fa fa-archive',
                fecha:'06-07-2016'
            },

        ];
        vm.solicitudes2 = [{
            title:'Distribuidora 1',
            type:'Servicio',
            icon:'fa fa-wrench',
            fecha:'06-08-2016'
        },
            {
                title:'Distribuidora 2',
                type:'Servicio ',
                icon:'fa fa-wrench',
                fecha:'06-07-2016'
            },
            {
                title:'Unilever',
                type:'Recolección',
                icon:'fa fa-archive',
                fecha:'06-07-2016'
            },{
                title:'Unilever2',
                type:'Recolección',
                icon:'fa fa-archive',
                fecha:'06-07-2016'
            },

        ];

        ////////////////

        // add an event to switch tabs (used when user clicks a menu item before sidebar opens)
        $scope.$on('triSwitchNotificationTab', function($event, tab) {
            vm.currentTab = tab;
        });

        // fetch some dummy emails from the API
        $http({
            method: 'GET',
            url: API_CONFIG.url + 'email/inbox'
        }).success(function(data) {
            vm.emails = data.slice(1,20);
        });

        function openMail() {
            $state.go('triangular-no-scroll.email.inbox');
            vm.close();
        }

        function close() {
            $mdSidenav('notifications').close();
        }
    }
})();
