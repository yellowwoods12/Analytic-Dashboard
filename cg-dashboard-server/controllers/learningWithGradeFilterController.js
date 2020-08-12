const { learningWithGradeFilterService } = require('../services/learningWithGradeFilterService');

const learningWithGradeFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const grade = req.body.grade.grade;
    console.log(req.body.grade);
    try{
       learning = await learningWithGradeFilterService(school,grade);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        learningWithGradeFilterController
    }