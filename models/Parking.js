class Parking {
    constructor(parkingName,spotNumer,state){
        this.parkingName = parkingName;
        this.spotNumer = spotNumer;
        this.state = state;
    }

    get data(){
        return {parkingName: this.parkingName, spotNumer: this.spotNumer, state: this.state};
    }
}
module.exports = {Parking};