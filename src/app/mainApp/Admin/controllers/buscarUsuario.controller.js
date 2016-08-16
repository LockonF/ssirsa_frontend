/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('buscarUsuarioController', buscarUsuarioController);

    function buscarUsuarioController() {
        var vm = this;
        vm.flag = 0;
        vm.id = null;
        vm.userName="";
        vm.FechaFin = new Date();
        vm.user = {
            id: "",
            user: "",
            password: "",
            confirmPass: "",
            nombre: "",
            aPaterno: "",
            aMaterno: "",
            mail: "",
            telefono: "",
            direccion: "",
            sucursal: "",
            ine: "",
            foto: "",
            tipo: ""

        };
        vm.solicitud = [
            {
                id: "1",
                user: "User_1",
                password: "123456",
                confirmPass: "123456",
                nombre: "Usuario 1 prueba",
                aPaterno: "Ap 1 prueba",
                aMaterno: "Ap 1 prueba",
                mail: "mail1@prueba.com",
                telefono: "00000000",
                direccion: "dirección 1 prueba",
                sucursal: "Sucursal_1",
                ine: "ine_1",
                foto: "Foto_1",
                tipo: "Tipo_1"
            },
            {
                id: "2",
                user: "User_2",
                password: "223456",
                confirmPass: "223456",
                nombre: "Usuario 2 prueba",
                aPaterno: "Ap 2 prueba",
                aMaterno: "Ap 2 prueba",
                mail: "mail2@prueba.com",
                telefono: "00000000",
                direccion: "dirección 2 prueba",
                sucursal: "Sucursal_2",
                ine: "ine_2",
                foto: "Foto_2",
                tipo: "Tipo_2"
            },
            {
                id: "3",
                user: "User_3",
                password: "333456",
                confirmPass: "333456",
                nombre: "Usuario 3 prueba",
                aPaterno: "Ap 3 prueba",
                aMaterno: "Ap 3 prueba",
                mail: "mail3@prueba.com",
                telefono: "00000000",
                direccion: "dirección 3 prueba",
                sucursal: "Sucursal_3",
                ine: "ine_3",
                foto: "Foto_3",
                tipo: "Tipo_3"
            },
            {
                id: "4",
                user: "User_4",
                password: "444456",
                confirmPass: "444456",
                nombre: "Usuario 4 prueba",
                aPaterno: "Ap 4 prueba",
                aMaterno: "Ap 4 prueba",
                mail: "mail4@prueba.com",
                telefono: "00000000",
                direccion: "dirección 4 prueba",
                sucursal: "Sucursal_4",
                ine: "ine_4",
                foto: "Foto_4",
                tipo: "Tipo_4"
            }
        ];

        vm.mostrarUsuario = mostrarUsuario;
        vm.eliminarUsuario = eliminarUsuario;
        vm.Usuarios = [];

        function mostrarUsuario() {

            console.log("Entre al flag: " + vm.flag);
            for (var k in vm.solicitud) {
                console.log("Entre al for ");
                console.log("vm.solicitud[k].id: " + vm.solicitud[k].id);
                console.log("vm.id: " + vm.id);
                console.log("k: " + k);
                if (vm.solicitud[k].user == vm.userName) {
                    if (vm.flag == 0) {
                        vm.flag = 1;
                    }
                    console.log("Entre al if- k: " + k);
                    console.log("vm.solicitud[k].id: " + vm.solicitud[k].id);
                    vm.usuario = {
                        id: vm.solicitud[k].id,
                        user: vm.solicitud[k].user,
                        password: vm.solicitud[k].password,
                        confirmPass: vm.solicitud[k].confirmPass,
                        nombre: vm.solicitud[k].aMaterno,
                        aPaterno: vm.solicitud[k].aPaterno,
                        aMaterno: vm.solicitud[k].aMaterno,
                        mail: vm.solicitud[k].mail,
                        telefono: vm.solicitud[k].telefono,
                        direccion: vm.solicitud[k].direccion,
                        sucursal: vm.solicitud[k].sucursal,
                        ine: vm.solicitud[k].ine,
                        foto: vm.solicitud[k].foto,
                        tipo: vm.solicitud[k].tipo
                    };
                    console.log("el usuario es:" + vm.usuario.id);
                    console.log("usuario:");
                    console.log(vm.usuario);
                    vm.Usuarios.push(vm.usuario);
                    console.log("el arreglo tiene:", vm.Usuarios[0].id);
                    console.log(vm.Usuarios);
                }
            }
        }

        // Eliminar usuario
        function eliminarUsuario(usuario) {

            vm.usuariocopy = usuario;
            var index = 0;

            for (index = 0; index < vm.Usuarios.length; ++index) {

                console.log("El usuario a borrar es:" + vm.usuariocopy.rTipo);
                console.log(vm.Usuarios[index]);
                if (vm.Usuarios[index].id == vm.usuariocopy.id) {

                    console.log(index);
                    console.log("voy a borrar");
                    console.log(vm.Usuarios[index]);
                    vm.Usuarios.splice(index, 1);

                }
                else {
                    console.log("Aun no lo encuentro")
                }

            }

        }

    }

})();