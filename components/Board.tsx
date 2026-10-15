"use client";

import { useState } from "react";
import Square, { type SquareValue } from "./Square";
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

const EMPTY_BOARD: SquareValue[] = Array(9).fill(null);

const checkWinner = (squaresArray: SquareValue[]) => {
  return WINNING_SQUARES.find(([a, b, c]) => {
    return (
      squaresArray[a] !== null &&
      squaresArray[a] === squaresArray[b] &&
      squaresArray[a] === squaresArray[c]
    );
  });
};

const playerColor = (player: SquareValue) =>
  player === "X"
    ? "text-blue-700 dark:text-blue-300"
    : "text-rose-700 dark:text-rose-300";

export default function Board() {
  const [squaresValue, setSquaresValue] = useState<SquareValue[]>(EMPTY_BOARD);
  const [score, setScore] = useState(INITIAL_SCORE);

  // everything below is calculated from the squares at every render.
  // X always starts, so it is X's turn when the filled squares are an even number
  const filledSquares = squaresValue.filter((square) => square !== null).length;
  const xIsNext = filledSquares % 2 === 0;
  const winningLine = checkWinner(squaresValue);
  const winner = winningLine ? squaresValue[winningLine[0]] : null;
  const isDraw = winningLine === undefined && filledSquares === squaresValue.length;
  const isGameFinished = winningLine !== undefined || isDraw;

  const handleClick = (index: number) => {
    if (squaresValue[index] !== null || isGameFinished) {
      return;
    }

    const player = xIsNext ? "X" : "O";
    const newSquaresArray = [...squaresValue];
    newSquaresArray[index] = player;
    setSquaresValue(newSquaresArray);

    // the score changes in the click that wins the game: no effect needed
    if (checkWinner(newSquaresArray)) {
      setScore((prev) =>
        player === "X" ? { ...prev, x: prev.x + 1 } : { ...prev, o: prev.o + 1 }
      );
    }
  };

  const resetGame = () => {
    setSquaresValue(EMPTY_BOARD);
  };

  const hasWon = (index: number) => winningLine?.includes(index) ?? false;

  const gameStatus = (): { text: string; player: SquareValue } => {
    if (winner) return { text: "Vincitore:", player: winner };
    if (isDraw) return { text: "Pareggio", player: null };
    return { text: "È il turno di:", player: xIsNext ? "X" : "O" };
  };

  const status = gameStatus();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <LeaderBoard scoreValue={score} />
        {/* screen readers read this text again every time it changes */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="p-2 m-2 uppercase text-xl font-bold tracking-wide text-center text-slate-900 dark:text-slate-100"
        >
          {status.text}
          {status.player && (
            <span className={`ml-2 ${playerColor(status.player)}`}>
              {status.player}
            </span>
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {squaresValue.map((value, index) => (
          <Square
            key={index}
            position={index + 1}
            value={value}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={hasWon(index)}
            isGameOver={isGameFinished}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={resetGame}
        className="cursor-pointer uppercase m-4 border-2 border-slate-700 p-2 rounded-lg hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-800 active:scale-90 transition-transform duration-150 ease-in-out"
      >
        Nuova partita
      </button>
    </div>
  );
}
