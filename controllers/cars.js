const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const {CustomError} = require("../helpers/CustomError");
const { Car } = require("../models/Car");

exports.addCar = async(req,res,next)=>{
    try{

        let {carName,licensePlate} = req.body;

        if(!carName || !licensePlate ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        
        let {userId} =  req.params
        const carsCol = collection(db,'users',userId,'cars');
        
        const newCar = new Car(carName,licensePlate);
        const newCr = await addDoc(carsCol,newCar.data)
        
        res.status(200).json({success:true,operation:"Add new car", data:{parkingId:newCr.id}});
    }catch(error){
        req.quickpark = {errorCode:error.code};
        next();
    }
}

