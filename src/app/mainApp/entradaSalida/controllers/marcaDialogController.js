/**
 * Created by Emmanuel on 03/09/2016.
 */
(function(){
    'use_strict'
    angular
        .module('app.mainApp.entradaSalida')
        .controller('marcaDialogController',marcaDialogController);

    function marcaDialogController(MarcaCabinet){

        vm.save=save;
        vm.cancel=cancel;
        vm.marca={
            "categoria":"",
            "descripcion":""
        }

        function save(){
            MarcaCabinet.post(vm.marca).then(function(res){

            }).catch(function(err){

            });
        }

        function cancel(){

        }
    }
})();