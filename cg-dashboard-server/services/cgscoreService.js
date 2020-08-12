const {usageDb} = require('../db/usageDb');

const cgscoreService = async (fellow) => {
    try{
        console.log(fellow);
        cgscore = await usageDb( fellow );
        console.log(cgscore);
        return cgscore;
    }
    catch(e){
        throw new Error(e.message);
    }
}
module.exports = {
    cgscoreService
}