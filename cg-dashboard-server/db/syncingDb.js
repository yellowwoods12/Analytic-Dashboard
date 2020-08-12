var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');


const syncingDb = async (school) => {
    try{
       // console.log(email);
        let mappingpromisify = promisify(connection.query).bind(connection);
       const mapping = await mappingpromisify('SELECT distinct(`device_id`),`student_id` from `device_student_history` WHERE `student_id` IN (SELECT `id` from student WHERE `center_id` IN (SELECT `id` from fellow where school_name = ?))',[school]);
       
       mappingstr=JSON.stringify(mapping);
       mappingjson=JSON.parse(mappingstr);
       //console.log(mappingjson);
        let codepromisify = promisify(connection.query).bind(connection);
        const license = await codepromisify('SELECT `code`,`device_id` from license WHERE device_id IN (SELECT distinct(`device_id`) from `device_student_history` WHERE `student_id` IN (SELECT `id` from student WHERE `center_id` IN (SELECT `id` from fellow where school_name = ?)))',[school]);
        
        licensestr = JSON.stringify(license);
        licensejson = JSON.parse(licensestr);
        console.log(licensejson);

        let syncpromisify = promisify(connection.query).bind(connection);
        let sync = await syncpromisify('SELECT max(`android_last_updated`) as `sync`,`student_id` from user_stats WHERE student_id IN (SELECT distinct(`student_id`) from `device_student_history` WHERE `student_id` IN (SELECT `id` from student WHERE `center_id` IN (SELECT `id` from fellow where school_name = ? ))) group by `student_id` order by sync DESC',[school]);

        syncstr = JSON.stringify(sync);
        syncjson = JSON.parse(syncstr);
        syncarray =[];
        sync = [];
        for(var i=0;i<syncjson.length;i++){

            var id = syncjson[i].student_id;
            var index = mappingjson.findIndex(function(item, i){
                return item.student_id === id
            });
            syncval = syncjson[i].sync.split("T");
           // console.log(syncarray); 
            syncarray.push({student_id: mappingjson[index].student_id, device_id: mappingjson[index].device_id, last_sync: syncval[0]});
        }
         console.log(syncarray);

        for(var i=0;i<syncarray.length;i++){

            var id = syncarray[i].device_id;
          console.log(id);
            var index = licensejson.findIndex(function(item, i){
                return item.device_id == id
            });
            console.log(index);
             
            sync.push({device_id: licensejson[index].code, last_sync: syncarray[i].last_sync});
        }
        
       return sync;
   
    } catch (e) {
        throw new Error( e.message);
    }
   } 
   
   module.exports = {
       syncingDb
   }