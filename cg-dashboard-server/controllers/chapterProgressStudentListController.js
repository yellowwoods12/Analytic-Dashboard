const { chapterProgressStudentListService } = require('../services/chapterProgressStudentListService');

const chapterProgressStudentListController = async (req, res, next) => {
 
   const school = req.body.school;
  const chapter = req.body.chapter.chapter;
  const index = req.body.index;
  const id = req.body.student_id;

    console.log(req.body);
    try{
       completion = await chapterProgressStudentListService(school,chapter,index,id);
       res.status(200).send(completion);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        chapterProgressStudentListController
        }