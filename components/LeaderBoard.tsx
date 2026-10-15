interface LeaderBoardProps {
  scoreValue: {
    x: number;
    o: number;
  };
}

export default function LeaderBoard({ scoreValue }: LeaderBoardProps) {
  return (
    <div className="flex gap-4 my-5">
      <div className="flex-1 p-5 border-2 border-zinc-600 bg-blue-50 rounded-3xl shadow-sm text-center">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold whitespace-nowrap">
          Giocatore X
        </p>
        <p className="text-3xl font-bold text-black mt-1">{scoreValue.x}</p>
      </div>

      <div className="flex-1 p-5 border-2 border-zinc-600 bg-rose-50 rounded-3xl shadow-sm text-center">
        <p className="text-sm uppercase tracking-wide text-rose-600 font-semibold whitespace-nowrap">
          Giocatore O
        </p>
        <p className="text-3xl font-bold text-black mt-1">{scoreValue.o}</p>
      </div>
    </div>
  );
}
