const {regularityWithWeekFilterDb} = require('../db/regularityWithWeekFilterDb');

const regularityWithWeekFilterService = async (school,from,to) => {
    try{
        regularityarray = await regularityWithWeekFilterDb(school,from,to);
        return regularityarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    regularityWithWeekFilterService
}