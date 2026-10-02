import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  Scale, 
  PlusCircle, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  LogOut, 
  GraduationCap,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertyContext';
import { UserRole } from '../../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuthModal: (role?: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuthModal,
}) => {
  const { user, isAuthenticated, logout, switchRole, isOwner, isAdmin } = useAuth();
  const { favorites, compareList, selectedCollege } = useProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'find-pg', label: 'Find PG' },
    { id: 'hostels', label: 'Hostels' },
    { id: 'colleges', label: 'Colleges' },
    { id: 'list-property', label: 'List Your Property' },
    { id: 'favorites', label: 'Favorites', badge: favorites.length },
    { id: 'compare', label: 'Compare', badge: compareList.length },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Micro-Bar: Campus Pill & Role Switcher */}
      <div className="bg-[#102A56] text-white text-[11px] py-1 px-4 sm:px-8 border-b border-navy-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#4CC9F0]">
              <Sparkles className="w-2.5 h-2.5" />
              CAMPUS ASSIST
            </span>
            <span className="hidden sm:inline text-slate-300">Studying at:</span>
            <button
              onClick={() => handleNavClick('colleges')}
              className="font-semibold text-white hover:text-[#4CC9F0] transition-colors flex items-center gap-1 truncate underline decoration-white/30 underline-offset-2"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#4CC9F0]" />
              {selectedCollege ? `${selectedCollege.name} (${selectedCollege.city})` : 'Select your college'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-slate-200 transition"
              >
                <span className="text-slate-400">Role:</span>
                <span className="uppercase font-bold text-[#4CC9F0]">{user?.role || 'Guest'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-20 shadow-floating border border-slate-100 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1 font-bold text-[10px] uppercase text-slate-400">Switch Demo Role</div>
                  <button
                    onClick={() => { switchRole('student'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF6FF] flex items-center gap-2 ${user?.role === 'student' ? 'text-[#1677FF] font-bold bg-[#EEF6FF]/60' : ''}`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#1677FF]" /> Student View
                  </button>
                  <button
                    onClick={() => { switchRole('owner'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF6FF] flex items-center gap-2 ${user?.role === 'owner' ? 'text-[#1677FF] font-bold bg-[#EEF6FF]/60' : ''}`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#1677FF]" /> Property Owner
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF6FF] flex items-center gap-2 ${user?.role === 'admin' ? 'text-[#1677FF] font-bold bg-[#EEF6FF]/60' : ''}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF]" /> Admin Portal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating White Rounded Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-2">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-soft rounded-24 sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1677FF] to-[#4CC9F0] flex items-center justify-center text-white shadow-md shadow-[#1677FF]/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#102A56] group-hover:text-[#1677FF] transition-colors">
                StayNear<span className="text-[#1677FF]">College</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#1677FF]'
                      : 'text-slate-600 hover:text-[#1677FF]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="bg-[#1677FF] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center leading-tight">
                      {link.badge}
                    </span>
                  )}

                  {/* Active small blue underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1677FF] rounded-full animate-in fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Owner Dashboard Rounded Button */}
            <button
              onClick={() => handleNavClick(isOwner ? 'owner-dashboard' : 'list-property')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shadow-xs ${
                activeTab === 'owner-dashboard'
                  ? 'bg-[#1677FF] text-white border-[#1677FF]'
                  : 'bg-[#EEF6FF] text-[#1677FF] border-[#1677FF]/20 hover:bg-[#1677FF] hover:text-white'
              }`}
            >
              Owner Dashboard
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-[#102A56] text-white border-[#102A56]'
                    : 'bg-slate-100 text-[#102A56] border-slate-200 hover:bg-slate-200'
                }`}
              >
                Admin
              </button>
            )}

            {/* Compact User Profile */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-1.5">
                <div 
                  onClick={() => handleNavClick(isOwner ? 'owner-dashboard' : 'favorites')}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full pl-1 pr-3 py-1 cursor-pointer transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1677FF] text-white flex items-center justify-center font-bold text-[10px]">
                    {user?.name.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#102A56] max-w-[90px] truncate">
                    {user?.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-full transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('student')}
                className="px-4 py-2 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs shadow-md shadow-[#1677FF]/25 transition active:scale-95"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#102A56]" /> : <Menu className="w-5 h-5 text-[#102A56]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-7xl mx-auto px-3 sm:px-6 pt-1">
          <div className="bg-white rounded-24 shadow-floating border border-slate-200/80 p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between p-2.5 rounded-18 text-xs font-bold transition ${
                    activeTab === link.id
                      ? 'bg-[#EEF6FF] text-[#1677FF]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="bg-[#1677FF] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('owner-dashboard')}
                className="w-full py-2.5 rounded-full bg-[#EEF6FF] text-[#1677FF] font-bold text-xs text-center border border-[#1677FF]/20"
              >
                Owner Dashboard
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="w-full py-2.5 rounded-full bg-slate-100 text-[#102A56] font-bold text-xs text-center"
                >
                  Admin Dashboard
                </button>
              )}

              {isAuthenticated ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1677FF] text-white font-bold text-xs flex items-center justify-center">
                      {user?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#102A56]">{user?.name}</div>
                      <div className="text-[10px] text-slate-500 capitalize">{user?.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs text-rose-600 font-bold px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('student');
                  }}
                  className="w-full py-3 bg-[#1677FF] text-white rounded-full font-bold text-xs shadow-md shadow-[#1677FF]/20"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
