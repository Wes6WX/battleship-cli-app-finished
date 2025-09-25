const readlineSync = require("readline-sync");

function generateBoard(size) {
  const newBoard = new Array(size);
  for (let n = 0; n < size; n++) {
    newBoard[n] = new Array(size).fill({});
  }

  let shipsL = Math.floor(size / 3);
  let shipsS = Math.round(size / 3);
  let shipID = 1;

  const placeLargeShip = (shipCount, board) => {
    for (let n = 0; n < shipCount; n++) {
      let dirL = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical
      let xLarge = Math.floor(Math.random() * size); // horizontal position
      let yLarge = Math.floor(Math.random() * size); // vertical position

      // redoes coordinates if already used or surrounded by too many existing ships/board edges
      while (
        board[yLarge][xLarge].id ||
        (((board[yLarge][xLarge + 1] && board[yLarge][xLarge + 1].id) ||
          !board[yLarge][xLarge + 1]) &&
          ((board[yLarge][xLarge - 1] && board[yLarge][xLarge - 1].id) ||
            !board[yLarge][xLarge - 1]) &&
          ((board[yLarge + 1] && board[yLarge + 1][xLarge].id) ||
            !board[yLarge + 1] ||
            (board[yLarge - 1] && board[yLarge - 1][xLarge].id) ||
            !board[yLarge - 1])) ||
        (((board[yLarge][xLarge + 1] && board[yLarge][xLarge + 1].id) ||
          !board[yLarge][xLarge + 1] ||
          (board[yLarge][xLarge - 1] && board[yLarge][xLarge - 1].id) ||
          !board[yLarge][xLarge - 1]) &&
          ((board[yLarge + 1] && board[yLarge + 1][xLarge].id) ||
            !board[yLarge + 1]) &&
          ((board[yLarge - 1] && board[yLarge - 1][xLarge].id) ||
            !board[yLarge - 1]))
      ) {
        xLarge = Math.floor(Math.random() * size);
        yLarge = Math.floor(Math.random() * size);
      }

      // marking first spot
      board[yLarge][xLarge] = { type: "large", hit: false, id: shipID };
      // marking adjacent spots
      while (dirL < 2) {
        if (dirL == 0) {
          if (
            board[yLarge][xLarge + 1] &&
            board[yLarge][xLarge - 1] &&
            !board[yLarge][xLarge + 1].id &&
            !board[yLarge][xLarge - 1].id
          ) {
            board[yLarge][xLarge + 1] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge][xLarge - 1] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else if (
            board[yLarge][xLarge + 1] &&
            board[yLarge][xLarge + 2] &&
            !board[yLarge][xLarge + 1].id &&
            !board[yLarge][xLarge + 2].id
          ) {
            board[yLarge][xLarge + 1] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge][xLarge + 2] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else if (
            board[yLarge][xLarge - 1] &&
            board[yLarge][xLarge - 2] &&
            !board[yLarge][xLarge - 1].id &&
            !board[yLarge][xLarge - 2].id
          ) {
            board[yLarge][xLarge - 1] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge][xLarge - 2] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else {
            dirL = 1;
          }
        } else if (dirL == 1) {
          if (
            board[yLarge + 1] &&
            board[yLarge - 1] &&
            !board[yLarge + 1][xLarge].id &&
            !board[yLarge - 1][xLarge].id
          ) {
            board[yLarge + 1][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge - 1][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else if (
            board[yLarge + 1] &&
            board[yLarge + 2] &&
            !board[yLarge + 1][xLarge].id &&
            !board[yLarge + 2][xLarge].id
          ) {
            board[yLarge + 1][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge + 2][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else if (
            board[yLarge - 1] &&
            board[yLarge - 2] &&
            !board[yLarge - 1][xLarge].id &&
            !board[yLarge - 2][xLarge].id
          ) {
            board[yLarge - 1][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            board[yLarge - 2][xLarge] = {
              type: "large",
              hit: false,
              id: shipID,
            };
            dirL = 2;
          } else {
            dirL = 0;
          }
        }
      }
      shipID++;
    }
  };
  const placeSmallShip = (shipCount, board) => {
    for (let n = 0; n < shipCount; n++) {
      let dirS = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical
      let xSmall = Math.floor(Math.random() * size); // horizontal position
      let ySmall = Math.floor(Math.random() * size); // vertical position

      // redoes coordinates if already used or surrounded by too many existing ships/board edges
      while (
        board[ySmall][xSmall].id ||
        (((board[ySmall][xSmall + 1] && board[ySmall][xSmall + 1].id) ||
          !board[ySmall][xSmall + 1]) &&
          ((board[ySmall][xSmall - 1] && board[ySmall][xSmall - 1].id) ||
            !board[ySmall][xSmall - 1]) &&
          ((board[ySmall + 1] && board[ySmall + 1][xSmall].id) ||
            !board[ySmall + 1]) &&
          ((board[xSmall - 1] && board[ySmall - 1][xSmall].id) ||
            !board[ySmall - 1]))
      ) {
        xSmall = Math.floor(Math.random() * size);
        ySmall = Math.floor(Math.random() * size);
      }

      // marking first spot
      board[ySmall][xSmall] = { type: "small", hit: false, id: shipID };
      // marking adjacent spot
      while (dirS < 2) {
        if (dirS == 0) {
          if (board[ySmall][xSmall + 1] && !board[ySmall][xSmall + 1].id) {
            board[ySmall][xSmall + 1] = {
              type: "small",
              hit: false,
              id: shipID,
            };
            dirS = 2;
          } else if (
            board[ySmall][xSmall - 1] &&
            !board[ySmall][xSmall - 1].id
          ) {
            board[ySmall][xSmall - 1] = {
              type: "small",
              hit: false,
              id: shipID,
            };
            dirS = 2;
          } else {
            dirS = 1;
          }
        } else if (dirS == 1) {
          if (board[ySmall + 1] && !board[ySmall + 1][xSmall].id) {
            board[ySmall + 1][xSmall] = {
              type: "small",
              hit: false,
              id: shipID,
            };
            dirS = 2;
          } else if (board[ySmall - 1] && !board[ySmall - 1][xSmall].id) {
            board[ySmall - 1][xSmall] = {
              type: "small",
              hit: false,
              id: shipID,
            };
            dirS = 2;
          } else {
            dirS = 0;
          }
        }
      }
      shipID++;
    }
  };

  placeLargeShip(shipsL, newBoard);
  placeSmallShip(shipsS, newBoard);

  return newBoard.map((row) =>
    row.map((obj) => (!obj.id ? { type: "empty", hit: false } : obj))
  );
}

function updateField(currentField, rowLetters) {
  let fieldView = currentField.map((row) =>
    row.map((obj) =>
      obj.hit == true
        ? obj.type == "large"
          ? "\uD83D\uDD35"
          : obj.type == "small"
          ? "\uD83D\uDFE0"
          : "\u2757"
        : "-"
    )
  );

  const boardObj = {};
  for (let i = 0; i < fieldView.length; i++) {
    boardObj[rowLetters[i]] = fieldView[i];
  }
  console.table(boardObj);
}

function takeAim(board, rowLetters) {
  let chooseTarget = readlineSync.question(
    "Taking aim. Please designate coordinates: ",
    {
      limit: /[a-f]+?[0-5]+?/i,
      limitMessage:
        "Come again? Please input the letter and number of your target space: ",
    }
  );
  console.clear();

  let letterChoice = chooseTarget.toUpperCase().match(/[A-F]/);
  let letterIndex = rowLetters.findIndex((letter) =>
    letterChoice.includes(letter)
  );
  let numberIndex = Number(chooseTarget.match(/[0-5]/)[0]);

  if (board[letterIndex] && board[letterIndex][numberIndex]) {
    if (board[letterIndex][numberIndex].hit) {
      console.log("That location has been confirmed.");
    } else {
      board[letterIndex][numberIndex].hit = true;
      if (board[letterIndex][numberIndex].id) {
        console.log("Successful strike confirmed!");
        return true;
      } else {
        console.log("No ship detected at location.");
      }
    }
  } else {
    console.log("Somehow, you missed the entire field!");
  }
}

module.exports = { generateBoard, updateField, takeAim };
