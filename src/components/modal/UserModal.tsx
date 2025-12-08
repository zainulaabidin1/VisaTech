import { User } from "@/lib/types/user";
import { Download, X } from "lucide-react";
import { useState, useEffect } from "react";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  console.log("UserModal received user:", user);
  
  const [passportData, setPassportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Personal photo is in user object
  const personalPhotoUrl = user.personal_photo_url
    ? `http://localhost:5000${user.personal_photo_url}`
    : null;

  // Passport image URL from passport data
  const passportImageUrl = user.passport?.passport_image_url
    ? `http://localhost:5000${user.passport?.passport_image_url || user.passport?.passport_image_url}`
    : null;

  const handleDownload = (url: string, filename: string) => {
    if (!url) return;
    
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">User Details</h2>
            <p className="text-sm text-[#64748B] mt-1">ID: {user.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - User Info */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Full Name</label>
                  <p className="text-[#1E293B] font-medium">{user.first_name} {user.last_name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Email</label>
                  <p className="text-[#1E293B] break-all">{user.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Phone</label>
                  <p className="text-[#1E293B]">{user.phone || "N/A"}</p>
                </div>
              
              </div>
            </div>
            
            {/* Additional Information Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Additional Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Nationality</label>
                  <p className="text-[#1E293B]">{user.nationality || "N/A"}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Country of Residence</label>
                  <p className="text-[#1E293B]">{user.country_of_residence || "N/A"}</p>
                </div>
                
               
              </div>
            </div>
          </div>
          
          {/* Right Column - Images & Status */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Account Status</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Token Number</label>
                  <p className={`text-[#1E293B] font-medium ${
                    !passportData?.token_number ? "text-gray-500 italic" : ""
                  }`}>
                    {passportData?.token_number || "Not assigned"}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Verification Status</label>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      user.is_verified
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    }`}
                  >
                    {user.is_verified ? "✓ Verified" : "Pending Verification"}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#64748B] block mb-1">Account Status</label>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      user.is_active
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Images Section */}
            <div className="space-y-6">
              {/* Personal Photo */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[#1E293B]">Personal Photo</h3>
                  {personalPhotoUrl && (
                    <button
                      onClick={() => handleDownload(personalPhotoUrl, `photo-${user.first_name}-${user.last_name}.jpg`)}
                      className="text-[#003366] hover:text-[#004D99] text-sm flex items-center gap-1"
                      title="View photo in new tab"
                    >
                      <Download className="h-4 w-4" />
                      View
                    </button>
                  )}
                </div>
                
                {personalPhotoUrl ? (
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 min-h-[200px] flex items-center justify-center">
                      <img
                        src={personalPhotoUrl}
                        alt={`${user.first_name}'s Photo`}
                        className="max-w-full max-h-[180px] object-cover"
                        onError={(e) => {
                          console.error("Failed to load personal photo:", personalPhotoUrl);
                          (e.target as HTMLImageElement).src = '/placeholder-photo.jpg';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-500">No personal photo uploaded</p>
                  </div>
                )}
              </div>
              
              {/* Passport Image */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[#1E293B]">
                    Passport Document
                    {loading && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
                  </h3>
                  {passportImageUrl && (
                    <button
                      onClick={() => handleDownload(passportImageUrl, `passport-${user.first_name}-${user.last_name}.jpg`)}
                      className="text-[#003366] hover:text-[#004D99] text-sm flex items-center gap-1"
                      title="View passport in new tab"
                    >
                      <Download className="h-4 w-4" />
                      View
                    </button>
                  )}
                </div>
                
                {passportImageUrl ? (
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 min-h-[200px] flex items-center justify-center">
                      <img
                        src={passportImageUrl}
                        alt={`${user.first_name}'s Passport`}
                        className="max-w-full max-h-[180px] object-contain"
                        onError={(e) => {
                          console.error("Failed to load passport image:", passportImageUrl);
                          (e.target as HTMLImageElement).src = '/placeholder-passport.jpg';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-500">
                      {loading ? "Loading passport data..." : "No passport document uploaded"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}