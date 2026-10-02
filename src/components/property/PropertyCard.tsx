import React from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Users, 
  ShieldCheck, 
  Scale, 
  Wifi, 
  Utensils, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { Property, College } from '../../types';
import { useProperties } from '../../context/PropertyContext';
import { formatDistance } from '../../utils/distance';

interface PropertyCardProps {
  property: Property;
  college?: College | null;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  college,
  onViewDetails,
}) => {
  const { toggleFavorite, isFavorite, addToCompare, removeFromCompare, isInCompare } = useProperties();
  const favorited = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const distanceText = formatDistance(property.distance_km);

  // Sharing display
  const primaryRoom = property.rooms[0];
  const sharingText = primaryRoom ? primaryRoom.room_type : 'Sharing Available';

  // Availability badge style
  const availabilityColors = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    'Few Beds Left': 'bg-amber-50 text-amber-700 border-amber-200/80',
    Full: 'bg-rose-50 text-rose-700 border-rose-200/80',
  };

  const hasWifi = property.facilities.some(f => f.toLowerCase().includes('wi-fi') || f.toLowerCase().includes('wifi'));
  const hasFood = property.food_included || property.facilities.some(f => f.toLowerCase().includes('food'));
  const hasSecurity = property.facilities.some(f => f.toLowerCase().includes('security') || f.toLowerCase().includes('cctv'));

  return (
    <div className="group bg-white rounded-24 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <div className="p-3 pb-0">
        <div className="relative aspect-[16/10] rounded-20 overflow-hidden bg-slate-100">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Demo Listing Badge */}
          {property.is_demo && (
            <div className="absolute top-2.5 left-2.5 z-10 bg-amber-400 text-[#102A56] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wide">
              Demo Listing
            </div>
          )}

          {/* Top Right Action Buttons: Favorite & Compare */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (inCompare) {
                  removeFromCompare(property.id);
                } else {
                  addToCompare(property);
                }
              }}
              title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
                inCompare
                  ? 'bg-[#1677FF] text-white shadow-[#1677FF]/30'
                  : 'bg-white/85 text-slate-700 hover:bg-white hover:text-[#1677FF]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
                favorited
                  ? 'bg-rose-500 text-white shadow-rose-500/30 scale-105'
                  : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom image overlay with Category and Gender badge */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="bg-[#102A56]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {property.property_type} • {property.gender_category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${availabilityColors[property.availability]}`}>
              {property.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Header & Verification */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onViewDetails(property)}
              className="text-base sm:text-lg font-bold text-[#102A56] group-hover:text-[#1677FF] transition-colors cursor-pointer line-clamp-1"
            >
              {property.name}
            </h3>

            {property.is_verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22C55E] bg-[#DCFCE7] border border-[#22C55E]/30 px-2 py-0.5 rounded-full shrink-0">
                <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
                Verified
              </span>
            )}
          </div>

          {/* Area & Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{property.area}, {property.city}</span>
          </div>

          {/* Distance from College with Light Blue Pill */}
          <div className="bg-[#EEF6FF] border border-[#1677FF]/15 rounded-18 px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Distance from college:</span>
            <span className="font-extrabold text-[#1677FF] flex items-center gap-1">
              {distanceText}
              {college && distanceText !== 'Distance unavailable' && (
                <span className="text-slate-500 font-normal hidden sm:inline truncate max-w-[110px]">
                  ({college.name.split(' ')[0]})
                </span>
              )}
            </span>
          </div>

          {/* Sharing & Bed Details */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
            <span className="flex items-center gap-1.5 font-semibold text-[#102A56]">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {sharingText}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              {property.rating.toFixed(1)}
              <span className="text-slate-400 font-normal text-[11px]">({property.reviews_count})</span>
            </span>
          </div>

          {/* Top Key Facilities: Wi-Fi, Food, Security */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {hasWifi && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-full">
                <Wifi className="w-2.5 h-2.5 text-[#1677FF]" /> Wi-Fi
              </span>
            )}
            {hasFood && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-full">
                <Utensils className="w-2.5 h-2.5 text-[#22C55E]" /> Food
              </span>
            )}
            {hasSecurity && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5 text-indigo-500" /> Security
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg sm:text-xl font-black text-[#102A56] leading-none">
              ₹{property.monthly_rent.toLocaleString('en-IN')}
              <span className="text-xs font-semibold text-slate-500">/mo</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Deposit: ₹{property.deposit.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            onClick={() => onViewDetails(property)}
            className="px-4 py-2 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1677FF]/20 transition active:scale-95 whitespace-nowrap flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
