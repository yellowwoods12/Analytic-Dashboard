

const {improvementWithSubjectFilterDb} = require('../db/improvementWithSubjectFilterDb');
const {gradefilterDb} = require('../db/gradefilterDb');
const {subjectfilterDb} = require('../db/subjectfilterDb');
const {schoolcodefilterDb} = require('../db/schoolcodefilterDb');

const improvementWithSubjectFilterService = async (school,subject) => {
    try{
        improvementarray = await improvementWithSubjectFilterDb(school,subject);
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
  improvementWithSubjectFilterService
}