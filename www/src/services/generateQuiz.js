angular
.module('app.services')
.service('generateQuiz', generateQuiz);
mcq.$inject  = ['ques', '$log'];
function generateQuiz(ques, $log){
  this.generateQuizList = function(nosSelQues){

    var sampleQuizArray=[];
    var array = Array.from(Array(nosSelQues).keys());
    // $log.debug(array);
    var x  = shuffle(array);
    // $log.debug(x);
    var n = x.length;
    var vocab = ques.getJSON().vocab;
    // $log.debug(vocab);
    while(n){
      var opt = [];
      // $log.debug(n);
      var tempArray  = Array.from(Array(vocab.length).keys());
      tempArray.splice(x[n-1],1);
      tempArray = shuffle(tempArray);
      tempArray.splice(3, tempArray.length-3);
      // $log.debug(tempArray);
      tempArray.push(x[n-1]);

      tempArray = shuffle(tempArray);
      // $log.debug(tempArray);
      for(var i=0; i<4;i++){
        opt.push(vocab[tempArray[i]].meaning);
      }
      // $log.debug(tempArray.indexOf(x[n-1]));
      var temp={
        'word' : vocab[x[n-1]].word,
        'correctOptionNumb': tempArray.indexOf(x[n-1]),
        'correctOption' : vocab[x[n-1]].meaning,
        'helpSentence' : vocab[x[n-1]].helpSentence,
        'response': '',
        'markForReview': false,
        'options': opt
      }
      sampleQuizArray.push(temp);
      n=n-1;
    }
    $log.debug(sampleQuizArray);
    return sampleQuizArray
  }

  function shuffle(array) {
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


}
