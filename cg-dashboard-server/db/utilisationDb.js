var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const utilisationDb = async (school) => {
 try{
    // console.log(email);
     let utilisepromisify = promisify(connection.query).bind(connection);
    const utilise = await utilisepromisify('SELECT `device_id`, SUM(datediff(`deletion_date`,`creation_date`)) as `usage`,count(`device_id`) as `logins` from device_student_history where student_id IN (SELECT id from student where center_id IN(SELECT `id` from fellow WHERE school_name=?)) group by `device_id` order by `usage` DESC',[school]);

    utilisestr=JSON.stringify(utilise);
    utilisejson=JSON.parse(utilisestr);
    
    let licensepromisify =promisify(connection.query).bind(connection);
    const license = await licensepromisify('SELECT distinct(`code`), `device_id` from license where `device_id` IN (SELECT device_id from student where center_id IN(SELECT `id` from fellow WHERE school_name=?))',[school]);

    licensestr = JSON.stringify(license);
    licensejson = JSON.parse(licensestr);

    console.log(licensejson);
    console.log(utilisejson);

    utilisearray = [];
    for(var i=0;i<utilisejson.length;i++){

        var id = utilisejson[i].device_id;
       
        var index = licensejson.findIndex(function(item, i){
            return item.device_id == id
        });
        
        if(index==-1){
            index=0;
        }
        console.log(index); 
        utilisearray.push({code: licensejson[index].code, usage: utilisejson[i].usage, logins: utilisejson[i].logins});
    }
    return utilisearray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    utilisationDb
}