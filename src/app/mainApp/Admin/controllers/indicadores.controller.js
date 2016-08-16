/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.admin')
        .controller('indicadoresController',indicadoresController);

    function indicadoresController($translate, $interval){
        var vm = this;
        var maximum = 100;

        vm.labels1 = ['Download Sales', 'Instore Sales', 'Mail Order'];
        vm.options1 = {
            datasetFill: false
        };


        function randomData1() {
            vm.data1 = [];
            for(var label = 0; label < vm.labels1.length; label++) {
                vm.data1.push(Math.floor((Math.random() * 100) + 1));
            }
        }


        randomData1();

        $interval(randomData1, 5000);


        vm.labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        vm.series2 = ['Series A', 'Series B', 'Series C'];
        vm.options2 = {
            datasetFill: true
        };

        function randomData2() {
            vm.data2 = [];
            for(var series = 0; series < vm.series2.length; series++) {
                var row = [];
                for(var label = 0; label < vm.labels2.length; label++) {
                    row.push(Math.floor((Math.random() * 100) + 1));
                }
                vm.data2.push(row);
            }
        }
        randomData2();

        $interval(randomData2, 5000);

        vm.data = [[]];
        vm.labels = [];
        vm.options = {
            animation: false,
            showScale: false,
            showTooltips: false,
            pointDot: false,
            datasetStrokeWidth: 0.5
        };

        $interval(function () {
            getLiveChartData();
        }, 40);

        function getLiveChartData () {
            if (vm.data[0].length) {
                vm.labels = vm.labels.slice(1);
                vm.data[0] = vm.data[0].slice(1);
            }

            while (vm.data[0].length < maximum) {
                vm.labels.push('');
                vm.data[0].push(getRandomValue(vm.data[0]));
            }
        }

        function getRandomValue (data) {
            var l = data.length, previous = l ? data[l - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            return y < 0 ? 0 : y > 100 ? 100 : y;
        }

        //---------------------------------
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
