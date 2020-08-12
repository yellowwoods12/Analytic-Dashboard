const { utilisationWithWeekFilterService } = require('../services/utilisationWithWeekFilterService');


const utilisationWithWeekFilterController = async (req, res, next) => {
 
   const from = req.body.from;
   const to = req.body.to;
   const school = req.body.school;
   // console.log(req.body);
    try{
       utilise = await utilisationWithWeekFilterService(school,from,to);
       res.status(200).send(utilise);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        utilisationWithWeekFilterController
    }