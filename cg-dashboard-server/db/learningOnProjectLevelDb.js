var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const learningOnProjectLevelDb = async (user) => {
 try{

    let schoolpromisify = promisify(connection.query).bind(connection);
    const schoolid = await schoolpromisify('select id,school_name from fellow where name=?',[user]);
    schoolstr = JSON.stringify(schoolid);
    schooljson = JSON.parse(schoolstr);
    console.log(schooljson);
    defaultScore = [];
    studentId = {};

    for(var p=0;p<schooljson.length;p++)
    {    // console.log(email);
     let subjectpromisify = promisify(connection.query).bind(connection);
     let subject = 'Maths';
    const subjectInterval = await subjectpromisify('Select `lft`,`rght` from content where defaultName = ?', subject);
    
    intervalstr=JSON.stringify(subjectInterval);
    intervaljson=JSON.parse(intervalstr);
    console.log(intervaljson[0].lft);

    let scorespromisify = promisify(connection.query).bind(connection);
    const testScore = await scorespromisify('SELECT `student_id`,`chapter_id`,`post_test_score`, `pre_test_score` from chapter_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` = ?)  AND `chapter_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[schooljson[p].id,intervaljson[0].lft,intervaljson[0].rght]);
    

    scorestr = JSON.stringify(testScore);
    scorejson = JSON.parse(scorestr);
    console.log(scorejson);
   
    var k=0;
    for(var i=0;i< scorejson.length;i++){
        var id = scorejson[i].student_id;
       if(!studentId[id]){
           studentId[id]=id;
       }
    }
    console.log(studentId);
    var avgpretest =0;
    var avgposttest=0;
    for(var id in studentId){
         avgpretest =0;
         avgposttest=0;
        var count =0;
        for(var i=0;i<scorejson.length;i++){
            if(id == scorejson[i].student_id){
                
                avgpretest = avgpretest + scorejson[i].pre_test_score;
                avgposttest +=scorejson[i].post_test_score;
                console.log(avgpretest);
                count++;
            }
        }
        avgpretest = Math.floor(avgpretest/count);
        avgposttest = Math.floor(avgposttest/count);
        if(isNaN(avgpretest)){
            defaultScore.push({ student_id : id, school_name: schooljson[p].school_name, pre_test_score : 0, post_test_score : 0 });

        }
        else{
        defaultScore.push({ student_id : id, school_name: schooljson[p].school_name, pre_test_score : avgpretest, post_test_score : avgposttest });
        } 
    }
}
    console.log(defaultScore);
    return defaultScore;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    learningOnProjectLevelDb
}