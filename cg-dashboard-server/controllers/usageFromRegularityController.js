const { usageFromRegularityService } = require('../services/usageFromRegularityService');

const usageFromRegularityController = async (req, res, next) => {
 
    console.log(req.body);
   const paramter_list = req.body.state;
   const school = req.body.school;
    
    try{
       regularity = await usageFromRegularityService(school,paramter_list);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
       usageFromRegularityController
    }