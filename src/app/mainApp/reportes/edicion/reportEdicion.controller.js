/**
 * Created by Emmanuel on 31/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('reportEditionController',reportEditionController);

    function reportEditionController (Reportes, $mdDialog,Translate, $stateParams, OPTIONS){
        //Variables
        var vm=this;
        vm.formato = "DD-MM-YYYY";
        vm.filterType = OPTIONS.filter;
        vm.days = OPTIONS.days;
        vm.showEditionFields=showEditionFields;

        activate();

        //Translates
        vm.tableDisplayHeaders=[
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        vm.tableFilterHeaders=[
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        //Blank templates

        //Functions
        function activate(){
            vm.report=Reportes.getReport($stateParams.id);
        }
        function showEditionFields() {
            $mdDialog.show({
                controller: 'FieldsReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/edicion/modal/fields.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true,
                locals: {
                    reporte: vm.report
                }
            });
        }
    }
})();
