const {questionDetailsDb} = require('../db/questionDetailsDb');

const questionDetailsService = async (school,id) => {
    try{
        errorarray = await questionDetailsDb(school,id);
        return errorarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    questionDetailsService
}