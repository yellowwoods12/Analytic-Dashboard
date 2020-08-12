var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const schoolcodefilterDb = async () => {
 try{
   

    let schoolpromisify = promisify(connection.query).bind(connection);
    const schoolfilter = await schoolpromisify('SELECT distinct(`school_name`) as `school` from fellow');
    schoolstr = JSON.stringify(schoolfilter);
    schooljson = JSON.parse(schoolstr);
  //  console.log(subjectjson);
  
    schoolarray = [];

    for(var i=0;i<schooljson.length;i++){
        var school =  schooljson[i].school;
        schoolarray.push({school : school});
    }

    return schoolarray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
  schoolcodefilterDb
}