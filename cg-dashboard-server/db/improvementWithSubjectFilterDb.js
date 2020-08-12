
var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const improvementWithSubjectFilterDb = async (school,subject) => {
 try{
    // console.log(grade);
   
     let subjectpromisify = promisify(connection.query).bind(connection);
    const subjectInterval = await subjectpromisify('Select `defaultName`,MIN(`lft`) AS lft,MAX(`rght`) AS rght from content where defaultName = ? AND type = "SUBJECT"',subject);
    
    intervalstr=JSON.stringify(subjectInterval);
    intervaljson=JSON.parse(intervalstr);
  console.log(intervaljson);
   pretestarray = [];
   prerow = [];
   posttestarray = [];
   postrow = [];
   series = [];
   improvement = [];
   var min=0;
   var max=0;
   for(var i=0;i<intervaljson.length;i++){
        
   }
    let prescorespromisify = promisify(connection.query).bind(connection);
    const preTestScore = await prescorespromisify('SELECT  min(`pre_test_score`) AS min, max(`pre_test_score`) AS max from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[0].lft,intervaljson[0].rght]);
    scorestr = JSON.stringify(preTestScore);
    scorejson = JSON.parse(scorestr);
    if(scorejson[0].min!=null){
    prerow.push( {x: intervaljson[0].defaultName, y : [scorejson[0].min,scorejson[0].max]});
    }
    else{
        prerow.push( {x: intervaljson[0].defaultName, y : [0,0]});

    }
  
 
    let postscorespromisify = promisify(connection.query).bind(connection);
    const postTestScore = await postscorespromisify('SELECT  min(`post_test_score`) AS min, max(`post_test_score`) AS max from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[0].lft,intervaljson[0].rght]);
    scorestr = JSON.stringify(postTestScore);
    scorejson = JSON.parse(scorestr);
   // console.log(scorejson);
    if(scorejson[0].min!=null){
    postrow.push( {x: intervaljson[0].defaultName, y : [scorejson[0].min,scorejson[0].max]});
  }
  else{
    postrow.push( {x: intervaljson[0].defaultName, y : [0,0]});

  }


    let improvescorespromisify = promisify(connection.query).bind(connection);
    const improvementScores = await improvescorespromisify('SELECT `student_id`, `post_test_score`, `pre_test_score` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[0].lft,intervaljson[0].rght]);
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
    console.log(avgdiff);
    console.log(c);
    avgImprovement=0;

     //calculate task score for each student
     let taskpromisify = promisify(connection.query).bind(connection);
     const taskscores = await taskpromisify('SELECT sum(performance) as sum,count(performance) as count from task_stats where student_id IN (SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )) and content_id IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?)) GROUP BY performance',[school,intervaljson[0].lft,intervaljson[0].rght]);
     
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


   if(avgdiff!=null){
   avgImprovement = Math.ceil(avgdiff/c);
   improvement.push({ Subject: intervaljson[0].defaultName, Average_Improvement : avgImprovement, Average_Task_Score : avgTaskScore  });
   }
   else{
   improvement.push({ Subject: intervaljson[0].defaultName, Average_Improvement :  0, Average_Task_Score : 0  });
   }
  
  
    console.log(improvement);
 //   console.log(postrow);
    series.push({name : "Pretest Score", data : prerow });
    series.push({name : "Posttest Score", data : postrow});
 //   console.log(series);
    improvementArray = [];
    improvementArray.push({series : series, improvement : improvement});
    console.log(improvementArray[0].series[0].data);
    
 
   // console.log(defaultScore);
    return improvementArray;

 } catch (e) {
     throw new Error( e.message);
 }
}

module.exports = {
    improvementWithSubjectFilterDb
}