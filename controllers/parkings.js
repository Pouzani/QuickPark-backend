const {db,collection,addDoc,query,getDocs} = require("../helpers/firebaseHandler");
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
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getParking = async(req,res,next) =>{
    try {

        const queryToGetAllParkings = query(collection(db, "parkings"));
        const querySnapshot = await getDocs(queryToGetAllParkings);

        res.status(200).json({success:true,operation:"Get all parkings",count:querySnapshot.size,data:querySnapshot.docs})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}
