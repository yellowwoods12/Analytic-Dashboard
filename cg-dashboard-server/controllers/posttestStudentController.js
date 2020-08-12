const { posttestStudentService } = require('../services/posttestStudentService');

const posttestStudentController = async (req, res, next) => {
 
    //console.log(req);
   const school = req.body.school;
   const index = req.body.index;
   const score = req.body.score;
    console.log(req.body);
    try{
       students = await posttestStudentService(school,index,score);
       res.status(200).send(students);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        posttestStudentController
    }