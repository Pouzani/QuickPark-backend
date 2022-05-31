const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");
const { Parking } = require("../models/Parking");

exports.getParkings = async(req,res,next) =>{
    try {

        const queryToGetAllParkings = query(collection(db, "parkings"));
        const querySnapshot = await getDocs(queryToGetAllParkings);
        let parkings = [];
        querySnapshot.forEach((doc)=>{
            let parking = new Parking(doc.data().parkingName,doc.data().spotNumber,doc.data().state);
            parkings.push(parking.data);
        })

        res.status(200).json({success:true,operation:"Get all parkings",count:parkings.length,data:parkings})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getParking = async(req,res,next) =>{
    try {
        let {parkingId} =  req.params;
        const docRef = doc(db, "parkings", parkingId);
        const docSnap = await getDoc(docRef);
        res.status(200).json({success:true,operation:"Get parking by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.addParking = async(req,res,next)=>{
    try{
        let {parkingName,spotNumber,state} = req.body;

        if(!parkingName || !spotNumber || state === '' ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        const parkingsCol = collection(db,'parkings');
        const newParking = new Parking(parkingName,spotNumber,state);
        const newParkng = await addDoc(parkingsCol,newParking.data)
        
        res.status(200).json({success:true,operation:"Add new parking", data:{parkingId:newParkng.id}});
    }catch(error){
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.updateParking = async(req,res,next)=>{
    try {
        let {parkingName,spotNumber,state} = req.body;

        if(!parkingName || !spotNumber || state === '' ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        let {parkingId} =  req.params
        const parkingRef = doc(db, "parkings", parkingId);

        await updateDoc(parkingRef, req.body);
        res.status(200).json({success:true,operation:"update parking", data:{parkingId}});

    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.deleteParking = async(req,res,next)=>{
    try {
        let {parkingId} = req.params;
        await deleteDoc(doc(db, "parkings", parkingId));
        res.status(200).json({success:true,operation:"delete parking", data:{parkingId}});
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}
