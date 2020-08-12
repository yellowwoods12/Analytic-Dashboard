var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const chapterCompletionWithSubjectFilterDb = async (school,subject) => {
 try{
     console.log(subject);
    let subjectspromisify = promisify(connection.query).bind(connection);
    const subjectinterval = await subjectspromisify('SELECT `lft`,`rght` from content WHERE defaultName = ?',subject);
    subjectstr = JSON.stringify(subjectinterval);
    subjectintervaljson = JSON.parse(subjectstr);

    console.log(subjectintervaljson);
    let chapterspromisify = promisify(connection.query).bind(connection);
    const chaptersfilter = await chapterspromisify('SELECT distinct(`defaultName`) as `chapter` from content where type="CHAPTER" AND `id` BETWEEN ? AND ?',[subjectintervaljson[0].lft,subjectintervaljson[0].rght]);
    chapterstr = JSON.stringify(chaptersfilter);
    chapterjson = JSON.parse(chapterstr);

    console.log(chapterjson);
    chapterCompletion = [];
    for(var i=0;i< chapterjson.length;i++){

    console.log(chapterjson[i].chapter);
    let chapterintervalpromisify = promisify(connection.query).bind(connection);
    const chapterInterval = await chapterintervalpromisify('Select `lft`,`rght` from content where defaultName = ? AND type="CHAPTER"', chapterjson[i].chapter);
    intervalstr=JSON.stringify(chapterInterval);
    intervaljson=JSON.parse(intervalstr);
    console.log(intervaljson);

    let completionpromisify = promisify(connection.query).bind(connection);
    const completionScore = await completionpromisify('SELECT `student_id`,`chapter_id`,`completed_on` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,intervaljson[0].lft,intervaljson[0].rght]);
    

    scorestr = JSON.stringify(completionScore);
    scorejson = JSON.parse(scorestr);
    console.log(scorejson);
    let completed = 0;
    for(var j=0;j<scorejson.length;j++){
       if(scorejson[j].completed_on!=null){
           completed=completed+1;
       }
    }
    completion_percentage = (completed/scorejson.length) * 100;
    chapterCompletion.push({chapter: chapterjson[i].chapter, Chapter_Completion: completion_percentage});
    }

    console.log(chapterCompletion);
   
    
   // console.log(defaultScore);
    return chapterCompletion;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    chapterCompletionWithSubjectFilterDb
}