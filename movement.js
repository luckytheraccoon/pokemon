/**
 * This class module is responsible for handling the entire movement system
 * 
 * The constructor is used to pre-defined some values
 * The init method should be called to initialize the starting values based on a given string
 * 
 * The move method should be called whenever we wish to move and return the results of the movement
 * 
 * The initial string is firstly validated agaisnt a white-list array
 * 
 * After the initial validation, we can proceed with the movement
 * 
 */
module.exports = class {
    constructor() {
        this.validDirections = ["N", "S", "E", "O"];
        this.directionsArray = null;
        this.directionsValid = false;
        this.nextDirection = null;
        this.previousDirection = null;
        this.coordsValid = false;
        this.x = null;
        this.y = null;
        this.visitedCoords = [];
        this.feedback = false;
    }

    setVisitedCoords(value) {
        this.visitedCoords = value;
    }

    setNextDirection(value) {
        this.nextDirection = value;
    }

    setPreviousDirection(value) {
        this.previousDirection = value;
    }

    setCoord(coord, value) {
        if (typeof this[coord] == "undefined") {
            return false;
        }
        this[coord] = value;
    }

    setInitialCoords(x, y) {
        this.setCoord("x", x);
        this.setCoord("y", y);
    }

    setDirectionsString(value) {
        this.directionsString = value;
    }

    directionsValid(value) {
        this.directionsString = value;
    }

    setDirectionsArray() {
        this.directionsArray = this.getDirectionsString().split("");
    }

    setCoordsValid() {
        this.coordsValid = (Number.isInteger(this.x) && Number.isInteger(this.y));
    }

    setDirectionsValid() {
        //begin by checking if the directions provided are in string format
        this.directionsValid = typeof this.getDirectionsString() === "string";

        if (this.directionsValid === true) { //if still true
            this.setDirectionsArray(); //set the directions array
            this.getDirectionsArray().map((direction) => { //iterate the directions array
                if (!this.validDirections.includes(direction)) {
                    this.directionsValid = false; //if at any point a direction is invalid... set the value to false
                }
            });
        }
    }

    setFeedback(value) {
        this.feedback = value;
    }

    init(x, y, directionsString, feedback) {
        this.setFeedback(feedback);
        this.setInitialCoords(x, y);
        this.setCoordsValid();
        if (this.getCoordsValid()) {
            this.setDirectionsString(directionsString);
            this.setDirectionsValid();
            if (this.getDirectionsValid()) {
                this.move();
            } else {
                console.log("Cannot move. Please provide a correct direction string. Can only include N, S, O or E characters, case sensitive.");
            }

        } else {
            console.log("The initial coordinates are invalid. Please provide integer values for both x and y coordinates.")
        }
    }

    move() {
        //add starting coords
        this.addToVisitedCoords();

        this.getDirectionsArray().map((direction) => {

            //store the next direction as the previous direction for the next iteration
            this.setPreviousDirection(this.getNextDirection());

            //decide where to move, x or y, positive or negative values
            this.decideCoordsFromDirection(direction);

            //set the next direction value
            this.setNextDirection(direction);

            //based on a couple conditions, add to visited coordinates array, or not
            if (!this.directionsNullEachOther()) { //this helps with preventing too many array checks
                if (!this.coordsVisited()) {
                    this.addToVisitedCoords();
                }
            }
        });
        
        if(this.getFeedback() === true) {
            console.log("Ash caught " + this.getVisitedCoordsLength() + " pokemons!");
        }
    }

    getFeedback() {
        return this.feedback;
    }

    getCoordsValid() {
        return this.coordsValid;
    }

    getDirectionsValid() {
        return this.directionsValid;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getDirectionsString() {
        return this.directionsString;
    }

    getDirectionsArray() {
        return this.directionsArray;
    }

    getNextDirection() {
        return this.nextDirection;
    }

    getPreviousDirection() {
        return this.previousDirection;
    }

    getDirectionsValid() {
        return this.directionsValid;
    }

    getVisitedCoords() {
        return this.visitedCoords;
    }

    getVisitedCoordsLength() {
        return this.visitedCoords.length;
    }

    directionsNullEachOther() {

        let next = this.getNextDirection();
        let prev = this.getPreviousDirection();

        if ((next == "N" && prev == "S") ||
            (next == "S" && prev == "N") ||
            (next == "O" && prev == "E") ||
            (next == "E" && prev == "O")) {
            return true;
        } else {
            return false;
        }
    }

    changeCoordBy(coord, amt) {
        return this.setCoord(coord, (this[coord] + amt));
    }

    mergedCoords() {
        return this.getX() + "." + this.getY();
    }

    coordsVisited() {
        return this.getVisitedCoords().includes(this.mergedCoords());
    }

    addToVisitedCoords() {
        this.visitedCoords.push(this.mergedCoords());
    }

    decideCoordsFromDirection(direction) {
        switch (direction) {
            case "N":
                this.changeCoordBy("y", 1);
                break;
            case "S":
                this.changeCoordBy("y", -1);
                break;
            case "E":
                this.changeCoordBy("x", 1);
                break;
            case "O":
                this.changeCoordBy("x", -1);
                break;
        }
    }
}