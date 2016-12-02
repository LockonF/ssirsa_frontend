/**
 * Created by amezc on 01/12/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('CreateReportModalController', CreateReportModalController);

    function CreateReportModalController( unidad, $mdDialog, $state) {
        var vm = this;
        //Function parsing
        vm.create = create;
        vm.cancel = cancel;

        var unidad_var = {
            "name": ""
        };
        vm.unidad=angular.copy(unidad_var);
        activate();

        function activate() {
        }

        function create() {
            unidad.create(vm.unidad).then(function () {
                $mdDialog.hide();
            }).catch(function (err) {

                //$mdDialog.cancel(err);
            });
        }

        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();

