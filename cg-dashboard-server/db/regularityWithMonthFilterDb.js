var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const regularityWithMonthFilterDb = async (school,from,to) => {
    try {
        var outputArray = [];
        let gradepromisify = promisify(connection.query).bind(connection);
        const grade = await gradepromisify("SELECT distinct(`grade`) as grade from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?)",[school]);
       // console.log(usage);
        gradestr=JSON.stringify(grade);
        gradejson=JSON.parse(gradestr);
        console.log(gradejson);
        gradewiselogin = [];
        for(var i=0;i<gradejson.length;i++){
            let loginpromisify = promisify(connection.query).bind(connection);
            const login = await loginpromisify("SELECT `student_id`,count(`student_id`) AS logins FROM user_stats WHERE `start_time` BETWEEN ? AND ? GROUP BY `student_id` HAVING `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? )AND `grade`= ?)",[from,to,school,gradejson[i].grade]);
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
            const activestudents = await activepromisify("SELECT distinct(`student_id`) AS active_students FROM user_stats  where `start_time` BETWEEN ? AND ? AND `student_id` IN(SELECT `id` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ? ) AND `grade`= ?)",[from,to,school,gradejson[i].grade]);
           // console.log(usage);
            activestr=JSON.stringify(activestudents);
            activejson=JSON.parse(activestr);
            console.log(activejson);

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
        for(var i=0;i<gradejson.length;i++){
            regularityarray.push({grade : gradejson[i].grade, avglogin : gradewiselogin[i].avglogin, activepercent : gradewiseactivity[i].activepercent});
       }
        console.log(regularityarray);
       
            //console.log(cgscorearray);
            return regularityarray;


    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    regularityWithMonthFilterDb
}