const { utilisationMaxService } = require('../services/utilisationMaxService');


const utilisationMaxController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       utilise = await utilisationMaxService(school);
       res.status(200).send(utilise);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        utilisationMaxController
    }