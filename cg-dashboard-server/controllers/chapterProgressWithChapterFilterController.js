const { chapterProgressWithChapterFilterService } = require('../services/chapterProgressWithChapterFilterService');

const chapterProgressWithChapterFilterController = async (req, res, next) => {
 
   const school = req.body.school;
  const chapter = req.body.chapter.chapter;
    console.log(req.body);
    try{
       completion = await chapterProgressWithChapterFilterService(school,chapter);
       res.status(200).send(completion);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        chapterProgressWithChapterFilterController
        }