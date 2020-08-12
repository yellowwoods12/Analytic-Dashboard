const {regularityWithParameterWithWeekFilterDb} = require('../db/regularityWithParameterWithWeekFilterDb');

const regularityWithParameterWithWeekFilterService = async (school,from,to,parameter_list,days) => {
    try{
        regularityarray = await regularityWithParameterWithWeekFilterDb(school,from,to,parameter_list,days);
        return regularityarray;

    } catch(e){
        throw new Error(e.message)
    }
}

module.exports={
    regularityWithParameterWithWeekFilterService
}