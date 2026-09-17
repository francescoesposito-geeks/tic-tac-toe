"use client";

import { useState } from "react";
import Square from "./Square";

const WINNING_SQUARES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Board() {
  const [squaresValue, setSquaresValue] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winningLine = WINNING_SQUARES.find((item) => {
    const [a, b, c] = item;
    if (
      squaresValue[a] !== null &&
      squaresValue[a] === squaresValue[b] &&
      squaresValue[a] === squaresValue[c]
    ) {
      return true;
    }
    return false;
  });

  const handleClick = (index: number) => {
    if (squaresValue[index] !== null) {
      return;
    }

    if (winningLine !== undefined) {
      return;
    }

    const newSquaresArray = [...squaresValue];
    newSquaresArray[index] = xIsNext ? "X" : "O";
    setSquaresValue(newSquaresArray);
    setXIsNext(!xIsNext);
  };

  const hasWon = (index: number) => winningLine?.includes(index);

  return (
    <>
      <div>
        {winningLine ? (
          <p>Vincitore: {squaresValue[winningLine[0]]}</p>
        ) : xIsNext ? (
          <p className="mb-8">è il turno di: X</p>
        ) : (
          <p className="mb-8">è il turno di: O</p>
        )}
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {squaresValue.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={hasWon(index)}
          />
        ))}
      </div>
    </>
  );
}
