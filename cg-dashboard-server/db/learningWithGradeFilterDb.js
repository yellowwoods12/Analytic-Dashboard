var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const learningWithGradeFilterDb = async (school,grade) => {
 try{
    // console.log(email);
     let subjectpromisify = promisify(connection.query).bind(connection);
     let subject = 'Maths';
    const subjectInterval = await subjectpromisify('Select `lft`,`rght` from content where defaultName = ?', subject);
    
    intervalstr=JSON.stringify(subjectInterval);
    intervaljson=JSON.parse(intervalstr);
//console.log(intervaljson[0].lft);

    let scorespromisify = promisify(connection.query).bind(connection);
    const testScore = await scorespromisify('SELECT `student_id`,`chapter_id`,`post_test_score`, `pre_test_score` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ))  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?) AND `grade`= ?)',[school,intervaljson[0].lft,intervaljson[0].rght,grade]);
    

    scorestr = JSON.stringify(testScore);
    scorejson = JSON.parse(scorestr);
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
    return defaultScore;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    learningWithGradeFilterDb
}