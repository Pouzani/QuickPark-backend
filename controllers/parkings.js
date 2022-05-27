const {db,collection,addDoc,query,getDoc,doc,getDocs} = require("../helpers/firebaseHandler");
const { User } = require("../models/User");
const {CustomError} = require("../helpers/CustomError");
const { Parking } = require("../models/Parking");
const { refEqual } = require("firebase/firestore/lite");


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
        let {parkingId} =  req.params;
        const docRef = doc(db, "parkings", parkingId);
        const docSnap = await getDoc(docRef);

        res.status(200).json({success:true,operation:"Get parking by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
    
}
