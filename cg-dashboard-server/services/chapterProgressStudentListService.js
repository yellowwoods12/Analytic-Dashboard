const {chapterProgressStudentListDb} = require('../db/chapterProgressStudentListDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');

const chapterProgressStudentListService = async (school,chapter,index,id) => {
    try{
        console.log(school);
       chapters = await chapterProgressStudentListDb(school,chapter,index,id);
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
        learningarraywithfilters.push(chapters[2]);


        console.log(learningarraywithfilters);
        return learningarraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    chapterProgressStudentListService
}