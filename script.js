let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

// Add your own audio file URL or link to a music file
let winSound = new Audio('path_to_congratulatory_music.mp3');

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player move
function makeMove(index) {
    if (!gameOver && board[index] === "") {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        checkWin();
        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("game-status").innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for win or draw
function checkWin() {
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("game-status").innerText = `🎉 Congratulations! Player ${currentPlayer} wins! 🎉`;

            // Play congratulatory music
            winSound.play();

            gameOver = true;
            return;
        }
    }

    // Check for draw
    if (!board.includes("")) {
        document.getElementById("game-status").innerText = "It's a draw!";
        gameOver = true;
    }
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    document.querySelectorAll(".cell").forEach(cell => (cell.innerText = ""));
    document.getElementById("game-status").innerText = "Player X's turn";
    
    // Pause and reset music if it was playing
    winSound.pause();
    winSound.currentTime = 0;
}
