const { learningWithChapterFilterService } = require('../services/learningWithChapterFilterService');

const learningWithChapterFilterController = async (req, res, next) => {
 
   const school = req.body.school;
   const chapter = req.body.chapter.chapter;
    console.log(req.body);
    try{
       learning = await learningWithChapterFilterService(school,chapter);
       res.status(200).send(learning);
    
    } catch (e) {
        
        throw new Error (e.message);
    }
    
    }
    
    module.exports = {
        learningWithChapterFilterController
    }