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

    function CreateReportModalController(toastr, Reportes,$mdDialog) {
        var vm=this;
        vm.cancelClick = cancelClick;
        activate();
        function activate() {

        }
        function cancelClick() {
            $mdDialog.cancel();
        }

    }

})();
