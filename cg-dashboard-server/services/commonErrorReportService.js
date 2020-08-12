const {commonErrorReportDb} = require('../db/commonErrorReportDb');

const commonErrorReportService = async (school) => {
    try{
        errorarray = await commonErrorReportDb(school);
        return errorarray;

    } catch(e){
        throw new Error(e.message);
    }
}

module.exports={
    commonErrorReportService
}