const {usageGradeWiseDb} = require('../db/usageGradeWiseDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const usageGradeWiseService = async (school) => {
    try{
        usagearray = await usageGradeWiseDb(school);
       // console.log(learningarray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        chapterarray = await chapterfilterDb();
        
        usagearraywithfilters = [];
        usagearraywithfilters.push(usagearray);
        usagearraywithfilters.push(gradearray);
        usagearraywithfilters.push(subjectarray);
        usagearraywithfilters.push(chapterarray);
        console.log(usagearraywithfilters);
        return usagearraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
   usageGradeWiseService
}