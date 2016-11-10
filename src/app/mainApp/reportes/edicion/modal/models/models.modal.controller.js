/**
 * Created by amezc on 04/11/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ModelsReportModalController', ModelsReportModalController);

    function ModelsReportModalController(Translate,Reportes,EVENTS_GENERAL, $rootScope,reporte, $mdDialog) {
        var vm = this;
        //Function parsing
        vm.cancel = cancel;
        vm.thema = "blue-grey";
        vm.tableDisplayHeaders=[
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];
        activate();

        function activate() {
            var root_related_field = {
                verbose_name: reporte.root_model_name,
                field_name: '',
                path: '',
                model_id: reporte.root_model,
                related_fields:[]
            };


            Reportes.getRelatedModels(reporte.root_model).then(function (result) {

                root_related_field.related_fields = result;
                vm.related_models=[root_related_field];
            });

        }
        $rootScope.$on(EVENTS_GENERAL.load_fields, function(event,fields) {
            console.log(fields);

        });
        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
