const {improvementWithSchoolFilterDb} = require('../db/improvementWithSchoolFilterDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {schoolcodefilterDb} = require('../db/schoolcodefilterDb');

const improvementWithSchoolFilterService = async (school) => {
    try{
        improvementarray = await improvementWithSchoolFilterDb(school);
      //  console.log(learningarray);

        gradearray = await gradefilterDb();
        subjectarray = await subjectfilterDb();
        schoolcodearray = await schoolcodefilterDb();
        
        improvementarraywithfilters = [];
        improvementarraywithfilters.push(improvementarray);
        improvementarraywithfilters.push(gradearray);
        improvementarraywithfilters.push(subjectarray);
        improvementarraywithfilters.push(schoolcodearray);
        console.log(improvementarraywithfilters);
        return improvementarraywithfilters;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
  improvementWithSchoolFilterService
}