const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc,setDoc} = require("../helpers/firebaseHandler");
const {CustomError} = require("../helpers/CustomError");
const { Car } = require("../models/Car");
const { Ticket } = require("../models/Ticket");

exports.addCar = async(req,res,next)=>{
    try{

        let {carName,licensePlate} = req.body;

        if(!carName || !licensePlate ){
            throw new CustomError("Missing data", "missing-data"); 
        }
        
        let {userId} =  req.params
        
        const newCar = new Car(carName,licensePlate);
        await setDoc(doc(db, "users", userId,'cars',licensePlate), newCar.data);
        
        res.status(200).json({success:true,operation:"Add new car", data:newCar});
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

        res.status(200).json({success:true,operation:"Get all cars",count:cars.length,data:cars});
        
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

exports.accessCarControl = async(req,res,next)=>{
    try {
        let {parkingId,carId} = req.body;
        let desiredCar;
        let userId;
        const queryToGetAllUsers = query(collection(db, 'users'));
        const querySnapshot = await getDocs(queryToGetAllUsers);
        for(let user of querySnapshot.docs){
            const queryToGetAllCars = query(collection(db, 'users',user.data().email,'cars'));
            const querySnapsht = await getDocs(queryToGetAllCars);
            for(let car of querySnapsht.docs){
                if(car.data().licensePlate === carId){
                    desiredCar = car.data();
                    userId = user.data().email;
                    break;
                }
                
            }
            if(userId) break;
        } 
        if(!userId){
            throw new CustomError("Not found", "not-found"); 
        }
        let desiredTicket;
        const queryToGetAllTickets = query(collection(db, 'users',userId,'cars',carId,'tickets'));
        const querySnapshotTickets = await getDocs(queryToGetAllTickets);
        for(let ticket of querySnapshotTickets.docs){
            if((ticket.data().parkingId === parkingId) && (ticket.data().leavingTime === '')){
                desiredTicket = ticket.data();
                break;
            }
        }
        if(!desiredTicket){
            throw new CustomError("Not found", "not-found");
        }
        
        res.status(200).json({success:true,operation:"control access", data:{accessGranted:true}});
       
    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
}
