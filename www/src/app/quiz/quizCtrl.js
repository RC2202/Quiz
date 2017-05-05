angular
.module('app.app')
.controller('quizCtrl',quizCtrl);
quizCtrl.$inject = ['$scope', '$state', '$log', 'ques', '$ionicPopup', '$ionicSideMenuDelegate'];
function quizCtrl($scope, $state, $log, ques, $ionicPopup, $ionicSideMenuDelegate) {
  $log.debug('quizCtrl');
  var vm = this;
  var tempQ;
  var sqn = ques.getSelectQues();
  var responseArray = [];
  vm.mark = mark;
  vm.next = next;
  vm.clear = clear;
  vm.showHelp = showHelp;
  vm.init = init;
  vm.timeOver = timeOver;
  vm.toggleRightSideMenu = toggleRightSideMenu;
  vm.gotoQues = gotoQues;
  vm.index = 0;
  vm.totalQues = sqn;
  vm.answered =0;
  vm.mfr=0;
  vm.notAnswered = sqn;
  vm.timerRem = 0;//not sure
  vm.timerVal = ques.getTime();
  vm.quesList = ques.getQuiz();
  vm.getStatus =getStatus;
  vm.init(vm.index);
  vm.submit = submit;

  function init(index){
    tempQ = ques.getQuiz()[index];
    // console.log(tempQ);
    // var x = vm.getStatus();
    vm.word = tempQ.word;
    vm.options = tempQ.options;

  }

  function mark(){
    var prevMfr, prevAns;
    $log.debug('mark as read and next question');
    // var answered = true;
    if(vm.choice ==undefined){
      tempQ.response = "";
      tempQ.markForReview = false;
      // answered = false;
    }else{
      tempQ.response = vm.choice;
      tempQ.markForReview = true;
    }

    if(responseArray.length ==(sqn) || vm.index<responseArray.length){
      console.log('it has previously been attempted.');
      prevMfr = responseArray[vm.index].markForReview; //if 0 -> unanswered
      prevAns = responseArray[vm.index].response;
      console.log(prevMfr);
      if(tempQ.markForReview){ // if marked actuallly for review

        if(prevAns ===""){
          vm.mfr++;
          vm.notAnswered--;
        }
        if(prevAns !=="" && prevMfr==false){
          vm.mfr++;
          vm.answered--;
        }

      }else{
        // not marked for review --> unanswered

        if(prevMfr){
          // if previously mfr
          vm.mfr--;
          vm.notAnswered++;
        }
        if(prevAns !=="" && prevMfr ==false){
          vm.notAnswered++;
          vm.answered--;
        }
      }

      responseArray[vm.index] = tempQ;



    }else{
      var w = JSON.stringify(tempQ);

      responseArray.push(JSON.parse(w));

      if(tempQ.markForReview){

          vm.mfr++;
          vm.notAnswered--;
      }


    }

    vm.index++;
    if(vm.index == ques.getSelectQues()){
      vm.index =0;
    }
    vm.init(vm.index);
    vm.choice = undefined;
    $log.debug(responseArray);
  }


  function clear(){
    $log.debug('clear');
    vm.choice = undefined;
  }

  $scope.$on('timer-stopped', function (event, data){
  console.log(data);
  ques.setTimeElapsed(data);
  });

  function next(){
    var prevMfr, prevAns;
    $log.debug('next question');
    $log.debug(vm.choice);
    tempQ.markForReview =false;
    if(vm.choice ==undefined){
      tempQ.response = "";
    }else{
      tempQ.response = vm.choice;
    }

    if(responseArray.length== (sqn) ||  vm.index<responseArray.length){

      prevMfr = responseArray[vm.index].markForReview; //if 0 -> unanswered
      prevAns = responseArray[vm.index].response;

      if(tempQ.response=== ""){
        // not answered


        if(prevMfr==true){
          vm.mfr--;
          vm.notAnswered++;
        }

        if(prevAns !=="" && prevMfr==false){
          vm.answered--;
          vm.notAnswered++;
        }

        }
      else{
        // response is registered
        if(prevAns === ""){
          vm.answered++;
          vm.notAnswered--;

        }

        if(prevMfr){
            // previously mfr
            vm.mfr--;
            vm.answered++;
          }
        }

      responseArray[vm.index] = tempQ;


    }else{
      var w  = JSON.stringify(tempQ);
      responseArray.push(JSON.parse(w));
      if(tempQ.response!==""){
        console.log('resp');
        vm.answered++;
        vm.notAnswered--;
      }

    }


    vm.index++;
    if(vm.index == ques.getSelectQues()){
      vm.index =0;
    }
    vm.init(vm.index);
    vm.choice = undefined;
    $log.debug(responseArray);
    // $state.go('quizsubmit');
  }
  // An alert dialog
  function showHelp(){
    var alertPopup = $ionicPopup.alert({
      title: 'Sentence',
      template: tempQ.helpSentence
    });
    alertPopup.then(function(res) {
      $log.debug('help sentence');
    });
  };

  function timeOver(){
    console.log('time Over');
    // $scope.$broadcast('timer-stop');

    ques.setResponse(responseArray);
    $state.go('quizresult');
  }
  function toggleRightSideMenu(){
    $ionicSideMenuDelegate.toggleRight();
  }

  function gotoQues(index){
    console.log('gotoQues ' + index);
    $ionicSideMenuDelegate.toggleRight();
    vm.init(index);
    vm.index = index;
    vm.choice = undefined;
  }

  function getStatus(){
    console.log('getStatus');
  }

  function submit(){
    console.log('submit')
    $scope.$broadcast('timer-stop');
    ques.setResponse(responseArray);
    $state.go('quizresult');
  }

  $scope.$watch(function () {
      return $ionicSideMenuDelegate.getOpenRatio();
    },
      function (ratio) {
      if (ratio === 1){
        // $scope.isActive= true;
        console.log('v')
      } else{
          // $scope.isActive = false;

          // on openning sidebar

          console.log('w');
      }

    });


}
