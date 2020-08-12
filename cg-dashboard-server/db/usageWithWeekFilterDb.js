var mysql = require('mysql');
const { promisify } = require('util');
var moment = require('moment');

var connection = require('../connection');


const usageWithWeekFilterDb = async (school,from,to) => {
    try {
       
        let gradepromisify = promisify(connection.query).bind(connection);
        const grade = await gradepromisify("SELECT distinct(`grade`) as grade from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?)",[school]);
      //  console.log(parameter_list);
        gradestr=JSON.stringify(grade);
        gradejson=JSON.parse(gradestr);
      //  console.log(gradejson);

    

        actual_usage = [];
        for(var i=0;i<gradejson.length;i++){
            let actualUsagepromisify = promisify(connection.query).bind(connection);
            const actualUsage = await actualUsagepromisify("SELECT sum(timestampdiff(minute,`start_time`,`end_time`)) AS actual_usage FROM user_stats WHERE `start_time` BETWEEN ? AND ? AND `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ?)",[from,to,school,gradejson[i].grade]);
            actualusagestr=JSON.stringify(actualUsage);
            actualusagejson=JSON.parse(actualusagestr);
            if(actualusagejson[0].actual_usage==null){

                actual_usage.push({grade : gradejson[i].grade, actualUsage: 0});

            }
            else{
            actual_usage.push({grade : gradejson[i].grade, actualUsage: actualusagejson[0].actual_usage});
            }
        }

       // console.log(actual_usage);

       

       // console.log(parameters[1].grade);
     
       
            console.log(actual_usage);
            return actual_usage;


    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
   usageWithWeekFilterDb
}