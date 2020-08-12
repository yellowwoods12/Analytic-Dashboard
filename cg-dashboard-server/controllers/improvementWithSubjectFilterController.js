const { improvementWithSubjectFilterService } = require('../services/improvementWithSubjectFilterService');

const improvementWithSubjectFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const subject = req.body.subject.subject;
    console.log(req.body);
    try{
       learning = await improvementWithSubjectFilterService(school,subject);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        improvementWithSubjectFilterController
    }