(function () {
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


        ////////////////

        // add an event to switch tabs (used when user clicks a menu item before sidebar opens)
        $scope.$on('triSwitchNotificationTab', function ($event, tab) {
            vm.currentTab = tab;
        });

        // fetch some dummy emails from the API
        $http({
            method: 'GET',
            url: API_CONFIG.url + 'email/inbox'
        }).success(function (data) {
            vm.emails = data.slice(1, 20);
        });

        function close() {
            $mdSidenav('notifications').close();
        }
    }
})();
