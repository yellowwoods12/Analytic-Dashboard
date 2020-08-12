const { gradeListService } = require('../services/gradeListService');

const gradeListController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       gradeList = await gradeListService(school);
       res.status(200).send(gradeList);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        gradeListController
    }