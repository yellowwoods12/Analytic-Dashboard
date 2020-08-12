const { syncingMaxService } = require('../services/syncingMaxService');

const syncingMaxController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       sync = await syncingMaxService(school);
       res.status(200).send(sync);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        syncingMaxController
    }