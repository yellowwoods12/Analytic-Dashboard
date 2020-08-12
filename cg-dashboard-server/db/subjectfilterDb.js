var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const subjectfilterDb = async () => {
 try{
   

    let subjectpromisify = promisify(connection.query).bind(connection);
    const subjectfilter = await subjectpromisify('SELECT distinct(`defaultName`) as `subject` from content where type="SUBJECT"');
    subjectstr = JSON.stringify(subjectfilter);
    subjectjson = JSON.parse(subjectstr);
  //  console.log(subjectjson);
  
    subjectarray = [];

    for(var i=0;i<subjectjson.length;i++){
        var subjects =  subjectjson[i].subject;
        subjectarray.push({subject : subjects});
    }

    return subjectarray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
  subjectfilterDb
}