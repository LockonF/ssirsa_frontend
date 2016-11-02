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

        activate();

        //Translates

        //Blank templates

        //Functions
        function activate(){
            console.log($stateParams.id);
            vm.report=Reportes.getReport($stateParams.id);
            console.log(vm.report);
        }
    }
})();