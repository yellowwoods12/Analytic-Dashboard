const {syncingMaxDb} = require('../db/syncingMaxDb');

const syncingMaxService = async (school) => {
    try{
        syncarray = await syncingMaxDb(school);
        return syncarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    syncingMaxService
}