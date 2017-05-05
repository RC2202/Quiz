'use strict';

/**

Created By : 1119327
Creation Date : Mon Jan 09 2017 16:49:50 GMT+0530 (India Standard Time)

*/

// init modules, module names equal to folder structure
angular.module('app.app', []); // view controllers etc.
angular.module('app.services', []); // services
angular.module('app.filters', []); // filter
angular.module('app.factories', []); // helper
angular.module('app.directives', []); // directives

angular.module('app.libs', ['ui.router', 'ui.bootstrap', 'ionic', 'ion-datetime-picker', 'chart.js', 'timer']);

angular.module('app', ['app.services', 'app.filters', 'app.factories', 'app.directives', 'app.app', 'app.libs'])

.run(function($ionicPlatform, $log) {

  $log.debug('run');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $log.debug('ionic ready');
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.constant('Config', {
  constantVariables: "constantValue"
})

.config(function($stateProvider, $urlRouterProvider, $logProvider, ChartJsProvider) {
  $logProvider.debugEnabled(true);
  ChartJsProvider.setOptions({ colors : [ '#FF495F', '#0FFF5B'] });

  $stateProvider
  .state("app", {
    url: "/app",
    cache:false,
    // templateUrl: "src/app/app.html",
    // controller: "homeCtrl",
    views:{
      '': {
        templateUrl: "src/app/app.html"
      },
      "appContent@app":{
        templateUrl: "src/app/home/home.html",
        controller: "homeCtrl",
        controllerAs: "vm"
      }
    }
  })
  .state("select",{
    url: "/select",
    cache:false,
    templateUrl: "src/app/select/select.html",
    controller: "selectCtrl",
    controllerAs: "vm"
  })
  .state("duration",{
    url: "/duration",
    cache:false,
    templateUrl: "src/app/duration/duration.html",
    controller: "durationCtrl",
    controllerAs: "vm"
  })
  .state("quiz",{
    url: "/quiz",
    cache:false,
    templateUrl: "src/app/quiz/quiz.html",
    controller: "quizCtrl",
    controllerAs: "vm"
  })

  .state("quizsubmit",{
    url: "/quizsubmit",
    cache:false,
    templateUrl: "src/app/quizsubmit/quizsubmit.html",
    controller: "quizsubmitCtrl",
    controllerAs: "vm"
  })
  .state("quizresult",{
    url: "/quizresult",
    cache:false,
    templateUrl: "src/app/quizresult/quizresult.html",
    controller: "quizresultCtrl",
    controllerAs: "vm"
  });

  $urlRouterProvider.otherwise('/app');
  window.location.hash="#";
});
