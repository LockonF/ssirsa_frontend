(function () {
  'use strict';

  angular
    .module('app.mainApp.socket')
    .run(moduleRun);

  function moduleRun($log, Socket, Helper) {
    Socket.on('saludo', function (dfs) {
      $log.info(dfs);
    });
    Socket.on('command', function (dfs) {
      if (dfs.command === 'refresh') {
        window.location.reload();
      } else if (dfs.command === 'alert') {
        Helper.showNotification(dfs.msg);
      }
    });

    Notification.requestPermission(function (permission)  {
      if  (!('permission'  in  Notification))  {
          Notification.permission  =  permission;
      }
    });

  }
})();
