const {gradefilterDb} = require('../db/gradefilterDb');

const gradeListService = async (school) => {
    try{
        grade = await gradefilterDb(school);
        return grade;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    gradeListService
}