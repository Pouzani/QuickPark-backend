class ParkingSpot {
    constructor(column,row,shortestPath,state){
        this.column = column;
        this.row = row;
        this.shortestPath = shortestPath;
        this.state = state;
    }

    get data(){
        return {column: this.column, row: this.row, shortestPath: this.shortestPath, state: this.state};
    }
}
module.exports = {ParkingSpot};