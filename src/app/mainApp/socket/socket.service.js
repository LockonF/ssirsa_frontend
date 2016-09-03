(function () {
  'use strict';

  angular
    .module('app.mainApp.socket')
    .factory('Socket', Socket);

  function Socket($rootScope,EnvironmentConfig) {
    var socket = io.connect(EnvironmentConfig.site.socket.baseUrl);
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };

  }
})();
