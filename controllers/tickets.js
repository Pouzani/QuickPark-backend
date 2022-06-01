const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const {CustomError} = require("../helpers/CustomError");
const { Ticket } = require("../models/Ticket");

exports.addTicket = async(req,res,next)=>{
    try{

        let {arrivalTime,leavingTime,price,review,feedback,parkingId} = req.body;

        if(!arrivalTime || !leavingTime || !price || !review || !feedback || !parkingId){
            throw new CustomError("Missing data", "missing-data"); 
        }
        
        let {userId,carId} =  req.params
        const ticketsCol = collection(db,'users',userId,'cars',carId,'tickets');
        
        const newTicket = new Ticket(arrivalTime,leavingTime,price,review,feedback,parkingId);
        const newCTickt = await addDoc(ticketsCol,newTicket.data)
        
        res.status(200).json({success:true,operation:"Add new ticket", data:{ticketId:newCTickt.id}});
    }catch(error){
        req.quickpark = {errorCode:error.code};
        next();
    }
}