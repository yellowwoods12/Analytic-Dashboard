var mysql = require('mysql');
const { promisify } = require('util');
var connection = require('../connection');

    
const chapterfilterDb = async () => {
 try{
    // console.log(email);

    let chapterpromisify = promisify(connection.query).bind(connection);
    const chapterfilter = await chapterpromisify('SELECT distinct(`defaultName`) as `chapter` from content where type="CHAPTER"');
    chapterstr = JSON.stringify(chapterfilter);
    chapterjson = JSON.parse(chapterstr);
   // console.log(chapterjson);

    
    chapterarray = [];

    for(var i=0;i<chapterjson.length;i++){
        var chapters = chapterjson[i].chapter; 
        chapterarray.push({chapter : chapters });
    }

    return chapterarray;

 } catch (e) {
     throw new Error( e.message);
 }
} 

module.exports = {
    chapterfilterDb
}