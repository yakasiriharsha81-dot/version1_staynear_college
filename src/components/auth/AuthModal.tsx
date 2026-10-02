import React, { useState } from 'react';
import { X, GraduationCap, Building2, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
}) => {
  const { login, signupStudent, signupOwner, switchRole } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('ABC Degree College, Nellore');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (mode === 'login') {
        await login(email, role);
        onClose();
      } else {
        if (role === 'student') {
          await signupStudent({ name, email, phone, college_name: collegeName });
        } else {
          await signupOwner({ name, email, phone });
        }
        onClose();
      }
    } catch {
      setErrorMsg('Authentication failed. Please verify your details.');
    }
  };

  const handleQuickDemoLogin = (demoRole: UserRole) => {
    switchRole(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-floating border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-2xl font-black text-[#102A56]">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500">
            StayNear College — student accommodation simplified
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/90 rounded-full mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 rounded-full flex items-center justify-center gap-1.5 transition ${
              role === 'student'
                ? 'bg-white text-[#1677FF] shadow-xs'
                : 'text-slate-600 hover:text-[#102A56]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('owner')}
            className={`py-2 rounded-full flex items-center justify-center gap-1.5 transition ${
              role === 'owner'
                ? 'bg-white text-[#1677FF] shadow-xs'
                : 'text-slate-600 hover:text-[#102A56]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Property Owner</span>
          </button>
        </div>

        {/* Mode Toggle (Login vs Signup) */}
        <div className="flex border-b border-slate-200 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`pb-2.5 flex-1 border-b-2 text-center transition ${
              mode === 'login'
                ? 'border-[#1677FF] text-[#1677FF]'
                : 'border-transparent text-slate-500 hover:text-[#102A56]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`pb-2.5 flex-1 border-b-2 text-center transition ${
              mode === 'signup'
                ? 'border-[#1677FF] text-[#1677FF]'
                : 'border-transparent text-slate-500 hover:text-[#102A56]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {role === 'student' ? 'Student Full Name *' : 'Owner / Manager Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pooja Reddy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. student@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98480 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          {mode === 'signup' && role === 'student' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your College</label>
              <input
                type="text"
                placeholder="e.g. ABC Degree College, Nellore"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1677FF] hover:bg-[#0f62d8] text-white rounded-full font-extrabold text-xs shadow-md shadow-[#1677FF]/25 transition active:scale-95 mt-2"
          >
            {mode === 'login' ? 'Login to StayNear College' : 'Create Free Account'}
          </button>
        </form>

        {/* Quick Demo Logins for Pair Programming Testing */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
            Quick 1-Click Demo Evaluation
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2 rounded-full bg-[#F8FBFF] hover:bg-[#EEF6FF] text-[#102A56] text-[11px] font-bold text-center border border-slate-200/80 transition"
            >
              🎓 Student
            </button>
            <button
              onClick={() => handleQuickDemoLogin('owner')}
              className="p-2 rounded-full bg-[#F8FBFF] hover:bg-[#EEF6FF] text-[#102A56] text-[11px] font-bold text-center border border-slate-200/80 transition"
            >
              🏢 Owner
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-full bg-[#F8FBFF] hover:bg-[#EEF6FF] text-[#102A56] text-[11px] font-bold text-center border border-slate-200/80 transition"
            >
              🛡️ Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
