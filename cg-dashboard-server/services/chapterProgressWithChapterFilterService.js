const {chapterProgressWithChapterFilterDb} = require('../db/ chapterProgressWithChapterFilterDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const chapterProgressWithChapterFilterService = async (school,chapter) => {
    try{
        console.log(school);
       chapters = await chapterProgressWithChapterFilterDb(school,chapter);
       // console.log(chapterarray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        chapterarray = await chapterfilterDb();
        
        learningarraywithfilters = [];
        learningarraywithfilters.push(chapters[0]);
        learningarraywithfilters.push(gradearray);
        learningarraywithfilters.push(subjectarray);
        learningarraywithfilters.push(chapterarray);
        learningarraywithfilters.push(chapters[1]);

        console.log(learningarraywithfilters);
        return learningarraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    chapterProgressWithChapterFilterService
}