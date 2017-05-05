angular
.module('app.factories')
.factory('ques', ques);
ques.$inject  = ['$log'];
function ques($log){
  var data, level, deck, maxQues, quesDetail, quiz, selectQues, time, response, timeElapsed;
  var ques ={};

  ques.setJSON = function(datajson){
    $log.debug('setJSON');
    data = datajson;
  }
  ques.getJSON = function(){
    $log.debug('getJSON');
    return data;
  }
  ques.setLevel = function(levelopt){
    $log.debug('setLevel');
    level = levelopt;
  }
  ques.getLevel = function(){
    $log.debug('getLevel');
    return level;
  }
  ques.setDeck =function(deckopt){
    $log.debug('setDeck');
    deck = deckopt;
  }
  ques.getDeck =function(deckopt){
    $log.debug('getDeck');
    return deck;
  }
  ques.setMaxQues = function(maxQ){
    $log.debug('setMaxQues');
    maxQues = maxQ;
  }
  ques.getMaxQues = function(){
    $log.debug('getMaxQues');
    return maxQues
  }
  ques.setQuesDetail = function(quesD){
    $log.debug('setQuesDetail');
    quesDetail = quesD;
  }
  ques.getQuesDetail = function(){
    $log.debug('getQuesDetail');
    return quesDetail
  }
  ques.setQuiz = function(quizD){
    $log.debug('setQuiz');
    quiz = quizD;
  }
  ques.getQuiz = function(){
    $log.debug('getQuiz');
    return quiz
  }
  ques.setSelectQues = function(sq){
    $log.debug('setSelectQues');
    selectQues = sq;
  }
  ques.getSelectQues = function(){
    $log.debug('getSelectQues');
    return selectQues
  }
  ques.setTime = function(t){
    $log.debug('setTime');
    time = t;
  }
  ques.getTime = function(){
    $log.debug('getTime');
    return time
  }
  ques.setResponse = function(rs){
    $log.debug('setResponse');
    response = rs;
  }
  ques.getResponse = function(){
    $log.debug('getResponse');
    return response
  }
  ques.setTimeElapsed = function(te){
    $log.debug('setTimeElapsed');
    timeElapsed = te;
  }
  ques.getTimeElapsed = function(){
    $log.debug('getTimeElapsed');
    return timeElapsed
  }

  return ques;
}
