import Image from 'next/image';

interface DarkImageBandProps {
  imageUrl: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export function DarkImageBand({ imageUrl, imageAlt, children }: DarkImageBandProps) {
  return (
    <section className="relative h-96 bg-ink overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      {children && (
        <div className="relative h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
