/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('gestion_userController',gestion_userController);

    function gestion_userController($translate){
        var vm = this;


        vm.enviar =enviar;
        vm.clean=clean;
        vm.user={
            user:"",
            password:"",
            confirm:"",
            nombre:"",
            aPaterno:"",
            aMaterno:"",
            mail:"",
            telefono:"",
            direccion:"",
            sucursal:"",
            ine:"",
            foto:"",
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


    }

})();
