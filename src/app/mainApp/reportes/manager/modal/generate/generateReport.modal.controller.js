/**
 * Created by amezc on 30/10/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('GenerateReportModalController', GenerateReportModalController);

    function GenerateReportModalController( OPTIONS,Reportes, $mdDialog, reporte) {
        var vm = this;
        //Function parsing
        vm.exportar = exportar;
        vm.cancel = cancel;
        vm.report=reporte;
        vm.formats=OPTIONS.formats;
        vm.formatSelected="xlsx";



        function exportar() {
            Reportes.requestReport(vm.report.id,vm.formatSelected).then(function (res) {
                $mdDialog.hide();
            }).catch(function (err) {
                $mdDialog.cancel(err);
            });
        }

        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
