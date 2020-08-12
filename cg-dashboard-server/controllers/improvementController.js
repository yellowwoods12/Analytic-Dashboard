const { improvementService } = require('../services/improvementService');

const improvementController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       learning = await improvementService(school);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        improvementController
    }