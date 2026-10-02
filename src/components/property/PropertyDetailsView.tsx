import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Phone, 
  MessageSquare, 
  Heart, 
  Scale, 
  AlertTriangle, 
  Utensils, 
  FileText, 
  Send, 
  Navigation,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Property, College } from '../../types';
import { useProperties } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { formatDistance } from '../../utils/distance';
import { PropertyMap } from '../common/PropertyMap';

interface PropertyDetailsViewProps {
  property: Property;
  college?: College | null;
  onBack: () => void;
  onOpenReportModal: (property: Property) => void;
}

export const PropertyDetailsView: React.FC<PropertyDetailsViewProps> = ({
  property,
  college,
  onBack,
  onOpenReportModal,
}) => {
  const { toggleFavorite, isFavorite, addToCompare, removeFromCompare, isInCompare, reviews, submitReview, submitEnquiry } = useProperties();
  const { user } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: `Hi, I am interested in ${property.name} near ${college?.name || 'college'}. Please share room availability and visiting timings.`,
  });

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const favorited = isFavorite(property.id);
  const inCompare = isInCompare(property.id);
  const distanceText = formatDistance(property.distance_km);

  const propertyReviews = reviews.filter((r) => r.property_id === property.id);

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      property_id: property.id,
      property_name: property.name,
      student_id: user?.id,
      student_name: enquiryForm.name,
      student_email: enquiryForm.email,
      student_phone: enquiryForm.phone,
      message: enquiryForm.message,
    });
    setEnquirySuccess(true);
    setTimeout(() => setEnquirySuccess(false), 6000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    submitReview(property.id, reviewRating, reviewComment, user?.name || 'Verified Student');
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#102A56] hover:text-[#1677FF] transition bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-soft"
        >
          <ArrowLeft className="w-4 h-4 text-[#1677FF]" />
          Back to Listings
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => (inCompare ? removeFromCompare(property.id) : addToCompare(property))}
            className={`p-2 sm:px-4 sm:py-2 rounded-full border font-bold text-xs flex items-center gap-1.5 transition ${
              inCompare
                ? 'bg-[#1677FF] text-white border-[#1677FF]'
                : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{inCompare ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 sm:px-4 sm:py-2 rounded-full border font-bold text-xs flex items-center gap-1.5 transition ${
              favorited
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current text-rose-500' : ''}`} />
            <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => onOpenReportModal(property)}
            title="Report this listing"
            className="p-2 sm:p-2.5 rounded-full border border-slate-200/80 bg-white text-slate-400 hover:text-rose-600 hover:border-rose-200 transition"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photos, Details, Rules, Map, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-card">
              <img
                src={property.images[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover"
              />

              {property.is_demo && (
                <div className="absolute top-4 left-4 bg-amber-400 text-[#102A56] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
                  Demo Listing
                </div>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-[#102A56]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[4/3] rounded-20 overflow-hidden border-2 shrink-0 transition ${
                      activeImageIndex === idx
                        ? 'border-[#1677FF] ring-2 ring-[#1677FF]/25'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Key Highlights Header */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#EEF6FF] text-[#1677FF] text-xs font-extrabold px-3 py-1 rounded-full border border-[#1677FF]/20">
                {property.property_type}
              </span>
              <span className="bg-slate-100 text-[#102A56] text-xs font-bold px-3 py-1 rounded-full">
                {property.gender_category}
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/80">
                {property.availability}
              </span>
              {property.is_verified && (
                <span className="inline-flex items-center gap-1 bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Property
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#102A56] mb-2 tracking-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-[#1677FF] shrink-0" />
                <span>{property.address}, {property.area}, {property.city} - {property.pin_code}</span>
              </div>
            </div>

            {/* Distance highlight card */}
            <div className="p-4 rounded-24 bg-gradient-to-r from-[#EEF6FF] to-[#E0F7FE] border border-[#1677FF]/20 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1677FF] block">
                  Campus Walking Distance
                </span>
                <span className="text-base sm:text-lg font-black text-[#102A56]">
                  {distanceText}
                </span>
                {college && (
                  <span className="text-xs text-slate-600 block mt-0.5">
                    from {college.name}
                  </span>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1677FF] text-white flex items-center justify-center shadow-md shadow-[#1677FF]/20">
                <Navigation className="w-5 h-5" />
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h3 className="font-bold text-[#102A56] text-base mb-2">About this Accommodation</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Room Types & Pricing */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="font-extrabold text-[#102A56] text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1677FF]" />
              Room Types & Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {property.rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-20 border border-slate-200/80 bg-[#F8FBFF] hover:bg-[#EEF6FF]/60 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#102A56] text-xs sm:text-sm">{room.room_type}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      {room.available_beds > 0 ? `${room.available_beds} beds left` : 'Filled'}
                    </span>
                  </div>
                  <div className="text-xl font-black text-[#1677FF]">
                    ₹{room.price.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-500"> / mo</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {room.sharing === 1 ? 'Private single room' : `${room.sharing} persons sharing`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="font-extrabold text-[#102A56] text-lg">Facilities & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.facilities.map((fac) => (
                <div
                  key={fac}
                  className="flex items-center gap-2.5 p-3 rounded-18 bg-[#F8FBFF] border border-slate-200/60 text-xs sm:text-sm font-semibold text-[#102A56]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span className="truncate">{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Food Details */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
            <h3 className="font-extrabold text-[#102A56] text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              Food & Meal Information
            </h3>
            {property.food_included ? (
              <div className="p-4 rounded-20 bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <span className="font-bold text-amber-900 block">Homely Food Included in Rent</span>
                <p className="text-slate-700 leading-relaxed">
                  {property.food_description || 'Regular morning breakfast, lunch, and dinner provided.'}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-20 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
                Food not included in the monthly rent. {property.food_description || 'Students can self-cook or subscribe to nearby student mess/tiffin centers.'}
              </div>
            )}
          </div>

          {/* Property Rules */}
          {property.rules && property.rules.length > 0 && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
              <h3 className="font-extrabold text-[#102A56] text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1677FF]" />
                Accommodation Rules & Guidelines
              </h3>
              <ul className="space-y-2">
                {property.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] mt-2 shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Map Section */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#102A56] text-lg">Location on Map</h3>
              <span className="text-xs font-semibold text-slate-500">
                {property.area}, {property.city}
              </span>
            </div>
            {property.latitude && property.longitude ? (
              <PropertyMap
                college={college}
                properties={[property]}
                selectedProperty={property}
                height="320px"
              />
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-20 border border-dashed border-slate-200 text-slate-500 text-xs">
                Map coordinates not yet provided for this listing.
              </div>
            )}
          </div>

          {/* Reviews & Student Ratings Section */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-[#102A56] text-lg">Student Reviews & Ratings</h3>
                <p className="text-xs text-slate-500">
                  Reviews from genuine college students who stayed here
                </p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-base font-black text-[#102A56]">
                  {property.rating.toFixed(1)}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  ({property.reviews_count})
                </span>
              </div>
            </div>

            {/* Submit a Review Form */}
            <form onSubmit={handleAddReview} className="bg-[#F8FBFF] p-4 sm:p-5 rounded-24 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102A56]">Rate this Accommodation:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-slate-300 hover:text-amber-500 transition"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= reviewRating ? 'text-amber-500 fill-current' : ''
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Share your experience regarding food, Wi-Fi speed, warden, cleanliness..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF] focus:outline-none"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs rounded-full shadow-xs transition"
                >
                  Submit Review
                </button>
              </div>

              {reviewSubmitted && (
                <div className="text-xs text-[#22C55E] font-semibold bg-[#DCFCE7] p-2 rounded-18">
                  ✓ Thank you! Your review has been added.
                </div>
              )}
            </form>

            {/* Reviews List */}
            <div className="space-y-3">
              {propertyReviews.length > 0 ? (
                propertyReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-20 bg-white border border-slate-100 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#EEF6FF] text-[#1677FF] font-bold text-xs flex items-center justify-center">
                          {rev.user_name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-[#102A56]">{rev.user_name}</span>
                        {rev.verified_student && (
                          <span className="text-[10px] bg-[#DCFCE7] text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            Verified Resident
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {rev.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">
                  No student reviews submitted yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: Contact Owner & Send Enquiry */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Rent & Deposit Summary Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Starting Rent
                </span>
                <div className="text-3xl font-black text-[#102A56] mt-1">
                  ₹{property.monthly_rent.toLocaleString('en-IN')}
                  <span className="text-sm font-semibold text-slate-500"> / mo</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-bold text-[#102A56]">
                    ₹{property.deposit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Direct Contact Buttons (Call & WhatsApp) */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${property.owner_phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1677FF]/25 transition active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  Call Owner
                </a>

                <a
                  href={`https://wa.me/${property.owner_whatsapp}?text=${encodeURIComponent(
                    `Hi ${property.owner_name}, I saw your listing "${property.name}" on StayNear College and would like to enquire about room availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#22C55E]/25 transition active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Contact: <strong className="text-[#102A56]">{property.owner_name}</strong>
              </div>
            </div>

            {/* Send Instant Enquiry Form */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Send className="w-4 h-4 text-[#1677FF]" />
                <h4 className="font-extrabold text-[#102A56] text-sm">Send Instant Enquiry</h4>
              </div>

              {enquirySuccess ? (
                <div className="p-4 rounded-24 bg-[#DCFCE7] border border-[#22C55E]/30 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E] mx-auto" />
                  <div className="text-xs font-bold text-emerald-950">Enquiry Sent!</div>
                  <p className="text-[11px] text-emerald-800">
                    The owner will call or message you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendEnquiry} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#102A56] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      placeholder="e.g. Pooja Reddy"
                      className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#102A56] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98480 00000"
                      className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#102A56] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      placeholder="student@gmail.com"
                      className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#102A56] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#F8FBFF] border border-slate-200 rounded-18 focus:ring-2 focus:ring-[#1677FF] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#102A56] hover:bg-[#0B1C3B] text-white font-bold text-xs shadow-md transition active:scale-95"
                  >
                    Send Message to Owner
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
