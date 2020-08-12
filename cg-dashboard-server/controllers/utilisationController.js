const { utilisationService } = require('../services/utilisationService');


const utilisationController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       utilise = await utilisationService(school);
       res.status(200).send(utilise);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        utilisationController
    }