import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  College,
  Property,
  Review,
  Enquiry,
  Report,
  FilterState,
  PropertyType,
  GenderCategory,
  SharingType,
} from '../types';
import { DEMO_COLLEGES, DEMO_PROPERTIES, DEMO_REVIEWS } from '../data/mockData';
import { calculateHaversineDistance } from '../utils/distance';

interface PropertyContextType {
  colleges: College[];
  properties: Property[];
  reviews: Review[];
  enquiries: Enquiry[];
  reports: Report[];
  favorites: string[]; // property IDs
  compareList: Property[]; // up to 3 properties
  selectedCollege: College | null;
  filters: FilterState;

  // Actions
  setSelectedCollege: (college: College | null) => void;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  addToCompare: (property: Property) => boolean;
  removeFromCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;

  // Owner Actions
  addProperty: (property: Omit<Property, 'id' | 'created_at' | 'rating' | 'reviews_count'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleAvailability: (id: string) => void;

  // Student Actions
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>) => void;
  submitReview: (propertyId: string, rating: number, comment: string, userName: string) => void;
  submitReport: (report: Omit<Report, 'id' | 'created_at' | 'status'>) => void;

  // Admin Actions
  updateVerificationStatus: (id: string, status: 'approved' | 'rejected' | 'pending') => void;
  toggleVerifiedBadge: (id: string) => void;
  updateReportStatus: (id: string, status: 'Resolved' | 'Dismissed') => void;
  updateEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => void;

  // Computed
  filteredProperties: Property[];
}

