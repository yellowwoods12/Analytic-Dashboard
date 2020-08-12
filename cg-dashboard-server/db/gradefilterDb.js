var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const gradefilterDb = async () => {
 try{
    // console.log(email);
     let gradepromisify = promisify(connection.query).bind(connection);
    const gradefilter = await gradepromisify('SELECT distinct(grade) as `grade` from student'); 
    gradestr=JSON.stringify(gradefilter);
    gradejson=JSON.parse(gradestr);
   // console.log(gradejson);

    
    gradearray = [];

    for(var i=0;i<gradejson.length;i++){
        var grades = gradejson[i].grade;
        //console.log(grades);
        gradearray.push({grade : grades });
    }

  // console.log(filterarray);
    return gradearray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    gradefilterDb
}