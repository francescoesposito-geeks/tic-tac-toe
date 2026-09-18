"use client";

export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  isWinningSquare: boolean;
  isGameOver: boolean;
}

export default function Square({
  value,
  onSquareClick,
  isWinningSquare = false,
  isGameOver = false
}: SquareProps) {
  const isDisabled = isGameOver || value !== null;
  return (
    <button
      onClick={onSquareClick}
      className={`w-24 h-24 border-2 border-slate-700 text-4xl font-bold flex items-center justify-center transition-colors duration-150 rounded-lg ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-400"
      } ${
        isWinningSquare
          ? "bg-emerald-600/40 text-emerald-900"
          : "bg-slate-500/40 text-white"
      }`}
    >
      {value}
    </button>
  );
}
