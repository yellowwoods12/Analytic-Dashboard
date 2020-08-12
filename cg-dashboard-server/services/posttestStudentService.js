const {posttestStudentDb} = require('../db/posttestStudentDb');

const posttestStudentService = async (school,index,score) => {
    try{
        studentarray = await posttestStudentDb(school,index,score);
       // console.log(learningarray);
        return studentarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    posttestStudentService
}