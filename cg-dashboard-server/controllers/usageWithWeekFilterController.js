const { usageWithWeekFilterService } = require('../services/usageWithWeekFilterService');


const usageWithWeekFilterController = async (req, res, next) => {
 
   const from = req.body.from;
   const to = req.body.to;
   const school = req.body.school;
   // console.log(req.body);
    try{
       utilise = await usageWithWeekFilterService(school,from,to);
       res.status(200).send(utilise);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        usageWithWeekFilterController
    }