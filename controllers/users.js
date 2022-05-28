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
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getUser = async(req,res,next) =>{
    try {
        let {userId} =  req.params;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        res.status(200).json({success:true,operation:"Get user by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.addUser = async(req,res,next)=>{
    try{
        let {firstName,lastName,email} = req.body;
        console.log(req.body);
        if(!firstName || !lastName || !email ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        const usersCol = collection(db,'users');
        const newUser = new User(firstName,lastName,email);
        const newUsr = await addDoc(usersCol,newUser.data)
        
        res.status(200).json({success:true,operation:"Add new user", data:{userId:newUsr.id}});
    }catch(error){
        req.quickpark = {errorCode:error.code};
        next();
    }
}