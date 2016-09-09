/**
 * Created by lockonDaniel on 9/8/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoTransporteController',TipoTransporteController);

    function TipoTransporteController(TipoTransporte)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.tipo_transporte_list = null;
        vm.tipo_transporte = null;

        vm.text = 'Hola';

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;

        activate();


        function activate(){
            TipoTransporte.list().then(function(res){
                vm.tipo_transporte_list  = res;
                console.log(vm.tipo_transporte_list);
            }).catch(function(err){

            });

        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.tipo_transporte_list,function(item){
               return item.descripcion.includes(search_text);
            });
            return vm.search_items;
        }

        function selectedItemChange(tipo_transporte){

        }

        function  cancel(){
            vm.tipo_transporte = null;
        }

    }

})();