import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  AlertTriangle, 
  Building2, 
  GraduationCap, 
  Users, 
  Search,
  Eye,
  BadgeCheck
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property, Report } from '../../types';

interface AdminDashboardViewProps {
  onViewPropertyDetails: (property: Property) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onViewPropertyDetails,
}) => {
  const { 
    properties, 
    colleges, 
    reports, 
    updateVerificationStatus, 
    toggleVerifiedBadge, 
    deleteProperty, 
    updateReportStatus 
  } = useProperties();

  const [activeTab, setActiveTab] = useState<'listings' | 'reports' | 'colleges'>('listings');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = properties.filter((p) => {
    if (filterStatus !== 'all' && p.verification_status !== filterStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102A56] via-[#16386E] to-[#1677FF] text-white p-6 sm:p-8 rounded-3xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4CC9F0] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Security & Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2 flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-[#4CC9F0]" />
            StayNear College Admin Portal
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            Review submitted properties, grant official verification badges, moderate reported listings, and monitor campus locations.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex gap-2.5 text-center">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-20 border border-white/15 min-w-[80px]">
            <div className="text-xl font-black text-white">{properties.length}</div>
            <div className="text-[10px] text-slate-200 font-bold uppercase">Listings</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-20 border border-white/15 min-w-[80px]">
            <div className="text-xl font-black text-amber-300">{reports.length}</div>
            <div className="text-[10px] text-slate-200 font-bold uppercase">Reports</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-20 border border-white/15 min-w-[80px]">
            <div className="text-xl font-black text-[#4CC9F0]">{colleges.length}</div>
            <div className="text-[10px] text-slate-200 font-bold uppercase">Colleges</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'listings'
              ? 'bg-[#102A56] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-[#EEF6FF] border border-slate-200/80'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Properties Moderation</span>
          <span className="text-[10px] bg-[#1677FF] text-white px-1.5 py-0.5 rounded-full">
            {properties.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'reports'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200/80'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Reported Listings</span>
          {reports.length > 0 && (
            <span className="text-[10px] bg-amber-400 text-[#102A56] px-1.5 py-0.5 rounded-full font-black">
              {reports.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('colleges')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'colleges'
              ? 'bg-[#102A56] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-[#EEF6FF] border border-slate-200/80'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Manage Colleges</span>
        </button>
      </div>

      {/* LISTINGS TAB */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500">Status:</span>
              {(['all', 'approved', 'pending', 'rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`text-xs px-3 py-1.5 rounded-lg capitalize font-bold transition ${
                    filterStatus === st
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search property or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Properties Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Rent</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/60">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]}
                          alt={prop.name}
                          className="w-12 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <span className="font-extrabold text-slate-900 block">{prop.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {prop.property_type} • {prop.gender_category}
                            {prop.is_demo && ' • Demo'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600">
                      {prop.area}, {prop.city}
                    </td>

                    <td className="p-4 font-bold text-slate-900">
                      ₹{prop.monthly_rent.toLocaleString('en-IN')}/mo
                    </td>

                    <td className="p-4">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          prop.verification_status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : prop.verification_status === 'rejected'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {prop.verification_status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleVerifiedBadge(prop.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                          prop.is_verified
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Click to toggle verified badge"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {prop.is_verified ? 'Verified ✓' : 'Mark Verified'}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onViewPropertyDetails(prop)}
                          className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {prop.verification_status !== 'approved' && (
                          <button
                            onClick={() => updateVerificationStatus(prop.id, 'approved')}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {prop.verification_status !== 'rejected' && (
                          <button
                            onClick={() => updateVerificationStatus(prop.id, 'rejected')}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteProperty(prop.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Student Incident Reports</h2>
          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white p-5 rounded-2xl border border-red-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-600 text-xs uppercase tracking-wide">
                        {rep.reason}
                      </span>
                      <span className="text-slate-300">•</span>
                      <strong className="text-slate-900 text-sm">{rep.property_name}</strong>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rep.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {rep.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                      "{rep.description}"
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Reported by {rep.user_name || 'Anonymous student'} •{' '}
                      {new Date(rep.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => updateReportStatus(rep.id, 'Resolved')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => updateReportStatus(rep.id, 'Dismissed')}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                        >
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Marked {rep.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">
                No active safety or accuracy reports. All listings are clean!
              </p>
            )}
          </div>
        </div>
      )}

      {/* COLLEGES TAB */}
      {activeTab === 'colleges' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Campus Locations Configured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-3"
              >
                <img
                  src={c.image_url}
                  alt={c.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{c.name}</h4>
                  <p className="text-xs text-slate-500">{c.city}, {c.area}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    GPS: {c.latitude.toFixed(3)}, {c.longitude.toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
