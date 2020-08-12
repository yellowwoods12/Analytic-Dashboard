const { questionDetailsService } = require('../services/questionDetailsService');

const questionDetailsController = async (req, res, next) => {
 
   const school = req.body.school;
   const id = req.body.question_id;
   // console.log(req.body);
    try{
       details = await questionDetailsService(school,id);
       res.status(200).send(details);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        questionDetailsController
    }