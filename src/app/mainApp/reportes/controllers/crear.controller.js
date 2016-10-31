/**
 * Created by Emmanuel on 30/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('DialogCrearReporteController',dialogCrearReporteController);

    function dialogCrearReporteController(Reportes, $mdDialog){
        var vm=this;
        //Function parsing
        vm.create=create;
        vn.cancel=cancel;

        var report={
            "name": "",
            "description": "",
            "root_model": ""
        };

        activate();

        function activate(){
            vm.modelos=Reportes.getModels();
            vm.report=report;
        }

        function create() {
        Reportes.createReport(vm.report).then(function(){
            $mdDialog.hide();
        }).catch(function (err){
            $mdDialog.cancel(err);
        })
        }

        function cancel(){
            $mdDialog.cancel(null);
        }
    }
})();