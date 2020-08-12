var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const utilisationMaxDb = async (school) => {
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
    

        var id = utilisejson[0].device_id;
       
        var index = licensejson.findIndex(function(item, i){
            return item.device_id == id
        });
    
        console.log(index); 
        utilisearray.push({code: licensejson[index].code, usage: utilisejson[0].usage, logins: utilisejson[0].logins});

        var id = utilisejson[utilisejson.length-1].device_id;
       
        var index = licensejson.findIndex(function(item, i){
            return item.device_id == id
        });
    
        console.log(index); 
        utilisearray.push({code: licensejson[index].code, usage: utilisejson[utilisejson.length-1].usage, logins: utilisejson[utilisejson.length-1].logins});
    
    return utilisearray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    utilisationMaxDb
}