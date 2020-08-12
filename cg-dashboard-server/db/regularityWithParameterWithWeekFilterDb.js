var mysql = require('mysql');
const { promisify } = require('util');
var moment = require('moment');

var connection = require('../connection');

const regularityWithParameterWithWeekFilterDb = async (school,from,to,parameter_list,days) => {
    try {
        console.log(to-from);
        var outputArray = [];
        let gradepromisify = promisify(connection.query).bind(connection);
        const grade = await gradepromisify("SELECT distinct(`grade`) as grade from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?)",[school]);
      //  console.log(parameter_list);
        gradestr=JSON.stringify(grade);
        gradejson=JSON.parse(gradestr);
      //  console.log(gradejson);

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
            const actualUsage = await actualUsagepromisify("SELECT sum(timestampdiff(minute,`start_time`,`end_time`)) AS actual_usage FROM user_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ?) AND `start_time` BETWEEN ? AND ?",[school,gradejson[i].grade,to,from]);
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


       // console.log(parameters[1].grade);
        expected_usage = [];

        for(var i=0;i<parameters.length;i++){

            if(parameters[i].classesInMonth!=0){
 
                expectedval = ((parameters[i].classesInMonth * parameters[i].minDuration * parameters[i].minStrength * 0.6)/30)*days;
            }
            else{
                expectedval = ((parameters[i].classesInWeek * parameters[i].minDuration * parameters[i].minStrength * 0.6)/7)*days;

            }
            expected_usage.push({grade : parameters[i].grade, expectedUsage : expectedval});
        }

        usagearray = [];

        console.log(expected_usage);

        for(var i=0;i<actual_usage.length;i++){

            var gradeval = actual_usage[i].grade;
            var index = parameters.findIndex(item=> item.grade === gradeval);


            usagearray.push({grade: actual_usage[i].grade, Actual_Usage: actual_usage[i].actualUsage, Expected_Usage: expected_usage[index].expectedUsage });
            
        }
       
        console.log(expected_usage);
        
        gradewiselogin = [];
        for(var i=0;i<gradejson.length;i++){
            let loginpromisify = promisify(connection.query).bind(connection);
            const login = await loginpromisify("SELECT `student_id`,count(`student_id`) AS logins FROM user_stats WHERE `start_time` BETWEEN ? AND ? GROUP BY `student_id` HAVING `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ?)",[to,from,school,gradejson[i].grade]);
           // console.log(usage);
            loginstr=JSON.stringify(login);
            loginjson=JSON.parse(loginstr);
            let sum=0;
            for(var j=0;j<loginjson.length;j++){
                sum=sum+loginjson[j].logins;       
            }
            avgloginpergrade =(sum/loginjson.length);
          //  console.log(loginjson);
            if(sum == 0){
                gradewiselogin.push({ grade: gradejson[i].grade, avglogin: 0});
            }
            else{
                gradewiselogin.push({ grade: gradejson[i].grade, avglogin: avgloginpergrade});
            }
        }
        regularityarray = [];
       
        gradewiseactivity = [];
        for(var i=0;i<gradejson.length;i++){
            let activepromisify = promisify(connection.query).bind(connection);
            const activestudents = await activepromisify("SELECT distinct(`student_id`) AS active_students FROM user_stats  where `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ) AND `grade`= ?) AND `start_time` BETWEEN ? AND ?",[to,from,school,gradejson[i].grade]);
           // console.log(usage);
            activestr=JSON.stringify(activestudents);
            activejson=JSON.parse(activestr);
          //  console.log(activejson);

            let totalpromisify = promisify(connection.query).bind(connection);
            const totalstudents = await totalpromisify("SELECT distinct(`id`) AS enrolled_students FROM student  WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ) AND `grade`= ? ",[school,gradejson[i].grade]);
           // console.log(usage);
           totalstr=JSON.stringify(totalstudents);
            totaljson=JSON.parse(totalstr);
            console.log(totaljson);
            activepercent = (activejson.length/totaljson.length)*100;
            if(isNaN(activejson.length)){
                gradewiseactivity.push({grade : gradejson[i].grade, activepercent : 0});
            }
            else{
                gradewiseactivity.push({grade : gradejson[i].grade, activepercent : activepercent});
            
            }
        }
         var missedClasses = 0;
         missedclassesarray = [];
        for(var i=0;i<gradejson.length;i++){
            let maxDurationpromisify = promisify(connection.query).bind(connection);
            const maxDuration = await maxDurationpromisify("SELECT max(timestampdiff(minute,`start_time`,`end_time`)) AS max_duration,`start_time` from user_stats WHERE `start_time` IN(SELECT distinct(`start_time`) FROM user_stats WHERE `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ? ) group by `start_time`) AND `start_time` BETWEEN ? AND ? group by `start_time`",[school,gradejson[i].grade,to,from]);
           
            maxDurationstr=JSON.stringify(maxDuration);
            maxDurationjson=JSON.parse(maxDurationstr);
            console.log(maxDurationjson);

            var index = parameters.findIndex(item=> item.grade === gradejson[i].grade);


            minDuration = parameters[index].minDuration;

           var missedClasses = 0;
         for(var key in maxDurationjson){
                if(maxDurationjson[key].max_duration < minDuration){
                    missedClasses = missedClasses + 1;
                }
            }
            if(isNaN(maxDurationjson.length)){
                missedclassesarray.push({grade : gradejson[i].grade, missedclasses : 0});
            }
            else{
                missedclassesarray.push({grade : gradejson[i].grade, missedclasses : missedClasses});
            
            }
           
        }
        console.log(missedclassesarray);
      //  console.log(start_time);

        for(var i=0;i<gradejson.length;i++){
            regularityarray.push({grade : gradejson[i].grade, avglogin : gradewiselogin[i].avglogin, activepercent : gradewiseactivity[i].activepercent, missedclasses : missedclassesarray[i].missedclasses});
       }
        console.log(regularityarray);
       regularityfinalarray = [];

       regularityfinalarray.push(regularityarray);
       regularityfinalarray.push(usagearray);
            console.log(regularityfinalarray);
            return regularityfinalarray;


    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    regularityWithParameterWithWeekFilterDb
}