/** Loading state of the project editor: an outline on the left, rows on the right. */
export default function EditorLoading() {
  return (
    <div role="status" aria-label="Loading the project" className="animate-pulse">
      <div className="mb-6 h-8 w-64 rounded-control bg-line" />
      <div className="grid gap-6 lg:grid-cols-[232px_minmax(0,1fr)]">
        <div className="hidden h-96 rounded-card border border-line bg-surface lg:block" />
        <div className="rounded-card border border-line bg-surface">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex h-[60px] items-center gap-4 border-b border-line px-4 last:border-0">
              <div className="h-10 w-10 rounded-control bg-line" />
              <div className="h-4 w-56 rounded bg-line" />
              <div className="ml-auto h-8 w-24 rounded-control bg-line" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
