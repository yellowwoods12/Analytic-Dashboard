var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const subjectCompletionWithGradeFilterDb = async (school,grade) => {
 try{
    // console.log(email);
    let subjectpromisify = promisify(connection.query).bind(connection);
    const subjectfilter = await subjectpromisify('SELECT distinct(`defaultName`) as `subject` from content where type="SUBJECT"');
    subjectstr = JSON.stringify(subjectfilter);
    subjectjson = JSON.parse(subjectstr);

    console.log(subjectjson);
    subjectCompletion = [];
    for(var i=0;i<subjectjson.length;i++){

    console.log(subjectjson[i].subject);
    const subjectInterval = await subjectpromisify('Select `lft`,`rght` from content where defaultName = ?', subjectjson[i].subject);
    
    intervalstr=JSON.stringify(subjectInterval);
    intervaljson=JSON.parse(intervalstr);
    console.log(intervaljson);

    let completionpromisify = promisify(connection.query).bind(connection);
    const completionScore = await completionpromisify('SELECT `student_id`,`chapter_id`,`completed_on` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ) AND `grade`= ? )  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,grade,intervaljson[0].lft,intervaljson[0].rght]);
    

    scorestr = JSON.stringify(completionScore);
    scorejson = JSON.parse(scorestr);
    let completed = 0;
    for(var j=0;j<scorejson.length;j++){
       if(scorejson[j].completed_on!=null){
           completed=completed+1;
       }
    }
    completion_percentage = (completed/scorejson.length) * 100;
    if(isNaN(completion_percentage)){

        subjectCompletion.push({subject: subjectjson[i].subject, Subject_Completion: 0});

    }
    else{

    
    subjectCompletion.push({subject: subjectjson[i].subject, Subject_Completion: completion_percentage});
    }
    }
    console.log(subjectCompletion);
   
    
   // console.log(defaultScore);
    return subjectCompletion;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    subjectCompletionWithGradeFilterDb
}