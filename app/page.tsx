import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center gap-2 py-8 font-sans bg-slate-100 dark:bg-black">
      <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
        Tris
      </h1>
      <Board />
    </main>
  );
}
