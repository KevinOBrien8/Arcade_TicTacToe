// As users playing a two player game we want to:

// enter our names and have them displayed
// have our order chosen for us by the game
// take turns placing our marks in empty spaces
// not be able to place our marks in an occupied space
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser
//////////////
// As a user playing a one player game I want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space
//////////////
// As a user playing a single player game I would be delighted to:

// have the Computer make 'better-than-guessing' choices when placing a mark on the board
// set the board size myself ("wider" or "taller" than 3x3)
///////////////////

//////////
/* DATA */
//////////

// to give access to game status
// const statusDisplay = document.querySelector('#gameStatus');
// to see if there is a game winner
let gameActive = true;
// to check the current player (whos turn)

/////////////////
/* BOARD SETUP */
/////////////////
function createEmptyBoard() {
  return new Array(9).fill("");
}

///////////
/* STATE */
///////////

function createInitialState() {
  const initialState = {
    board: createEmptyBoard(),
    winner: null,
    player1: "",
    player2: "",
    numMoves: 0,
  };
  return initialState;
}

let state = createInitialState();

// this section still needs work
const restartBtn = document.getElementById("gameRestart");

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  state = createInitialState();
}

// fix the section above here

// do I still need this section below
const player1 = document.getElementsByName("player1")[0];
player1.addEventListener("change", (e) => {
  const node = e.target;
  state.player1 = node.value;
});
const player2 = document.getElementsByName("player2")[0];
player2.addEventListener("change", (e) => {
  const node = e.target;
  state.player2 = node.value;
});
// down to this line

const gameStatus = document.getElementById("gameStatus");

const registerPlayersButton = document.getElementById("registerPlayers");
registerPlayersButton.addEventListener("click", (e) => {
  gameStatus.innerHTML = `It's ${state.player1}'s turn!`;
});

// on each move, increment numMoves -> numMoves++
// before incrementing, check whose move by calling something like
// const currentPlayerMove = numMoves % 2 === 0 ? initialState.player1 : initialState.player2
// log out whose turn it is on successive clicks to check that this works
// function trackMoves() {}

// const testTrackMovesBtn = document.getElementById("testTrackMoves");
// testTrackMovesBtn.addEventListener("click", trackMoves);

// once we reach a certain number of moves
// if someone hasn't won yet, it's a stalemate
// ... what is that number? :)

// create a button and attach trackMoves as the callback function
// and test it!

//////////////////////
/* BUILD GAME BOARD */
//////////////////////

function buildDOMBoard() {
  const DOMBoard = document.getElementById("board");
  const { board } = state;

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.id = `cell:${i}`;
    cell.className = "cell";
    cell.dataset.cellId = i;
    DOMBoard.appendChild(cell);
  }
}
buildDOMBoard();

////////////////////
/* GAME MECHANICS */
////////////////////

document.getElementById("board").addEventListener("click", (e) => {
  if (e.target.className !== "cell") return;

  handleMove(e.target);
  renderState();
  checkWin();
});

// need to determine whos move it is and then stick that cell into their cell
function handleMove(node) {
  // take the dataset ID property use this to find the position in the state grid put move there X if X or O ifO

  // your node has a dataset.id property equal to a stringified version
  // of the number 0 through 8
  // nice thing is, those numbers map EXACTLY to positions in our state grid
  // so, updating the state with the current move
  // means, state.board[node.dataset.id] = move

  const nodeId = node.dataset.cellId;
  const move = state.numMoves % 2 === 0 ? "X" : "O";
  if (state.board[nodeId]) {
    return;
  }
  state.board[nodeId] = move;
  state.numMoves++;

  const playerName = state.numMoves % 2 === 0 ? state.player1 : state.player2;
  gameStatus.innerHTML = `It's ${playerName}'s turn!`;
  console.log({ playerName, move, numMoves: state.numMoves });
}

function renderState() {
  const boardSquares = document.querySelectorAll(".cell");

  for (let i = 0; i < state.board.length; i++) {
    // write every move (or lack of move)
    // to each dom node
    // where a dom node is held in a "list"
    // you can grab with document.querySelectorAll('.cell')
    // where the "move" is the actual value
    // "X" or "O", at that position of the state.board array
    boardSquares[i].innerHTML = `${state.board[i]}`;
  }
}

function checkWin() {
  const board = state.board;
  const numMoves = state.numMoves;
  const playerName = state.numMoves % 2 === 0 ? state.player2 : state.player1;

  if (numMoves === 9) {
    gameStatus.innerHTML = "Game Over! It's a draw";
    return;
  }
  function getRows(board) {
    let rows = {
      row1: [board[0], board[1], board[2]],
      row2: [board[3], board[4], board[5]],
      row3: [board[6], board[7], board[8]],
    };
    return rows;
  }

  function getCols(board) {
    let cols = {
      col1: [board[0], board[3], board[6]],
      col2: [board[1], board[4], board[7]],
      col3: [board[2], board[5], board[8]],
    };
    return cols;
  }

  function getDiags(board) {
    let diagonals = {
      diag1: [board[0], board[4], board[8]],
      diag2: [board[3], board[4], board[6]],
    };
    return diagonals;
  }
  //   validate by checking rows = getRows()

  //       for (const key in row){
  //           const array = row[key]
  //           // check win here with array.every()
  //       }
  let rows = getRows(board);
  for (const key in rows) {
    const array = rows[key];
    let isRowWinX = array.every(function (elem) {
      return elem === "X";
    });
    if (isRowWinX) {
      gameStatus.innerHTML = `${playerName} wins!`;
      return;
    }
    let isRowWinO = array.every(function (elem) {
      return elem === "O";
    });
    if (isRowWinO) {
      gameStatus.innerHTML = `${playerName} wins!`;
      return;
    }
  }

  let cols = getCols(board);

  for (const key in cols) {
    const array = cols[key];
    let isColWinX = array.every(function (elem) {
      return elem === "X";
    });
    if (isColWinX) {
      gameStatus.innerHTML = `${playerName} wins!`;
      return;
    }
    let isColWinO = array.every(function (elem) {
      return elem === "O";
    });
    if (isColWinO) {
      gameStatus.innerHTML = `${playerName} wins!`;
      return;
    }

    let diags = getDiags(board);

    for (const key in diags) {
      const array = diags[key];
      let isDiagWinX = array.every(function (elem) {
        return elem === "X";
      });
      if (isDiagWinX) {
        gameStatus.innerHTML = `${playerName} wins!`;
        return;
      }
      let isDiagWinO = array.every(function (elem) {
        return elem === "O";
      });
      if (isDiagWinO) {
        gameStatus.innerHTML = `${playerName} wins!`;
        return;
      }
    }
  }

  //   let cols = getCols(board);
  //   console.log(cols);
}

// live-server injected its markup and it's being rendered into page
// this masks that script injection
document.body.querySelector("script").style.display = "none";
