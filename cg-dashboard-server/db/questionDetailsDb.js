var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const questionDetailsDb = async (school,id) => {
 try{
    // console.log(email);
     let questionpromisify = promisify(connection.query).bind(connection);
    const question = await questionpromisify('select answer,count(answer) AS count from question_stats where question_id=? AND student_id IN (SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )) group by answer',[id,school]);
    
    questionstr=JSON.stringify(question);
    questionjson=JSON.parse(questionstr);
    console.log(questionjson);

     var sum=0;    
    for(var i=0;i<questionjson.length;i++){
       sum= sum + questionjson[i].count;
    }
  //  console.log(sum);
    questionDetails = [];
    var k = 0;
    for(var i=0;i<questionjson.length;i++){
 
        if(questionjson[i].answer != null){
        var removeleft = question[i].answer.split("[").join("");
        var removeright = removeleft.split("]").join("");
        var str = String.fromCharCode(65 + k) +") "+ removeright;
        var percent = ((questionjson[i].count/sum) * 100).toFixed(2);

        //console.log(errorjson);
        //console.log(questiontext);
        questionDetails.push([str,percent]);
        k=k+1;
      //  console.log(questionDetails);
        }
    }  
    let correctpromisify = promisify(connection.query).bind(connection);
    const correctanswer = await correctpromisify('select distinct(answer) AS answer,is_correct from question_stats where question_id= ? ',[id]); 
     correctstr = JSON.stringify(correctanswer);
     correctjson = JSON.parse(correctstr);
        console.log(correctjson);
   for(var i=0;i<correctjson.length;i++){
    if(correctjson[i].answer != null){
    var removeleft = correctjson[i].answer.split("[").join("");
    var removeright = removeleft.split("]").join("");
       if(correctjson[i].is_correct == 1){
           for(var j=0;j<questionDetails.length;j++){
               if(questionDetails[j][0].includes(removeright)){
                   var ans = questionDetails[j][0];
               }
           }
          questionDetails.push([ans]);
       }
   }
}
console.log(questionDetails);
   var maxv=0;
   var wrongmax;
   for(var i=0;i<questionDetails.length-1;i++){
        if(maxv<questionDetails[i][1] && questionDetails[questionDetails.length-1][0]!=questionDetails[i][0]){
            maxv = questionDetails[i][1];
            wrongmax = questionDetails[i][0];
        }
   }
   questionDetails.push([wrongmax]);
    console.log(questionDetails);
    return questionDetails;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    questionDetailsDb
}