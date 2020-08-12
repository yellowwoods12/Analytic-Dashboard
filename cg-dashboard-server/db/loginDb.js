var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

const loginDb = async (email, password) => {
 try{
     console.log(email);
     let fellowpromisify = promisify(connection.query).bind(connection);
    const result = await fellowpromisify('SELECT * FROM fellow_login WHERE name = ?',[email]);
    console.log(result);
    return result;


 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    loginDb
}