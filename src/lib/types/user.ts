// lib/types/user.ts
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_of_residence: string;
  nationality: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  passport?: {
    token_number?: string;
    passport_image_url?: string; 
  };
  personal_photo_url?: string;
}

export interface Passport {
  id: string;
  user_id: string;
  passport_number: string;
  nationality: string;
  issue_date: string;
  expiry_date: string;
  token_number?: string; // Add this
  created_at: string;
  updated_at: string;
   passport_image_url?: string; 
}

export interface EditableUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  is_active: boolean;
  passport?: {
    token_number?: string;
  };
}