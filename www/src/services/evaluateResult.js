angular
.module('app.services')
.service('evaluateResult', evaluateResult);
mcq.$inject  = ['ques', '$log'];
function evaluateResult(ques, $log){

  this.result = result;

  var response = ques.getResponse();
  var totalQues = ques.getSelectQues();

  function result(){
    $log.debug('evaluateResult');

    var correct =0;
    var incorrect =0;
    for(var i =0; i<response.length; i++){
      response[i].response === response[i].correctOptionNumb? correct++:incorrect++;
    }
    if(response.length<totalQues){
       incorrect = incorrect+ totalQues - response.length;
    }
    // console.log(correct, incorrect);
    return [correct, incorrect]



  }



}
