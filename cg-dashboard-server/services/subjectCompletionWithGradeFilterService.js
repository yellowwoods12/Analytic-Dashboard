const {subjectCompletionWithGradeFilterDb} = require('../db/subjectCompletionWithGradeFilterDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const subjectCompletionWithGradeFilterService = async (school,grade) => {
    try{
        usagearray = await subjectCompletionWithGradeFilterDb(school,grade);
        console.log(usagearray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        chapterarray = await chapterfilterDb();
        
        usagearraywithfilters = [];
        usagearraywithfilters.push(usagearray);
       usagearraywithfilters.push(gradearray);
        usagearraywithfilters.push(subjectarray);
        usagearraywithfilters.push(chapterarray);
       // console.log(learningarraywithfilters);
        return usagearraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    subjectCompletionWithGradeFilterService
}