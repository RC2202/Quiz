angular
.module('app.app')
.controller('quizresultCtrl',quizresultCtrl);
quizresultCtrl.$inject = ['$scope', '$state', '$log', 'evaluateResult', 'ques'];
function quizresultCtrl($scope, $state, $log, evaluateResult, ques) {
  $log.debug('quizresultCtrl');
  var vm = this;
  var res = evaluateResult.result();
  var t = ques.getTimeElapsed();
  console.log(t);
  vm.mark = mark;
  vm.next = next;
  vm.back = back;
  vm.totalQues = ques.getSelectQues();
  vm.correctAns = res[0];
  vm.wrongAns = res[1];
  $scope.labels = ["Correct", "Wrong"];
  $scope.data = res;
  $scope.colors = ['#808000','#008000'];

  vm.time = t.hours+" : "+ t.minutes+" : "+ t.seconds;

  function mark(){
    $log.debug('mark as read and next question');
  }

  function next(){
    $log.debug('next question');
  }

  function back(){
    $state.go('app');
  }

}
