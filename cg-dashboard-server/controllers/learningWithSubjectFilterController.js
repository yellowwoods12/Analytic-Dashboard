const { learningWithSubjectFilterService } = require('../services/learningWithSubjectFilterService');

const learningWithSubjectFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const subject = req.body.subject.subject;
    console.log(req.body.grade);
    try{
       learning = await learningWithSubjectFilterService(school,subject);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        learningWithSubjectFilterController
    }