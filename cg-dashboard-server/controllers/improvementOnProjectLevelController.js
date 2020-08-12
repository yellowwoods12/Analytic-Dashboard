const { improvementOnProjectLevelService } = require('../services/improvementOnProjectLevelService');

const improvementOnProjectLevelController = async (req, res, next) => {
 
   const user = req.body.user;
   // console.log(req.body);
    try{
       learning = await improvementOnProjectLevelService(user);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        improvementOnProjectLevelController
    }