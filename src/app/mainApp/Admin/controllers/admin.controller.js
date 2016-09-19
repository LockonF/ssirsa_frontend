/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('gestion_userController',gestion_userController);

    function gestion_userController(groups,udn,Persona_Admin,toastr,Helper,Translate){
        var vm = this;
        vm.isClient=true;
        activate();



        function activate(){

            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            groups.list().then(function(rest){
                vm.grupos=rest;
            }).catch(function(error){

            });

            udn.list().then(function(res){
                vm.udns = res;
            })

        }
        vm.cpassword="";
        vm.guardarUsuario = guardarUsuario;
        vm.enviar =enviar;
        vm.clean=clean;
        vm.cancel=cancel;
        vm.selectionFoto=selectionFoto;
        vm.selectionIFE=selectionIFE;
        vm.user={
            "mail":""
        };
        vm.user_ini={
            "user": {
                "username": "",
                "email": "",
                "password": "",
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

            console.log(vm.user);

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
            console.log(vm.correo);

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

        function guardarUsuario(){
            vm.user_ini.foto=vm.picFoto;
            vm.user_ini.ife=vm.picIFE;

            if(vm.user_ini.udn == null)
                delete vm.user_ini['udn'];
            Persona_Admin.createObject(vm.user_ini).then(function (res) {

            }).catch(function (err) {
                console.log(err);
            });
        }


        function cancel(){
            vm.user_ini= _.clone(vm.user_vacio);
            vm.picFoto=null;
            vm.picIFE=null;
            vm.user_ini={
                "user": {
                    "username": null,
                    "email": "",
                    "password": "",
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
