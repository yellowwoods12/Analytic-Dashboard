const { improvementWithSchoolFilterService } = require('../services/improvementWithSchoolFilterService');

const improvementWithSchoolFilterController = async (req, res, next) => {
 
   const school = req.body.school.school;
   
    console.log(req.body);
    try{
       learning = await improvementWithSchoolFilterService(school);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        improvementWithSchoolFilterController
    }