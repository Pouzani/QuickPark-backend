class Car {
    constructor(carName,licensePlate){
        this.carName = carName;
        this.licensePlate = licensePlate;
    }

    get data(){
        return {carName: this.carName, licensePlate: this.licensePlate};
    }
}
module.exports = {Car};