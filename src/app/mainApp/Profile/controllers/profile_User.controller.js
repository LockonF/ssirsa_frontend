/**
 * Created by Sandra Ivette on 6/09/16.
 */
(function () {
    angular
        .module('app.mainApp.profile')
        .controller('profileUserController',profileUserController);

    /* @ngInject */
    function profileUserController(Persona,toastr,Helper,Translate){
        var vm = this;
        vm.picFoto=null;
        vm.picIFE=null;
        vm.user_ini={
            "id":"",
            "nombre": "",
            "apellido_paterno": "",
            "apellido_materno": "",
            "direccion": "",
            "telefono": "",
            "ife":null,
            "foto":null
        };

        activate();
        function activate(){
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.exitoUpdate = Translate.translate('PROFILE.PROPERTY.MODIFY_EXITO');
            vm.errorUpdate = Translate.translate('PROFILE.PROPERTY.MODIFY_ERROR');
            vm.exito = Translate.translate('PROFILE.PROPERTY.EXITO');
            vm.error = Translate.translate('PROFILE.PROPERTY.ERROR');

            Persona.listProfile().then(function(rest){
                vm.user_ini=rest;
                vm.picFoto=vm.user_ini.foto;
                vm.picIFE=vm.user_ini.ife;
            }).catch(function (error){
            });
        }

        vm.selectionFoto=selectionFoto;
        vm.selectionIFE=selectionIFE;
        vm.updatePersona=updatePersona;

        function updatePersona(){
            if(vm.picFoto!=vm.user_ini.foto)
                vm.user_ini.foto=vm.picFoto;
            else
                vm.user_ini.foto=null;
            if(vm.picIFE!=vm.user_ini.ife)
                vm.user_ini.ife=vm.picIFE;
            else
                vm.user_ini.ife=null;

            Persona.modify(vm.user_ini).then(function (res) {
                toastr.success(vm.exitoUpdate,vm.exito);

            }).catch(function (err) {
                toastr.error(vm.errorUpdate, vm.error);

            });
        }

        function selectionFoto($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn=file.name.split(".").pop();
                if(file.size/1000000>1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFoto = null;

                }else if (!Helper.acceptFile(file.type))  {
                    if (!Helper.acceptFile(extn))  {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFoto = null;
                    }
                }
            }

        }

        function selectionIFE($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn=file.name.split(".").pop();
                if(file.size/1000000>1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picIFE = null;

                }else if (!Helper.acceptFile(file.type))  {
                    if (!Helper.acceptFile(extn))  {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picIFE = null;
                    }
                }
            }

        }


    }

})();

