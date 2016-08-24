(function () {
  'use strict';

  angular
    .module('app.mainApp')
    .factory('Helper', Helper);
  /**
   * @author Christian Adan Israel Amezcua Aguilar <camezcua@mimoni.com>
   * @constructor
   */
  function Helper() {
    var acceptFileTypes = /(jpe?g|png|bmp)$/i;
    return {
      acceptFile: acceptFile
    };



    /**
     * @description Se encarga de checar si la extensión de un archivo es aceptado.
     * @param {string} name - Nombre del archivo.
     * @returns {Boolean} Si es válido o no el nombre de un archivo.
     */
    function acceptFile(name) {
      return acceptFileTypes.test(name);
    }


  }
})();
