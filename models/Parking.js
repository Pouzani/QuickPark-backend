class Parking {
  constructor(parkingName, spotNumber, localisation, state, parkingId) {
    this.parkingName = parkingName;
    this.spotNumber = spotNumber;
    this.state = state;
    this.parkingId = parkingId;
    this.localisation = localisation;
  }

  get data() {
    return {
      parkingName: this.parkingName,
      spotNumber: this.spotNumber,
      state: this.state,
      parkingId: this.parkingId,
      localtisation: this.localisation,
    };
  }
}
module.exports = { Parking };
