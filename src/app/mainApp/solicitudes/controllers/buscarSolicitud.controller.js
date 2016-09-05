/**
 * Created by Luis_Olvera on 15/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('buscarSolicitudController',buscarSolicitudController);

    function buscarSolicitudController($mdEditDialog,Solicitudes,Solicitudes_Admin,udn,modelo_cabinet,Solicitud_Servicio,Session){
        var vm = this;
        vm.flag=0;
        vm.query={
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.id=null;
        vm.FechaFin=new Date();
        //Filtro de busqueda
        vm.tipo_solicitud=null;
        vm.filtro_busqueda=null;
        vm.busqueda_status=null;
        vm.folio=null;
        vm.sol=null;
        vm.solicitudesArray=[];
        //-------------------
        vm.requisito = {
            "id":null,
            "udn":null,
            "fecha_inicio":new Date(),
            "fecha_termino":new Date(),
            "fecha_atendida":new Date(),
            "descripcion":null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos":[],
            "modelo_cabinet":null
        };
        vm.solicitud = [
            {
                "id":123,
                "udn": "UDN_2",
                "fecha_inicio": "6/12/2016",
                "fecha_termino": "7/12/2016",
                "tipo_solicitud": "UDN_3",
                "status": "Dañado",
                "comentario": "10"
            },
            {
                "id":124,
                "udn": "UDN_2",
                "fecha_inicio": "6/12/2016",
                "fecha_termino": "7/12/2016",
                "tipo_solicitud": "UDN_1",
                "status": "Dañado",
                "comentario": "1"
            },
            {
                "id":125,
                "tipo_solicitud": "UDN_2",
                "status": "Dañado",
                "comentario": "5"
            },
            {
                "id": 126,
                "udn": "UDN_2",
                "fecha_inicio": "6/12/2016",
                "fecha_termino": "7/12/2016",
                //"rDesc": null,
                "tipo_solicitud": "UDN_3",
                "status": "Dañado",
                "comentario": "8"
            }
        ];

        vm.mostrarRequisito=mostrarRequisito;
        vm.eliminarRequisito=eliminarRequisito;
        vm.buscarSolicitudes=buscarSolicitudes;
        vm.buscarSolicitudesVentas=buscarSolicitudesVentas;
        vm.busqueda=busqueda;
        vm.borrarSolicitudVenta=borrarSolicitudVenta;
        vm.borrarSolicitud=borrarSolicitud;
        vm.edit=edit;

        vm.Requisitos = [];
        vm.solicitudes=null;
        vm.solicitudesVentas=null;
        vm.isClient=true;
        activate();
        function activate(){
            udn.list().then(function(rest){
                vm.udns=rest;
                //console.log(vm.udns);
                console.log(vm.isClient);
            }).catch(function(error){

            });

            modelo_cabinet.list().then(function(rest){
                vm.tiposEquipo=rest;
                //console.log(vm.tiposEquipo);
            }).catch(function(error){

            });
            vm.isClient = Session.userRole == 'Cliente';
            console.log(vm.isClient);

        }


        function edit(event,object,field) {
            var config =
            {
                modelValue: object[field],
                placeholder: 'Edita el campo',
                save: function (input) {

                    object[field] = input.$modelValue;
                    updateObject(object);
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            };

            function updateObject(funcion){
            }

            $mdEditDialog.small(config).then(function(ctrl){
            }).catch(function(err){
            });
        }

        function mostrarRequisito() {
            if (vm.flag==0) {
                vm.flag = 1;
                //console.log(vm.flag);
            }
            console.log("Entre al flag: "+vm.flag);
            for(var k in vm.solicitud) {
                console.log("Entre al for ");
                console.log("vm.solicitud[k].id: "+vm.solicitud[k].id);
                console.log("vm.id: "+vm.id);
                console.log("k: "+k);
                if (vm.solicitud[k].id==vm.id)
                {
                    console.log("Entre al if- k: "+k);
                    console.log("vm.solicitud[k].id: "+vm.solicitud[k].id)
                    console.log("vm.solicitud[k].udn: "+vm.solicitud[k].udn);
                    console.log("vm.solicitud[k].fecha_inicio: "+vm.solicitud[k].fecha_inicio);
                    console.log("vm.solicitud[k].fecha_termino: "+vm.solicitud[k].fecha_termino);
                    console.log("vm.solicitud[k].tipo_solicitud: "+vm.solicitud[k].tipo_solicitud);
                    console.log("vm.solicitud[k].status: "+vm.solicitud[k].status);
                    vm.requisito = {
                        "id":vm.solicitud[k].id,
                        "udn":vm.solicitud[k].udn,
                        "fecha_inicio":vm.solicitud[k].fecha_inicio,
                        "fecha_termino":vm.solicitud[k].fecha_termino,
                        //"rDesc":vm.solicitud[k],
                        "tipo_solicitud": vm.solicitud[k].tipo_solicitud,
                        "status": vm.solicitud[k].status,
                        "comentario": vm.solicitud[k].comentario
                    };

                    // console.log("Objeto: "+vm.requisito);
                    // console.log("Tipo: "+vm.requisito.tipo_solicitud);
                    console.log("el requisito es:"+vm.requisito.id);
                    console.log("vm.requisito.id: "+vm.requisito.id)
                    console.log("vm.requisito.udn: "+vm.requisito.udn);
                    console.log("vm.requisito.fecha_termino: "+vm.requisito.fecha_termino);
                    console.log("vm.requisito.fecha_inicio: "+vm.requisito.fecha_inicio);
                    console.log("vm.requisito.tipo_solicitud: "+vm.requisito.tipo_solicitud);
                    console.log("vm.requisito.status: "+vm.requisito.status);
                    console.log("requisito:");
                    console.log(vm.requisito);
                    vm.Requisitos.push(vm.requisito);
                    console.log("el arreglo tiene:",vm.Requisitos[0].id);
                    console.log(vm.Requisitos);
                }
            }
            /*if (vm.requisito != null) {
             console.log("requisitos antes de agregarlo");
             console.log(vm.Requisitos);
             vm.id=vm.id+1;//ID
             console.log("El id es:"+vm.id);
             //vm.Requisitos.id=vm.id;
             vm.Requisitos.push(vm.requisito);
             console.log("requisitos despues de agregarlo");
             console.log(vm.Requisitos);

             vm.requisito = {
             "id":vm.id,
             "udn":null,
             "fecha_inicio":new Date(),
             "fecha_termino":new Date(),
             "rDesc":null,
             "tipo_solicitud": tipo,
             "status": null,
             "comentario": null
             };

             console.log("Los requisitos son:");
             console.log(vm.Requisitos);
             }*/
        }

        // Eliminar Requisito


        function eliminarRequisito(requisito) {

            vm.requisitocopy=requisito;
            var index=0;

            for (index = 0; index < vm.Requisitos.length; ++index) {//Cambiar a un for each

                console.log("El requisito a borrar es:"+vm.requisitocopy.tipo_solicitud);
                console.log(vm.Requisitos[index]);
                if (vm.Requisitos[index].id == vm.requisitocopy.id) {

                    console.log(index);
                    //if(vm.Requisitos[index].Descripcion==vm.requisitocopy.Descripcion){
                    console.log("voy a borrar");
                    console.log(vm.Requisitos[index]);
                    vm.Requisitos.splice(index, 1);
                    //
                }
                else{console.log("Aun no lo encuentro")}

            }

        }

        function editarRequisito(requisito) {

        }

        function buscarSolicitudes(){
            console.log("vm.tipo_solicitud");
            console.log(vm.tipo_solicitud);
            if(!vm.isClient){
                //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                Solicitudes_Admin.list().then(function (rest){
                    console.log("Soy admin--");
                    console.log(vm.requisito);
                    vm.solicitudes = rest;
                    console.log(vm.solicitudes);
                }).catch(function(error){
                    console.log(error);
                })
            }else {

                Solicitudes.list().then(function (rest) {
                    console.log("Soy cliente");
                    vm.solicitudes = rest;
                    console.log(vm.solicitudes);
                    //if(vm.solicitudes)
                    //console.log(vm.udns);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }

        function busqueda() {
            vm.solicitudes = null;
            vm.sol=null;
            vm.solicitudesArray = [];
            console.log("entre a busqueda");
            switch (vm.tipo_solicitud) {
                case 'Envio':
                    console.log("entre a envio");
                    console.log(vm.filtro_busqueda);
                    if(vm.filtro_busqueda == 'Por Folio')
                    {
                        //vm.solicitudesVentas=null;
                        if(!vm.isClient){
                            //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                            Solicitudes_Admin.list().then(function (rest){
                                console.log("Soy admin--");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Envio')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function(error){
                                console.log(error);
                            })
                        }else {

                            Solicitudes.list().then(function (rest) {
                                console.log("Soy cliente");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Envio')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }


                    }
                    else//vm.filtro_busqueda == 'Por Estatus' Envio
                    {
                        if(!vm.isClient){
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                console.log(rest.length);
                                if(rest.length>0) {
                                    console.log("mayor a 0");
                                    vm.solicitudes = rest;
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Envio')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log("vm.solicitudes::");
                                    console.log(vm.solicitudes);
                                    if(vm.solicitudes==null) {
                                        toastr.warning('Solicitudes ' + vm.busqueda_status + 's no encontradas', 'Advertencia');
                                    }

                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }else{
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    console.log(vm.solicitudes);
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Envio')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log(vm.solicitudes);
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    }
                    break;
                case 'Recoleccion':
                    console.log("entre a Recoleccion");
                    console.log(vm.filtro_busqueda);
                    if(vm.filtro_busqueda == 'Por Folio')
                    {
                        //vm.solicitudesVentas=null;
                        if(!vm.isClient){
                            //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                            Solicitudes_Admin.list().then(function (rest){
                                console.log("Soy admin--");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function(error){
                                console.log(error);
                            })
                        }else {

                            Solicitudes.list().then(function (rest) {
                                console.log("Soy cliente");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }


                    }
                    else//vm.filtro_busqueda == 'Por Estatus' Recoleccion
                    {
                        if(!vm.isClient){
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                console.log(rest.length);
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }

                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log("vm.solicitudes::");
                                    console.log(vm.solicitudes);
                                    if(vm.solicitudes==null) {
                                        toastr.warning('Solicitudes ' + vm.busqueda_status + 's no encontradas', 'Advertencia');
                                    }
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }else{
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    console.log(vm.solicitudes);
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log(vm.solicitudes);
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    }
                    break;
                case 'Venta':
                    console.log("solicitudesVentas1");
                    console.log("vm.tipo_solicitud");
                    console.log(vm.tipo_solicitud);

                    Solicitud_Servicio.list().then(function (rest){
                        vm.solicitudesVentas = rest;
                        console.log("vm.solicitudesVentas = ");
                        console.log(vm.solicitudesVentas);
                    }).catch(function(error){
                        console.log(error);
                    })
                    console.log("solicitudesVentas2");
                    break;
            }
        }



        function buscarSolicitudesVentas(){
            console.log("vm.tipo_solicitud");
            console.log(vm.tipo_solicitud);

            Solicitud_Servicio.list().then(function (rest){
                vm.solicitudesVentas = rest;
                console.log("vm.solicitudesVentas = ");
                console.log(vm.solicitudesVentas);
            }).catch(function(error){
                console.log(error);
            })

        }

        function borrarSolicitudVenta(id){

        }

        function borrarSolicitud(id){
            Solicitudes_Admin.borrarSol(id).then(function(resp){
                //console.log(id);
                vm.busqueda();
                //console.log(resp);
            }).catch(function(err){

                console.log(err);
            })

            busqueda();
        }

    }

})();
