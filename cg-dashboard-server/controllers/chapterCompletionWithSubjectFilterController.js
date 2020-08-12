const { chapterCompletionWithSubjectFilterService } = require('../services/chapterCompletionWithSubjectFilterService');

const chapterCompletionWithSubjectFilterController = async (req, res, next) => {
 
   const school = req.body.school;
  const subject = req.body.subject.subject
    console.log(req.body);
    try{
       completion = await chapterCompletionWithSubjectFilterService(school,subject);
       res.status(200).send(completion);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        chapterCompletionWithSubjectFilterController
    }