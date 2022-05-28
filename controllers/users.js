const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");
const { refEqual } = require("firebase/firestore/lite");
const { async } = require("@firebase/util");


exports.getUsers = async(req,res,next) =>{
    try {

        const queryToGetAllUsers = query(collection(db, "users"));
        const querySnapshot = await getDocs(queryToGetAllUsers);
        let users = [];
        querySnapshot.forEach((doc)=>{
            let user = new User(doc.data().firstName,doc.data().lastName,doc.data().email);
            users.push(user.data);
        })

        res.status(200).json({success:true,operation:"Get all users",count:users.length,data:users})
        
    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}