/** Loading state: a skeleton shaped like a page header and a grid of cards. */
export default function AdminLoading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <div className="mb-6 h-8 w-56 rounded-control bg-line" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 rounded-card border border-line bg-surface" />
        ))}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
