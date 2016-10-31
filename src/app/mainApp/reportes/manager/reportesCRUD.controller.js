/**
 * Created by Emmanuel on 16/10/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController', ReportsCrudController)
        .filter('reportSearch', reportSearch);
    function ReportsCrudController(toastr, $mdDialog, Reportes, Translate) {
        //Variable declaration
        var vm=this;
        vm.isOpen = false;
        vm.hidden=false;
        vm.report=null;

        //Function parse
        vm.selected=selected;
        vm.lookup=lookup;
        vm.querySearch=querySearch;
        vm.selectedItemChange=selectedItemChange;
        vm.operacion=operacion;
        vm.remove=remove;

        //Translates
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.successCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_SUCCESS');
        vm.errorCreate=Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_ERROR');
        vm.successDelete=Translate.translate('REPORTS.MESSAGES.REPORT_DELETE_SUCCESS');
        vm.errorDelete=Translate.translate('REPORTS.MESSAGES.REPORT_DELETE_ERROR');
        vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
        vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
        vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
        vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');

        activate();
        function activate() {
            vm.reports=Reportes.getReports();
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
        function remove(){
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                Reportes.deleteReport(vm.report).then(function(){
                    toastr.success(vm.successDelete,vm.successTitle);
                    activate();
                }).catch(function(){
                    toastr.error(vm.errorDelete,vm.errorTitle);
                });
            }, function (){
                //Cancelled
            });

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
