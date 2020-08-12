const {utilisationMaxDb} = require('../db/utilisationMaxDb');

const utilisationMaxService = async (school) => {
    try{
        utilisearray = await utilisationMaxDb(school);
        return utilisearray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    utilisationMaxService
}