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

exports.getCars = async(req,res,next) =>{
    try {

        let {userId} =  req.params
        const queryToGetAllCars = query(collection(db, 'users',userId,'cars'));
        const querySnapshot = await getDocs(queryToGetAllCars);
        let cars = [];
        querySnapshot.forEach((doc)=>{
            let car = new Car(doc.data().carName,doc.data().licensePlate);
            cars.push(car.data);
        })

        res.status(200).json({success:true,operation:"Get all cars",count:cars.length,data:cars})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getCar = async(req,res,next) =>{
    try {
        let {userId,carId} =  req.params;
        const docRef = doc(db, 'users', userId,'cars',carId);
        const docSnap = await getDoc(docRef);
        res.status(200).json({success:true,operation:"Get car by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}


exports.updateCar = async(req,res,next)=>{
    try {
        let {carName,licensePlate} = req.body;
        console.log(req.body);

        if(!carName || !licensePlate){
            throw new CustomError("Missing data", "missing-data"); 
        }
        let {userId,carId} =  req.params
        const carRef = doc(db, 'users', userId, 'cars',carId);

        await updateDoc(carRef, req.body);
        res.status(200).json({success:true,operation:"update car", data:{carId}});

    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.deleteCar = async(req,res,next)=>{
    try {
        let {userId,carId} = req.params;
        await deleteDoc(doc(db, 'users', userId, 'cars',carId));
        res.status(200).json({success:true,operation:"delete car", data:{carId}});
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}
