/**
 * Created by Sandra Ivette on 6/09/16.
 */
(function () {
    angular
        .module('app.mainApp.profile')
        .controller('profileUserController',profileUserController);

    function profileUserController(udn,Persona,toastr,Helper,Translate){
        var vm = this;
        vm.picFoto=null;
        vm.picIFE=null;
        vm.persona={
            "nombre": "",
            "apellido_paterno": "",
            "apellido_materno": "",
            "direccion": "",
            "telefono": "",
            "ife":null,
            "foto":null
        };
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

        vm.isClient=true;
        activate();
        function activate(){

            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.exitoUpdate = Translate.translate('PROFILE.MODIFY_EXITO');
            vm.errorUpdate = Translate.translate('PROFILE.MODIFY_ERROR');
            vm.exito = Translate.translate('PROFILE.EXITO');
            vm.error = Translate.translate('PROFILE.ERROR');

            vm.user_ini=Persona.list();
        }

        vm.cpassword="";
        vm.enviar =enviar;
        vm.clean=clean;
        vm.cancel=cancel;
        vm.selectionFoto=selectionFoto;
        vm.selectionIFE=selectionIFE;
        vm.updatePersona=updatePersona;
        vm.user={
            "mail":""
        };
        vm.user_vacio={
            "user": {
                "username": "",
                "email": "",
                "role": ""
            },
            "nombre": "",
            "apellido_paterno": "",
            "apellido_materno": "",
            "direccion": "",
            "telefono": "",
            "ife":null,
            "foto":null
        };


        function clean() {
            vm.user={
                user:"",
                password:"",
                confirm:"",
                mail:"" ,
                tipo:""

            };
            vm.cpassword = '';

        }
        function enviar() {

            vm.user={
                user:"",
                password:"",
                confirm:"",
                mail:"" ,
                tipo:""

            };

        }

        function updatePersona(){
            if(vm.picFoto!=vm.user_ini.foto)
                vm.user_ini.foto=vm.picFoto;
            else
                vm.user_ini.foto=null;
            if(vm.picIFE!=vm.user_ini.ife)
                vm.user_ini.ife=vm.picIFE;
            else
                vm.user_ini.ife=null;

            //vm.user_ini.foto=vm.picFoto;
            //vm.user_ini.ife=vm.picIFE;
            Persona.modify(vm.user_ini).then(function (res) {
                toastr.success(vm.exitoUpdate,vm.exito);

            }).catch(function (err) {
                toastr.error(vm.errorUpdate, vm.error);

            });
        }



        function cancel(){
            vm.user_ini2= _.clone(vm.user_vacio);
            vm.picFoto=null;
            vm.picIFE=null;
            vm.user_ini={
                "nombre": "",
                "apellido_paterno": "",
                "apellido_materno": "",
                "direccion": "",
                "telefono": "",
                "ife":null,
                "foto":null
            };
            vm.cpassword = ''
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

