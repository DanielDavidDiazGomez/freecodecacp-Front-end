
const { useState } = React;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares) {
  for (const [a, b, c] of winningLines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [nextPlayer, setNextPlayer] = useState("X");

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== "");
  const gameOver = Boolean(winner) || isDraw;

  function handleClick(index) {
    if (gameOver || squares[index] !== "") {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[index] = nextPlayer;

    setSquares(nextSquares);
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
  }

  function handleReset() {
    setSquares(Array(9).fill(""));
    setNextPlayer("X");
  }

  return (
    <main className="game">
      <p className="eyebrow">THE CLASSIC GAME</p>
      <h1>Tic-Tac-Toe</h1>

      <p className="status" aria-live="polite">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : `Next Player: ${nextPlayer}`}
      </p>

      <div className="board">
        {squares.map((square, index) => (
          <button
            className={`square ${square ? `marked marked-${square.toLowerCase()}` : ""}`}
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            aria-label={`Square ${index + 1}${square ? `: ${square}` : ""}`}
          >
            {square}
          </button>
        ))}
      </div>

      <button id="reset" type="button" onClick={handleReset}>
        New Game
      </button>

      <p className="footer">
        Three in a row wins. Choose your next move wisely.
      </p>
    </main>
  );
}
