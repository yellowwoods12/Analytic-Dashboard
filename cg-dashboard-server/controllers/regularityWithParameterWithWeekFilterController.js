const { regularityWithParameterWithWeekFilterService } = require('../services/regularityWithParameterWithWeekFilterService');

const regularityWithParameterWithWeekFilterController = async (req, res, next) => {
 
   const from = req.body.from;
   const to = req.body.to;
   const school = req.body.school;
   const parameter_list = req.body.state;
   const days = req.body.days;

    console.log(req.body);
    try{
       regularity = await regularityWithParameterWithWeekFilterService(school,from,to,parameter_list,days);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    
    }
    
    module.exports = {
        regularityWithParameterWithWeekFilterController
    }