/**
 * Created by Emmanuel on 31/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('reportEditionController',reportEditionController);

    function reportEditionController (Reportes, Translate, $stateParams){
        var vm=this;
        var reportID= $stateParams.id;

        activate();

        //Variables

        //Translates

        //Blank templates

        //Functions
        function activate(){
            vm.report=Reportes.getReport(reportID);
            console.log(vm.report);
        }
    }
})();