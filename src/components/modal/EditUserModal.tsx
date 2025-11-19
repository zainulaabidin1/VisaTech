import { User, EditableUser } from "@/lib/types/user";
import { useState } from "react";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (userData: EditableUser) => void;
}

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<EditableUser>({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    is_verified: user.is_verified,
    is_active: user.is_active,
    passport: {
      token_number: user.passport?.token_number || ""
    }
  });

  // In your EditUserModal component
const handleSave = () => {
  // Create the correct payload structure
  const payload: EditableUser = {
    id: user.id,
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    is_verified: formData.is_verified,
    is_active: formData.is_active,
    passport: {
      token_number: formData.passport?.token_number || ""
    }
  };
  
  console.log('📤 Sending payload:', payload);
  onSave(payload);
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">Edit User</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full p-2 border border-[#E2E8F0] rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="w-full p-2 border border-[#E2E8F0] rounded-md"
            />
          </div>

          {/* Token Number Field */}
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Token Number
            </label>
            <input
              type="text"
              value={formData.passport?.token_number || ""}
              onChange={(e) => setFormData({
                ...formData,
                passport: {
                  ...formData.passport,
                  token_number: e.target.value
                }
              })}
              placeholder="Enter token number"
              className="w-full p-2 border border-[#E2E8F0] rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Assign a unique token number to this user
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_verified}
                onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-[#374151]">Verified</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-[#374151]">Active</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#64748B] border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#004D99]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}