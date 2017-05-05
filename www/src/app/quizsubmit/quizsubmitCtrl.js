angular
.module('app.app')
.controller('quizsubmitCtrl',quizsubmitCtrl);
quizsubmitCtrl.$inject = ['$scope', '$state', '$log'];
function quizsubmitCtrl($scope, $state, $log) {
  $log.debug('quizsubmitCtrl');
  var vm = this;
  vm.back = back;
  vm.submit = submit;


  function back(){
    $log.debug('back');

  }
  function submit(){
    $log.debug('submit test');
    $state.go('quizresult');
  }

}
