const {regularityWithMonthFilterDb} = require('../db/regularityWithMonthFilterDb');

const regularityWithMonthFilterService = async (school,from,to) => {
    try{
        regularityarray = await regularityWithMonthFilterDb(school,from,to);
        return regularityarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    regularityWithMonthFilterService
}