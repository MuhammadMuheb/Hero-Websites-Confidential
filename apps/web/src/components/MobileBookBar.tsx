import { MapPin, Calendar, Users } from 'lucide-react';

interface MobileBookBarProps {
  onBook: () => void;
  price?: string;
}

export function MobileBookBar({ onBook, price }: MobileBookBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-line p-4 shadow-bar-up">
      <button
        onClick={onBook}
        className="w-full px-6 py-3 bg-brand text-cream rounded-full font-semibold hover:bg-brand-dark transition-colors"
      >
        Book Now {price && `• ${price}`}
      </button>
      <div className="flex gap-4 justify-around mt-4 text-xs text-ink/60">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          Details
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          Schedule
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} />
          Group
        </div>
      </div>
    </div>
  );
}
