/**
 * Created by Luis_Olvera on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('gestion_userController', gestion_userController);

    function gestion_userController(groups, NotificationPanel, Persona_Admin, Session,toastr, Helper, Translate, $scope, Sucursal) {
        var vm = this;
        vm.isClient = true;
        activate();
        vm.cpassword = "";
        vm.fotoByPass = null;
        vm.ifeByPass = null;
        vm.guardarUsuario = guardarUsuario;
        vm.listSucursales = listSucursales;
        vm.enviar = enviar;
        vm.clean = clean;
        vm.cancel = cancel;
        vm.selectionFoto = selectionFoto;
        vm.selectionIFE = selectionIFE;
        function activate() {

            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            groups.list().then(function (rest) {
                vm.grupos = rest;
            }).catch(function (error) {

            });
            //vm.sucursales =Sucursal.list();
            listSucursales();
        }


        vm.user = {
            "mail": ""
        };
        vm.user_ini = {
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
            "ife": null,
            "foto": null
        };

        vm.user_vacio = {
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
            "ife": null,
            "foto": null
        };


        function clean() {
            vm.user = {
                user: "",
                password: "",
                confirm: "",
                mail: "",
                tipo: ""

            };
            vm.cpassword = '';
        }

        function enviar() {

            vm.user = {
                user: "",
                password: "",
                confirm: "",
                mail: "",
                tipo: ""

            };
        }

        function listSucursales() {
            Sucursal.listObject().then(function (res) {
                vm.sucursales = Helper.filterDeleted(res, true);
                vm.sucursales = _.sortBy(vm.sucursales, 'descripcion');
            });
        }

        function guardarUsuario() {
            vm.user_ini.foto = vm.picFoto;
            vm.user_ini.ife = vm.picIFE;

            if (vm.user_ini.sucursal == null)
                delete vm.user_ini['sucursal'];
            Persona_Admin.createObject(vm.user_ini).then(function (res) {
                var grupo=_.findWhere(vm.grupos,{name:"Administrador"});
                var role=null;
                if(vm.user_ini.user.role==grupo.id && vm.user_ini.sucursal!=null ){
                    role=0;
                }else{
                    role=vm.user_ini.user.role;
                }
                var request = {
                    username: vm.user_ini.user.username,
                    name: vm.user_ini.nombre + " " + vm.user_ini.apellido_paterno + " " + vm.user_ini.apellido_materno,
                    office:vm.user_ini.sucursal,
                    profile:role
                };
                NotificationPanel.createUser(request).then(function () {
                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function () {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                });
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
        }


        function cancel() {
            $scope.objectForm.$setPristine();
            $scope.objectForm.$setUntouched();
            vm.user_ini = _.clone(vm.user_vacio);
            vm.picFoto = null;
            vm.picIFE = null;
            vm.ifeByPass = null
            vm.fotoByPass = null;
            vm.user_ini = {
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
                "ife": null,
                "foto": null
            };
            vm.cpassword = ''
        }


        function selectionFoto($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFoto = null;

                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFoto = null;
                    }
                }else
                {
                    vm.fotoByPass=vm.picFoto;
                }
            }

        }

        function selectionIFE($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picIFE = null;

                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picIFE = null;
                    }
                }else
                {
                    vm.ifeByPass=vm.picIFE;
                }
            }

        }


    }

})();
