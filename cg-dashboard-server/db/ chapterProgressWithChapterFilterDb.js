var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');
    
const chapterProgressWithChapterFilterDb = async (school,chapter) => {
 try{
     console.log(chapter);
    let chapterpromisify = promisify(connection.query).bind(connection);
    const chapterinterval = await chapterpromisify('SELECT `lft`,`rght` from content WHERE defaultName = ? AND type="CHAPTER"',chapter);
    chapterstr = JSON.stringify(chapterinterval);
    chapterintervaljson = JSON.parse(chapterstr);

    console.log(chapterintervaljson);
   
   // console.log(chapterjson);

    chapterProgress = [];
    studentId = [];

    let completionpromisify = promisify(connection.query).bind(connection);
    const completionScore = await completionpromisify('SELECT `student_id`,`content_id`,`attempt_no`,`progress`,`is_completed` from user_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `content_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,chapterintervaljson[0].lft,chapterintervaljson[0].rght]);
    

    scorestr = JSON.stringify(completionScore);
    scorejson = JSON.parse(scorestr);school
  //  console.log(scorejson);
    let completed = 0;
    let started = 0;
    let in_progress = 0;
    let revision = 0;
    for(var j=0;j<scorejson.length;j++){

        if(!studentId.includes(scorejson[j].student_id)){
        studentId.push(scorejson[j].student_id);
        }

       if(scorejson[j].is_completed == 1){
           completed=completed+1;
       }
       else if(scorejson[j].progress == 0){
        started = started+1;
    }
    else if(scorejson[j].progress > 0 && scorejson[j].progress < 100){
       in_progress= in_progress + 1;
    }
    else if(scorejson[j].attempt_no > 1){
        revision = revision+1;
    }
    }
    completed_percentage = ((completed/scorejson.length) * 100).toFixed(2);
    started_percentage = ((started/scorejson.length) * 100).toFixed(2);
    in_progress_percentage = ((in_progress/scorejson.length) * 100).toFixed(2);
    revision_percentage = ((revision/scorejson.length) * 100).toFixed(2);
    if(scorejson.length==0){

        chapterProgress.push({Completed: 0, Not_Yet_Started :0, In_Progress: 0, Revision: 0});

    }
    else{
        chapterProgress.push({Completed: completed_percentage, Not_Yet_Started : started_percentage , In_Progress: in_progress_percentage, Revision: revision_percentage});

    }
   
    chapterProgress.push(studentId);

  
    console.log(chapterProgress);
   
 

    return chapterProgress;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    chapterProgressWithChapterFilterDb
}