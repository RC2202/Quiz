angular
.module('app.app')
.controller('durationCtrl',durationCtrl);
durationCtrl.$inject = ['$scope', '$state', '$log',  'ques', 'generateQuiz', '$filter'];
function durationCtrl($scope, $state, $log, ques, generateQuiz, $filter) {
  $log.debug('inside durationCtrl');
  var vm = this;
  vm.setTimer = setTimer;
  vm.begin = begin;
  vm.back = back;
  vm.nosQ = ques.getMaxQues();
  vm.selectNosQ =vm.nosQ;
  vm.convToTimeFormat = convToTimeFormat;
  vm.hours = convToTimeFormat(0);
  vm.minutes = convToTimeFormat(30);
  vm.timeValue =new Date(2016, 1, 3, 0,1,0);
  function convToTimeFormat(val){
    if(Math.floor(val/10) ==0){
      return ("0" + val).slice(-2);
    }
    else{
      return val
    }
  }

  function setTimer(){
    console.log(vm.timeValue);
  }
  function begin(){
    console.log(vm.selectNosQ);
    ques.setSelectQues(vm.selectNosQ);
    ques.setQuiz(generateQuiz.generateQuizList(Number(vm.selectNosQ)));
    console.log(ques.getQuiz());

    var x = [$filter('date')(vm.timeValue, "HH"), $filter('date')(vm.timeValue, "mm")];

    var convertToSec = Number(x[0])*60*60 + Number(x[1]*60);
    ques.setTime(convertToSec);
    $state.go('quiz');
  }
  function back(){
    $state.go('select');
  }

};
