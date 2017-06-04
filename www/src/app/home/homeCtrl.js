angular
.module('app.app')
.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', '$state', '$timeout', '$log', 'ques','$http', 'mcq'];
function homeCtrl($scope, $state, $timeout, $log, ques, $http, mcq) {
  $log.debug('inside homeCtrl');
  // $state.go('select');
  var vm = this;
  vm.takeQuiz = takeQuiz;
  vm.viewStats = viewStats;

  function takeQuiz(){
    $log.debug('takeQuiz');

    $http.get('./json/data.json').success(function(response){
      // $log.debug(response);
      ques.setJSON(response);
      ques.setQuesDetail(mcq.init());
      $timeout(function(){
        $state.go('select');
      },10)
    });
  };

  function viewStats(){
    //stats
    $log.debug('viewStats');
    $state.go('chat');
  }
};
