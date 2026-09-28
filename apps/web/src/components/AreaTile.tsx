import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface AreaTileProps {
  name: string;
  href: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export function AreaTile({ name, href, description, image, imageAlt }: AreaTileProps) {
  return (
    <Link href={href}>
      <div className="card-lift group relative aspect-[4/3.4] rounded-[14px] overflow-hidden bg-media">
        {/* Image */}
        {image && (
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="font-display font-bold text-2xl text-cream-text mb-1">{name}</h3>
          {description && <p className="text-sm text-cream/80 mb-4">{description}</p>}
          <button className="inline-flex items-center gap-2 text-cream text-sm font-semibold hover:gap-3 transition-all">
            Explore tours
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}
