"use client";

import { useState } from "react";
import { ProjectForm } from "@/components/ProjectForm";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DiscardDialog } from "@/components/ui/DiscardDialog";
import { Modal } from "@/components/ui/Modal";
import type { Project } from "@/lib/types";

/** "Project settings": the Edit project form in a pop-up, over the editor. */
export function ProjectSettingsButton({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [asking, setAsking] = useState(false);

  const requestClose = () => (dirty ? setAsking(true) : setOpen(false));

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Project settings
      </Button>
      <Modal open={open} title="Edit project" subtitle={project.name} size="lg" onClose={requestClose} badges={dirty ? <Chip tone="amber">Unsaved changes</Chip> : undefined}>
        <ProjectForm
          project={project}
          onDirtyChange={setDirty}
          onCancel={requestClose}
          onSaved={() => {
            setDirty(false);
            setOpen(false);
          }}
        />
      </Modal>
      <DiscardDialog
        open={asking}
        what="project"
        onKeep={() => setAsking(false)}
        onDiscard={() => {
          setAsking(false);
          setDirty(false);
          setOpen(false);
        }}
      />
    </>
  );
}
