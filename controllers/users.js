const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc,auth,updatePassword} = require("../helpers/firebaseHandler");
const {signInWithEmailAndPassword} = require("firebase/auth")
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");
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

exports.updateUser = async(req,res,next)=>{
    try {
        let {firstName,lastName,email} = req.body;

        if(!firstName || !lastName || !email ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        let {userId} =  req.params
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, req.body);
        res.status(200).json({success:true,operation:"update user", data:{userId}});

    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        let {userId} = req.params;
        await deleteDoc(doc(db, "users", userId));
        res.status(200).json({success:true,operation:"delete user", data:{userId}});
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.changePassword = async(req,res,next)=>{
    try {

        const {email,password,newPassword} = req.body;
        await signInWithEmailAndPassword(auth,email,password);
        const user = auth.currentUser;
        await updatePassword(user, newPassword) ;
        res.status(200).json({success:true,operation:"update user password", data:{user}});    
        
    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
    
}

exports.setToFavoriteParkings = async(req,res,body)=>{
    try {
        const {parkingId,userId} = req.body;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        let favoriteParkings = docSnap.data().favoriteParkings;
        let index = favoriteParkings.indexOf(parkingId);
        if(index == -1){
            favoriteParkings.push(parkingId);
        }else{
            favoriteParkings.splice(index,1);
        }

        await updateDoc(docRef, {favoriteParkings});

        res.status(200).json({success:true,operation:"set favorite",data:favoriteParkings});


    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
}
exports.getFavoriteParkings = async(req,res,body)=>{
    try {
        const {userId} = req.params;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        let favoriteParkings = [];
        let favoriteParkingsId = docSnap.data().favoriteParkings;
        if(!favoriteParkingsId){
            throw new CustomError("Not found", "not-found");
        }
        for(let favoriteParkingId of favoriteParkingsId ){
            const parkingRef = doc(db,"parkings",favoriteParkingId)
            const parkingSnap = await getDoc(parkingRef);
            favoriteParkings.push(parkingSnap.data());
        }

        res.status(200).json({success:true,operation:"get favorite parkings",data:favoriteParkings})
            
    }catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
}