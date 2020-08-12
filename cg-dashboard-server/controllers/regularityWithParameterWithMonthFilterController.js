const { regularityWithParameterWithMonthFilterService } = require('../services/regularityWithParameterWithMonthFilterService');

const regularityWithParameterWithMonthFilterController = async (req, res, next) => {
 
   const from = req.body.from;
   const to = req.body.to;
   const school = req.body.school;
   const parameter_list = req.body.state;

    console.log(req.body);
    try{
       regularity = await regularityWithParameterWithMonthFilterService(school,from,to,parameter_list);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        regularityWithParameterWithMonthFilterController
    }