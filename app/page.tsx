"use client";
import { useCounterStore } from "./store";

export default function Home() {
  const count = useCounterStore((state) => state.count);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <main className="container text-center">
      <div className="text-2xl">{count}</div>
      <div className="space-x-2">
        <button onClick={() => incrementAsync()}>IncrementAsync</button>
        <button onClick={() => decrement()}>Decrement</button>
      </div>
    </main>
  );
}
