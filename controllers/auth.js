const {getAuth} = require("firebase-admin/auth");
const {admin} = require('../helpers/admin');
exports.register = async(req,res,next) =>{
    try {
        const user = await getAuth().createUser({
            email:'sou@gmail.com',
            password: 'redroch'
        });
      const token = await   getAuth().createCustomToken(user.uid); 
      const expiresIn = 60*60*24*5*1000;
      const sessionCookie = await getAuth().createSessionCookie(token, {expiresIn});
      const options = {maxAge:expiresIn, httpOnly:true};
      res.cookie("session", sessionCookie, options)
        console.log(token);
        res.json({
            msg: 'rochdi'
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
    
}