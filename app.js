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
  const board = [];
  for (let i = 0; i < 3; i++) {
    board.push(new Array(3).fill(null));
  }
  return board;
}
console.log(createEmptyBoard());

///////////
/* STATE */
///////////

const initialState = {
  board: createEmptyBoard(),
  winner: null,
  player1: "",
  player2: "Computer",
  numMoves: 0,
};
let state = { ...initialState };

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

const registerPlayersButton = document.getElementById("registerPlayers");
registerPlayersButton.addEventListener("click", (e) => {
  console.log(state);
});

// for game mechanics
// easiest way to figure out turns in a game that trades turns
// is to keep a global variable to track number of moves
// let numMoves = 0;

// on each move, increment numMoves -> numMoves++
// before incrementing, check whose move by calling something like
// const currentPlayerMove = numMoves % 2 === 0 ? initialState.player1 : initialState.player2
// log out whose turn it is on successive clicks to check that this works
function trackMoves() {
  const move = state.numMoves % 2 === 0 ? "X" : "O";
  const playerName = state.numMoves % 2 === 0 ? state.player1 : state.player2;
  state.numMoves++;
  console.log({ playerName, move, numMoves: state.numMoves });
}

const testTrackMovesBtn = document.getElementById("testTrackMoves");
testTrackMovesBtn.addEventListener("click", trackMoves);

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
  let nodeId = 1;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const cellId = board[i][j];
      const cell = document.createElement("div");
      cell.id = `cell:${nodeId}`;
      cell.className = "cell";
      cell.dataset.cellId = nodeId;
      DOMBoard.appendChild(cell);
      nodeId++;
    }
  }
}
buildDOMBoard();
// live-server injected its markup and it's being rendered into page
// this masks that script injection
document.body.querySelector("script").style.display = "none";
