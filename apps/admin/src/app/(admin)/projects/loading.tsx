/** Loading state of the Projects list: the same shape as the table, so nothing jumps when it arrives. */
export default function ProjectsLoading() {
  return (
    <div role="status" aria-label="Loading projects" className="animate-pulse">
      <div className="mb-6 h-8 w-40 rounded-control bg-line" />
      <div className="mb-4 flex justify-between">
        <div className="h-9 w-72 rounded-control bg-line" />
        <div className="h-9 w-32 rounded-control bg-line" />
      </div>
      <div className="rounded-card border border-line bg-surface">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex h-[60px] items-center gap-6 border-b border-line px-4 last:border-0">
            <div className="h-4 w-48 rounded bg-line" />
            <div className="h-5 w-20 rounded-full bg-line" />
            <div className="ml-auto h-8 w-40 rounded-control bg-line" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
