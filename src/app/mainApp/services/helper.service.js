(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Helper', Helper);
    /**
     * @author Christian Adan Israel Amezcua Aguilar <camezcua@mimoni.com>
     * @constructor
     */
    function Helper($rootScope, $log) {
        var acceptFileTypes = /(jpe?g|png|bmp|vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel)$/i;
        return {
            acceptFile: acceptFile,
            showNotification: showNotification,
            addNotificationGlobal: addNotificationGlobal
        };


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
        function showNotification(info) {
            if (!("Notification" in window)) {
                $log.info("Este navegador no soporta notificaciones de escritorio");
            }
            else if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
            else if (Notification.permission === "granted") {
                var options = {
                    body: info,
                    icon: "https://s3-us-west-2.amazonaws.com/resources-sssirsa/logo.png",
                    dir: "ltr"
                };
                new Notification("SSSIRSA", options);
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
