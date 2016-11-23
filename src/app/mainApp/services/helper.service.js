(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Helper', Helper);
    /**
     * @author Christian Adan Israel Amezcua Aguilar <amezcua9205@gmail.com>
     * @constructor
     */
    function Helper($rootScope, $log,$window) {
        var acceptFileTypes = /(jpe?g|png|bmp|vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel)$/i;
        return {
            acceptFile: acceptFile,
            showNotification: showNotification,
            addNotificationGlobal: addNotificationGlobal,
            filterDeleted: filterDeleted,
            searchByField: searchByField,
            sortByAttribute: sortByAttribute
        };

        /**
         * @description Se encarga de ordenar un array mediante la propiedad "attribute" especificada en la firma del método
         * @param {Object[]} array - El array a ordenar
         * @param {string} attribute - El atributo a ordenar
         * @returns {Object[]} El array filtrado por la propiedad "attribute"
         */
        function sortByAttribute(array, attribute) {
            return _.sortBy(array, function (obj) {
                return obj[attribute]
            });
        }



        /**
         * @description Se encarga de filtrar un array mediante la propiedad de "deleted".
         * @param {Object[]} array - El array que se tiene que filtrar.
         * @param {Boolean} status - Indica que tipo de elementos queremos que regrese del array.
         * @returns {Object[]} El array filtrado por la propiedad "deleted"
         */
        function filterDeleted(array, status) {
            return _.filter(array, function (obj) {
                return !(obj.deleted == status);
            });
        }

        /**
         * @description Se encarga de buscar y regresar un objeto dentro de un array mediante su id
         * @param {Object[]} array - El array que se tiene que filtrar.
         * @param {number} value - Indica el id del elemento a buscar
         * @returns {Object|undefined} El resultado de la búsqueda.
         */
        function searchByField(array, value) {
            return _.findWhere(array, {
                id: value
            });
        }


        /**
         * @description Se encarga de checar si la extensión de un archivo es aceptado.
         * @param {string} name - Nombre del archivo.
         * @returns {Boolean} Si es válido o no el nombre de un archivo.
         */
        function acceptFile(name) {
            return acceptFileTypes.test(name);
        }

        /**
         * @description Se encarga de mostrar una notificación al usuario.
         * @property {Object} info Un objeto con la información para la notificación.
         */
        function showNotification(info,title,url) {
            if (!("Notification" in window)) {
                $log.info("Este navegador no soporta notificaciones de escritorio");
            }
            else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
            else if (Notification.permission === "granted") {
                console.log("notificación");
                /*var options = {
                    body: info,
                    icon: "https://s3-us-west-2.amazonaws.com/resources-sssirsa/logo.png",
                    dir: "ltr"
                };
                new Notification("SSSIRSA", options);*/
                Push.create(title, {
                    body:info,
                    icon: 'https://resources-sssirsa.s3.amazonaws.com/logo_icon_32.png',
                    timeout: 10000,
                    onClick: function () {
                        window.focus();
                        if(url!=null) {
                            $window.open(url, '_blank', '');
                        }
                        this.close();
                    }
                });

            }
        }

        /**
         * @description Se encarga de mostrar agregar una notificación en la barra superior
         * @property {Object} notification - Un objeto con la información de la notificación.
         */
        function addNotificationGlobal(notification) {
            $rootScope.notifications.messages.push(notification);
            $rootScope.notifications.owner.not_seen++;
            $rootScope.notifications.owner.tickets++;
            $rootScope.notifications.all_notifications++;
            $rootScope.notifications.messages = _.sortBy($rootScope.notifications.messages, 'updated_at').reverse();
        }

    }
})();
