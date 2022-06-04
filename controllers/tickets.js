const {db,collection,addDoc,query,getDoc,doc,getDocs,updateDoc,deleteDoc} = require("../helpers/firebaseHandler");
const {CustomError} = require("../helpers/CustomError");
const { Ticket } = require("../models/Ticket");

exports.addTicket = async(req,res,next)=>{
    try{

        let {arrivalTime,leavingTime,price,review,feedback,parkingId} = req.body;

        if(!arrivalTime || !price || !review || !feedback || !parkingId){
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

exports.getTickets = async(req,res,next) =>{
    try {

        let {userId,carId} =  req.params
        const queryToGetAllTickets = query(collection(db, 'users',userId,'cars',carId,'tickets'));
        const querySnapshot = await getDocs(queryToGetAllTickets);
        let tickets = [];
        querySnapshot.forEach((doc)=>{
            let ticket = new Ticket(doc.data().arrivalTime,doc.data().leavingTime,doc.data().price,doc.data().review,doc.data().feedback,doc.data().parkingId);
            tickets.push(ticket.data);
        })

        res.status(200).json({success:true,operation:"Get all tickets",count:tickets.length,data:tickets})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
        
    }
    
}

exports.getTicket = async(req,res,next) =>{
    try {
        let {ticketId} =  req.params;
        let {userId,carId} = req.body;
        const docRef = doc(db, 'users', userId,'cars',carId,'tickets',ticketId);
        const docSnap = await getDoc(docRef);
        res.status(200).json({success:true,operation:"Get ticket by id",count:(docSnap.data()?1:0),data:docSnap.data()})
        
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.updateTicket = async(req,res,next)=>{
    try {
        let {arrivalTime,leavingTime,price,review,feedback,parkingId,userId,carId} = req.body;

        if(!arrivalTime || !leavingTime || !price || review == null || !feedback || !parkingId){
            throw new CustomError("Missing data", "missing-data"); 
        }
        let {ticketId} =  req.params
        const ticketRef = doc(db, 'users', userId,'cars',carId,'tickets',ticketId);

        const ticket = new Ticket(arrivalTime,leavingTime,price,review,feedback,parkingId);
        await updateDoc(ticketRef, ticket.data);
        res.status(200).json({success:true,operation:"update ticket", data:{ticketId}});

    } catch (error) {
        console.log(error);
        req.quickpark = {errorCode:error.code};
        next();
    }
}

exports.deleteTicket = async(req,res,next)=>{
    try {
        let {userId, carId} = req.body;
        let {ticketId} = req.params;
        await deleteDoc(doc(db, 'users', userId,'cars',carId,'tickets',ticketId));
        res.status(200).json({success:true,operation:"delete ticket", data:{ticketId}});
    } catch (error) {
        req.quickpark = {errorCode:error.code};
        next();
    }
}