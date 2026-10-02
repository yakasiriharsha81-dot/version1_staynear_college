import React from 'react';
import { 
  Scale, 
  Trash2, 
  Check, 
  X, 
  ExternalLink, 
  Plus
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property, College } from '../../types';
import { formatDistance } from '../../utils/distance';

interface CompareViewProps {
  college?: College | null;
  onViewDetails: (property: Property) => void;
  onFindMore: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  college,
  onViewDetails,
  onFindMore,
}) => {
  const { compareList, removeFromCompare, clearCompare } = useProperties();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EEF6FF] text-[#1677FF] flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#102A56]">No properties to compare</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Select up to 3 accommodations using the comparison button on any property card to view side-by-side specs, rent, food, and facilities.
        </p>
        <button
          onClick={onFindMore}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#1677FF] text-white font-bold text-sm shadow-md shadow-[#1677FF]/20 hover:bg-[#0f62d8] transition"
        >
          Browse Stays Near College
        </button>
      </div>
    );
  }

  const comparisonAttributes = [
    { key: 'monthly_rent', label: 'Monthly Rent', format: (p: Property) => `₹${p.monthly_rent.toLocaleString('en-IN')}/mo` },
    { key: 'deposit', label: 'Security Deposit', format: (p: Property) => `₹${p.deposit.toLocaleString('en-IN')}` },
    { key: 'distance', label: 'Distance from College', format: (p: Property) => formatDistance(p.distance_km) },
    { key: 'property_type', label: 'Type & Gender', format: (p: Property) => `${p.property_type} • ${p.gender_category}` },
    { key: 'sharing', label: 'Room Sharing', format: (p: Property) => p.rooms[0]?.room_type || 'Sharing' },
    { key: 'food', label: 'Food / Meals', isBool: true, getBool: (p: Property) => p.food_included },
    { key: 'wifi', label: 'High Speed Wi-Fi', isBool: true, getBool: (p: Property) => p.facilities.includes('Wi-Fi') },
    { key: 'ac', label: 'AC Available', isBool: true, getBool: (p: Property) => p.facilities.includes('AC') },
    { key: 'laundry', label: 'Washing Machine / Laundry', isBool: true, getBool: (p: Property) => p.facilities.includes('Laundry') || p.facilities.includes('Washing Machine') },
    { key: 'cctv', label: 'CCTV & Security', isBool: true, getBool: (p: Property) => p.facilities.includes('CCTV') || p.facilities.includes('Security') },
    { key: 'parking', label: 'Vehicle Parking', isBool: true, getBool: (p: Property) => p.facilities.includes('Parking') },
    { key: 'backup', label: 'Power Backup', isBool: true, getBool: (p: Property) => p.facilities.includes('Power Backup') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Clear Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-3 py-1 rounded-full border border-[#1677FF]/20">
            Side-by-Side Comparison
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102A56] mt-2">
            Compare Accommodations ({compareList.length}/3)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Objective specs overview. We never auto-select winners so you decide what fits your needs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {compareList.length < 3 && (
            <button
              onClick={onFindMore}
              className="px-4 py-2 rounded-full bg-[#EEF6FF] text-[#1677FF] hover:bg-[#1677FF] hover:text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Another Stay
            </button>
          )}
          <button
            onClick={clearCompare}
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Table / Matrix */}
      <div className="bg-white rounded-24 border border-slate-200/80 shadow-soft overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-200/80 bg-[#F8FBFF]">
              <th className="p-4 sm:p-6 w-1/4 font-extrabold text-xs uppercase tracking-wider text-[#102A56]">
                Specification
              </th>
              {compareList.map((prop) => (
                <th key={prop.id} className="p-4 sm:p-6 w-1/4 align-top">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-20 overflow-hidden bg-slate-100">
                      <img
                        src={prop.images[0]}
                        alt={prop.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-[#102A56]/80 text-white hover:bg-rose-600 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#102A56] text-sm line-clamp-1">
                        {prop.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {prop.area}, {prop.city}
                      </p>
                    </div>
                    <button
                      onClick={() => onViewDetails(prop)}
                      className="w-full py-2 px-3 bg-[#1677FF] hover:bg-[#0f62d8] text-white rounded-full text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>View Stay</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonAttributes.map((attr) => (
              <tr key={attr.key} className="hover:bg-[#F8FBFF]/60 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-[#102A56] bg-slate-50/40">
                  {attr.label}
                </td>
                {compareList.map((prop) => (
                  <td key={prop.id} className="p-4 sm:p-5 text-slate-800">
                    {attr.isBool ? (
                      attr.getBool && attr.getBool(prop) ? (
                        <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold">
                          <Check className="w-4 h-4 stroke-[3px]" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                          <X className="w-4 h-4" /> No
                        </span>
                      )
                    ) : (
                      <span className="font-semibold text-[#102A56]">{attr.format && attr.format(prop)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
