/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reports')
        .controller('ReportsCrudController',ReportsCrudController);

    function ReportsCrudController(toastr, Reportes){
        var vm=this;

        //Function parse
        vm.search=search;
        vm.clickCopy=clickCopy;

        //Empty variables

        //Translates

        activate();
        //Functions
        function activate(){
            vm.reports=Reportes.getReports();
            vm.fullReports=Reportes.getFullReports();
            vm.filteredReports=angular.copy(vm.fullReports);
            vm.searchParameter='';
        }

        function search(text) {
            if(text.length>0) {
                vm.filteredReports = _.filter(vm.reports, function (item) {
                    return item.name.toLowerCase().includes(text.toLowerCase());
                });
            }
            return vm.filteredReports;
        }

        function clickCopy(item) {
            vm.isNew=false;
            vm.selectedClient=item;
            vm.client=angular.copy(item);
            vm.user.username=vm.client.user.username;
            vm.user.email=vm.client.user.email;
            vm.user
            $scope.formClient.$invalid=true;
        }

    }
})();