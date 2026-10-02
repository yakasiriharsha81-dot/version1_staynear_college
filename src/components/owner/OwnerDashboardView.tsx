import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Inbox, 
  User, 
  Settings, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  IndianRupee, 
  MapPin, 
  ShieldCheck, 
  Camera, 
  Sparkles,
  Phone,
  Mail,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertyContext';
import { Property, PropertyType, GenderCategory, SharingType, RoomOption } from '../../types';
import { POPULAR_CITIES } from '../../data/mockData';

interface OwnerDashboardViewProps {
  onViewPropertyDetails: (property: Property) => void;
}

export const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({
  onViewPropertyDetails,
}) => {
  const { user } = useAuth();
  const { 
    properties, 
    addProperty, 
    deleteProperty, 
    toggleAvailability, 
    enquiries, 
    updateEnquiryStatus,
    colleges
  } = useProperties();

  const [activeTab, setActiveTab] = useState<'properties' | 'add' | 'enquiries' | 'profile' | 'settings'>('properties');

  // Multi-step Wizard state (Steps 1 to 9)
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form Fields
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    property_type: 'PG' as PropertyType,
    gender_category: 'Girls' as GenderCategory,
    description: '',
  });

  const [locationInfo, setLocationInfo] = useState({
    address: '',
    city: 'Nellore',
    area: '',
    pin_code: '524003',
    latitude: 14.4450,
    longitude: 79.9840,
    nearCollegeId: 'col-1',
  });

  const [pricingInfo, setPricingInfo] = useState({
    monthly_rent: 5500,
    deposit: 5000,
    food_included: true,
    food_description: '3 daily hot meals (breakfast, lunch, dinner) + morning & evening tea.',
  });

  const [roomsList, setRoomsList] = useState<RoomOption[]>([
    { id: '1', room_type: 'Double Sharing', sharing: 2, price: 5500, available_beds: 2 },
  ]);

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'Wi-Fi',
    'Food',
    'CCTV',
    'Security',
    'Power Backup',
    'Attached Bathroom',
  ]);

  const [photosList, setPhotosList] = useState<string[]>([
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const [rulesList, setRulesList] = useState<string[]>([
    'Gate closing time is 9:30 PM',
    'Quiet study hours after 10:00 PM',
    'No unauthorized overnight guests',
  ]);
  const [newRule, setNewRule] = useState('');

  const [contactInfo, setContactInfo] = useState({
    owner_name: user?.name || 'M. Padmavathi',
    owner_phone: user?.phone || '+91 98480 12345',
    owner_whatsapp: '919848012345',
  });

  // Owner properties list (show properties created or owned)
  const ownerProperties = properties.filter(
    (p) => p.owner_id === user?.id || p.owner_id === 'user-owner-1'
  );

  const handleAddRoom = () => {
    setRoomsList([
      ...roomsList,
      {
        id: String(Date.now()),
        room_type: 'Triple Sharing',
        sharing: 3,
        price: 4500,
        available_beds: 3,
      },
    ]);
  };

  const handleRemoveRoom = (index: number) => {
    setRoomsList(roomsList.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotosList([...photosList, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRulesList([...rulesList, newRule.trim()]);
      setNewRule('');
    }
  };

  const handlePublishProperty = () => {
    addProperty({
      owner_id: user?.id || 'user-owner-1',
      name: basicInfo.name || 'New College Residency',
      property_type: basicInfo.property_type,
      gender_category: basicInfo.gender_category,
      description: basicInfo.description || 'Comfortable and affordable student accommodation near college campus.',
      address: locationInfo.address || 'College Road',
      city: locationInfo.city,
      area: locationInfo.area || 'Campus Area',
      pin_code: locationInfo.pin_code,
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
      monthly_rent: Number(pricingInfo.monthly_rent),
      deposit: Number(pricingInfo.deposit),
      availability: 'Available',
      verification_status: 'approved',
      is_verified: false,
      is_demo: false,
      food_included: pricingInfo.food_included,
      food_description: pricingInfo.food_description,
      rules: rulesList,
      owner_name: contactInfo.owner_name,
      owner_phone: contactInfo.owner_phone,
      owner_whatsapp: contactInfo.owner_whatsapp,
      rooms: roomsList,
      facilities: selectedFacilities,
      images: photosList.length > 0 ? photosList : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'],
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setCurrentStep(1);
      setActiveTab('properties');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102A56] via-[#16386E] to-[#1677FF] text-white p-6 sm:p-8 rounded-3xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4CC9F0] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Property Owner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Welcome, {user?.name || 'Owner'}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            Manage your student listings, review student enquiries, and update bed availability in real-time.
          </p>
        </div>
        <button
          onClick={() => {
            setActiveTab('add');
            setCurrentStep(1);
          }}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#102A56] font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 self-start md:self-auto hover:scale-105 active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-[#1677FF]" />
          Add New Property
        </button>
      </div>

      {/* Owner Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        {[
          { id: 'properties', label: 'My Properties', icon: Building2, count: ownerProperties.length },
          { id: 'add', label: 'Add Property Form', icon: PlusCircle },
          { id: 'enquiries', label: 'Student Enquiries', icon: Inbox, count: enquiries.length },
          { id: 'profile', label: 'Owner Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#102A56] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-[#EEF6FF] border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MY PROPERTIES */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Your Listed Accommodations</h2>
            <span className="text-xs text-slate-500">
              {ownerProperties.length} active listings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10]">
                  <img
                    src={prop.images[0]}
                    alt={prop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                    {prop.property_type} • {prop.gender_category}
                  </div>
                  {prop.is_demo && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Demo
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-slate-900 text-base">{prop.name}</h3>
                    <p className="text-xs text-slate-500">{prop.address}, {prop.area}</p>
                    <div className="text-sm font-black text-brand-600">
                      ₹{prop.monthly_rent.toLocaleString('en-IN')}/month
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Status:</span>
                      <button
                        onClick={() => toggleAvailability(prop.id)}
                        className={`font-bold px-2 py-0.5 rounded-md border text-[11px] ${
                          prop.availability === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : prop.availability === 'Few Beds Left'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {prop.availability} (Click to toggle)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onViewPropertyDetails(prop)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </button>

                      <button
                        onClick={() => deleteProperty(prop.id)}
                        className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ADD PROPERTY 9-STEP WIZARD */}
      {activeTab === 'add' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          {/* Multi-step Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className="uppercase tracking-wider text-brand-600">
                Step {currentStep} of 9
              </span>
              <span>
                {[
                  'Basic Info',
                  'Location',
                  'Pricing',
                  'Rooms',
                  'Facilities',
                  'Photos',
                  'Rules',
                  'Contact',
                  'Preview',
                ][currentStep - 1]}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 transition-all duration-300"
                style={{ width: `${(currentStep / 9) * 100}%` }}
              ></div>
            </div>
          </div>

          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900">Property Published!</h2>
              <p className="text-xs text-slate-600">
                Your accommodation listing has been successfully submitted and is visible to college students searching near the campus.
              </p>
            </div>
          ) : (
            <div>
              {/* STEP 1: BASIC INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">1. Basic Information</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Property Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Balaji Student Residency"
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Accommodation Type *
                      </label>
                      <select
                        value={basicInfo.property_type}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, property_type: e.target.value as PropertyType })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="PG">PG</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Room">Room</option>
                        <option value="Shared Room">Shared Room</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Apartment">Apartment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Gender / Category *
                      </label>
                      <select
                        value={basicInfo.gender_category}
                        onChange={(e) =>
                          setBasicInfo({
                            ...basicInfo,
                            gender_category: e.target.value as GenderCategory,
                          })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="Boys">Boys Only</option>
                        <option value="Girls">Girls Only</option>
                        <option value="Unisex/Family">Unisex / Family</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe room furnishings, ventilation, walking access to college, security..."
                      value={basicInfo.description}
                      onChange={(e) =>
                        setBasicInfo({ ...basicInfo, description: e.target.value })
                      }
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">2. Location Details</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Nearby College *
                    </label>
                    <select
                      value={locationInfo.nearCollegeId}
                      onChange={(e) => {
                        const col = colleges.find((c) => c.id === e.target.value);
                        setLocationInfo({
                          ...locationInfo,
                          nearCollegeId: e.target.value,
                          city: col ? col.city : locationInfo.city,
                        });
                      }}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      {colleges.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                      <select
                        value={locationInfo.city}
                        onChange={(e) =>
                          setLocationInfo({ ...locationInfo, city: e.target.value })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        {POPULAR_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Area / Locality *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dargamitta"
                        value={locationInfo.area}
                        onChange={(e) =>
                          setLocationInfo({ ...locationInfo, area: e.target.value })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="Door No, Street name, Landmark"
                      value={locationInfo.address}
                      onChange={(e) =>
                        setLocationInfo({ ...locationInfo, address: e.target.value })
                      }
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={locationInfo.pin_code}
                        onChange={(e) =>
                          setLocationInfo({ ...locationInfo, pin_code: e.target.value })
                        }
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={locationInfo.latitude}
                        onChange={(e) =>
                          setLocationInfo({ ...locationInfo, latitude: Number(e.target.value) })
                        }
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        value={locationInfo.longitude}
                        onChange={(e) =>
                          setLocationInfo({ ...locationInfo, longitude: Number(e.target.value) })
                        }
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">3. Monthly Rent & Food</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Starting Monthly Rent (₹) *
                      </label>
                      <input
                        type="number"
                        value={pricingInfo.monthly_rent}
                        onChange={(e) =>
                          setPricingInfo({ ...pricingInfo, monthly_rent: Number(e.target.value) })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Security Deposit (₹) *
                      </label>
                      <input
                        type="number"
                        value={pricingInfo.deposit}
                        onChange={(e) =>
                          setPricingInfo({ ...pricingInfo, deposit: Number(e.target.value) })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={pricingInfo.food_included}
                        onChange={(e) =>
                          setPricingInfo({ ...pricingInfo, food_included: e.target.checked })
                        }
                        className="w-4 h-4 text-brand-600 rounded"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Homely food / meals are included in monthly rent
                      </span>
                    </label>

                    {pricingInfo.food_included && (
                      <textarea
                        rows={2}
                        placeholder="Specify food schedule (e.g. 3 times meal + tea, vegetarian & non-veg options)..."
                        value={pricingInfo.food_description}
                        onChange={(e) =>
                          setPricingInfo({ ...pricingInfo, food_description: e.target.value })
                        }
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: ROOMS */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">4. Room Types & Sharing</h3>
                    <button
                      type="button"
                      onClick={handleAddRoom}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Room
                    </button>
                  </div>

                  <div className="space-y-3">
                    {roomsList.map((room, idx) => (
                      <div
                        key={room.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-xs"
                      >
                        <select
                          value={room.room_type}
                          onChange={(e) => {
                            const updated = [...roomsList];
                            updated[idx].room_type = e.target.value as SharingType;
                            setRoomsList(updated);
                          }}
                          className="p-2 border rounded-lg bg-white"
                        >
                          <option value="Single">Single</option>
                          <option value="Double Sharing">Double Sharing</option>
                          <option value="Triple Sharing">Triple Sharing</option>
                          <option value="4 Sharing">4 Sharing</option>
                        </select>

                        <input
                          type="number"
                          placeholder="Price ₹"
                          value={room.price}
                          onChange={(e) => {
                            const updated = [...roomsList];
                            updated[idx].price = Number(e.target.value);
                            setRoomsList(updated);
                          }}
                          className="w-24 p-2 border rounded-lg bg-white"
                        />

                        <input
                          type="number"
                          placeholder="Beds"
                          value={room.available_beds}
                          onChange={(e) => {
                            const updated = [...roomsList];
                            updated[idx].available_beds = Number(e.target.value);
                            setRoomsList(updated);
                          }}
                          className="w-20 p-2 border rounded-lg bg-white"
                        />

                        {roomsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRoom(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: FACILITIES */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">5. Amenities & Facilities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Wi-Fi',
                      'Food',
                      'AC',
                      'Non-AC',
                      'Washing Machine',
                      'Parking',
                      'Laundry',
                      'Power Backup',
                      'Study Room',
                      'CCTV',
                      'Security',
                      'Attached Bathroom',
                    ].map((fac) => {
                      const checked = selectedFacilities.includes(fac);
                      return (
                        <button
                          key={fac}
                          type="button"
                          onClick={() => {
                            setSelectedFacilities(
                              checked
                                ? selectedFacilities.filter((f) => f !== fac)
                                : [...selectedFacilities, fac]
                            );
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                            checked
                              ? 'bg-brand-50 border-brand-500 text-brand-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {checked ? '✓ ' : '+ '}
                          {fac}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: PHOTOS */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">6. Property Photos</h3>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                    >
                      Add Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {photosList.map((photo, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200"
                      >
                        <img src={photo} alt="prop" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotosList(photosList.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7: RULES */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">7. Accommodation Rules</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. In-time 9:30 PM strictly"
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleAddRule}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                    >
                      Add Rule
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {rulesList.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-2 bg-slate-50 border rounded-lg text-xs"
                      >
                        <span>• {r}</span>
                        <button
                          type="button"
                          onClick={() => setRulesList(rulesList.filter((_, idx) => idx !== i))}
                          className="text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* STEP 8: CONTACT */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">8. Public Contact Details</h3>
                  <p className="text-xs text-slate-500">
                    Students will see these details to call or WhatsApp you directly.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.owner_name}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, owner_name: e.target.value })
                      }
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Calling Phone Number *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.owner_phone}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, owner_phone: e.target.value })
                      }
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number (with country code, e.g. 919848012345) *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.owner_whatsapp}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, owner_whatsapp: e.target.value })
                      }
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* STEP 9: PREVIEW */}
              {currentStep === 9 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">9. Review & Publish</h3>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                    <div>
                      <strong>Property:</strong> {basicInfo.name || 'Untitled'} ({basicInfo.property_type} • {basicInfo.gender_category})
                    </div>
                    <div>
                      <strong>Rent:</strong> ₹{pricingInfo.monthly_rent}/month | <strong>Deposit:</strong> ₹{pricingInfo.deposit}
                    </div>
                    <div>
                      <strong>Location:</strong> {locationInfo.address}, {locationInfo.area}, {locationInfo.city}
                    </div>
                    <div>
                      <strong>Facilities:</strong> {selectedFacilities.join(', ')}
                    </div>
                    <div>
                      <strong>Contact:</strong> {contactInfo.owner_name} ({contactInfo.owner_phone})
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="pt-6 border-t border-slate-200 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {currentStep < 9 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublishProperty}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Publish Property
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Student Inquiries Received</h2>
          <div className="space-y-3">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{enq.student_name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-brand-50 text-brand-700 border border-brand-200'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{enq.message}"
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Phone: <strong className="text-slate-800">{enq.student_phone}</strong></span>
                      <span>Email: <strong className="text-slate-800">{enq.student_email}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                      className="text-xs p-2 bg-slate-50 border rounded-lg"
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Closed">Status: Closed</option>
                    </select>

                    <a
                      href={`tel:${enq.student_phone}`}
                      className="p-2 bg-brand-600 text-white rounded-lg text-xs font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-8">
                No enquiries received yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Owner Profile Information</h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block">Name:</span>
              <strong className="text-slate-800">{user?.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Email:</span>
              <strong className="text-slate-800">{user?.email}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Phone:</span>
              <strong className="text-slate-800">{user?.phone}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Role:</span>
              <span className="uppercase text-brand-600 font-extrabold">{user?.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Account & Listing Settings</h2>
          <div className="space-y-3 text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-brand-600" />
              <span>Receive instant WhatsApp notification for new enquiries</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-brand-600" />
              <span>Allow students to request room visits</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
