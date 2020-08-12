const { enrollmentService } = require('../services/enrollmentService');
const { schoolcodeService } = require('../services/schoolcodeService');

const enrollmentController = async (req, res, next) => {
 
   const school = req.body.school;
   // console.log(req.body);
    try{
       enroll = await enrollmentService(school);
       code = await schoolcodeService(school);
       console.log(code);
       res.status(200).send({enroll: enroll, school_code: code});
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        enrollmentController
    }