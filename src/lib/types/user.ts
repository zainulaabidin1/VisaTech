// lib/types/user.ts
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  country_of_residence: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  date_of_birth?: string;
  sex?: string;
  education_level?: string;
  experience_level?: string;
  certification?: string;
  national_id?: string;
  passport?: {
    passport_number: string;
    country: string;
    nationality: string;
    date_of_birth: string;
    expiry_date: string;
    sex: string;
    is_verified: boolean;
    verification_status: string;
  };
}

// For editing - only include fields that can be edited
export interface EditableUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  country_of_residence: string;
  is_verified: boolean;
  is_active: boolean;
}