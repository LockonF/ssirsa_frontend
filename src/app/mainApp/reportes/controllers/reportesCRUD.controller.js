/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController',ReportsCrudController);

    function ReportsCrudController(toastr, Reportes, $scope,$mdDialog, Translate){
        var vm=this;

        //Function parse
        vm.search=search;
        vm.clickCopy=clickCopy;
        vm.querySearch=querySearch;
        vm.newReport=newReport;

        //Empty variables

        //Translates
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.successCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_SUCCESS');
        vm.errorCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_ERROR');

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

        function newReport(){
            $mdDialog.show({
                controller: 'DialogCrearReporteController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/dialogs/crear.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true
            }).then(function () {
                toastr.success(vm.successCreate,vm.successTitle);
            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorCreate,vm.errorTitle);
                }
            });
        }

    }
})();