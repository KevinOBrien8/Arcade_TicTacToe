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
    isPlaying: false,
  };
  return initialState;
}

let state = createInitialState();

const restartBtn = document.getElementById("gameRestart");

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  state = createInitialState();
  renderState();
  const player1 = document.getElementsByName("player1")[0];
  const player2 = document.getElementsByName("player2")[0];
  const gameStatus = document.getElementById("gameStatus");
  player1.value = "";
  player2.value = "";
  gameStatus.innerHTML = "";
}

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
  state.isPlaying = true;
  gameStatus.innerHTML = `It's ${state.player1}'s turn!`;
});

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
const clickHandler = (e) => {
  if (!state.isPlaying) return;
  if (e.target.className !== "cell") return;

  handleMove(e.target);
  renderState();
  checkWin();
};
document.getElementById("board").addEventListener("click", clickHandler);

function handleMove(node) {
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
    boardSquares[i].innerHTML = `${state.board[i]}`;
  }
}

function checkWin() {
  const board = state.board;
  const numMoves = state.numMoves;
  const playerName = state.numMoves % 2 === 0 ? state.player2 : state.player1;

  if (numMoves === 9) {
    gameStatus.innerHTML = "Game Over! It's a draw";
    state.isPlaying = false;
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

  let rows = getRows(board);

  for (const key in rows) {
    const array = rows[key];
    let isRowWinX = array.every(function (elem) {
      return elem === "X";
    });
    if (isRowWinX) {
      gameStatus.innerHTML = `${playerName} wins!`;
      state.isPlaying = false;
      return;
    }
    let isRowWinO = array.every(function (elem) {
      return elem === "O";
    });
    if (isRowWinO) {
      gameStatus.innerHTML = `${playerName} wins!`;
      state.isPlaying = false;
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
      state.isPlaying = false;
      return;
    }
    let isColWinO = array.every(function (elem) {
      return elem === "O";
    });
    if (isColWinO) {
      gameStatus.innerHTML = `${playerName} wins!`;
      state.isPlaying = false;
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
        state.isPlaying = false;
        return;
      }
      let isDiagWinO = array.every(function (elem) {
        return elem === "O";
      });
      if (isDiagWinO) {
        gameStatus.innerHTML = `${playerName} wins!`;
        state.isPlaying = false;
        return;
      }
    }
  }
}

// live-server injected its markup and it's being rendered into page
// this masks that script injection
document.body.querySelector("script").style.display = "none";
