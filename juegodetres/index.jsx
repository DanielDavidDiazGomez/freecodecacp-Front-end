
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./estilos.css";

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let winner = null;

  for (const [a, b, c] of combinations) {
    if (
      squares[a] !== "" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      winner = squares[a];
      break;
    }
  }

  const draw = !winner && squares.every((square) => square !== "");

  function handleClick(index) {
    if (squares[index] !== "" || winner || draw) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(""));
    setXIsNext(true);
  }

  return (
    <main className="game">
      <h1>Tres en Raya</h1>

      <p id="status" aria-live="polite">
        {winner
          ? `Winner: ${winner}`
          : draw
          ? "It's a draw!"
          : `Turn: ${xIsNext ? "X" : "O"}`}
      </p>

      <div className="board">
        {squares.map((square, index) => (
          <button
            type="button"
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <button id="reset" type="button" onClick={resetGame}>
        Reset
      </button>
    </main>
  );
}

export default Board;

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<Board />);
}
