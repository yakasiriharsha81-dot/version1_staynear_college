import React from 'react';
import { Building2, ShieldCheck, Heart, Users, MapPin, CheckCircle2, Phone, Mail, Instagram, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-4 py-1.5 rounded-full border border-[#1677FF]/20 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#4CC9F0]" />
          Our Student Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight">
          About StayNear <span className="text-[#1677FF]">College</span>
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium">
          “Find a place to stay, close to where you study.”
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-24 border border-slate-200/80 shadow-soft p-6 sm:p-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#102A56]">Why We Started</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Every year, millions of undergraduate and postgraduate students move to new cities for higher education. Finding safe, affordable, and comfortable accommodation near college should not involve wandering unfamiliar streets, dealing with unscrupulous brokers, or paying exorbitant brokerage fees.
        </p>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          <strong className="text-[#102A56]">StayNear College</strong> connects students directly with verified PGs, hostels, and rental rooms situated within walking distance of educational institutions across South India including Nellore, Tirupati, Hyderabad, Chennai, Bengaluru, and Vijayawada.
        </p>
      </div>

      {/* Core Integrity Principles */}
      <div className="bg-[#102A56] text-white rounded-24 p-6 sm:p-10 space-y-6 shadow-card relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#1677FF]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-20 bg-white/10 flex items-center justify-center text-[#22C55E]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold">Our Verification & Integrity Principles</h2>
            <p className="text-xs text-slate-300">Built on 100% verified listings and zero-fabrication transparency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm relative z-10">
          {[
            'Accurate GPS Distances: Real great-circle distance calculated relative to campus coordinates. When coordinates are unavailable, we display “Distance unavailable.”',
            'Zero Fake Reviews: Verified student residents and genuine peer feedback.',
            'Transparent Rent: Monthly rent and security deposits confirmed directly with property owners.',
            'Direct Connection: Students communicate directly with owners via Call or WhatsApp with zero middleman markup.',
          ].map((principle, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-20 bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
              <span className="leading-snug text-slate-200">{principle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Support Section */}
      <div className="bg-white rounded-24 border border-slate-200/80 shadow-soft p-6 sm:p-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#102A56]">Contact & Student Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#F8FBFF] rounded-20 border border-slate-200/80 space-y-1">
            <span className="font-bold text-[#102A56] block flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#1677FF]" />
              Email Support
            </span>
            <span className="text-slate-500">support@staynearcollege.in</span>
          </div>

          <div className="p-4 bg-[#F8FBFF] rounded-20 border border-slate-200/80 space-y-1">
            <span className="font-bold text-[#102A56] block flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#22C55E]" />
              Student Helpline
            </span>
            <span className="text-slate-500">+91 94401 23456 (10 AM - 7 PM)</span>
          </div>

          <div className="p-4 bg-[#F8FBFF] rounded-20 border border-slate-200/80 space-y-1">
            <span className="font-bold text-[#102A56] block flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-pink-600" />
              Instagram ID
            </span>
            <a
              href="https://www.instagram.com/harsha_09_vardhan?stkn=YmNmNXN6b3llMDBw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 font-extrabold hover:underline block truncate"
            >
              @harsha_09_vardhan
            </a>
          </div>

          <div className="p-4 bg-[#F8FBFF] rounded-20 border border-slate-200/80 space-y-1">
            <span className="font-bold text-[#102A56] block flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#4CC9F0]" />
              Campus Operations
            </span>
            <span className="text-slate-500">AP, Telangana, Karnataka, TN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
