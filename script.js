document.addEventListener("DOMContentLoaded", () => {
  // Get references to HTML elements
  const board = document.getElementById("game-board");
  const resetBtn = document.getElementById("reset-btn");
  const message = document.getElementById("message");

  // Initialize variables
  let cells = []; // Array to store the game cells
  let currentPlayer = "X"; // Current player ('X' starts first)
  let gameActive = true; // Game state (active or not)

  // Initialize the game board
  function initBoard() {
    // Clear the board and reset variables
    board.innerHTML = "";
    cells = [];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;

    // Create the game cells and add event listeners
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
      cells.push(cell); // Add the cell to the array
    }
  }

  // Handle cell click event
  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    // Check if the cell is already filled or the game is not active
    if (cell.textContent !== "" || !gameActive) {
      return;
    }

    // Mark the cell for the current player
    cell.textContent = currentPlayer;

    // Check for win or draw
    if (checkWin()) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false; // Game ends
    } else if (checkDraw()) {
      message.textContent = `It's a draw!`;
      gameActive = false; // Game ends
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  // Check for win
  function checkWin() {
    // Define win patterns (rows, columns, diagonals)
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    // Check each win pattern
    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        cells[a].textContent === currentPlayer &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      );
    });
  }

  // Check for draw
  function checkDraw() {
    // Check if all cells are filled
    return cells.every((cell) => cell.textContent !== "");
  }

  // Reset the game
  resetBtn.addEventListener("click", initBoard);

  // Initialize the game board on page load
  initBoard();
});
