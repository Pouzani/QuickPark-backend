class Parking {
    constructor(parkingName,spotNumber,state,parkingId){
        this.parkingName = parkingName;
        this.spotNumber = spotNumber;
        this.state = state;
        this.parkingId = parkingId;
    }

    get data(){
        return {parkingName: this.parkingName, spotNumber: this.spotNumber, state: this.state,parkingId:this.parkingId};
    }
}
module.exports = {Parking};