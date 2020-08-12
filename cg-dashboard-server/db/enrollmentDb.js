var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const enrollmentDb = async (school) => {
 try{
    // console.log(email);
     let createdpromisify = promisify(connection.query).bind(connection);
    const created = await createdpromisify('SELECT count(`name`) AS `created`,`grade` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?) AND `device_id` IS NOT NULL group by `grade`',[school]);
    
    createdstr=JSON.stringify(created);
    createdjson=JSON.parse(createdstr);
console.log(createdjson);
    let notcreatedpromisify = promisify(connection.query).bind(connection);
    const notcreated = await notcreatedpromisify('SELECT count(`name`) AS `not_created`,`grade` from student WHERE `center_id` IN(SELECT `id` from fellow WHERE `school_name`= ?) AND `device_id` IS NULL group by `grade`',[school]);
    
    notstr = JSON.stringify(notcreated);
    notjson = JSON.parse(notstr);
    console.log(notjson);
    console.log("23");
    for(var i=0;i<createdjson.length;i++){
        if(createdjson[i].grade in notjson === false){
            notjson.push({not_created:0,grade: createdjson[i].grade})
        }
    }
    for(var i=0;i<notjson.length;i++){
        if(notjson[i].grade in createdjson === false && notjson[i].not_created!=0){
            createdjson.push({created:0,grade: notjson[i].grade})
        }
    }
    
    console.log(notjson);
    enrolarray = [];
    for(var i=0;i<createdjson.length;i++){

        var id = createdjson[i].grade;
        var index = notjson.findIndex(function(item, i){
            return item.grade === id
        });
    
       // console.log(syncarray); 
        enrolarray.push({grade : createdjson[i].grade, created: createdjson[i].created, not_created:notjson[index].not_created});
    }
        var uniqueEnroll = [];
        console.log(enrolarray);
        // Loop through array values

        var groups= {};
        for (var i = 0; i < enrolarray.length; i++) 
        {
           var groupName = enrolarray[i].grade;
           if (!groups[groupName]) 
           {
              groups[groupName] = 0;
           }
        }
        for (var groupName in groups) 
        {
            var index = enrolarray.findIndex(function(item, i){
                return item.grade === groupName
            });
            uniqueEnroll.push({grade : enrolarray[index].grade, created: enrolarray[index].created, not_created: enrolarray[index].not_created});
        }
    
    console.log(uniqueEnroll);
    return uniqueEnroll;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    enrollmentDb
}