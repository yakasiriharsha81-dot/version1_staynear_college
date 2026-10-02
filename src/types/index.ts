export type UserRole = 'student' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  college_id?: string;
  college_name?: string;
}

export interface College {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  pin_code: string;
  latitude: number;
  longitude: number;
  image_url: string;
  description?: string;
  property_count?: number;
}

export type PropertyType = 
  | 'PG' 
  | 'Hostel' 
  | 'Room' 
  | 'Shared Room' 
  | 'Single Room' 
  | 'Apartment';

export type GenderCategory = 'Boys' | 'Girls' | 'Unisex/Family';

export type SharingType = 'Single' | 'Double Sharing' | 'Triple Sharing' | '4 Sharing';

export interface RoomOption {
  id: string;
  room_type: SharingType;
  sharing: number;
  price: number;
  available_beds: number;
}

export interface Property {
  id: string;
  owner_id: string;
  name: string;
  property_type: PropertyType;
  gender_category: GenderCategory;
  description: string;
  address: string;
  city: string;
  area: string;
  pin_code: string;
  latitude?: number;
  longitude?: number;
  monthly_rent: number;
  deposit: number;
  availability: 'Available' | 'Few Beds Left' | 'Full';
  verification_status: 'pending' | 'approved' | 'rejected';
  is_verified: boolean;
  is_demo: boolean;
  food_included: boolean;
  food_description?: string;
  rules: string[];
  owner_name: string;
  owner_phone: string;
  owner_whatsapp: string;
  rooms: RoomOption[];
  facilities: string[];
  images: string[];
  rating: number;
  reviews_count: number;
  created_at: string;
  distance_km?: number; // dynamically computed when college is selected
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  verified_student: boolean;
}

export interface Enquiry {
  id: string;
  property_id: string;
  property_name: string;
  student_id?: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  created_at: string;
}

export interface Report {
  id: string;
  property_id: string;
  property_name: string;
  user_id?: string;
  user_name?: string;
  reason: 'Incorrect information' | 'Fake listing' | 'Wrong price' | 'Property unavailable' | 'Inappropriate content' | 'Safety concern' | 'Other';
  description: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  created_at: string;
}

export interface FilterState {
  city: string;
  area: string;
  collegeId: string;
  budgetRange: string;
  minBudget: number;
  maxBudget: number;
  accommodationTypes: PropertyType[];
  genderCategories: GenderCategory[];
  roomTypes: SharingType[];
  facilities: string[];
  maxDistance: number | null; // in km
  sortBy: 'distance' | 'price_asc' | 'price_desc' | 'recently_added';
  searchQuery: string;
}
