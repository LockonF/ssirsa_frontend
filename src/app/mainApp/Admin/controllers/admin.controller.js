/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('gestion_userController',gestion_userController);

    function gestion_userController($translate,groups,PersonaLocalService,Persona_Admin,toastr,Helper,Upload,OAuthToken,SERVER){
        var vm = this;
        vm.isClient=true;
        activate();
        function activate(){
            groups.list().then(function(rest){
                vm.grupos=rest;
                //console.log(vm.udns);
                //console.log(vm.isClient);
            }).catch(function(error){

            });

            /*if(PersonaLocalService.role.name == 'Cliente'){
                vm.isClient=true;
            }else{
                vm.isClient=false;
            }
            console.log(vm.isClient);*/
        }
        // Crear requisito
        vm.guardarUsuario = guardarUsuario;
        vm.enviar =enviar;
        vm.clean=clean;
        vm.cancel=cancel;
        vm.selectionFoto=selectionFoto;
        vm.selectionIFE=selectionIFE;
        vm.user={
            "mail":""
        }
        vm.user_ini={
            "user": {
                "username": "",
                "email": "",
                "cpassword": "",
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

        function guardarUsuario2(){
            vm.user_ini.foto=vm.picFoto;
            vm.user_ini.ife=vm.picIFE;
            Persona_Admin.create(vm.user_ini).then(function(resp){
                vm.user_ini= _.clone(vm.user_vacio);
                toastr.success('exito al guardar','exito');
                vm.user_ini={
                    "user": {
                        "username": "",
                        "email": "",
                        "cpassword": "",
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
            }).catch(function(err){
                toastr.error('error al guardar','error');
                console.log(err);
            })
        }

        function guardarUsuario() {
            vm.user_ini.foto=vm.picFoto;
            vm.user_ini.ife=vm.picIFE;
            console.log(vm.user_ini);
            Upload.upload({
                url: SERVER.URL+'solicitud_admin',
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'POST',
                data: vm.user_ini
            }).then(function (res) {
                vm.user_ini= _.clone(vm.user_vacio);
                toastr.success('exito al guardar','exito');
                vm.user_ini={
                    "user": {
                        "username": "",
                        "email": "",
                        "cpassword": "",
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
            }, function (resp) {

                toastr.error('error al guardar','error');
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
                    "cpassword": "",
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
