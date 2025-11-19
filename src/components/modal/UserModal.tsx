import { User } from "@/lib/types/user";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">User Details</h2>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-[#64748B]">Name</label>
            <p className="text-[#1E293B]">{user.first_name} {user.last_name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#64748B]">Email</label>
            <p className="text-[#1E293B]">{user.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#64748B]">Phone</label>
            <p className="text-[#1E293B]">{user.phone}</p>
          </div>
          
          {/* Token Number Display */}
          <div>
            <label className="text-sm font-medium text-[#64748B]">Token Number</label>
            <p className={`text-[#1E293B] ${
              !user.passport?.token_number ? "text-gray-500 italic" : ""
            }`}>
              {user.passport?.token_number || "Not assigned"}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#64748B]">Status</label>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.is_verified
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {user.is_verified ? "Verified" : "Pending"}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#004D99]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}