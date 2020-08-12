var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const chapterProgressStudentListDb = async (school,chapter,index,id) => {
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
    const completionScore = await completionpromisify('SELECT `student_id`,`content_id`,`attempt_no`,`progress`,`is_completed` from user_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `school_code` from fellow WHERE `school_name`= ? ))  AND `content_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[school,chapterintervaljson[0].lft,chapterintervaljson[0].rght]);
    

    scorestr = JSON.stringify(completionScore);
    scorejson = JSON.parse(scorestr);
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

    let studentIdpromisify = promisify(connection.query).bind(connection);
    const idarray = await studentIdpromisify('SELECT `student_id`,`content_id`,`attempt_no`,`progress`,`is_completed` from user_stats WHERE `student_id` IN (?)  AND `content_id` IN (SELECT `id` from contentMediumGradeMapping where `contentId` IN (SELECT `id` from content WHERE `id` BETWEEN ? AND ?))',[id,chapterintervaljson[0].lft,chapterintervaljson[0].rght]);
    idstr = JSON.stringify(idarray);
    idjson = JSON.parse(idstr);
 
    idindex = [];
    console.log(idjson);
    for(var i=0;i<idjson.length;i++){
        if(index==0){
            if(idjson[i].is_completed == 1){
                idindex.push(idjson[i].student_id);
            }
        }
        else if(index == 1){
            if(idjson[i].progress == 0 && idjson[i].is_completed == 0){
                idindex.push(idjson[i].student_id);
            }
        }
        else if(index == 2){
            if(idjson[i].attempt_no > 1){
                idindex.push(idjson[i].student_id);

            }
        }
        else{
            if(idjson[i].progress > 0 && idjson[i].progress < 100){
                idindex.push(idjson[i].student_id);

            }
        }
    }
    let studentnamepromisify = promisify(connection.query).bind(connection);
    const studentarray = await studentnamepromisify('SELECT distinct(`id`),`name` from student WHERE `id` IN (?)',[idindex]);
    studentstr = JSON.stringify(studentarray);
    studentjson = JSON.parse(studentstr);

    students = [];
    for(var i=0;i<studentarray.length;i++){
          if(index == 0){
              students.push({Student_Id : studentarray[i].id, Name : studentarray[i].name, Status : "Completed"})
          }
          else if(index == 1){
            students.push({Student_Id : studentarray[i].id, Name : studentarray[i].name, Status : "Not Yet Started"})
        }
        else if(index == 2){
            students.push({Student_Id : studentarray[i].id, Name : studentarray[i].name, Status : "In Progress"})
        }
        else{
            students.push({Student_Id : studentarray[i].id, Name : studentarray[i].name, Status : "Revision"})

        }
    }
    chapterProgress.push(students);
    console.log(chapterProgress);
   
 

    return chapterProgress;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    chapterProgressStudentListDb
}