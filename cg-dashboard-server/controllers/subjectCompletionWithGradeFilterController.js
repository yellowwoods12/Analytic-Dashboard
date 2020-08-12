const { subjectCompletionWithGradeFilterService } = require('../services/subjectCompletionWithGradeFilterService');

const subjectCompletionWithGradeFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const grade = req.body.grade.grade;
    console.log(req.body);
    try{
       completion = await subjectCompletionWithGradeFilterService(school,grade);
       res.status(200).send(completion);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        subjectCompletionWithGradeFilterController
    }