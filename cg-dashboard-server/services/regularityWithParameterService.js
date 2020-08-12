const {regularityWithParameterDb} = require('../db/regularityWithParameterDb');

const regularityWithParameterService = async (school,parameter_list) => {
    try{
        regularityarray = await regularityWithParameterDb(school,parameter_list);
        return regularityarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    regularityWithParameterService
}