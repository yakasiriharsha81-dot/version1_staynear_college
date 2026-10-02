import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Map as MapIcon, 
  LayoutGrid, 
  Search, 
  ArrowUpDown, 
  AlertCircle,
  X,
  Compass
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property, College } from '../../types';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { PropertyMap } from '../common/PropertyMap';

interface FindPGViewProps {
  onViewPropertyDetails: (property: Property) => void;
  onNavigateTab: (tab: string) => void;
  initialCategory?: string;
}

export const FindPGView: React.FC<FindPGViewProps> = ({
  onViewPropertyDetails,
  onNavigateTab,
}) => {
  const { 
    filteredProperties, 
    selectedCollege, 
    filters, 
    updateFilters, 
    resetFilters 
  } = useProperties();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-3 py-1 rounded-full border border-[#1677FF]/20">
            {selectedCollege ? `Campus: ${selectedCollege.name}` : 'Student Accommodations'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102A56] mt-2 tracking-tight">
            Find PGs & Hostels Near Your College
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-[#102A56]">{filteredProperties.length} verified stays</strong> matching your criteria.
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-white border border-slate-200/80 rounded-full text-xs font-bold text-[#102A56] flex items-center gap-1.5 shadow-soft"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#1677FF]" />
            Filters
          </button>

          {/* Grid vs Map Toggle */}
          <div className="bg-slate-100/90 p-1 rounded-full flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'grid'
                  ? 'bg-white text-[#102A56] shadow-xs'
                  : 'text-slate-600 hover:text-[#102A56]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'map'
                  ? 'bg-white text-[#102A56] shadow-xs'
                  : 'text-slate-600 hover:text-[#102A56]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Map View</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-full px-3.5 py-1.5 shadow-soft">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#1677FF]" />
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="text-xs font-bold text-[#102A56] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="distance">Distance (Closest)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="recently_added">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <PropertyFilters />
        </div>

        {/* Results Container */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Query Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PG name, landmark, area, or street..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-24 focus:ring-2 focus:ring-[#1677FF] focus:outline-none shadow-soft text-[#102A56]"
            />
          </div>

          {/* VIEW MODE: MAP VIEW */}
          {viewMode === 'map' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 bg-[#EEF6FF] rounded-20 border border-[#1677FF]/20 text-xs text-[#102A56] flex items-center justify-between font-medium">
                <span>
                  Interactive campus map displaying {filteredProperties.length} accommodation markers.
                </span>
                <span className="font-bold text-[#1677FF]">Click markers for details</span>
              </div>
              <PropertyMap
                college={selectedCollege}
                properties={filteredProperties}
                onSelectProperty={onViewPropertyDetails}
                height="550px"
              />
            </div>
          )}

          {/* VIEW MODE: GRID VIEW */}
          {viewMode === 'grid' && (
            <div>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      college={selectedCollege}
                      onViewDetails={onViewPropertyDetails}
                    />
                  ))}
                </div>
              ) : (
                /* EMPTY STATE */
                <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-soft">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#102A56]">No properties found</h3>
                  <p className="text-sm text-slate-600">
                    Try increasing your budget or expanding the distance.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={resetFilters}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs shadow-md shadow-[#1677FF]/20 transition"
                    >
                      Change Filters
                    </button>
                    <button
                      onClick={() => onNavigateTab('colleges')}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#102A56] font-bold text-xs transition"
                    >
                      Search Another College
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 relative shadow-floating animate-in slide-in-from-bottom">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <PropertyFilters
              isMobileModal={true}
              onCloseMobileModal={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
