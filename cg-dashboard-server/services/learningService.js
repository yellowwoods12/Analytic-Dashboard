const {learningDb} = require('../db/learningDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const learningService = async (school) => {
    try{
        learningarray = await learningDb(school);
        console.log(learningarray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        chapterarray = await chapterfilterDb();
        
        learningarraywithfilters = [];
        learningarraywithfilters.push(learningarray);
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
    learningService
}