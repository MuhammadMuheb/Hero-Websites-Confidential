import Link from 'next/link';
import Image from 'next/image';

interface JournalCardProps {
  title: string;
  excerpt: string;
  href: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime?: string;
  category?: string;
}

export function JournalCard({
  title,
  excerpt,
  href,
  image,
  imageAlt,
  date,
  readTime,
  category,
}: JournalCardProps) {
  return (
    <Link href={href}>
      <div className="card-lift overflow-hidden rounded-card bg-paper shadow-card hover:shadow-card-hover transition-all">
        {/* Image */}
        <div className="img-zoom relative aspect-video overflow-hidden bg-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {category && (
            <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider mb-2">
              {category}
            </p>
          )}
          <h3 className="font-display font-bold text-lg text-ink mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-ink/60 line-clamp-2 mb-4">{excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-ink/50">
            <time>{date}</time>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
