var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const improvementDb = async (school) => {
 try{
    // console.log(email);
    let subpromisify = promisify(connection.query).bind(connection);
    const subject = await subpromisify('Select distinct(`defaultName`) as subject from content where type="SUBJECT"');

    substr = JSON.stringify(subject);
    subjson= JSON.parse(substr);

     let subjectpromisify = promisify(connection.query).bind(connection);
    const subjectInterval = await subjectpromisify('Select DISTINCT(`defaultName`) as name,`lft`,`rght` from content where type = "SUBJECT"');
    
    intervalstr=JSON.stringify(subjectInterval);
    intervaljson=JSON.parse(intervalstr);
    
 
    for(var i=0;i<subjson.length;i++){
        let intervalpromisify = promisify(connection.query).bind(connection);
    const Interval = await intervalpromisify('Select DISTINCT(`defaultName`) as defaultName, min(`lft`) as lft ,max(`rght`) as rght from content where type = "SUBJECT" AND defaultName= ?',[subjson[i].subject]);
    
    intervalstr=JSON.stringify(Interval);
    intervaljson=JSON.parse(intervalstr);
    }
 
    console.log(intervaljson);
   pretestarray = [];
   prerow = [];
   posttestarray = [];
   postrow = [];
   series = [];
   improvement = [];
  for(var i=0;i<intervaljson.length;i++){
    let scorespromisify = promisify(connection.query).bind(connection);
    const preTestScore = await scorespromisify('SELECT  min(`pre_test_score`) AS min, max(`pre_test_score`) AS max from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[i].lft,intervaljson[i].rght]);
    scorestr = JSON.stringify(preTestScore);
    scorejson = JSON.parse(scorestr);
    prerow.push( {x: intervaljson[i].defaultName, y : [scorejson[0].min,scorejson[0].max]});
  }
  console.log(prerow);

  for(var i=0;i<intervaljson.length;i++){
    let scorespromisify = promisify(connection.query).bind(connection);
    const preTestScore = await scorespromisify('SELECT  min(`post_test_score`) AS min, max(`post_test_score`) AS max from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[i].lft,intervaljson[i].rght]);
    scorestr = JSON.stringify(preTestScore);
    scorejson = JSON.parse(scorestr);
    postrow.push( {x: intervaljson[i].defaultName, y : [scorejson[0].min,scorejson[0].max]});
  }
  console.log(postrow);

  for(var i=0;i<intervaljson.length;i++){
    let scorespromisify = promisify(connection.query).bind(connection);
    const improvementScores = await scorespromisify('SELECT `student_id`, `post_test_score`, `pre_test_score` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[i].lft,intervaljson[i].rght]);
    scorestr = JSON.stringify(improvementScores);
    scorejson = JSON.parse(scorestr);
 
    console.log(scorejson);
    //calculate improvement for each student
     avgdiff = 0 ;
     c =0;
    for(var j=0;j<scorejson.length;j++){
        diff=(scorejson[j].post_test_score - scorejson[j].pre_test_score);
        if(diff<0){
            diff = 0;
        }
        avgdiff+= diff;
        c++;
        
    }
    avgImprovement = Math.ceil(avgdiff/c);

    console.log(avgImprovement);

    //calculate task score for each student
    let taskpromisify = promisify(connection.query).bind(connection);
      const taskscores = await taskpromisify('SELECT sum(performance) as sum,count(performance) as count from task_stats where student_id IN (SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )) and content_id IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?)) GROUP BY performance',[school,intervaljson[i].lft,intervaljson[i].rght]);
      
      taskstr = JSON.stringify(taskscores);
      taskjson = JSON.parse(taskstr);
      console.log(taskjson);

      var taskScoreSum = 0;
      var taskScoreCount = 0;

      for(var j=0;j<taskjson.length;j++){
          taskScoreSum = taskScoreSum + taskjson[j].sum;
          taskScoreCount = taskScoreCount + taskjson[j].count;
      }
       avgTaskScore = Math.ceil(taskScoreSum/taskScoreCount);

    improvement.push({ Subject: intervaljson[i].defaultName, Average_Improvement : avgImprovement, Average_Task_Score : avgTaskScore  });
  }

  //task score calculation
 
 //   console.log(improvement);
 //   console.log(postrow);
    series.push({name : "Pretest Score", data : prerow });
    series.push({name : "Posttest Score", data : postrow});
 //   console.log(series);
    improvementArray = [];
    improvementArray.push({series : series, improvement : improvement});
    console.log(improvementArray[0].improvement);
    defaultScore = [];
    studentId = {};
    var k=0;
    for(var i=0;i< scorejson.length;i++){
        var id = scorejson[i].student_id;
       if(!studentId[id]){
           studentId[id]=id;
       }
    }
    for(var id in studentId){
        var avgpretest =0;
        var avgposttest=0;
        var count =0;

        for(var i=0;i<scorejson.length;i++){
            if(id == scorejson[i].student_id){
                
                avgpretest = avgpretest + scorejson[i].pre_test_score;
                avgposttest +=scorejson[i].post_test_score;
               // console.log(avgpretest);
                count++;
            }
        }
        avgpretest = Math.floor(avgpretest/count);
        avgposttest = Math.floor(avgposttest/count);
        defaultScore.push({ student_id : id, pre_test_score : avgpretest, post_test_score : avgposttest });
        
    }
   // console.log(defaultScore);
    return improvementArray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    improvementDb
}