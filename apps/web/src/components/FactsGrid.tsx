interface Fact {
  number: string;
  label: string;
}

interface FactsGridProps {
  facts: Fact[];
}

export function FactsGrid({ facts }: FactsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {facts.map((fact, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-brand mb-2">{fact.number}</div>
          <p className="text-sm text-ink/70">{fact.label}</p>
        </div>
      ))}
    </div>
  );
}
