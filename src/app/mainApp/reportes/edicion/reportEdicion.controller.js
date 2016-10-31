/**
 * Created by Emmanuel on 31/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('reportEditionController',reportEditionController);

    function reportEditionController (Reportes, Translate, $stateParams){
        //Variables
        var vm=this;
        var reportID= $stateParams.id;
        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};

        activate();

        //Translates

        //Blank templates

        //Functions
        function activate(){
            vm.report=Reportes.getReport(reportID);
            console.log(vm.report);
        }
    }
})();