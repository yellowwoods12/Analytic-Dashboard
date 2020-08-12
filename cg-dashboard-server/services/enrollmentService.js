const {enrollmentDb} = require('../db/enrollmentDb');

const enrollmentService = async (school) => {
    try{
        enrollarray = await enrollmentDb(school);
        return enrollarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    enrollmentService
}