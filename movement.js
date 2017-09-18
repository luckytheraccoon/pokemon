/**
 * This class module is responsible for handling the entire movement system
 * 
 * The constructor is used to pre-defined some values and initialize the script
 * 
 * The doMovement method should be called whenever we wish to move and return the results of the movement
 * 
 * The initial string is firstly validated agaisnt a white-list array
 * 
 * After the initial validation, we can proceed with the movement
 */
module.exports = class {
	
	/**
	 * our constructor initializes values and fires off the script
	 * 
	 * a brief description of each variable is available within the method
	 * 
	 * after initializing some variables, we fire off the script:
	 *  - validates both initial coordinates (just in case we start allowing the user to define starting points)
	 *  - validates the directions by comparing each letter to the validDirections array items
	 *  - sets the initial visited coordinate 
	 *  - does the movement calculations
	 * 
	 * @param {Number} xCoord | represents the x coordinate
	 * @param {Number} yCoord | represents the y coordinate
	 * @param {String} directionsString | represents the string of directions to be processed
	 */
    constructor(xCoord, yCoord, directionsString) {
    	//the only valid directions, we could technically remove some to constrain movement
        this.validDirections = ["N", "S", "E", "O"];
        //i prefer to declare legal coords inside a dedicated object "coords"
        this.coords = {x: xCoord, y: yCoord}; 
        //the array of already visited coordinates as we step in each direction
        this.visitedCoords = [];

        //the directions get stored for validation later
        this.directionsString = directionsString;

    	//small edge case, what if the user does not provide any directions?
		//we make sure there's at least an "empty" direction because the user might want to stay still!
    	if(typeof this.directionsString === "undefined") {
    		this.directionsString = "";
    	} 
        
        if (this.getCoordsValid() && this.getDirectionsValid()) {
            this.addToVisitedCoords(this.mergedCoords());
            this.doMovement();
        }
    }
    
    /**
     * a setter for the the next direction in the directions string during iteration
     * 
	 * @param {String} | a letter representing a direction
     */
    setNextDirection(value) {
        this.nextDirection = value;
    }

    /**
     * a setter for the the previous direction in the directions string during iteration
     * 
	 * @param {String} | a letter representing a direction
     */
    setPreviousDirection(value) {
        this.previousDirection = value;
    }
    
    /**
     * a convenient magic setter that can work for both coordinates
     * an extra step validates against illegal coordinates
     * this rellies on the valid coordinates being set at the constructor
     * 
     * the setter does not validate against illegal numeric values
     * since we have a validation method we can use for that
     * 
	 * @param {String} | a letter representing a valid coordinate
	 * @param {Number} | an integer numeric value
     */
    setCoord(coord, value) {
        if (typeof this.coords[coord] == "undefined") {
            return false;
        }
        this.coords[coord] = value;
    }

    /**
     * simply checks the values of both coordinates and returns a boolean 
     * based on wether they are both valid or not
     * 
	 * @return  {Boolean} | true if both coordinates are valid, otherwise false
     */
    getCoordsValid() {
        return (Number.isInteger(this.getX()) && Number.isInteger(this.getY()));
    }

    /**
     * runs all the desired validations for checking wether the directions string is valid or not
     * 
     * a direction is invalid whenever:
     * 	- it is not a letter
     *  - it is not present within the validDirections array
     * 
	 * @return  {Boolean} | true if all directions are valid, otherwise false
     */
    getDirectionsValid() {
    	
    	//begin by checking if the directions provided are in string format
        if (typeof this.directionsString !== "string") { 
        	return false;
        }
        
        //compare each direction with the validDirections items
        //if a direction does not exist in the validDirections array, return false and hop off
    	let directionsArray = this.getDirectionsArray();
    	for(let i=0;i<directionsArray.length;i++) {
    		if (!this.validDirections.includes(directionsArray[i])) {
            	return false; 
            }
    	}
         
        return true;
    }
    
    /**
     * an execution method that does not take or return any values
     * 
     * assumes the directions have already been validated
     * 
     * it will step in each direction and accumulate coordinates in the visitedCoords array
     * 
     * to save a miniscule amount of processing (worth!!), we check if the previous direction nulls the next one
     * instead of checking the array for the coordinate
     * for example: N nulls S, E nulls O...
     * 
     * it iterates each direction and... 
     * 	- stores the next direction as the previous direction for the next iteration
     * 	- decides wether to increment or decrement coords 
     *  - stores the next direction as the current iteration direction
     *  - adds up the calculated coordinates to the visitedCoords array unless:
     *  	- prev and next directions null each other 
     *  		or...
     *  	- coordinate already visited
     */
    doMovement() {
    	let directionsArray = this.getDirectionsArray();
    	for(let i=0;i<directionsArray.length;i++) {
            //store the next direction as the previous direction for the next iteration
            this.setPreviousDirection(this.getNextDirection());

            //decide where to move, x or y, positive or negative values
            this.decideCoordsFromDirection(directionsArray[i]);

            //set the next direction value
            this.setNextDirection(directionsArray[i]);

            //based on a couple conditions, add to visited coordinates array, or not
            if (!this.directionsNullEachOther()) { //this helps with preventing too many array checks
                if (!this.coordsAlreadyVisited()) {
                    this.addToVisitedCoords();
                }
            }
        }
    }

    /**
     * a simple getter for the x coordinate, we expect an integer
     * 
	 * @return  {Number} | an integer value for the x coord
     */
    getX() {
        return this.coords.x;
    }

    /**
     * a simple getter for the y coordinate, we expect an integer
     * 
	 * @return  {Number} | an integer value for the y coord
     */
    getY() {
        return this.coords.y;
    }
    
    /**
     * gets the directionsString as an array
     * 
	 * @return  {Object} | an array object containing letters representing directions
     */
    getDirectionsArray() {
        return this.directionsString.split("");
    }

    /**
     * a simple getter that returns a direction to act as the next direction in an iteration
     * 
	 * @return  {String} | a letter representing a direction
     */
    getNextDirection() {
        return this.nextDirection;
    }

    /**
     * a simple getter that returns a direction to act as the previous direction in an iteration
     * 
	 * @return  {String} | a letter representing a direction
     */
    getPreviousDirection() {
        return this.previousDirection;
    }
    
    /**
     * a simple getter for the currently visited coordinates array
     * 
	 * @return  {Object} | an array object containing coordinates already visited
     */
    getVisitedCoords() {
        return this.visitedCoords;
    }
    
    /**
     * a helpful method to check if the prev and next directions null eachother 
     * 
     * this is useful for avoiding unecessary array checks when traveling across the map
     * 
	 * @return  {Boolean} | true in case the directions null eachother, otherwise false
     */
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

    /**
     * a shortcut for setCoord that allows for incrementing (or decrementing) of a coordinate
     * 
	 * @param {String} | a letter representing a valid coordinate
	 * @param {Number} | an integer numeric value, can be negative if we want to decrement
     */
    changeCoordBy(coord, amt) {
        this.setCoord(coord, (this.coords[coord] + amt));
    }


    /**
     * a shortcut for concatenating both coordinates with a dot in order to store them 
     * in the visitedCoords array
     * 
     * this would be even more useful if we needed to change the way we want to save the coordinates
     * in the visitedCoords array later
     * 
	 * @return  {String} | a concatenated string containing the x and y coordinates
     */
    mergedCoords() {
        return this.getX() + "." + this.getY();
    }
    
    /**
     * check wether the current coordinates have already been visited or not
     * 
	 * @return  {Boolean} | true if coordinates are present in the visitedCoords array, otherwise false
     */
    coordsAlreadyVisited() {
        return this.getVisitedCoords().includes(this.mergedCoords());
    }
    
    /**
     * a shortcut for pushing coordinates into the visitedCoords array
     */
    addToVisitedCoords() {
        this.visitedCoords.push(this.mergedCoords());
    }
    
    /**
     * a helpful method that decides on wether to increment or decrement a certain coordinate
     * based on just the direction letter provided
     * 
	 * @param {String} | a letter representing a valid direction
     */
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