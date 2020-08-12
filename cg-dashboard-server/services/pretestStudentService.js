const {pretestStudentDb} = require('../db/pretestStudentDb');

const pretestStudentService = async (school,index,score) => {
    try{
       // console.log(score);
        studentarray = await pretestStudentDb(school,index,score);
       // console.log(learningarray);
        return studentarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    pretestStudentService
}