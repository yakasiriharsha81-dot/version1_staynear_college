import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property, College } from '../../types';
import { PropertyCard } from './PropertyCard';

interface FavoritesViewProps {
  college?: College | null;
  onViewDetails: (property: Property) => void;
  onFindMore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  college,
  onViewDetails,
  onFindMore,
}) => {
  const { favorites, properties } = useProperties();

  const favoriteProps = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-3 py-1 rounded-full border border-[#1677FF]/20">
            Student Wishlist
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102A56] mt-2 flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-rose-500 fill-current" />
            My Saved Accommodations ({favoriteProps.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Shortlist of PGs, hostels, and student rooms you bookmarked for easy reference.
          </p>
        </div>

        {favoriteProps.length > 0 && (
          <button
            onClick={onFindMore}
            className="text-xs font-bold text-[#1677FF] hover:text-[#0f62d8] flex items-center gap-1 self-start sm:self-auto"
          >
            Find more stays <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {favoriteProps.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-[#102A56]">No saved accommodations yet</h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any PG or hostel card to save it here for quick comparison and contact later.
          </p>
          <button
            onClick={onFindMore}
            className="px-6 py-2.5 rounded-full bg-[#1677FF] text-white font-bold text-xs shadow-md shadow-[#1677FF]/25 hover:bg-[#0f62d8] transition"
          >
            Explore PGs & Hostels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProps.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              college={college}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
