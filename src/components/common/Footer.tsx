import React from 'react';
import { Building2, Heart, ShieldCheck, PhoneCall, Mail, MapPin, Instagram } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAuthModal: (role?: 'student' | 'owner') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAuthModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                StayNear<span className="text-brand-400">College</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Find affordable accommodation near your college. We connect students directly with verified PGs, hostels, and rental rooms within walking distance of academic campuses.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Student Listings
              </span>
            </div>
          </div>

          {/* Students Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Students
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('find-pg'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Find PG
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('hostels'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Find Hostel
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('compare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Compare
                </button>
              </li>
            </ul>
          </div>

          {/* Owners Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Owners
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('list-property'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuthModal('owner')}
                  className="hover:text-white transition-colors"
                >
                  Owner Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('owner-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Owner Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Terms
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.instagram.com/harsha_09_vardhan?stkn=YmNmNXN6b3llMDBw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@harsha_09_vardhan</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 StayNear College. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Find a place to stay, close to where you study.
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a
              href="https://www.instagram.com/harsha_09_vardhan?stkn=YmNmNXN6b3llMDBw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 text-pink-300 hover:text-white border border-pink-500/30 transition-all font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram: @harsha_09_vardhan</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
