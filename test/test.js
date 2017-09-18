var assert = require('assert');
const Movement = require("../movement.js");

let direction = "N";
let amount = 2;

describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});

direction = "NESO";
amount = 4;
describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});

direction = "NSNSNSNSNS";
amount = 2;
describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});


direction = "";
amount = 1;
describe('If ash were to NOT move '+direction+'...', function() {
	it('he should catch '+amount+' poke! because the starting position counts too', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});

direction = "NNNNNNNNNN";
amount = 11;
describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});

direction = "ABCD";
amount = 0;
describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes because those are not valid directions!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});

direction = "N1234N";
amount = 0;
describe('If ash were to move '+direction+'...', function() {
	it('he should catch '+amount+' pokes because those are not valid directions!', function() {
		const m = new Movement(0,0, direction);
		const visitedCoordsLength = m.getVisitedCoords().length;
		assert.equal(amount, visitedCoordsLength);
	});
});
