/**
 * Created by amezc on 30/10/2016.
 */
/**
 * Created by Emmanuel on 16/10/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('CloneReportModalController', CloneReportModalController);

    function CloneReportModalController( Reportes, $mdDialog, reporte) {
        var vm = this;
        //Function parsing
        vm.create = create;
        vm.cancel = cancel;

        var report = {
            "id": "",
            "name": ""
        };
        vm.report=angular.copy(report);

        activate();

        function activate() {

        }

        function create() {
            vm.report.id=reporte.id;
            Reportes.cloneReport(vm.report).then(function (res) {
                $mdDialog.hide();
                $state.go('triangular.admin-default.reportModify',res.id);
            }).catch(function (err) {
                $mdDialog.cancel(err);
            });
        }

        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
