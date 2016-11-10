/**
 * Created by Adan on 05/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('ListReportsController', ListReportsController);

    function ListReportsController(Reportes, toastr, Translate,$window) {
        var vm = this;
        vm.selectedReport = selectedReport;
        vm.downloadReport = downloadReport;
        activate();

        function activate() {
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.successRemission = Translate.translate('MAIN.MSG.SUCCESS_REPORT');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            Reportes.getReportsGenerated().then(function (res) {
                vm.reportes = res;
                vm.reportes=_.sortBy(vm.reportes, 'name');
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            })


        }

        function selectedReport(item) {
            vm.selectedReportList = item;
        }

        function downloadReport() {

            $window.open(vm.selectedReportList.report_file, '_blank','');


        }
    }
})();
