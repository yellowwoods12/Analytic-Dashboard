const {regularityDb} = require('../db/regularityDb');

const regularityService = async (school) => {
    try{
        regularityarray = await regularityDb(school);
        return regularityarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    regularityService
}