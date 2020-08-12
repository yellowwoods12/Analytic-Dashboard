const { regularityWithWeekFilterService } = require('../services/regularityWithWeekFilterService');

const regularityWithWeekFilterController = async (req, res, next) => {
 
   const from = req.body.from;
   const to = req.body.to;
   const school = req.body.school;
    console.log(req.body);
    try{
       regularity = await regularityWithWeekFilterService(school,from,to);
       res.status(200).send(regularity);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        regularityWithWeekFilterController
    }