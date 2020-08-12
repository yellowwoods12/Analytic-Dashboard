const {loginDb} = require('../db/loginDb');
const {cgscoreService} = require('./cgscoreService');

const loginService = async (email,password) => {
   try{

       result = await loginDb(email, password);
       console.log(password);
       if(result.length > 0){
           if(result[0].password == password){
               var fellow = email;
               cgscore = await cgscoreService(fellow);
                console.log(cgscore);
                return cgscore;
               
           }
           else{
               response ="Email and password does not match";
               return response;
           }
       }
       else {
           response = "Email does not exits";
           return response;
       }
   } catch(e) {
       //console.log('34');
       throw new Error ( e.message );
   }

}

module.exports = {
    loginService
}