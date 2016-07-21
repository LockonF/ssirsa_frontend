/**
 * Created by Emmanuel on 18/07/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('dynamicMenu',dynamicMenu);

    function dynamicMenu(triMenu,PersonaLocalService){
        var service={
          loadMenu:loadMenu
        };


        function loadMenu(){
            triMenu.menu=[];
            var role=PersonaLocalService.role.name;
            switch (role){
                case "Administrador":
                    loadAdminMenu();
                    break;
                case "Capturista":
                    loadCapturistaMenu();
                    break;
                case "Cliente":
                    loadClienteMenu();
                    break;
                case "Tecnico A":
                    loadTecnicoMenu();
                    break;
                case "Tecnico B":
                    loadTecnicoMenu();
                    break;
                case "Tecnico C":
                    loadTecnicoMenu();
                    break;
                case "Tecnico D":
                    loadTecnicoMenu();
                    break;
                case "Tecnico E":
                    loadTecnicoMenu();break;
                default:
            }
        }

        function loadAdminMenu(){
            triMenu.menu=[];
            var adminMenu=[
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Gestion de Usuarios',
                    icon: 'zmdi zmdi-user',
                    type: 'dropdown',
                    priority:2,
                    children:[
                        {
                            name:'Nuevo usuario',
                            state:'trianggular.admin-default.newUsuario',
                            type:'link'
                        },
                        {
                            name:'Buscar usuarios',
                            state:'trianggular.admin-default.lokUsuario',
                            type:'link'
                        }
                    ]
                },
                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority:3,
                    children: [
                        {
                            name: 'Solicitudes Pendientes',
                            state: 'triangular.admin-default.solicitudes',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Servicios',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority:4,
                    children: [
                        {
                            name: 'Diagnosticos',
                            state: 'triangular.admin-default.diagnostico',
                            type: 'link'
                        },
                        {
                            name:'Registrar Servicio',
                            state: 'triangular.admin-default.servicio',
                            type:'link'
                        }
                    ]
                }
            ]

            //triMenu.menu.unshift(adminMenu);
            triMenu.menu=adminMenu;
        }

        function loadCapturistaMenu(){
            triMenu.menu=[];
            var capturistaMenu=[
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority:2,
                    children: [
                        {
                            name: 'Solicitudes Pendientes',
                            state: 'triangular.admin-default.solicitudes',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                }
            ]
            triMenu.menu=capturistaMenu;
        }

        function loadClienteMenu(){
            triMenu.menu=[];
            var clienteMenu=[
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },

                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority:2,
                    children: [
                        {
                            name: 'Solicitudes Pendientes',
                            state: 'triangular.admin-default.solicitudes',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                }
            ]

            //triMenu.menu.unshift(adminMenu);
            triMenu.menu=clienteMenu;
        }

        function loadTecnicoMenu(){
            triMenu.menu=[];
            var tecnicoMenu=[
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Servicios',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority:4,
                    children: [
                        {
                            name: 'Diagnosticos',
                            state: 'triangular.admin-default.diagnostico',
                            type: 'link'
                        },
                        {
                            name:'Registrar Servicio',
                            state: 'triangular.admin-default.servicio',
                            type:'link'
                        }
                    ]
                }
            ]

            //triMenu.menu.unshift(adminMenu);
            triMenu.menu=tecnicoMenu;
        }

        return service;
    }
})();