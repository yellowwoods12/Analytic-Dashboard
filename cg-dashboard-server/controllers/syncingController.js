const { syncingService } = require('../services/syncingService');

const syncingController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       sync = await syncingService(school);
       res.status(200).send(sync);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        syncingController
    }