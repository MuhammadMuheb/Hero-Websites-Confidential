"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/** Error state for every admin screen: a readable message and a retry. */
export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <EmptyState
      title="This screen could not be loaded"
      description="Something went wrong while loading your data. Check your connection and try again. If it keeps happening, contact a Super Admin."
      action={
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
