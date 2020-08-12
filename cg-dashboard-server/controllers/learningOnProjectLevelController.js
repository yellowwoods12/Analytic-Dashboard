const { learningOnProjectLevelService } = require('../services/learningOnProjectLevelService');

const learningOnProjectLevelController = async (req, res, next) => {
 
   const user = req.body.user;
   // console.log(req.body);
    try{
       learning = await learningOnProjectLevelService(user);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        learningOnProjectLevelController
    }