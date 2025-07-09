const board = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const wordGame = document.getElementById('word-game');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

board.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (gameState[index] === "" && gameActive) {
      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkResult();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

function checkResult() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      status.textContent = `${gameState[a]} wins!`;
      gameActive = false;
      if (gameState[a] === 'X') {
        wordGame.style.display = "block"; // Show word game
      }
      return;
    }
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  board.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  status.textContent = "";
  gameActive = true;
  wordGame.style.display = "none";
}

// Word guessing logic
const answer = "apple";
function checkWord() {
  const guess = document.getElementById("wordInput").value.toLowerCase();
  const result = document.getElementById("wordStatus");
  if (guess === answer) {
    result.textContent = "✅ Correct! You're amazing!";
  } else {
    result.textContent = "❌ Try again!";
  }
}
