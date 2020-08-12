const {chapterCompletionWithSubjectFilterDb} = require('../db/chapterCompletionWithSubjectFilterDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const chapterCompletionWithSubjectFilterService = async (school,subject) => {
    try{
        console.log(school);
       chapters = await chapterCompletionWithSubjectFilterDb(school,subject);
       // console.log(chapterarray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        chapterarray = await chapterfilterDb();
        
        learningarraywithfilters = [];
        learningarraywithfilters.push(chapters);
        learningarraywithfilters.push(gradearray);
        learningarraywithfilters.push(subjectarray);
        learningarraywithfilters.push(chapterarray);
        console.log(learningarraywithfilters);
        return learningarraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    chapterCompletionWithSubjectFilterService
}