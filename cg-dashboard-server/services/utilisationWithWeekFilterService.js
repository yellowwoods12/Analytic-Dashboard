const {utilisationWithWeekFilterDb} = require('../db/utilisationWithWeekFilterDb');

const utilisationWithWeekFilterService = async (school,from,to) => {
    try{
        regularityarray = await utilisationWithWeekFilterDb(school,from,to);
        return regularityarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    utilisationWithWeekFilterService
}