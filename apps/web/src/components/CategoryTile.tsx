import Link from 'next/link';
import Image from 'next/image';

interface CategoryTileProps {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  count?: number;
}

export function CategoryTile({ title, href, image, imageAlt, count }: CategoryTileProps) {
  return (
    <Link href={href}>
      <div className="card-lift relative overflow-hidden rounded-card h-48 group">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <h3 className="font-display font-bold text-lg text-cream-text">{title}</h3>
          {count && <p className="text-xs text-cream/70 mt-1">{count} tours</p>}
        </div>
      </div>
    </Link>
  );
}
