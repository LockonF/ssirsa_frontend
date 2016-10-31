/**
 * Created by Emmanuel on 16/10/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController', ReportsCrudController)
        .filter('reportSearch', reportSearch);
    function ReportsCrudController(toastr,$mdDialog, Reportes,Translate) {
        var vm=this;
        vm.isOpen = false;
        vm.hidden=false;
        vm.report=null;
        vm.selected=selected;
        vm.lookup=lookup;
        vm.querySearch=querySearch;
        vm.selectedItemChange=selectedItemChange;
        vm.operacion=operacion;
        activate();
        function activate() {
            vm.reports=Reportes.getReports();
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_SUCCESS');
            vm.errorCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_ERROR');

        }
        function querySearch(query) {
            return query ? lookup(query) : vm.reports;

        }
        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.report=angular.copy(item);

            }else{
                //cancel();
            }
        }
        function lookup(search_text) {
            vm.search_items = _.filter(vm.reports, function (item) {
                return item.name.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }
        function operacion($event,id) {
            if(id==0){
                $mdDialog.show({
                    controller: 'CreateReportModalController',
                    controllerAs: 'vm',
                    templateUrl: 'app/mainApp/reportes/manager/modal/createReport.modal.tmpl.html',
                    fullscreen: true,
                    clickOutsideToClose: true,
                    focusOnOpen: true
                }).then(function () {
                    toastr.success(vm.successCreate,vm.successTitle);
                }).catch(function (err) {
                    if (err != null) {
                        toastr.error(vm.errorCreate,vm.errorTitle);
                    }
                });
            }
        }
        function selected(item) {
            vm.selectedReport=item;
            vm.report=angular.copy(item);
        }
    }

    function reportSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };


    }
})();