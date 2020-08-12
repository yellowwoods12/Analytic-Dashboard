const { loginService } = require('../services/loginService');

const loginController = async (req, res, next) => {
 
const email = req.body.email;
const password = req.body.password;
console.log(email);
try{
    console.log("45");
    cgscore = await loginService(email, password);
    console.log("12");
    console.log(cgscore);
    res.status(200).send(cgscore);

} catch (e) {
    throw new Error (e);
}

}

module.exports = {
    loginController
}