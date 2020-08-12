var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const feedDb = async(name,password,school_code,school_name) => {
 try{
    var today = new Date();
    var fellow_login={
        "name": name,
        "password":password,
        "created":today,
        "modified":today
      }
      console.log("ty");
      var fellow = {
          "name": name,
          "school_code" : school_code,
          "school_name": school_name
      }

      let fellowloginpromisify = promisify(connection.query).bind(connection);
      const response = await fellowloginpromisify('INSERT INTO fellow_login SET ?',[fellow_login]);
      console.log(response);

      let fellowpromisify = promisify(connection.query).bind(connection);
      const responsefellow = await fellowpromisify('INSERT INTO fellow SET ?',[fellow]);
      console.log(responsefellow);

       return 1;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    feedDb
}