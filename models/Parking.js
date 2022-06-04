class Parking {
    constructor(parkingName,spotNumber,state){
        this.parkingName = parkingName;
        this.spotNumber = spotNumber;
        this.state = state;
    }

    get data(){
        return {parkingName: this.parkingName, spotNumber: this.spotNumber, state: this.state};
    }
}
module.exports = {Parking};