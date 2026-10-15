export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  position: number;
  onSquareClick: () => void;
  isWinningSquare: boolean;
  isGameOver: boolean;
}

function symbolColor(value: SquareValue, isWinningSquare: boolean) {
  if (isWinningSquare) return "text-emerald-900 dark:text-emerald-100";
  if (value === "X") return "text-blue-700 dark:text-blue-300";
  return "text-rose-700 dark:text-rose-300";
}

export default function Square({
  value,
  position,
  onSquareClick,
  isWinningSquare,
  isGameOver
}: SquareProps) {
  const isDisabled = isGameOver || value !== null;
  // an empty square has no text: the label tells screen readers
  // which square it is and what it contains
  const label = value
    ? `Casella ${position}: ${value}`
    : `Casella ${position}, vuota`;

  return (
    <button
      type="button"
      onClick={onSquareClick}
      disabled={isDisabled}
      aria-label={label}
      className={`w-20 h-20 sm:w-24 sm:h-24 border-2 border-slate-700 text-4xl font-bold flex items-center justify-center transition-colors duration-150 rounded-lg ${symbolColor(
        value,
        isWinningSquare
      )} ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-400"
      } ${
        isWinningSquare
          ? "bg-emerald-600/40"
          : "bg-slate-500/20 dark:bg-slate-500/40"
      }`}
    >
      {value}
    </button>
  );
}
