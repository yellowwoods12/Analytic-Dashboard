const {utilisationDb} = require('../db/utilisationDb');

const utilisationService = async (school) => {
    try{
        utilisearray = await utilisationDb(school);
        return utilisearray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    utilisationService
}