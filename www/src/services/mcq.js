angular
.module('app.services')
.service('mcq', mcq);
mcq.$inject  = ['ques', '$log'];
function mcq(ques, $log){
  var q;
  this.setQuestion = function(selectObj){
    $log.debug('setQuestion');
    $log.debug(selectObj.level);
  }
  this.maxQ  = function(selectObj){
    $log.debug('maxQ');
    var l = selectObj.level;
    var d = selectObj.deck;
    var maxQlim =0;
    // max question set
    var temQuesDetails = ques.getQuesDetail();
    return temQuesDetails[selectObj.level][selectObj.deck];
  }
  this.init = function(){
    q = ques.getJSON();
    $log.debug('init');
    return levelDetermine(q.vocab)
  }

  function shuffle(array) {
    $log.debug('shuffle');

    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  function levelDetermine(q){
    $log.debug('levelDetermine');
    var tempQuesStruct={};
    // $log.debug(q);
    q.forEach(function(elem){
      if(Object.keys(tempQuesStruct).indexOf(elem.level)==-1){
        //level not present so add this new level
        tempQuesStruct[elem.level] ={};
        tempQuesStruct[elem.level][elem.deck] =1;

      }else{
        if(Object.keys(tempQuesStruct[elem.level]).indexOf(elem.deck)==-1){
          tempQuesStruct[elem.level][elem.deck] = 1;

        }else{
          tempQuesStruct[elem.level][elem.deck]+=1;
        }
      }
    });
    var v = Object.keys(tempQuesStruct);
    console.log(v);
    var  sumLevel = 0;
    v.forEach(function(elem){
      function sumDeck(level){
        var x = Object.keys(tempQuesStruct[level]);
        var sum =0;
        x.forEach(function(deck){
          sum = sum+ tempQuesStruct[level][deck];
        });
        sumLevel=sumLevel+sum;
        return sum;
      }
      tempQuesStruct[elem]['All decks'] = sumDeck(elem);
    });
    tempQuesStruct['All levels'] = {};
    tempQuesStruct['All levels']['All decks'] = sumLevel;
    console.log(tempQuesStruct);
    return tempQuesStruct;
  }
}
