/**
 * Created by Emmanuel on 16/10/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController', ReportsCrudController)
        .filter('reportSearch', reportSearch);
    function ReportsCrudController(toastr, Reportes) {
        var vm=this;
        vm.report=null;
        vm.selected=selected;
        vm.lookup=lookup;
        vm.querySearch=querySearch;
        activate();
        function activate() {
            vm.reports=Reportes.getFullReports();
        }
        function querySearch(query) {
            return query ? lookup(query) : vm.reports;

        }
        function lookup(search_text) {
            vm.search_items = _.filter(vm.reports, function (item) {
                return item.name.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
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
