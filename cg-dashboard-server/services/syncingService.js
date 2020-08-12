const {syncingDb} = require('../db/syncingDb');

const syncingService = async (school) => {
    try{
        syncarray = await syncingDb(school);
        return syncarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    syncingService
}