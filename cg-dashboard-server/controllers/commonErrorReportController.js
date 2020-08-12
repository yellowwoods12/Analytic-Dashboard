const { commonErrorReportService } = require('../services/commonErrorReportService');

const commonErrorReportController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       learning = await commonErrorReportService(school);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        commonErrorReportController
    }