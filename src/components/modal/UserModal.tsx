"use client";

import { motion } from "framer-motion";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Globe
} from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  country_of_residence: string;
  date_of_birth?: string;
  sex?: string;
  education_level?: string;
  experience_level?: string;
  certification?: string;
  national_id?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
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

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004D99] p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {user.first_name[0]}{user.last_name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-blue-100 opacity-90">User ID: {user.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* User Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Personal Information */}
              <div className="bg-[#F8FAFC] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center">
                  <User className="h-5 w-5 text-[#003366] mr-2" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <InfoRow icon={Mail} label="Email" value={user.email} />
                  <InfoRow icon={Phone} label="Phone" value={user.phone} />
                  <InfoRow icon={MapPin} label="Country" value={user.country_of_residence} />
                  <InfoRow icon={Globe} label="Nationality" value={user.nationality} />
                  {user.date_of_birth && (
                    <InfoRow icon={Calendar} label="Date of Birth" value={formatDate(user.date_of_birth)} />
                  )}
                  {user.sex && (
                    <InfoRow icon={User} label="Gender" value={user.sex} />
                  )}
                </div>
              </div>

              {/* Education & Status */}
              <div className="bg-[#F8FAFC] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-[#003366] mr-2" />
                  Account Details
                </h3>
                <div className="space-y-3">
                  {user.education_level && (
                    <InfoRow icon={User} label="Education" value={user.education_level} />
                  )}
                  {user.experience_level && (
                    <InfoRow icon={User} label="Experience" value={user.experience_level} />
                  )}
                  {user.certification && (
                    <InfoRow icon={User} label="Certification" value={user.certification} />
                  )}
                  {user.national_id && (
                    <InfoRow icon={User} label="National ID" value={user.national_id} />
                  )}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-[#64748B]">Verification Status</span>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.is_verified 
                        ? 'bg-green-100 text-[#059669]' 
                        : 'bg-orange-100 text-[#F97316]'
                    }`}>
                      {user.is_verified ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {user.is_verified ? 'Verified' : 'Pending'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-[#64748B]">Account Status</span>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.is_active 
                        ? 'bg-blue-100 text-[#003366]' 
                        : 'bg-red-100 text-[#DC2626]'
                    }`}>
                      {user.is_active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {user.is_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Information */}
            {user.passport && (
              <div className="bg-[#F8FAFC] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center">
                  <FileText className="h-5 w-5 text-[#003366] mr-2" />
                  Passport Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard label="Passport Number" value={user.passport.passport_number} />
                  <InfoCard label="Country" value={user.passport.country} />
                  <InfoCard label="Nationality" value={user.passport.nationality} />
                  <InfoCard label="Date of Birth" value={formatDate(user.passport.date_of_birth)} />
                  <InfoCard label="Expiry Date" value={formatDate(user.passport.expiry_date)} />
                  <InfoCard label="Gender" value={user.passport.sex} />
                  <div className="md:col-span-2 lg:col-span-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm font-medium text-[#64748B]">Passport Status</span>
                      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.passport.is_verified 
                          ? 'bg-green-100 text-[#059669]' 
                          : 'bg-orange-100 text-[#F97316]'
                      }`}>
                        {user.passport.is_verified ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {user.passport.verification_status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Registration Date */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-[#64748B]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Registration Date</span>
                </div>
                <span className="text-[#1E293B] font-medium">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper components
function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0] last:border-b-0">
      <div className="flex items-center text-sm text-[#64748B]">
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </div>
      <span className="text-sm font-medium text-[#1E293B]">{value}</span>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-3 border border-[#E2E8F0]">
      <div className="text-xs font-medium text-[#64748B] mb-1">{label}</div>
      <div className="text-sm font-semibold text-[#1E293B]">{value}</div>
    </div>
  );
}