var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const posttestStudentDb = async (school,index,score) => {
 try{
    // console.log(email);
    let subjectpromisify = promisify(connection.query).bind(connection);
    let subject = 'Maths';
   const subjectInterval = await subjectpromisify('Select `lft`,`rght` from content where defaultName = ?', subject);
   
   intervalstr=JSON.stringify(subjectInterval);
   intervaljson=JSON.parse(intervalstr);
//console.log(intervaljson[0].lft);
    
   studentIdArray = {};
   Arr = [];
   console.log(score);
  for(var i=0;i< score.length;i++){
   var id = score[i].student_id;
  if(!studentIdArray[id]){
      studentIdArray[id]=id;
      Arr.push(studentIdArray[id]);
    } 
}

 Arr = JSON.stringify(Arr);
 Arr = JSON.parse(Arr);
 final = [];
 console.log(Arr[0]);
 for(var i=0;i<Arr.length;i++){

 
   let scorespromisify = promisify(connection.query).bind(connection);
   const testScore = await scorespromisify('SELECT `student_id`,count(`student_id`) AS count,sum(`post_test_score`) AS `post_test_score`, sum(`pre_test_score`) AS `pre_test_score` from chapter_stats group by `student_id` HAVING `student_id` = ?',[Arr[i]]);
   
 // console.log(testScore);
   
   final.push(testScore);
 }
    scorestr = JSON.stringify(final);
   scorejson = JSON.parse(scorestr);
   console.log(scorejson);
   // console.log(scorejson);
    defaultScore = [];
    studentId = {};
    var k=0;
    for(var i=0;i< scorejson.length;i++){
        var id = scorejson[i].student_id;
       if(!studentId[id]){
           studentId[id]=id;
       }
    }
    console.log(scorejson[0][0].student_id);

       // var count =0;
        for(var i=0;i<scorejson.length;i++){
         
                
                avgpretest =  Math.floor(scorejson[i][0].pre_test_score/scorejson[i][0].count);
                avgposttest = Math.floor(scorejson[i][0].post_test_score/scorejson[i][0].count);
               // console.log(avgpretest);
              //  count++;
            
        
       // avgpretest = Math.floor(avgpretest/count);
        //avgposttest = Math.floor(avgposttest/count);
        defaultScore.push({ student_id : scorejson[i][0].student_id, pre_test_score : avgpretest, post_test_score : avgposttest });
        }   
    
    studentarr =[];
    for(var i=0;i<defaultScore.length;i++){
    let studentpromisify = promisify(connection.query).bind(connection);
    const student = await studentpromisify('SELECT `id`,`name` from student WHERE `id` = ?',[defaultScore[i].student_id]);
    studentstr = JSON.stringify(student);
    studentjson = JSON.parse(studentstr);
    console.log(studentjson[0].name);
    studentarr.push({id : defaultScore[i].student_id, name : studentjson[0].name, score : defaultScore[i].post_test_score });
    }

    finalscorearr = [];
    if(index == 0){
    for(var i=0;i<studentarr.length;i++){
    
         if(studentarr[i].score<15){
             finalscorearr.push({id: studentarr[i].id, name: studentarr[i].name, score : studentarr[i].score});
         }
     }
    }
    else  if(index == 1){
        for(var i=0;i<studentarr.length;i++){
        
             if(studentarr[i].score>=15 && studentarr[i].score<40){
                 finalscorearr.push({id: studentarr[i].id, name: studentarr[i].name, score : studentarr[i].score});
             }
         }
        }
        else  if(index == 2){
            for(var i=0;i<studentarr.length;i++){
            
                 if(studentarr[i].score>=40 && studentarr[i].score<70){
                     finalscorearr.push({id: studentarr[i].id, name: studentarr[i].name, score : studentarr[i].score});
                 }
             }
            }
            else  if(index == 3){
                for(var i=0;i<studentarr.length;i++){
                
                     if(studentarr[i].score>=70 && studentarr[i].score<100){
                         finalscorearr.push({id: studentarr[i].id, name: studentarr[i].name, score : studentarr[i].score});
                     }
                 }
                }
   console.log(finalscorearr);
    return finalscorearr;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    posttestStudentDb
}