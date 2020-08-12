const {usageFromRegularityDb} = require('../db/usageFromRegularityDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {chapterfilterDb} = require('../db/chapterfilterDb');


const  usageFromRegularityService = async (school,parameter_list) => {
    try{
        usagearray = await usageFromRegularityDb(school,parameter_list);
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

        return usagearray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    usageFromRegularityService
}