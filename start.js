const Movement = require("./movement.js");
const m = new Movement();
const cliArgs = process.argv;
let directions = cliArgs[2];
m.init(0,0, directions, true);
