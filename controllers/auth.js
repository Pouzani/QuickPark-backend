const {createUserWithEmailAndPassword,signInWithEmailAndPassword} = require("firebase/auth")
const {auth,db,collection,addDoc} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");


exports.register = async(req,res,next) =>{
    try {
        let {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email ||!password ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        const user = await createUserWithEmailAndPassword(auth,email,password);
        const usersCol = collection(db,'users');
        const newUser = new User(firstName,lastName,email);
        const newUsr = await addDoc(usersCol,newUser.data)
        
        res.status(201).json({success:true,operation:"Register", data:newUser.email});
        
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.login = async(req,res,next)=>{
    try {
        let {email, password} = req.body;
        if(!email ||!password ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        const {user} = await signInWithEmailAndPassword(auth,email,password);
        res.status(200).json({success:true,operation:"Login", data:user});
        

    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}