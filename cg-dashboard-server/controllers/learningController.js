const { learningService } = require('../services/learningService');

const learningController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       learning = await learningService(school);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        learningController
    }