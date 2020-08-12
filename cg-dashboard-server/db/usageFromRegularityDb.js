var mysql = require('mysql');
const { promisify } = require('util');
var moment = require('moment');

var connection = require('../connection');


const usageFromRegularityDb = async (school,parameter_list) => {
    try {
        var outputArray = [];
        let gradepromisify = promisify(connection.query).bind(connection);
        const grade = await gradepromisify("SELECT distinct(`grade`) as grade from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?)",[school]);
        console.log(parameter_list);
        gradestr=JSON.stringify(grade);
        gradejson=JSON.parse(gradestr);
        console.log(gradejson);

        var fromdate = new Date();
        // console.log(fromdate);
         var dd = String(fromdate.getDate()).padStart(2, '0');
         var mm = String(fromdate.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = fromdate.getFullYear();
         
         fromdate = yyyy + '-' + mm + '-' +dd ;
         var todate = new Date();
         todate = moment().subtract(30, 'days'); 
         var dd = String(todate._d.getDate()).padStart(2, '0');
         var mm = String(todate._d.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = todate._d.getFullYear();
         todate = yyyy + '-' + mm + '-' +dd ;

        actual_usage = [];
        for(var i=0;i<gradejson.length;i++){
            let actualUsagepromisify = promisify(connection.query).bind(connection);
            const actualUsage = await actualUsagepromisify("SELECT sum(timestampdiff(minute,`start_time`,`end_time`)) AS actual_usage FROM user_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ?)",[school,gradejson[i].grade]);
            actualusagestr=JSON.stringify(actualUsage);
            actualusagejson=JSON.parse(actualusagestr);
            if(actualusagejson[0].actual_usage==null){

                actual_usage.push({grade : gradejson[i].grade, actualUsage: 0});

            }
            else{
            actual_usage.push({grade : gradejson[i].grade, actualUsage: actualusagejson[0].actual_usage});
            }
        }

        console.log(actual_usage);

         parameter_list_array = [];
        parameterwithgrade = [];
        value_list = [];
    
    
        parameters = [];
        parameters.push({grade : "Grade 10", classesInMonth: parameter_list.classesInMonth_10, classesInWeek : parameter_list.classesInWeek_10, minDuration: parameter_list.minDuration_10, minStrength: parameter_list.minStrength_10 });
        parameters.push({grade : "Grade 9", classesInMonth: parameter_list.classesInMonth_9, classesInWeek : parameter_list.classesInWeek_9, minDuration: parameter_list.minDuration_9, minStrength: parameter_list.minStrength_9 });
        parameters.push({grade : "Grade 8", classesInMonth: parameter_list.classesInMonth_8, classesInWeek : parameter_list.classesInWeek_8, minDuration: parameter_list.minDuration_8, minStrength: parameter_list.minStrength_8 });
        parameters.push({grade : "Grade 7", classesInMonth: parameter_list.classesInMonth_7, classesInWeek : parameter_list.classesInWeek_7, minDuration: parameter_list.minDuration_7, minStrength: parameter_list.minStrength_7 });
        parameters.push({grade : "Grade 6", classesInMonth: parameter_list.classesInMonth_6, classesInWeek : parameter_list.classesInWeek_6, minDuration: parameter_list.minDuration_6, minStrength: parameter_list.minStrength_6 });
        parameters.push({grade : "Grade 5", classesInMonth: parameter_list.classesInMonth_5, classesInWeek : parameter_list.classesInWeek_5, minDuration: parameter_list.minDuration_5, minStrength: parameter_list.minStrength_5 });
        parameters.push({grade : "Grade 4", classesInMonth: parameter_list.classesInMonth_4, classesInWeek : parameter_list.classesInWeek_4, minDuration: parameter_list.minDuration_4, minStrength: parameter_list.minStrength_4 });
        parameters.push({grade : "Grade 3", classesInMonth: parameter_list.classesInMonth_3, classesInWeek : parameter_list.classesInWeek_3, minDuration: parameter_list.minDuration_3, minStrength: parameter_list.minStrength_3 });
        parameters.push({grade : "Grade 2", classesInMonth: parameter_list.classesInMonth_2, classesInWeek : parameter_list.classesInWeek_2, minDuration: parameter_list.minDuration_2, minStrength: parameter_list.minStrength_2 });
        parameters.push({grade : "Grade 1", classesInMonth: parameter_list.classesInMonth_1, classesInWeek : parameter_list.classesInWeek_1, minDuration: parameter_list.minDuration_1, minStrength: parameter_list.minStrength_1 });
        parameters.push({grade : "UKG", classesInMonth: parameter_list.classesInMonth_UKG, classesInWeek : parameter_list.classesInWeek_UKG, minDuration: parameter_list.minDuration_UKG, minStrength: parameter_list.minStrength_UKG });
        parameters.push({grade : "LKG", classesInMonth: parameter_list.classesInMonth_LKG, classesInWeek : parameter_list.classesInWeek_LKG, minDuration: parameter_list.minDuration_LKG, minStrength: parameter_list.minStrength_LKG });


        console.log(parameters[1].grade);
        expected_usage = [];

        for(var i=0;i<parameters.length;i++){

            if(parameters[i].classesInMonth!=0){
 
                expectedval = parameters[i].classesInMonth * parameters[i].minDuration * parameters[i].minStrength*0.6;
            }
            else{
                expectedval = parameters[i].classesInWeek * parameters[i].minDuration * parameters[i].minStrength*0.6 * 4;

            }
            expected_usage.push({grade : parameters[i].grade, expectedUsage : expectedval});
        }

        console.log(expected_usage);
        usagearray = [];

        for(var i=0;i<actual_usage.length;i++){

            var gradeval = actual_usage[i].grade;
            var index = parameters.findIndex(item=> item.grade === gradeval);

            console.log(index);
            usagearray.push({grade: actual_usage[i].grade, Actual_Usage: actual_usage[i].actualUsage, Expected_Usage: expected_usage[index].expectedUsage });
            
        }
       
      //  console.log(expected_usage);
        
       
            return usagearray;


    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    usageFromRegularityDb
}