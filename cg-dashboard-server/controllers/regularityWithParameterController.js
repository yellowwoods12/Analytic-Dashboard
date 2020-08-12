const { regularityWithParameterService } = require('../services/regularityWithParameterService');

const regularityWithParameterController = async (req, res, next) => {
 
    console.log(req.body);
   const paramter_list = req.body.state;
   const school = req.body.school;
    
    try{
       regularity = await regularityWithParameterService(school,paramter_list);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        regularityWithParameterController
    }