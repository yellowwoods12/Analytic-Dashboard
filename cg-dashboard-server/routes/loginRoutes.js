var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '118169',
  database : 'cgslate'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  //  console.log("req",req.body.name);
    var today = new Date();
    var fellow_login={
      "name":req.body.name,
      "password":req.body.password,
      "created":today,
      "modified":today
    }
    connection.query('INSERT INTO fellow_login SET ?',fellow_login, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{

      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
  }

  exports.login = function(req,res){
    //console.log("req",req.body.name);
    var email= req.body.email;
    var password = req.body.password;
    var cgscore;
  //  cgscore = new Promise((resolve,reject) => {
    return new Promise(function(resolve,reject){

    connection.query('SELECT * FROM fellow_login WHERE name = ?',[email],function(error,results,fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      reject(error);

    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        
        if(results[0].password == password){
       //   cgscore = schoolInfo(req,res);
         // console.log(cgscore);
         resolve(email);
         
              
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
        
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });
  
  }).then(function(){
    var fellow = email;
    var json;
    console.log(fellow);
    var outputArray = [];
    return new Promise(function(resolve,reject) {

    connection.query("SELECT SUM(`total_time_spent`) AS 'usage',`center_id` from user_stats,student WHERE student_id IN (SELECT id from student WHERE center_id IN (SELECT `school_code` FROM fellow WHERE `name` = ?)) AND student_id=student.id group by student_id",[fellow], function (error, usage, fields) {
      if (error) {
         console.log("error ocurred",error);
         reject(error);
       
      }else{
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
       }
    //   console.log(outputArray);
         resolve(outputArray);
      }
    });
  }).then(function(){

    var schoolname = [];
    return new Promise(function(resolve,reject){

      connection.query("SELECT school_code,school_name from fellow WHERE name = ?",[fellow],function(error,center,fields){
        if (error) {
          console.log("error ocurred",error);
          reject(error);
        
       }else{
          school=JSON.stringify(center);
          schooljson=JSON.parse(school);
       //  console.log(outputArray);
       //  console.log(schooljson); 
         
          var k=0;
          for(var i=0;i<outputArray.length;i++){

          var id = outputArray[i].center_id;
        //  console.log(id);
          
           var index = schooljson.findIndex(function(item, i){
            return item.school_code === id
          });

         
         var name = schooljson[index].school_name;
          schoolname.push({school_name: name, center_id: outputArray[i].center_id});
        
          
          // var index = schooljson[school_code].indexOf(id);
           //   console.log(index);
              //schoolname[center_id] = schooljson[center_id].school_name;
            //  k++;
            }
            
          //  console.log(schoolname);
            resolve(schooljson);
       }
      });
    }).then(function(){

       var cgscorearray =[];
       return new Promise(function(resolve,reject){

        connection.query("SELECT DATEDIFF(NOW(),`creation_date`) AS enrolled_days,center_id from student WHERE center_id IN (SELECT `school_code` FROM fellow WHERE `name` = ?)",[fellow],function(error,enrol,fields){
          if (error) {
            console.log("error ocurred",error);
            reject(error);
          
         }else{
            str=JSON.stringify(enrol);
            enjs=JSON.parse(str);
           // console.log(enjs);
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
            var output = [];
            for (var group in schools) 
            {
              output.push({enrolled_days: schools[group], center_id: group});
            }
          //  console.log(output);
              resolve(output);
             
             for( var i=0;i<output.length;i++)
             {
               if(outputArray[i].center_id == output[i].center_id){
                  cgscorearray.push({center_id: outputArray[i].center_id, school_name: schoolname[i].school_name, cgscore: outputArray[i].usage/output[i].enrolled_days});

               } 

             }
             console.log(cgscorearray);
         }
        }); 
       }).then( function(){
  //  console.log(json);
    res.status(200).send(cgscorearray);
     });

    });
  });
});
}

  function schoolcode(email){

   
}
   
    function usage(json){

      console.log(json);
         for(var i=0;i<json.length;i++){
          let arr = [];
           //  console.log(json[i].school_code);
            connection.query("SELECT SUM(`total_time_spent`) AS 'usage' from user_stats WHERE student_id IN (SELECT id from student WHERE center_id= ?) group by student_id",[json[i].school_code],function(error, value, fields){
                var array= [];
                if (error) {
                  console.log("error ocurred",error);
                
               }else{
                  str=JSON.stringify(value);
                  js=JSON.parse(str);
                 
                  var len= js.length;
                  var k=0;
                 while(len != 0){
                 
                    array[k] = js[k].usage;
                    
                    
                   // console.log(arr[k]);
                    len-=1;
                    k=k+1;
                  }
                 
                   setvalue(array);
                   //return array;
                  
                 }  
            });  
         }
  }

  function setvalue(value){
    arr = value;
    console.log(arr);
  }