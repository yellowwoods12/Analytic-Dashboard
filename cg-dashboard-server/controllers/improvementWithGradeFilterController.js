const { improvementWithGradeFilterService } = require('../services/improvementWithGradeFilterService');

const improvementWithGradeFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const grade = req.body.grade.grade;
    console.log(req.body);
    try{
       learning = await improvementWithGradeFilterService(school,grade);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        improvementWithGradeFilterController
    }