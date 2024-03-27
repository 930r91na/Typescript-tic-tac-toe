import "./style.css";

const appElement = document.getElementById("app");
const boardElement = document.getElementById("board");
const ROW_COUNT = 3;
const COL_COUNT = 3;

type Cell = "X" | "O" | "";
type TicTacToeBoard =  [
   [Cell, Cell, Cell],
   [Cell, Cell, Cell],
   [Cell, Cell, Cell]
];

let boardState:TicTacToeBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentMove: "X" | "O" = "X";
let winner: Cell | "Draw" = "";

function createCell(row: number, col: number, content = "") {
  const cell = document.createElement("button");
  cell.setAttribute("data-row", row.toString());
  cell.setAttribute("data-col", col.toString());
  cell.setAttribute("data-content", content);
  cell.classList.add("cell");
  cell.addEventListener("click", () => {
    if (boardState[row][col] === "") {
      boardState[row][col] = currentMove;
      currentMove = currentMove === "X" ? "O" : "X";
      renderBoard();
      winner = checkWinner();
      if (winner === "Draw") {
        alert("It's a draw!");
      } else if (winner) {
        alert(`Player ${winner} wins!`);
      }
    }
  });
  return cell;
}

// Check if there is a winner
function checkWinner(): Cell | "Draw" {
  let draw = true;
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (boardState[i][j] === "") {
        draw = false;
      }
    }
  }
  if (draw) {
    return "Draw";
  }
  // Bruteforce check all possible winning combinations
  // Columns, Rows, and Diagonals
  for (let i = 0; i < ROW_COUNT; i++) {
    if (boardState[i][0] !== "" && boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2]) {
      return boardState[i][0];
    }
  }
  for (let i = 0; i < COL_COUNT; i++) {
    if (boardState[0][i] !== "" && boardState[0][i] === boardState[1][i] && boardState[1][i] === boardState[2][i]) {
      return boardState[0][i];
    }
  }
  if (boardState[0][0] !== "" && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2]) {
    return boardState[0][0];
  }

  return "";
}

// Render of the board
function renderBoard() {
  if (!appElement) throw new Error("Cannot find app");
  if (!boardElement) throw new Error("Cannot find board");
  boardElement.innerHTML = "";
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      boardElement.appendChild(createCell(i, j, boardState[i][j]));
    }
  }
  const oldMoveElement = document.getElementById("move-element");
  if (oldMoveElement) {
    oldMoveElement.remove();
  }
  const moveElement = document.createElement("p");
  moveElement.id = "move-element";
  moveElement.innerText = `Next Move: ${currentMove}`;
  moveElement.classList.add("current-move");
  appElement.insertBefore(moveElement, document.getElementById("reset"));
}

// Initialization and reset of the board
function init() {
  const resetButton = document.getElementById("reset");
  if (!resetButton) throw new Error("No Reset button");
  resetButton.addEventListener("click", () => {
    boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    currentMove = "X";
    renderBoard();
  });
  renderBoard();
}

init();
