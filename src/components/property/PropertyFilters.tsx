import React from 'react';
import { 
  RotateCcw, 
  MapPin, 
  IndianRupee, 
  Building, 
  Users2, 
  BedDouble, 
  Navigation2, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyType, GenderCategory, SharingType } from '../../types';
import { POPULAR_CITIES } from '../../data/mockData';

interface PropertyFiltersProps {
  isMobileModal?: boolean;
  onCloseMobileModal?: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  isMobileModal,
  onCloseMobileModal,
}) => {
  const { 
    colleges, 
    selectedCollege, 
    setSelectedCollege, 
    filters, 
    updateFilters, 
    resetFilters,
    filteredProperties
  } = useProperties();

  const accommodationOptions: PropertyType[] = [
    'PG',
    'Hostel',
    'Room',
    'Shared Room',
    'Single Room',
    'Apartment',
  ];

  const genderOptions: GenderCategory[] = ['Boys', 'Girls', 'Unisex/Family'];

  const roomSharingOptions: SharingType[] = [
    'Single',
    'Double Sharing',
    'Triple Sharing',
    '4 Sharing',
  ];

  const facilitiesList = [
    'Wi-Fi',
    'Food',
    'AC',
    'Non-AC',
    'Washing Machine',
    'Parking',
    'Laundry',
    'Power Backup',
    'Study Room',
    'CCTV',
    'Security',
    'Attached Bathroom',
  ];

  const toggleAccommodation = (type: PropertyType) => {
    const next = filters.accommodationTypes.includes(type)
      ? filters.accommodationTypes.filter((t) => t !== type)
      : [...filters.accommodationTypes, type];
    updateFilters({ accommodationTypes: next });
  };

  const toggleGender = (gender: GenderCategory) => {
    const next = filters.genderCategories.includes(gender)
      ? filters.genderCategories.filter((g) => g !== gender)
      : [...filters.genderCategories, gender];
    updateFilters({ genderCategories: next });
  };

  const toggleRoomType = (roomType: SharingType) => {
    const next = filters.roomTypes.includes(roomType)
      ? filters.roomTypes.filter((r) => r !== roomType)
      : [...filters.roomTypes, roomType];
    updateFilters({ roomTypes: next });
  };

  const toggleFacility = (facility: string) => {
    const next = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];
    updateFilters({ facilities: next });
  };

  return (
    <div className="bg-white rounded-24 border border-slate-200/80 shadow-soft p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1677FF]" />
          <h3 className="font-extrabold text-[#102A56] text-base">Filter Stays</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-[#1677FF] flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* College Selector */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
          Selected College
        </label>
        <select
          value={filters.collegeId}
          onChange={(e) => {
            const val = e.target.value;
            const found = colleges.find((c) => c.id === val);
            setSelectedCollege(found || null);
          }}
          className="w-full text-xs font-semibold bg-[#F8FBFF] border border-slate-200/80 rounded-18 p-2.5 text-[#102A56] focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
        >
          <option value="">All Colleges / Any</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.city})
            </option>
          ))}
        </select>
        {selectedCollege && (
          <p className="text-[11px] text-[#22C55E] font-medium mt-1">
            ✓ Distance calculated from {selectedCollege.name}
          </p>
        )}
      </div>

      {/* Location Filters */}
      <div className="space-y-3">
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56]">
          Location
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">City</span>
            <select
              value={filters.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
              className="w-full text-xs bg-[#F8FBFF] border border-slate-200/80 rounded-18 p-2 text-[#102A56] focus:ring-2 focus:ring-[#1677FF]"
            >
              <option value="">All Cities</option>
              {POPULAR_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Area / Locality</span>
            <input
              type="text"
              placeholder="e.g. Dargamitta"
              value={filters.area}
              onChange={(e) => updateFilters({ area: e.target.value })}
              className="w-full text-xs bg-[#F8FBFF] border border-slate-200/80 rounded-18 p-2 text-[#102A56] focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>
        </div>
      </div>

      {/* Distance Filter (with 500m, 1km, 2km, 5km) */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2 flex items-center justify-between">
          <span>Distance to College</span>
          <Navigation2 className="w-3.5 h-3.5 text-[#1677FF]" />
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Any Distance', val: null },
            { label: 'Within 500 m', val: 0.5 },
            { label: 'Within 1 km', val: 1.0 },
            { label: 'Within 2 km', val: 2.0 },
            { label: 'Within 5 km', val: 5.0 },
          ].map((dist) => {
            const isSelected = filters.maxDistance === dist.val;
            return (
              <button
                key={dist.label}
                type="button"
                onClick={() => updateFilters({ maxDistance: dist.val })}
                className={`text-xs py-2 px-2 rounded-18 border text-center font-bold transition ${
                  isSelected
                    ? 'bg-[#1677FF] text-white border-[#1677FF] shadow-xs'
                    : 'bg-[#F8FBFF] text-slate-700 border-slate-200/80 hover:bg-[#EEF6FF]'
                }`}
              >
                {dist.label}
              </button>
            );
          })}
        </div>
        {!selectedCollege && (
          <p className="text-[11px] text-amber-600 mt-1.5 font-medium">
            ⚠️ Select a college to enable accurate distance filtering
          </p>
        )}
      </div>

      {/* Monthly Budget Filter */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2 flex items-center justify-between">
          <span>Monthly Budget</span>
          <IndianRupee className="w-3.5 h-3.5 text-[#1677FF]" />
        </label>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'Any Budget' },
            { id: 'under_3000', label: 'Under ₹3,000' },
            { id: '3000_5000', label: '₹3,000 – ₹5,000' },
            { id: '5000_8000', label: '₹5,000 – ₹8,000' },
            { id: '8000_12000', label: '₹8,000 – ₹12,000' },
            { id: 'custom', label: 'Custom Range' },
          ].map((b) => (
            <label
              key={b.id}
              className={`flex items-center gap-2 p-2 rounded-18 text-xs font-semibold cursor-pointer transition ${
                filters.budgetRange === b.id
                  ? 'bg-[#EEF6FF] text-[#1677FF] font-bold'
                  : 'text-slate-700 hover:bg-[#F8FBFF]'
              }`}
            >
              <input
                type="radio"
                name="budgetRange"
                checked={filters.budgetRange === b.id}
                onChange={() => updateFilters({ budgetRange: b.id })}
                className="text-[#1677FF] focus:ring-[#1677FF]"
              />
              {b.label}
            </label>
          ))}
        </div>

        {/* Custom Budget Inputs */}
        {filters.budgetRange === 'custom' && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
            <div>
              <span className="text-[10px] text-slate-400">Min (₹)</span>
              <input
                type="number"
                value={filters.minBudget}
                onChange={(e) => updateFilters({ minBudget: Number(e.target.value) })}
                className="w-full text-xs p-1.5 border border-slate-200 rounded-18"
              />
            </div>
            <span className="text-slate-400 mt-3">-</span>
            <div>
              <span className="text-[10px] text-slate-400">Max (₹)</span>
              <input
                type="number"
                value={filters.maxBudget}
                onChange={(e) => updateFilters({ maxBudget: Number(e.target.value) })}
                className="w-full text-xs p-1.5 border border-slate-200 rounded-18"
              />
            </div>
          </div>
        )}
      </div>

      {/* Accommodation Type */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
          Accommodation Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {accommodationOptions.map((type) => {
            const checked = filters.accommodationTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleAccommodation(type)}
                className={`text-xs p-2 rounded-18 text-left font-semibold border transition flex items-center justify-between ${
                  checked
                    ? 'bg-[#EEF6FF] border-[#1677FF] text-[#1677FF] font-bold'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:bg-[#F8FBFF]'
                }`}
              >
                <span>{type}</span>
                {checked && <Check className="w-3 h-3 text-[#1677FF] stroke-[3px]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender Category */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
          Gender / Category
        </label>
        <div className="flex gap-1.5">
          {genderOptions.map((gender) => {
            const checked = filters.genderCategories.includes(gender);
            return (
              <button
                key={gender}
                type="button"
                onClick={() => toggleGender(gender)}
                className={`flex-1 text-xs py-2 px-1 rounded-18 text-center font-bold border transition ${
                  checked
                    ? 'bg-[#102A56] text-white border-[#102A56] shadow-xs'
                    : 'bg-[#F8FBFF] text-slate-700 border-slate-200/80 hover:bg-[#EEF6FF]'
                }`}
              >
                {gender}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Sharing */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
          Room Sharing
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {roomSharingOptions.map((room) => {
            const checked = filters.roomTypes.includes(room);
            return (
              <button
                key={room}
                type="button"
                onClick={() => toggleRoomType(room)}
                className={`text-xs p-2 rounded-18 text-left font-semibold border transition flex items-center justify-between ${
                  checked
                    ? 'bg-[#EEF6FF] border-[#1677FF] text-[#1677FF] font-bold'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:bg-[#F8FBFF]'
                }`}
              >
                <span>{room}</span>
                {checked && <Check className="w-3 h-3 text-[#1677FF] stroke-[3px]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Facilities Checklist */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
          Facilities & Amenities
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
          {facilitiesList.map((facility) => {
            const checked = filters.facilities.includes(facility);
            return (
              <label
                key={facility}
                className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-[#102A56]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFacility(facility)}
                  className="rounded text-[#1677FF] focus:ring-[#1677FF]"
                />
                <span className="truncate font-medium">{facility}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Mobile Modal Footer */}
      {isMobileModal && (
        <div className="pt-4 border-t border-slate-200 flex gap-2">
          <button
            onClick={resetFilters}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-xs"
          >
            Reset
          </button>
          <button
            onClick={onCloseMobileModal}
            className="flex-2 py-2.5 rounded-full bg-[#1677FF] text-white font-bold text-xs shadow-md shadow-[#1677FF]/25"
          >
            Show {filteredProperties.length} Stays
          </button>
        </div>
      )}
    </div>
  );
};
