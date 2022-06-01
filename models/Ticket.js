class Ticket {
    constructor(arrivalTime,leavingTime,price,review,feedback,parkingId){
        this.arrivalTime = arrivalTime;
        this.leavingTime = leavingTime;
        this.price = price;
        this.review = review;
        this.feedback = feedback;
        this.parkingId = parkingId;
    }

    get data(){
        return {arrivalTime: this.arrivalTime, leavingTime: this.leavingTime, price: this.price, review: this.review, feedback: this.feedback, parkingId:this.parkingId};
    }
}
module.exports = {Ticket};