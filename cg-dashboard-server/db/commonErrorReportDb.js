var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const commonErrorReportDb = async (school) => {
 try{
    // console.log(email);
     let questionpromisify = promisify(connection.query).bind(connection);
    const question = await questionpromisify('SELECT `question_id`,count(`question_id`) AS "common errors" from question_stats WHERE `student_id` IN (SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )) AND `attempt_no`=1 AND `is_correct`=0 GROUP BY `question_id` ORDER BY count(`question_id`) DESC LIMIT 10',[school]);
    
    questionstr=JSON.stringify(question);
    questionjson=JSON.parse(questionstr);
    console.log(questionjson);

    commonErrors = [];
    for(var i=0;i<questionjson.length;i++){

        let errorpromisify = promisify(connection.query).bind(connection);
        const error = await errorpromisify('SELECT `question_data` from question_medium_mapping WHERE `question_id`=?',[questionjson[i].question_id]);
        errorstr = JSON.stringify(error);
        errorjson = JSON.parse(errorstr);
        questiontext = JSON.parse(errorjson[0].question_data);
        //console.log(errorjson);
        //console.log(questiontext);
        commonErrors.push([questionjson[i].question_id,questiontext.question_text]);
        }
        console.log(commonErrors[0]);
   
    return commonErrors;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    commonErrorReportDb
}