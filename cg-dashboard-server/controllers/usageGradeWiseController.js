const { usageGradeWiseService } = require('../services/usageGradeWiseService');

const usageGradeWiseController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       usage = await usageGradeWiseService(school);
       res.status(200).send(usage);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        usageGradeWiseController
    }