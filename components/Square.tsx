"use client";

export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
}

export default function Square({
  value,
  onSquareClick,
  isWinningSquare = false
}: SquareProps) {
  return (
    <button
      onClick={onSquareClick}
      className={`w-24 h-24 border-2 border-slate-700 text-4xl font-bold flex items-center justify-center transition-colors duration-150 rounded-lg hover:bg-slate-400 ${
        isWinningSquare
          ? "bg-emerald-800/50 text-emerald-400"
          : "bg-slate-300 text-white"
      }`}
    >
      {value}
    </button>
  );
}
