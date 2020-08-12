
const {SchoolcodeDb} = require('../db/schoolcodeDb');
const { schoolcodeDb } = require('../db/schoolcodeDb');



const schoolcodeService = async (school) => {
   try{

       result = await schoolcodeDb(school);
      // console.log(password);
                return result;
               
           }
          
    catch(e) {
       //console.log('34');
       throw new Error ( e.message );
   }
}


module.exports = {
    schoolcodeService
}