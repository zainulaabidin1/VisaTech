"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Mail, Phone, MapPin, Globe, Shield, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, EditableUser } from "@/lib/types/user";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: EditableUser) => void;
}

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<EditableUser>({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    nationality: user.nationality,
    country_of_residence: user.country_of_residence,
    is_verified: user.is_verified,
    is_active: user.is_active
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof EditableUser, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleVerification = () => {
    setFormData(prev => ({ ...prev, is_verified: !prev.is_verified }));
  };

  const toggleActive = () => {
    setFormData(prev => ({ ...prev, is_active: !prev.is_active }));
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Edit User</h2>
              <p className="text-orange-100 opacity-90">Update user information</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1E293B] flex items-center">
                <Shield className="h-5 w-5 text-[#003366] mr-2" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-2">
                    First Name
                  </label>
                  <Input
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-2">
                    Last Name
                  </label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                  required
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1E293B] flex items-center">
                <MapPin className="h-5 w-5 text-[#003366] mr-2" />
                Location Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Nationality
                  </label>
                  <Input
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Country of Residence
                  </label>
                  <Input
                    value={formData.country_of_residence}
                    onChange={(e) => handleChange('country_of_residence', e.target.value)}
                    className="border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
                  />
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1E293B] flex items-center">
                <Shield className="h-5 w-5 text-[#003366] mr-2" />
                Account Status
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verification Status */}
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[#64748B]">Email Verification</span>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      formData.is_verified 
                        ? 'bg-green-100 text-[#059669]' 
                        : 'bg-orange-100 text-[#F97316]'
                    }`}>
                      {formData.is_verified ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {formData.is_verified ? 'Verified' : 'Pending'}
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] mb-3">
                    Toggle user email verification status
                  </p>
                  <button
                    type="button"
                    onClick={toggleVerification}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.is_verified
                        ? 'bg-green-50 text-[#059669] border border-green-200 hover:bg-green-100'
                        : 'bg-orange-50 text-[#F97316] border border-orange-200 hover:bg-orange-100'
                    }`}
                  >
                    {formData.is_verified ? 'Mark as Pending' : 'Mark as Verified'}
                  </button>
                </div>

                {/* Account Activity */}
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[#64748B]">Account Status</span>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      formData.is_active 
                        ? 'bg-blue-100 text-[#003366]' 
                        : 'bg-red-100 text-[#DC2626]'
                    }`}>
                      {formData.is_active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {formData.is_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] mb-3">
                    Activate or deactivate user account
                  </p>
                  <button
                    type="button"
                    onClick={toggleActive}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.is_active
                        ? 'bg-blue-50 text-[#003366] border border-blue-200 hover:bg-blue-100'
                        : 'bg-red-50 text-[#DC2626] border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {formData.is_active ? 'Deactivate Account' : 'Activate Account'}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-[#E2E8F0]">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:from-[#D97706] hover:to-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}