import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Compass,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { College, PropertyType } from '../../types';
import { POPULAR_CITIES } from '../../data/mockData';
import { PropertyCard } from '../property/PropertyCard';

interface HeroSearchProps {
  onSearchSubmit: () => void;
  onNavigateTab: (tab: string) => void;
  onViewDetails: (property: any) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearchSubmit,
  onNavigateTab,
  onViewDetails,
}) => {
  const { 
    colleges, 
    selectedCollege, 
    setSelectedCollege, 
    filters, 
    updateFilters, 
    properties 
  } = useProperties();

  // Budget-first interactive question state
  const [budgetStep, setBudgetStep] = useState<number>(0);
  const [selectedQuickBudget, setSelectedQuickBudget] = useState<number | null>(null);

  const featuredProperties = properties.slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleBudgetQuickSelect = (budget: number) => {
    setSelectedQuickBudget(budget);
    updateFilters({ budgetRange: 'custom', minBudget: 0, maxBudget: budget });
    setBudgetStep(1);
  };

  const handleBudgetCollegeSelect = (college: College) => {
    setSelectedCollege(college);
    onSearchSubmit();
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-20 sm:pb-28 bg-gradient-to-b from-[#EEF6FF] via-[#F8FBFF] to-[#FFFFFF] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: HEADINGS & FEATURE ITEMS */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Small pill */}
              <div className="inline-flex items-center gap-2 bg-white/90 border border-[#1677FF]/20 shadow-soft px-4 py-1.5 rounded-full text-xs font-bold text-[#1677FF]">
                <Sparkles className="w-3.5 h-3.5 text-[#4CC9F0]" />
                <span>Your College • Your Stay • Our Priority</span>
              </div>

              {/* Large heading with "College" in blue */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#102A56] tracking-tight leading-[1.12]">
                Find Your Perfect Stay Near <span className="text-[#1677FF]">College</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Affordable PGs, hostels and rental rooms near your college — all in one place.
              </p>

              {/* Four small feature items */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  'Verified Listings',
                  'Close to College',
                  'Budget Friendly',
                  'Secure & Easy',
                ].map((feat) => (
                  <div 
                    key={feat}
                    className="flex items-center gap-2 p-2.5 rounded-18 bg-white/80 border border-slate-200/60 shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                    <span className="text-xs font-bold text-[#102A56]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: MODERN BLENDED STUDENT/COLLEGE VISUAL */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Soft background cyan/blue blur glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1677FF]/20 via-[#4CC9F0]/20 to-transparent rounded-full blur-2xl -z-10" />

                {/* Main Blended Student Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-floating border border-white/60 bg-gradient-to-b from-transparent to-white/40">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="College students with backpacks on campus"
                    className="w-full h-[360px] sm:h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient vignette to blend naturally */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A56]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating badge 1: Top Right */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#102A56]">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span>100% Verified Stays</span>
                  </div>

                  {/* Floating card 2: Bottom Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-24 shadow-card border border-white/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-20 bg-[#EEF6FF] flex items-center justify-center text-[#1677FF] font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-[#102A56]">
                          {selectedCollege ? selectedCollege.name : 'ABC Degree College'}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#1677FF]" />
                          <span>Within 500m - 1.5km walking radius</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right pl-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
                      <span className="text-sm font-black text-[#1677FF]">₹4,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEARCH CARD (Floating & Overlapping) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16 sm:-mt-20">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 sm:p-7 backdrop-blur-md">
          <form onSubmit={handleHeroSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. College */}
              <div className="p-3 bg-[#F8FBFF] hover:bg-[#EEF6FF]/60 rounded-20 border border-slate-200/80 transition-colors">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#1677FF]" />
                  College
                </label>
                <select
                  value={selectedCollege?.id || ''}
                  onChange={(e) => {
                    const col = colleges.find((c) => c.id === e.target.value);
                    setSelectedCollege(col || null);
                  }}
                  className="w-full text-xs sm:text-sm font-semibold text-[#102A56] bg-transparent focus:outline-none cursor-pointer truncate"
                >
                  <option value="">Any / All Colleges</option>
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Location */}
              <div className="p-3 bg-[#F8FBFF] hover:bg-[#EEF6FF]/60 rounded-20 border border-slate-200/80 transition-colors">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1677FF]" />
                  Location
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => updateFilters({ city: e.target.value })}
                  className="w-full text-xs sm:text-sm font-semibold text-[#102A56] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {POPULAR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Maximum Budget */}
              <div className="p-3 bg-[#F8FBFF] hover:bg-[#EEF6FF]/60 rounded-20 border border-slate-200/80 transition-colors">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-1 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-[#1677FF]" />
                  Maximum Budget
                </label>
                <select
                  value={filters.budgetRange}
                  onChange={(e) => updateFilters({ budgetRange: e.target.value })}
                  className="w-full text-xs sm:text-sm font-semibold text-[#102A56] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Budget</option>
                  <option value="under_3000">Under ₹3,000</option>
                  <option value="3000_5000">₹3,000 – ₹5,000</option>
                  <option value="5000_8000">₹5,000 – ₹8,000</option>
                  <option value="8000_12000">₹8,000 – ₹12,000</option>
                </select>
              </div>

              {/* 4. Accommodation Type */}
              <div className="p-3 bg-[#F8FBFF] hover:bg-[#EEF6FF]/60 rounded-20 border border-slate-200/80 transition-colors">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#102A56] mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1677FF]" />
                  Accommodation Type
                </label>
                <select
                  value={filters.accommodationTypes[0] || ''}
                  onChange={(e) => {
                    const val = e.target.value as PropertyType;
                    updateFilters({ accommodationTypes: val ? [val] : [] });
                  }}
                  className="w-full text-xs sm:text-sm font-semibold text-[#102A56] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="">All Types (PG, Hostel, Rooms)</option>
                  <option value="PG">PG (Paying Guest)</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Room">Rental Room</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto font-medium">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                <span>100% verified student-friendly listings near major campuses</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigateTab('list-property')}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#102A56] font-bold text-xs sm:text-sm transition active:scale-95 whitespace-nowrap"
                >
                  List Your Property
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-7 py-3 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#1677FF]/25 transition active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Search Stays →</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* BUDGET-FIRST SEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#102A56] via-[#1677FF] to-[#4CC9F0] text-white p-7 sm:p-12 relative overflow-hidden shadow-card">
          {/* Subtle Background Pattern Elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-[#4CC9F0]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Controls */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-bold text-[#4CC9F0] border border-white/20">
                <Calculator className="w-3.5 h-3.5" />
                <span>Smart Budget Planner</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Budget-First Search
              </h2>

              <p className="text-slate-200 text-sm sm:text-base font-medium">
                “What is your monthly budget?”
              </p>

              {budgetStep === 0 ? (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-2.5">
                    {[3000, 5000, 7500, 10000, 15000].map((b) => (
                      <button
                        key={b}
                        onClick={() => handleBudgetQuickSelect(b)}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#102A56] font-bold text-xs sm:text-sm transition-all border border-white/20 shadow-xs hover:scale-105 active:scale-95"
                      >
                        {b === 15000 ? '₹15,000+' : `₹${b.toLocaleString('en-IN')}`}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Select a budget to instantly filter student rooms with or without food.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-2 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-[#22C55E]/30 text-white border border-[#22C55E]/40 px-3 py-1 rounded-full font-bold">
                      Budget: Up to ₹{selectedQuickBudget?.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => setBudgetStep(0)}
                      className="text-xs text-white/80 hover:text-white underline"
                    >
                      Change budget
                    </button>
                  </div>

                  <p className="text-sm font-bold text-white pt-1">
                    Which college are you studying at?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {colleges.slice(0, 3).map((col) => (
                      <button
                        key={col.id}
                        onClick={() => handleBudgetCollegeSelect(col)}
                        className="p-3 bg-white/10 hover:bg-white text-white hover:text-[#102A56] rounded-20 text-left text-xs font-semibold transition border border-white/20 shadow-xs group"
                      >
                        <div className="font-extrabold line-clamp-1">{col.name}</div>
                        <div className="text-[11px] text-slate-300 group-hover:text-slate-600">
                          {col.city}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Modern Calculator / Budget Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-soft w-full max-w-xs space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                  <Calculator className="w-8 h-8 text-[#4CC9F0]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">Zero Brokerage</div>
                  <p className="text-xs text-slate-200 mt-1">
                    Direct transparent prices from verified property owners.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-white/80 flex items-center justify-around font-bold">
                  <span>✓ Wi-Fi</span>
                  <span>✓ Homely Food</span>
                  <span>✓ Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY STUDENTS CHOOSE STAYNEAR COLLEGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-3 py-1 rounded-full border border-[#1677FF]/20">
            Student Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">
            Why Students Choose StayNear College
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Simplifying your accommodation search near universities and academic campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Near Your College',
              desc: 'Filter properties strictly within walking distance (500m to 2km) to minimize travel time.',
              icon: MapPin,
            },
            {
              title: 'Budget Friendly',
              desc: 'From ₹2,800 to ₹10,000+. Compare sharing options and meal plans to fit your wallet.',
              icon: IndianRupee,
            },
            {
              title: 'Verified Listings',
              desc: 'Confirmed photos, accurate distances, and honest reviews from student residents.',
              icon: ShieldCheck,
            },
            {
              title: 'Easy Search',
              desc: 'Search by campus, review amenities, and chat directly with owners with zero brokerage.',
              icon: Search,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-24 bg-white border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-20 bg-[#EEF6FF] text-[#1677FF] flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-[#102A56] text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* POPULAR COLLEGE AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#1677FF] uppercase tracking-wider">
                Explore by Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] mt-1">Popular College Areas</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Find accommodations near the largest student campuses.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('colleges')}
              className="text-xs font-bold text-[#1677FF] hover:text-[#0f62d8] flex items-center gap-1 self-start sm:self-auto"
            >
              View All Colleges <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  updateFilters({ city });
                  onSearchSubmit();
                }}
                className="p-4 rounded-20 bg-[#F8FBFF] hover:bg-[#EEF6FF] border border-slate-200/60 text-left transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="text-sm font-extrabold text-[#102A56] group-hover:text-[#1677FF] transition-colors">
                  {city}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Explore stays →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEMO PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#1677FF] uppercase tracking-wider">
              {selectedCollege ? `Near ${selectedCollege.name}` : 'Recommended Accommodations'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Featured Stays Near Campus
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('find-pg')}
            className="text-xs font-bold text-[#1677FF] hover:text-[#0f62d8] flex items-center gap-1 self-start sm:self-auto"
          >
            Explore all {properties.length} stays <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              college={selectedCollege}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
