angular
.module('app.app')
.controller('chatCtrl',chatCtrl);
chatCtrl.$inject = ['$scope', '$state', '$log',  '$ionicScrollDelegate', '$filter', '$http'];
function chatCtrl($scope, $state, $log, $ionicScrollDelegate, $filter, $http) {
  $log.debug('inside chatCtrl');
  var vm = this;
  $scope.hideTime = true;
  var counter = 0;
  $scope.base = 'https://api.wit.ai/';
  $scope.converse = 'converse';

  $scope.version = '04/06/2017';
  $scope.sessionID = generateSessionID();
  $scope.headers = {
    'Authorization': 'Bearer AVSTYROSGC6Y3YHJBJA6BOLTVOBS2FUL',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  $scope.body = {

  }

  $scope.params = {
    'v': $scope.version,
    'session_id': $scope.sessionID,
    'q': "",
    'context': "",
    // 'reset': false
  }

  $scope.context = {};
  var alternate,isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  $scope.sendMessage = function() {
    // alternate = !alternate;
    // var d = new Date();
    // d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    counter ++;
    $scope.messages.push({
      userId: 'user',
      text: $scope.data.message
    });
    var config = {
					headers: $scope.headers ,
					params: $scope.params
    }

    config.params.q  = $scope.data.message;
    $http({
					method: 'POST',
					url: $scope.base + $scope.converse,
					params: {
            'v': $scope.version,
            'session_id': $scope.sessionID,
            'q': $scope.data.message,
            // 'context': JSON.stringify($scope.context),
            // 'reset': false
          },
          data: JSON.stringify($scope.context),
					headers: {
            'Authorization': 'Bearer AVSTYROSGC6Y3YHJBJA6BOLTVOBS2FUL',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
				}).then(function(success){
      console.log(success);
    //   $scope.messages.push({
    //   userId: 'bot',
    //   text:success.data.type
    // });
    followUp(success);


    }, function(fail){
      console.log(fail);
    })
    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);
  };

  // when I send a msg call converse 

  function generateSessionID(){
      var temp =  new Date()
      return temp.toISOString().replace(/[TZ.:-]/g,"");
  }

  $scope.data = {};
  $scope.myId = 'bot'; //acutally alternate
  $scope.messages = [];


  // how to take care of the actions

  /* type are 
    merge, msg, action stop

    for each write the code


  */
  var  actions = {
      "setPizzaType": function(data){
        $scope.context["pizza"] = data.data.entities.pizza[0].value; // maximum confidence
        // $scope.context["missingPizza"] = 0;
      },
      "setPizzaSize": function(data){
        $scope.context["pizzaSize"] = data.data.entities.pizzaSize[0].value;
      }
    }


  followUp = function(data){

      switch(data.data.type) {
      case "msg":
         // code block
          $scope.messages.push({
            userId: 'bot',
            text:data.data.msg
          });
          break;
      case "action":
          // code block
          actions[data.data.action](data); // updated context

           $http({
                method: 'POST',
                url: $scope.base + $scope.converse,
                params: {
                  'v': $scope.version,
                  'session_id': $scope.sessionID,
                  'q': null,
                  // 'context': JSON.stringify($scope.context),
                  // 'reset': false
                },
                data:JSON.stringify($scope.context),
                headers: {
                  'Authorization': 'Bearer AVSTYROSGC6Y3YHJBJA6BOLTVOBS2FUL',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
              }).then(function(success){
                console.log(success);
                // $scope.messages.push({
                // userId: 'bot',
                // text:success.data
              // });
              followUp(success)
          }, function(fail){
            console.log(fail);
          })
          break;
      case "merge":
         // code block
          break;
      case "stop":
          // code block
          break;
      default:
          // code block
    }


  }

}
