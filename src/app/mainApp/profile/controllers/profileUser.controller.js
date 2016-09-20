/**
 * Created by Sandra Ivette on 6/09/16.
 */
(function () {
    angular
        .module('app.mainApp.profile')
        .controller('profileUserController',profileUserController);

    function profileUserController(groups,udn,Persona,toastr,Helper,Translate){
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


            Persona.list().then(function(rest){
                vm.user_ini=rest;
                vm.picFoto=vm.user_ini.foto;
                vm.picIFE=vm.user_ini.ife;
            }).catch(function (error){
            });
        }

        vm.cpassword="";
        vm.guardarUsuario = guardarUsuario;
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
        vm.correo={
            to:vm.user.mail,
            from:"sssir@mail.com.mx",
            content: "Buen día, el motivo del presente correo es informarle que" +
            "ya cuenta con una cuenta del tipo" +vm.user.tipo+
            " para hacer uso de SSIR, a continuación se le dará su usuario:" +vm.user.user+
            ", y contraseña:" +vm.user.password+
            ", sin más por el momento esperamos disfrute del sistema y le recordamos que en su primer acceso" +
            "ingrese su Información Personal"
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
            vm.correo={
                to:vm.user.mail,
                from:"sssir@mail.com.mx",
                content: "Buen día, el motivo del presente correo es informarle que" +
                "ya cuenta con una cuenta del tipo" +vm.user.tipo+
                " para hacer uso de SSIR, a continuación se le dará su usuario:" +vm.user.user+
                ", y contraseña:" +vm.user.password+
                ", sin más por el momento esperamos disfrute del sistema y le recordamos que en su primer acceso" +
                "ingrese su Información Personal"
            };
        }
        function enviar() {


            vm.correo={
                to:vm.user.mail,
                from:"sssir@mail.com.mx",
                content: "Buen día, el motivo del presente correo es informarle que" +
                "ya cuenta con una cuenta del tipo" +vm.user.tipo+
                " para hacer uso de SSIR, a continuación se le dará su usuario:" +vm.user.user+
                ", y contraseña:" +vm.user.password+
                ", sin más por el momento esperamos disfrute del sistema y le recordamos que en su primer acceso" +
                "ingrese su Información Personal"
            };

            vm.user={
                user:"",
                password:"",
                confirm:"",
                mail:"" ,
                tipo:""

            };

            vm.correo={
                to:vm.user.mail,
                from:"sssir@mail.com.mx",
                content: "Buen día, el motivo del presente correo es informarle que" +
                "ya cuenta con una cuenta del tipo" +vm.user.tipo+
                " para hacer uso de SSIR, a continuación se le dará su usuario:" +vm.user.user+
                ", y contraseña:" +vm.user.password+
                ", sin más por el momento esperamos disfrute del sistema y le recordamos que en su primer acceso" +
                "ingrese su Información Personal"
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

        function guardarUsuario(){
            if(vm.picFoto!=vm.user_ini2.foto)
            vm.user_ini2.foto=vm.picFoto;
            if(vm.picIFE!=vm.user_ini2.ife)
            vm.user_ini2.ife=vm.picIFE;

            if(vm.user_ini2.udn == null)
                delete vm.user_ini2['udn'];
            Persona_Admin.createObject(vm.user_ini2).then(function (res) {

            }).catch(function (err) {
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

