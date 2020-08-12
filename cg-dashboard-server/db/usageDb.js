var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const usageDb = async (fellow) => {
    try {
        var outputArray = [];
        let usagepromisify = promisify(connection.query).bind(connection);
        const usage = await usagepromisify("SELECT SUM(`total_time_spent`) AS 'usage',`center_id` from user_stats,student WHERE student_id IN (SELECT id from student WHERE center_id IN (SELECT `id` FROM fellow WHERE `name` = ?)) AND student_id=student.id group by student_id",[fellow]);
       // console.log(usage);
        tostr=JSON.stringify(usage);
        json=JSON.parse(tostr);
      //  console.log(json);
        var groups = {};
        for (var i = 0; i < json.length; i++) 
        {
           var groupName = json[i].center_id;
           if (!groups[groupName]) 
           {
              groups[groupName] = 0;
           }
           groups[groupName] = groups[groupName] + json[i].usage;
        }
        for (var groupName in groups) 
        {
          outputArray.push({usage: groups[groupName], center_id: groupName,});
        0}
        var schoolname = [];
        let centerpromisify = promisify(connection.query).bind(connection);
        const center = await centerpromisify("SELECT id,school_name from fellow WHERE name = ?",[fellow]);
        school=JSON.stringify(center);
        schooljson=JSON.parse(school);
       // console.log(schooljson);
        var k=0;
        for(var i=0;i<outputArray.length;i++){

        var id = outputArray[i].center_id;
        var index = schooljson.findIndex(function(item, i){
            return item.id== id
        });

         
        var name = schooljson[index].school_name;
        schoolname.push({school_name: name, center_id: outputArray[i].center_id});
    }
        var cgscorearray =[];
        let enrolpromisify = promisify(connection.query).bind(connection);
        const enrol = await enrolpromisify("SELECT DATEDIFF(NOW(),`creation_date`) AS enrolled_days,center_id from student WHERE center_id IN (SELECT `id` FROM fellow WHERE `name` = ?)",[fellow]);
        str=JSON.stringify(enrol);
            enjs=JSON.parse(str);
            console.log(enjs);
            var schools = {};
            for (var i = 0; i < enjs.length; i++) 
            {
              var group = enjs[i].center_id;
              if (!schools[group]) 
              {
                schools[group] = 0;
              }
              schools[group] = schools[group] + enjs[i].enrolled_days;
            }
            console.log(schools);
            var output = [];
            for (var group in schools) 
            {
              output.push({enrolled_days: schools[group], center_id: group});
            }
       //    console.log(output);
        //   console.log(outputArray);
            for( var i=0;i<outputArray.length;i++)
            {
              if(outputArray[i].center_id == output[i].center_id){
                 cgscorearray.push({center_id: outputArray[i].center_id, school_name: schoolname[i].school_name, cgscore: outputArray[i].usage/output[i].enrolled_days});

              } 
            }
            //console.log(cgscorearray);
            return cgscorearray;


    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    usageDb
}