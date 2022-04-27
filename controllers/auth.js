const {createUserWithEmailAndPassword} = require("firebase/auth")
const {auth} = require("../helpers/firebaseHandler");
exports.register = async(req,res,next) =>{
    try {
        const user = await createUserWithEmailAndPassword(auth,'sou@gmail.com','redroch');
        res.status(201).json({user});
        
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
    
}