const {feedDb} = require('../db/feedDb');


const feedService = async (name,password,school_code,school_name) => {
   try{
       console.log("iu");
     response = await  feedDb(name,password,school_code,school_name);
     return response;
         
       }
    catch(e) {
       throw new Error ( e.message );
   }

}

module.exports = {
    feedService
}