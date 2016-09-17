/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function () {
    'use strict';
    angular.module('app.mainApp').controller('solicitudDataDialogController',solicitudDataDialogController);
    function solicitudDataDialogController($mdDialog,modelo_cabinet)
    {
        var vm = this;

        vm.options =[
            {value:'Energia en Base kWh'},
            {value:'Energia en Intermedia kWh'},
            {value:'Energia en Punta kWh'},
            {value:'Demanda Facturable kW'} ];
        vm.cancel = cancel;
        vm.submit = submit;
        vm.tiposEquipo=null;
        activate();
        function activate(){
            modelo_cabinet.list().then(function(resp){
                vm.tiposEquipo=resp;
            }).catch(function(err){

            })
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