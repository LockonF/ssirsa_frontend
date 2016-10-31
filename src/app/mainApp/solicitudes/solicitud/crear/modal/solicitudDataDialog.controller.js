/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .controller('solicitudDataDialogController',solicitudDataDialogController);
    function solicitudDataDialogController(Helper,$mdDialog,TipoEquipo,OPTIONS)
    {
        var vm = this;
        vm.status=OPTIONS.status_equipment;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.tiposEquipo=null;
        activate();
        function activate(){
             TipoEquipo.listWitout().then(function (res) {
                 vm.tiposEquipo=Helper.filterDeleted(res,true);
                 vm.tiposEquipo=_.sortBy(vm.tiposEquipo, 'nombre');
            });
        }
        function submit()
        {
            $mdDialog.hide(vm.object);
        }

        function cancel()
        {
            $mdDialog.cancel();
        }
    }
})();
