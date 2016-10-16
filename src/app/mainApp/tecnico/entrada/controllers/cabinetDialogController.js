/**
 * Created by Emmanuel on 15/10/2016.
 */
(function(){
    'use_strict';
    
    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController(Cabinet, MarcaCabinet, ModeloCabinet){
        var vm = this;

        //Functions
        vm.create=create;
        vm.filterModels=filterModels;

        //Blank variables templates
        var cabinet = {
            "economico": "",
            "deleted": false,
            "status": null,
            "id_unilever": "",
            "antiguedad": null,
            "activo": false,
            "capitalizado": false,
            "no_serie": "",
            "tipo_entrada": "",
            "year": null,
            "no_incidencias": null,
            "linea_x": null,
            "linea_y": null,
            "linea_z": null,
            "foto": null,
            "modelo": null,
            "insumo": null
        };
                
        activate();
        
        function activate(){
            vm.cabinet=angular.copy(cabinet);
            vm.marca=null;
            vm.marcas=MarcaCabinet.list();
            vm.modelos=[];
        }

        function filterModels(){
            vm.modelos=MarcaCabinet.getModels(vm.marca.id);
        }
        
        function create(){
            Cabinet.createClean(vm.cabinet);
        }
        
    }
})();