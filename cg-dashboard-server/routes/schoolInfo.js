exports.schoolInfo = function(req,res){
    console.log("req",req.body.name);
    var fellow= req.body.name;
    
    connection.query('SELECT `school code` FROM fellow WHERE name = ?',[fellow], function (error, results, fields) {
    if (error) {
       console.log("error ocurred",error);
     
    }else{
       console.log('The solution is: ', results);
     
      }
  
    });
  }