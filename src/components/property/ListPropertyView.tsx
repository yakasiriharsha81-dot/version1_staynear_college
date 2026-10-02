import React from 'react';
import { 
  Building2, 
  PlusCircle, 
  Users, 
  Camera, 
  IndianRupee, 
  FileCheck, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ListPropertyViewProps {
  onStartListing: () => void;
  onOpenAuthModal: () => void;
}

export const ListPropertyView: React.FC<ListPropertyViewProps> = ({
  onStartListing,
  onOpenAuthModal,
}) => {
  const { isAuthenticated, isOwner } = useAuth();

  const steps = [
    {
      step: 1,
      title: 'Create account',
      desc: 'Sign up as a Property Owner in seconds with your name, phone number, and email.',
      icon: Users,
    },
    {
      step: 2,
      title: 'Add property',
      desc: 'Enter basic details like property name, PG/hostel category, and select the target college.',
      icon: Building2,
    },
    {
      step: 3,
      title: 'Upload photos',
      desc: 'Add clean photos of rooms, washrooms, dining space, and study halls to build student trust.',
      icon: Camera,
    },
    {
      step: 4,
      title: 'Add pricing/facilities',
      desc: 'Configure monthly rent, security deposit, room sharing options, and included amenities.',
      icon: IndianRupee,
    },
    {
      step: 5,
      title: 'Publish',
      desc: 'Submit your listing to go live for thousands of college students searching in your city.',
      icon: FileCheck,
    },
    {
      step: 6,
      title: 'Receive enquiries',
      desc: 'Get student phone calls and direct WhatsApp messages without paying high middlemen commissions.',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-[#EEF6FF] px-4 py-1.5 rounded-full border border-[#1677FF]/20">
          Owner Partnership
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#102A56] tracking-tight">
          Have a PG or Hostel near a college?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          List your property and reach students looking for accommodation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (isAuthenticated && isOwner) {
                onStartListing();
              } else {
                onOpenAuthModal();
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#1677FF]/25 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Your Property</span>
          </button>
        </div>
      </div>

      {/* 6 Steps Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-[#102A56]">How It Works in 6 Simple Steps</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish your stay and start filling vacant beds in less than 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-24 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 space-y-3 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-20 bg-[#EEF6FF] text-[#1677FF] flex items-center justify-center font-bold text-lg border border-[#1677FF]/15 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#1677FF]">
                  Step {item.step}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#102A56]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Owner Benefits Banner */}
      <div className="bg-[#102A56] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-card">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold text-[#4CC9F0] uppercase tracking-wider">
            Zero Brokerage for Owners
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Fill your rooms before the new academic semester starts.
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Students search by their exact college name. When your PG or hostel is listed near their campus, students can reach you directly through phone and WhatsApp.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAuthenticated && isOwner) {
              onStartListing();
            } else {
              onOpenAuthModal();
            }
          }}
          className="px-8 py-3.5 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-extrabold text-sm shadow-md shadow-[#1677FF]/25 transition active:scale-95 whitespace-nowrap shrink-0"
        >
          Add Your Property Now
        </button>
      </div>
    </div>
  );
};
