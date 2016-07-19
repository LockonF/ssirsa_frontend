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
        var role=PersonaLocalService.role.name;

        function loadMenu(){
            triMenu.menu=[];
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
                    loadAdminMenu();
                    //loadTecnicoAMenu();
                    break;
                case "Tecnico B":
                    loadTecnicoBMenu();
                    break;
                case "Tecnico C":
                    loadTecnicoCMenu();
                    break;
                case "Tecnico D":
                    loadTecnicoDMenu();
                    break;
                case "Tecnico E":
                    loadTecnicoEMenu();
                    break;
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
                },
                {
                    name: 'Servicios',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority:3,
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

        }

        function loadTecnicoAMenu(){

        }

        function loadTecnicoBMenu(){

        }

        function loadTecnicoCMenu(){

        }

        function loadTecnicoDMenu(){

        }

        function loadTecnicoEMenu(){

        }


        return service;
    }
})();