const DEFAULT_FILTERS: FilterState = {
  city: '',
  area: '',
  collegeId: 'col-1', // Default to ABC Degree College, Nellore
  budgetRange: 'all',
  minBudget: 0,
  maxBudget: 25000,
  accommodationTypes: [],
  genderCategories: [],
  roomTypes: [],
  facilities: [],
  maxDistance: null,
  sortBy: 'distance',
  searchQuery: '',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_colleges');
      return saved ? JSON.parse(saved) : DEMO_COLLEGES;
    } catch {
      return DEMO_COLLEGES;
    }
  });

  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_properties');
      return saved ? JSON.parse(saved) : DEMO_PROPERTIES;
    } catch {
      return DEMO_PROPERTIES;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_reviews');
      return saved ? JSON.parse(saved) : DEMO_REVIEWS;
    } catch {
      return DEMO_REVIEWS;
    }
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_enquiries');
      return saved ? JSON.parse(saved) : [
        {
          id: 'enq-1',
          property_id: 'prop-1',
          property_name: 'Sri Sai Student PG',
          student_name: 'Harika Sharma',
          student_email: 'harika@gmail.com',
          student_phone: '+91 98482 11223',
          message: 'Hi, is double sharing room with food available from next month for ABC College student?',
          status: 'New',
          created_at: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_reports');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('staynear_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  const [compareList, setCompareList] = useState<Property[]>([]);

  const [selectedCollege, setSelectedCollegeState] = useState<College | null>(() => {
    return DEMO_COLLEGES.find(c => c.id === 'col-1') || DEMO_COLLEGES[0];
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('staynear_properties', JSON.stringify(properties));
    } catch {}
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('staynear_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('staynear_enquiries', JSON.stringify(enquiries));
    } catch {}
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('staynear_reports', JSON.stringify(reports));
    } catch {}
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('staynear_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const setSelectedCollege = (college: College | null) => {
    setSelectedCollegeState(college);
    if (college) {
      setFilters(prev => ({
        ...prev,
        collegeId: college.id,
        city: college.city,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        collegeId: '',
      }));
    }
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters({
      ...DEFAULT_FILTERS,
      collegeId: selectedCollege ? selectedCollege.id : '',
      city: selectedCollege ? selectedCollege.city : '',
    });
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const addToCompare = (property: Property): boolean => {
    if (compareList.length >= 3) {
      return false;
    }
    if (compareList.some(p => p.id === property.id)) {
      return true;
    }
    setCompareList(prev => [...prev, property]);
    return true;
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  };

  const isInCompare = (propertyId: string) => compareList.some(p => p.id === propertyId);

  const clearCompare = () => setCompareList([]);

  const addProperty = (newPropData: Omit<Property, 'id' | 'created_at' | 'rating' | 'reviews_count'>) => {
    const newProperty: Property = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      rating: 4.5,
      reviews_count: 0,
      created_at: new Date().toISOString(),
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    removeFromCompare(id);
    setFavorites(prev => prev.filter(favId => favId !== id));
  };

  const toggleAvailability = (id: string) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const nextAvail = p.availability === 'Available' ? 'Few Beds Left' : p.availability === 'Few Beds Left' ? 'Full' : 'Available';
        return { ...p, availability: nextAvail };
      })
    );
  };

  const submitEnquiry = (enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'New',
      created_at: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const submitReview = (propertyId: string, rating: number, comment: string, userName: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      property_id: propertyId,
      user_id: `user-${Date.now()}`,
      user_name: userName || 'Student Resident',
      rating,
      comment,
      created_at: new Date().toISOString(),
      verified_student: true,
    };
    setReviews(prev => [newReview, ...prev]);

    // Recalculate average rating for property
    setProperties(prev =>
      prev.map(p => {
        if (p.id !== propertyId) return p;
        const allRevs = [...reviews.filter(r => r.property_id === propertyId), newReview];
        const avg = allRevs.reduce((acc, r) => acc + r.rating, 0) / allRevs.length;
        return {
          ...p,
          rating: Math.round(avg * 10) / 10,
          reviews_count: allRevs.length,
        };
      })
    );
  };

  const submitReport = (report: Omit<Report, 'id' | 'created_at' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'Pending',
      created_at: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateVerificationStatus = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setProperties(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              verification_status: status,
              is_verified: status === 'approved' ? p.is_verified : false,
            }
          : p
      )
    );
  };

  const toggleVerifiedBadge = (id: string) => {
    setProperties(prev =>
      prev.map(p => (p.id === id ? { ...p, is_verified: !p.is_verified } : p))
    );
  };

  const updateReportStatus = (id: string, status: 'Resolved' | 'Dismissed') => {
    setReports(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
  };

  const updateEnquiryStatus = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
  };

  // Compute filtered properties
  const filteredProperties = properties
    .filter(property => {
      // Must be approved for public view (unless previewing)
      if (property.verification_status !== 'approved') {
        return false;
      }

      // City filter
      if (filters.city && filters.city.trim() !== '') {
        if (property.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }
      }

      // Area filter
      if (filters.area && filters.area.trim() !== '') {
        if (!property.area.toLowerCase().includes(filters.area.toLowerCase())) {
          return false;
        }
      }

      // Budget filter
      if (filters.budgetRange === 'under_3000' && property.monthly_rent >= 3000) return false;
      if (filters.budgetRange === '3000_5000' && (property.monthly_rent < 3000 || property.monthly_rent > 5000)) return false;
      if (filters.budgetRange === '5000_8000' && (property.monthly_rent < 5000 || property.monthly_rent > 8000)) return false;
      if (filters.budgetRange === '8000_12000' && (property.monthly_rent < 8000 || property.monthly_rent > 12000)) return false;
      if (filters.budgetRange === 'custom') {
        if (property.monthly_rent < filters.minBudget || property.monthly_rent > filters.maxBudget) {
          return false;
        }
      }

      // Accommodation Type filter
      if (filters.accommodationTypes.length > 0) {
        if (!filters.accommodationTypes.includes(property.property_type)) {
          return false;
        }
      }

      // Gender Category filter
      if (filters.genderCategories.length > 0) {
        if (!filters.genderCategories.includes(property.gender_category)) {
          return false;
        }
      }

      // Room Type filter
      if (filters.roomTypes.length > 0) {
        const hasRoomType = property.rooms.some(r => filters.roomTypes.includes(r.room_type));
        if (!hasRoomType) {
          return false;
        }
      }

      // Facilities filter
      if (filters.facilities.length > 0) {
        const matchesAllFacilities = filters.facilities.every(f => property.facilities.includes(f));
        if (!matchesAllFacilities) {
          return false;
        }
      }

      // Calculate distance relative to selected college
      const distance = selectedCollege
        ? calculateHaversineDistance(
            selectedCollege.latitude,
            selectedCollege.longitude,
            property.latitude,
            property.longitude
          )
        : null;

      // Distance filter (if selected)
      if (filters.maxDistance !== null) {
        if (distance === null || distance > filters.maxDistance) {
          return false;
        }
      }

      // Search Query filter (matches property name, area, address)
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          property.name.toLowerCase().includes(q) ||
          property.area.toLowerCase().includes(q) ||
          property.address.toLowerCase().includes(q) ||
          property.city.toLowerCase().includes(q);
        if (!matchesQuery) {
          return false;
        }
      }

      return true;
    })
    .map(property => {
      const distance = selectedCollege
        ? calculateHaversineDistance(
            selectedCollege.latitude,
            selectedCollege.longitude,
            property.latitude,
            property.longitude
          )
        : null;
      return {
        ...property,
        distance_km: distance !== null ? distance : undefined,
      };
    })
    .sort((a, b) => {
      if (filters.sortBy === 'distance') {
        if (a.distance_km === undefined && b.distance_km === undefined) return 0;
        if (a.distance_km === undefined) return 1;
        if (b.distance_km === undefined) return -1;
        return a.distance_km - b.distance_km;
      }
      if (filters.sortBy === 'price_asc') {
        return a.monthly_rent - b.monthly_rent;
      }
      if (filters.sortBy === 'price_desc') {
        return b.monthly_rent - a.monthly_rent;
      }
      if (filters.sortBy === 'recently_added') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

  return (
    <PropertyContext.Provider
      value={{
        colleges,
        properties,
        reviews,
        enquiries,
        reports,
        favorites,
        compareList,
        selectedCollege,
        filters,
        setSelectedCollege,
        updateFilters,
        resetFilters,
        toggleFavorite,
        isFavorite,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleAvailability,
        submitEnquiry,
        submitReview,
        submitReport,
        updateVerificationStatus,
        toggleVerifiedBadge,
        updateReportStatus,
        updateEnquiryStatus,
        filteredProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
