const { regularityService } = require('../services/regularityService');

const regularityController = async (req, res, next) => {
 
    console.log(req.body);
   const school = req.body.school;
    
    try{
       regularity = await regularityService(school);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        regularityController
    }