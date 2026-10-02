import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Property, Report } from '../../types';
import { useProperties } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';

interface ReportModalProps {
  property: Property | null;
  onClose: () => void;
}

const REPORT_REASONS: Report['reason'][] = [
  'Incorrect information',
  'Fake listing',
  'Wrong price',
  'Property unavailable',
  'Inappropriate content',
  'Safety concern',
  'Other',
];

export const ReportModal: React.FC<ReportModalProps> = ({ property, onClose }) => {
  const { submitReport } = useProperties();
  const { user } = useAuth();

  const [reason, setReason] = useState<Report['reason']>('Incorrect information');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      property_id: property.id,
      property_name: property.name,
      user_id: user?.id,
      user_name: user?.name,
      reason,
      description,
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-floating border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Report Submitted</h3>
            <p className="text-xs text-slate-500">
              Our safety and moderation team will review this property report promptly. Thank you for keeping StayNear College trustworthy.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#102A56]">Report Property</h3>
                <p className="text-xs text-slate-500 truncate max-w-[260px]">
                  {property.name}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A56] mb-1.5">
                Reason for reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as Report['reason'])}
                className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 font-medium focus:ring-2 focus:ring-[#1677FF]"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A56] mb-1.5">
                Additional Details
              </label>
              <textarea
                rows={3}
                required
                placeholder="Please describe what is incorrect or concerning about this listing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF]"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
              >
                Send Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
