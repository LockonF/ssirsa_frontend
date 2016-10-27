/**
 * Created by franciscojaviercerdamartinez on 21/07/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.inventario')
        .controller('insumoController', insumoController);

    function insumoController(Translate, CatalogoInsumo, Insumo, toastr, Helper) {
        //Variable definition
        var vm = this;


        //Translates
        vm.successTitle=Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle=Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorGenericMesssage=Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        //Function parsing

        //Blank variables
        var insumo= {
            "cantidad": null,
            "no_remision": "",
            "usado": false,
            "fecha_alta": null,
            "linea": "",
            "no_serie": "",
            "catalogo": null
        };

        //Code
        activate();

        function activate(){
            CatalogoInsumo.listObject().then(function(res){
               vm.catalogoInsumos= Helper.filterDeleted(res,true);
            });
        }


    }


})();
