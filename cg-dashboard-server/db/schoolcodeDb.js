var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const schoolcodeDb = async (school) => {
 try{
    // console.log(email);
     let codepromisify = promisify(connection.query).bind(connection);
    const result = await codepromisify('SELECT `school_code` FROM fellow WHERE school_name = ?',[school]);
    
    return result;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    schoolcodeDb
}