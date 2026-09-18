"use client";

import { useEffect, useState } from "react";
import Square from "./Square";
import LeaderBoard from "./LeaderBoard";

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

const INITIAL_SCORE = {
  x: 0,
  o: 0
};

const checkWinner = (squaresArray: (string | null)[]) => {
  return WINNING_SQUARES.find((line) => {
    const [a, b, c] = line;
    if (
      squaresArray[a] !== null &&
      squaresArray[a] === squaresArray[b] &&
      squaresArray[a] === squaresArray[c]
    ) {
      return true;
    }
    return false;
  });
};

const getWinnerSymbol = (
  line: number[],
  squares: (string | null)[]
): "X" | "O" | null => {
  const winnerSymbol = squares[line[0]];
  if (winnerSymbol === "X") return "X";
  if (winnerSymbol === "O") return "O";
  return null;
};

export default function Board() {
  const [squaresValue, setSquaresValue] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState(INITIAL_SCORE);

  const winningLine = checkWinner(squaresValue);

  const isDraw =
    winningLine === undefined &&
    squaresValue.every((square) => square !== null);

  const isGameFinished = winningLine !== undefined || isDraw;

  const incrementXScore = () =>
    setScore((prev) => ({ ...prev, x: prev.x + 1 }));

  const incrementOScore = () =>
    setScore((prev) => ({ ...prev, o: prev.o + 1 }));

  useEffect(() => {
    if (winningLine === undefined) return;

    const winner = getWinnerSymbol(winningLine, squaresValue);

    if (winner === "X") incrementXScore();
    if (winner === "O") incrementOScore();
  }, [winningLine]);

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

  const resetGame = () => {
    setSquaresValue(Array(9).fill(null));
    setXIsNext(true);
  };

  const hasWon = (index: number) => winningLine?.includes(index) ?? false;

  const gameStatus = () => {
    const winner = winningLine
      ? getWinnerSymbol(winningLine, squaresValue)
      : null;
    return winningLine ? (
      <p className="p-2 m-2 uppercase text-xl font-bold text-black tracking-wide text-center">
        Vincitore:
        <span
          className={`ml-2 ${
            winner === "X" ? "text-blue-600" : "text-rose-600"
          }`}
        >
          {winner}
        </span>
      </p>
    ) : isDraw ? (
      <p className="p-2 m-2 uppercase text-xl font-bold text-slate-500 tracking-wide text-center">
        Pareggio
      </p>
    ) : xIsNext ? (
      <p className="p-2 m-2 uppercase text-xl font-semibold text-black tracking-wide text-center">
        È il turno di: <span className="ml-2 text-blue-600">X</span>
      </p>
    ) : (
      <p className="p-2 m-2 uppercase text-xl font-semibold text-black tracking-wide text-center">
        È il turno di: <span className="ml-2 text-rose-600">O</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <LeaderBoard scoreValue={score} />
        <div>{gameStatus()}</div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {squaresValue.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={hasWon(index)}
            isGameOver={isGameFinished}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="cursor-pointer uppercase m-4 border-2 border-slate-700 p-2 rounded-lg hover:bg-slate-200 active:scale-90 transition-transform duration-150 ease-in-out"
      >
        New Game
      </button>
    </div>
  );
}
