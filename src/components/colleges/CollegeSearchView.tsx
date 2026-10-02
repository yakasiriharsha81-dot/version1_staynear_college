import React, { useState } from 'react';
import { Search, MapPin, Building2, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { College } from '../../types';
import { useProperties } from '../../context/PropertyContext';
import { POPULAR_CITIES } from '../../data/mockData';

interface CollegeSearchViewProps {
  onSelectCollegeAndSearch: (college: College) => void;
}

export const CollegeSearchView: React.FC<CollegeSearchViewProps> = ({
  onSelectCollegeAndSearch,
}) => {
  const { colleges, properties, selectedCollege } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Calculate live count of approved properties per college
  const getPropertyCountForCollege = (college: College) => {
    return properties.filter((p) => {
      return p.city.toLowerCase() === college.city.toLowerCase() && p.verification_status === 'approved';
    }).length;
  };

  const filteredColleges = colleges.filter((college) => {
    if (selectedCity && college.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      college.name.toLowerCase().includes(term) ||
      college.city.toLowerCase().includes(term) ||
      college.area.toLowerCase().includes(term) ||
      college.pin_code.includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-3.5 py-1 rounded-full border border-[#1677FF]/20">
          Campus Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#102A56] tracking-tight">
          Find Your College Campus
        </h1>
        <p className="text-sm text-slate-600">
          Select your college to instantly see all verified PGs, hostels, and student rooms sorted by walking distance.
        </p>
      </div>

      {/* Search Bar & City Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-soft max-w-3xl mx-auto space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by college name, city, area or PIN code (e.g. ABC Degree, Nellore, 524003)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 bg-[#F8FBFF] border border-slate-200/80 rounded-20 focus:ring-2 focus:ring-[#1677FF] focus:outline-none text-[#102A56]"
          />
        </div>

        {/* Popular City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold px-2 shrink-0">Popular Areas:</span>
          <button
            onClick={() => setSelectedCity('')}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              selectedCity === ''
                ? 'bg-[#102A56] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Cities
          </button>
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                selectedCity === city
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => {
          const count = getPropertyCountForCollege(college);
          const isCurrentSelected = selectedCollege?.id === college.id;

          return (
            <div
              key={college.id}
              className={`group bg-white rounded-24 border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-card hover:-translate-y-1 ${
                isCurrentSelected
                  ? 'border-[#1677FF] ring-2 ring-[#1677FF]/20'
                  : 'border-slate-200/80 hover:border-[#1677FF]/40'
              }`}
            >
              <div className="p-3 pb-0">
                <div className="relative aspect-[16/9] rounded-20 overflow-hidden bg-slate-100">
                  <img
                    src={college.image_url}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#102A56] shadow-xs flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1677FF]" />
                    <span>{count} Nearby Stays</span>
                  </div>
                  {isCurrentSelected && (
                    <div className="absolute top-2.5 left-2.5 bg-[#1677FF] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selected
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#102A56] group-hover:text-[#1677FF] transition-colors line-clamp-1">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
                    <span>{college.area}, {college.city} • PIN: {college.pin_code}</span>
                  </div>
                  {college.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {college.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onSelectCollegeAndSearch(college)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1677FF]/20 transition flex items-center justify-center gap-2 group-hover:gap-3 active:scale-95"
                >
                  <span>View Nearby Stays</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredColleges.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 max-w-md mx-auto space-y-3 shadow-soft">
          <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-[#102A56]">No college found matching query</h3>
          <p className="text-xs text-slate-500">
            Try searching with a different city or check spelling of your college name.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCity(''); }}
            className="text-xs font-bold text-[#1677FF] hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
