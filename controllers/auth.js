const {createUserWithEmailAndPassword,signInWithEmailAndPassword} = require("firebase/auth")
const {auth,db,collection,addDoc} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");


exports.register = async(req,res,next) =>{
    try {
        const user = await createUserWithEmailAndPassword(auth,'suu@gmail.com','redroch');
        const usersCol = collection(db,'users');
        const newUser = new User("Rochdi","Failali","rochdi@gmail.com");
        const newUsr = await addDoc(usersCol,newUser.data)
        
        res.status(201).json({success:true,operation:"Register", data:newUsr});
        
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.login = async(req,res,next)=>{
    try {
        const {user} = await signInWithEmailAndPassword(auth,'suu@gail.com','redroch');
        res.status(200).json({success:true,operation:"Login", data:user});
        

    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
}