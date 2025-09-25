const readlineSync = require("readline-sync");
const helpers = require("./helperFunctions");
const utils = require("./utils");

console.log("Welcome Captain!");
let start = readlineSync.keyInYNStrict(
  "Battleships abound! Ready to sink them?"
);
start ? battleship() : console.log("Awaiting future orders.");

function battleship() {
  let replay = true;
  while (replay) {
    console.log("Artillery prepared!");

    let sizeChoice = readlineSync.keyInSelect(
      utils.sizes,
      "Which field shall we oversee?"
    );

    console.clear();

    if (sizeChoice < 0) {
      return console.log("Belaying order.\nWe await your future instructions.");
    } else if (sizeChoice === 0) {
      console.log(utils.trainingStartText);
    }
    // Mathematical!
    let size = sizeChoice + 3;
    let shipsL = Math.floor(size / 3);
    let shipsS = Math.round(size / 3);
    let targets = shipsL * 3 + shipsS * 2;

    let field = helpers.generateBoard(size);
    if (size == 3) {
      // Reveals ships for Training
      field.map((row) => row.map((obj) => (obj.id ? (obj.hit = true) : obj)));
      targets = 0;
    }

    do {
      helpers.updateField(field, utils.letters);
      helpers.takeAim(field, utils.letters) == true ? targets-- : targets;
    } while (targets > 0);

    helpers.updateField(field, utils.letters);

    size == 3
      ? console.log(utils.trainingEndText)
      : console.log(utils.victoryText);

    replay = readlineSync.keyInYNStrict("Shall we take on a new field?");
  }

  console.log("Thank you for your hard work.");
}
