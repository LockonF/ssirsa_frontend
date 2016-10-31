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
        .controller('CreateReportModalController', CreateReportModalController);

    function CreateReportModalController( Reportes, $mdDialog, $state) {
        var vm = this;
        //Function parsing
        vm.create = create;
        vm.cancel = cancel;

        var report = {
            "name": "",
            "description": "",
            "root_model": ""
        };

        activate();

        function activate() {
            vm.modelos = Reportes.getModels();
            vm.report = report;
        }

        function create() {
            Reportes.createReport(vm.report).then(function () {
                $mdDialog.hide();
                $state.go('triangular.admin-default.reportModify');
            }).catch(function (err) {
                $mdDialog.cancel(err);
            });
        }

        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
