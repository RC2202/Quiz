angular
.module('app.app')
.controller('selectCtrl', selectCtrl);
selectCtrl.$inject = ['$scope', '$state', '$ionicHistory', '$log','mcq', 'ques'];
function selectCtrl($scope, $state, $ionicHistory,$log, mcq, ques) {
  $log.debug('inside selectCtrl');
  var vm = this;
  vm.back = back;
  vm.next = next;
  vm.fetchDeck = fetchDeck;
  vm.levels = Object.keys(ques.getQuesDetail());
  vm.decks = ['All decks'];
  // $log.debug(vm.levels);
  vm.select={
    'level':"All levels",
    'deck':"All decks"
  };

  function fetchDeck(){
    $log.debug('fetchDeck');
    vm.select.deck ="All decks";
    vm.decks = Object.keys(ques.getQuesDetail()[vm.select.level]);
    // $log.debug(vm.decks);
  }

  function back(){
    $log.debug('back');
    //check for hardware back button
    // $ionicHistory.goBack();
    $state.go('app');
  }

  function next(){
    // $log.debug(vm.select);
    $log.debug('next');
    ques.setLevel(vm.select.level);
    ques.setDeck(vm.select.deck);
    //set max question value for range
    ques.setMaxQues(mcq.maxQ(vm.select));

    $state.go('duration');
  }


};
