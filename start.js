const Movement = require("./movement.js");
const cliArgs = process.argv;
let directions = cliArgs[2];
const m = new Movement(0,0, directions);
const visitedCoordsLength = m.getVisitedCoords().length;

if(visitedCoordsLength>0) {
	console.log('\x1b[36m',"\n ✓ Ash caught " + visitedCoordsLength + " pokemon.");
} else {
	console.log('\x1b[31m',"\n ☓ Ash couldn't catch any pokemon, probably some error occurred! Make sure to provide a correct direction string. Can only include N, S, O or E characters, case sensitive.");
}