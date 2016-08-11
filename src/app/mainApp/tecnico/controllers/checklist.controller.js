/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function(){
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('checklistController', checklistController);

    function checklistController(){
        var vm=this;
       
        vm.diagnostico={


        };

        vm.status = 'idle';  // idle | uploading | complete
        vm.upload = upload;
        vm.buscar=buscar;
        vm.guardar=guardar;

        var fileList;
        ////////////////
        function buscar(){
            vm.diagnostico={
                idCabinet:"34124142112443",
                isSalida:true,
                isCabinet:true,
                rodajas:10,
                canastillas:2,
                puertas:1,
                rejillas:0,
                sticker:false,
                pintura:true,
                lavado:true,
                emplayado:false,
                lubricacion:true,
                listo:false,
                file:"assets/images/files/refri1.jpg"

            };

        }
        function guardar(){
            vm.diagnostico={
                idCabinet:"",
                isSalida:false,
                isCabinet:false,
                rodajas:null,
                canastillas:null,
                puertas:null,
                rejillas:null,
                sticker:null,
                pintura:null,
                lavado:null,
                emplayado:null,
                lubricacion:null,
                file:null

            };

        }
        function upload($files) {
            $files="assets/images/files/refri2.jpg";
            if($files !== null ) {
                vm.diagnostico.file = $files;

                //uploadStarted();

                $timeout(uploadComplete, 4000);
            }
        }

        //function uploadStarted() {
          //  vm.status = 'uploading';
       // }

        function uploadComplete() {
            vm.status = 'complete';
            var message = 'Thanks for ';
            for(var file in fileList) {
                message += fileList[file].name + ' ';
            }

            $mdToast.show({
                template: '<md-toast><span flex>' + message + '</span></md-toast>',
                position: 'bottom right',
                hideDelay: 5000
            });

            $timeout(uploadReset, 3000);
        }

        function uploadReset() {
            vm.status = 'idle';
        }




    }


})();