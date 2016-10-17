/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reports')
        .controller('ReportsCrudController',ReportsCrudController);

    function ReportsCrudController(toastr, Reportes, $scope){
        var vm=this;

        //Function parse
        vm.search=search;
        vm.clickCopy=clickCopy;
        vm.querySearch=querySearch;

        //Empty variables

        //Translates

        activate();
        //Functions
        function activate(){
            vm.report={};
            vm.reports=Reportes.getFullReports();
            vm.filteredReports=angular.copy(vm.reports);
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
            vm.selectedReport=item;
            vm.report=angular.copy(item);
            //$scope.formClient.$invalid=true;
        }

        function querySearch(query) {
            var results = query ? search(query) : vm.reports;
            return results;

        }

    }
})();