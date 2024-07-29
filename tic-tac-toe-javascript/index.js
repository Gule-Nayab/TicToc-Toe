let currPlayer = "X";
let isWinner = false;
let winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const allSquares = document.querySelectorAll(".square");
const resetButton = document.querySelector('.reset');
const message = document.querySelector(".message");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const winnerMessage = document.querySelector(".winner-message");
const vs = document.querySelector(".vs");

player1Input.addEventListener('input', updateVs);
player2Input.addEventListener('input', updateVs);

function updateVs() {
  const player1Name = player1Input.value || 'Player 1';
  const player2Name = player2Input.value || 'Player 2';
  vs.textContent = `${player1Name} vs ${player2Name}`;
}

allSquares.forEach((square, index) => {
  square.addEventListener("click", () => handleClick(square, index));
});

const handleClick = (square, index) => {
  if (square.textContent !== "" || isWinner) {
    return;
  }

  if (currPlayer === "X") {
    square.textContent = "X";
    square.classList.add("x");
  } else {
    square.textContent = "O";
    square.classList.add("o");
  }

  isWinner = hasWinner(allSquares);

  if (!isWinner) {
    currPlayer = currPlayer === "X" ? "O" : "X";
  }

  const isEmpty = isBoardEmpty(allSquares);

  if (isWinner) {
    const winnerName = currPlayer === "X" ? player1Input.value : player2Input.value;
    message.textContent = `Winner is ${winnerName}!`;
    winnerMessage.textContent = `Wahooooo! ${winnerName} is the winner!`;
  } else if (!isWinner && !isEmpty) {
    message.textContent = "It's a Tie!";
  }
};

const hasWinner = squares => {
  let isWinner = false;
  winningOptions.forEach(option => {
    let a = option[0];
    let b = option[1];
    let c = option[2];
    if (
      squares[a].textContent &&
      squares[a].textContent === squares[b].textContent &&
      squares[a].textContent === squares[c].textContent
    ) {
      isWinner = true;
    }
  });
  return isWinner;
};

const isBoardEmpty = squares => {
  let hasEmptySquare = false;
  squares.forEach(square => {
    if (square.textContent === "") {
      hasEmptySquare = true;
    }
  });
  return hasEmptySquare;
};

function handleReset() {
  currPlayer = 'X';
  isWinner = false;
  allSquares.forEach(square => {
    square.classList.remove('x', 'o');
    square.textContent = '';
  });

  message.textContent = '';
  winnerMessage.textContent = '';
}

resetButton.addEventListener('click', handleReset);
