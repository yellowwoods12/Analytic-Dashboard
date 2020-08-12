const { feedService } = require('../services/feedService');

const feedController = async (req, res, next) => {
 
const name = req.body.name;
const password = req.body.password;
const school_code = req.body.school_code;
const school_name = req.body.school_name;
try{
    response = await feedService(name,password,school_code,school_name);
   // console.log(cgscore);
    res.status(200).send(response);

} catch (e) {
    throw new Error (e);
}

}

module.exports = {
    feedController
}