type Raw = Record<string, unknown>;

const isObject = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);
const text = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() ? v.trim() : undefined);

/** Keys that hold layout or media data, not prose. */
const SKIP = new Set(['image', 'imageUrl', 'src', 'alt', 'href', 'url', 'icon', 'slug', 'id', 'order', 'visible', 'meta', 'layout', 'propertySlug', 'updatedAt']);
const HEADING_KEYS = ['title', 'heading', 'name', 'question', 'label'];

/**
 * Renders a page the admin saved as structured data (About, Contact, ...) as readable sections: a heading
 * where an object has a title-like field, paragraphs for the text. Text is escaped by React.
 */
function Sections({ value, depth }: { value: unknown; depth: number }) {
  if (typeof value === 'string') return value.trim() ? <p className="leading-relaxed text-ink-muted">{value}</p> : null;
  if (Array.isArray(value)) {
    return (
      <>
        {value.map((item, i) => (
          <Sections key={i} value={item} depth={depth} />
        ))}
      </>
    );
  }
  if (!isObject(value)) return null;

  const headingKey = HEADING_KEYS.find((k) => text(value[k]));
  const heading = headingKey ? text(value[headingKey]) : undefined;
  const rest = Object.entries(value).filter(([k]) => !SKIP.has(k) && k !== headingKey);
  const Heading = depth <= 1 ? 'h2' : 'h3';

  return (
    <section className={depth === 0 ? '' : 'mt-8'}>
      {heading && <Heading className="font-hero text-xl font-extrabold text-ink">{heading}</Heading>}
      <div className="mt-3 space-y-3">
        {rest.map(([k, v]) => (
          <Sections key={k} value={v} depth={depth + 1} />
        ))}
      </div>
    </section>
  );
}

export function PageContent({ data }: { data: Raw }) {
  return <Sections value={data} depth={0} />;
}

/** FAQ page: groups of questions, each one collapsible. */
export function FaqContent({ data }: { data: Raw }) {
  const blocks = Array.isArray(data.blocks) ? data.blocks.filter(isObject) : [];
  if (blocks.length === 0) return null;
  return (
    <div className="space-y-10">
      {blocks.map((block, i) => (
        <section key={i}>
          {text(block.title) && <h2 className="font-hero text-xl font-extrabold text-ink">{text(block.title)}</h2>}
          <div className="mt-3 divide-y divide-line rounded-[16px] border border-line bg-paper">
            {(Array.isArray(block.questions) ? block.questions.filter(isObject) : []).map((q, j) => (
              <details key={j} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink">{text(q.question)}</summary>
                <p className="mt-2 leading-relaxed text-ink-muted">{text(q.answer)}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Legal pages: HTML that the admin sanitised when it was saved. */
export function LegalContent({ html }: { html: string }) {
  return <div className="space-y-4 leading-relaxed text-ink-muted [&_a]:text-brand [&_a]:underline [&_h2]:mt-8 [&_h2]:font-hero [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc" dangerouslySetInnerHTML={{ __html: html }} />;
}
