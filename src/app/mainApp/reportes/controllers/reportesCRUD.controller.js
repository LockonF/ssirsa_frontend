/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController',ReportsCrudController);

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
            vm.report="";
            vm.reports=Reportes.getReports();
            vm.filteredReports=Reportes.getReports();
            vm.searchParameter='';
            console.log(vm.filteredReports);
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