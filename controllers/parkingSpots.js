const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");
const { ParkingSpot } = require("../models/ParkingSpot");
const { refEqual } = require("firebase/firestore/lite");
const { async } = require("@firebase/util");

exports.addParkingSpot = async(req,res,next)=>{
    try{

        let {column,row,shortestPath,state} = req.body;

        if(!column || !row || !shortestPath || !state ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        
        let {parkingId} =  req.params
        const parkingSpotsCol = collection(db,'parkings',parkingId,'parkingSpots');
        
        const newParkingSpot = new ParkingSpot(column,row,shortestPath,state);
        const newParkingSpt = await addDoc(parkingSpotsCol,newParkingSpot.data)
        
        res.status(200).json({success:true,operation:"Add new parking spot", data:{parkingId:newParkingSpt.id}});
    }catch(error){
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.getParkingSpots = async(req,res,next) =>{
    try {

        let {parkingId} =  req.params
        const queryToGetAllParkingSpots = query(collection(db, 'parkings',parkingId,'parkingSpots'));
        const querySnapshot = await getDocs(queryToGetAllParkingSpots);
        let parkingSpots = [];
        querySnapshot.forEach((doc)=>{
            let parkingSpot = new ParkingSpot(doc.data().column,doc.data().row,doc.data().shortestPath,doc.data().state);
            parkingSpots.push(parkingSpot.data);
        })

        res.status(200).json({success:true,operation:"Get all parking spots",count:parkingSpots.length,data:parkingSpots})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getParkingSpot = async(req,res,next) =>{
    try {
        let {parkingId,parkingSpotId} =  req.params;
        const docRef = doc(db, 'parkings', parkingId,'parkingSpots',parkingSpotId);
        const docSnap = await getDoc(docRef);
        res.status(200).json({success:true,operation:"Get parking spot by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.updateParkingSpot = async(req,res,next)=>{
    try {
        let {column,row,shortestPath,state} = req.body;

        if(!column || !row || !shortestPath || !state ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        let {parkingId,parkingSpotId} =  req.params
        const parkingSpotRef = doc(db, 'parkings', parkingId, 'parkingSpots',parkingSpotId);

        await updateDoc(parkingSpotRef, req.body);
        res.status(200).json({success:true,operation:"update parking spot", data:{parkingSpotId}});

    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.deleteParkingSpot = async(req,res,next)=>{
    try {
        let {parkingId,parkingSpotId} = req.params;
        await deleteDoc(doc(db, 'parkings', parkingId, 'parkingSpots',parkingSpotId));
        res.status(200).json({success:true,operation:"delete parking spot", data:{parkingSpotId}});
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}