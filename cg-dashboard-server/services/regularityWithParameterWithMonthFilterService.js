const {regularityWithParameterWithMonthFilterDb} = require('../db/regularityWithParameterWithMonthFilterDb');

const regularityWithParameterWithMonthFilterService = async (school,from,to,parameter_list) => {
    try{
        regularityarray = await regularityWithParameterWithMonthFilterDb(school,from,to,parameter_list);
        return regularityarray;

    } catch(e){
        throw new Error(e.message)
    }
}

module.exports={
    regularityWithParameterWithMonthFilterService
}