export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl px-6 py-20"
      aria-busy="true"
    >
      <div className="animate-pulse">
        <div className="h-10 w-2/3 rounded bg-[var(--color-border)]" />
  
        <div className="mt-6 h-5 w-1/3 rounded bg-[var(--color-border)]" />
  
        <div className="mt-10 h-80 rounded bg-[var(--color-border)]" />
      </div>
    </main>
  );
}