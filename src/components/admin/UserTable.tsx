"use client";

import { motion } from "framer-motion";
import { Eye, Edit, Trash2, User, Mail, Phone, MapPin, Hash } from "lucide-react";
import { User as UserType } from "@/lib/types/user";

interface UserTableProps {
  users: UserType[];
  isLoading: boolean;
  onViewUser: (user: UserType) => void;
  onEditUser: (user: UserType) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserTable({ users, isLoading, onViewUser, onEditUser, onDeleteUser }: UserTableProps) {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366] mx-auto"></div>
        <p className="text-[#64748B] mt-2">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-8 text-center">
        <User className="h-12 w-12 text-[#94A3B8] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-[#64748B]">No users found</h3>
        <p className="text-[#94A3B8]">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              User
            </th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              Contact
            </th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              Location
            </th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              Token Number
            </th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-[#F8FAFC] transition-colors duration-200"
            >
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-r from-[#003366] to-[#004D99] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.first_name[0]}{user.last_name[0]}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-[#1E293B]">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xs text-[#64748B]">
                      ID: {user.id.slice(0, 8)}...
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-[#1E293B]">
                    <Mail className="h-4 w-4 text-[#64748B] mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-[#1E293B]">
                    <Phone className="h-4 w-4 text-[#64748B] mr-2" />
                    {user.phone}
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-[#1E293B]">
                    <MapPin className="h-4 w-4 text-[#64748B] mr-2" />
                    {user.country_of_residence}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    {user.nationality}
                  </div>
                </div>
              </td>
              
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.is_verified 
                      ? 'bg-green-100 text-[#059669]' 
                      : 'bg-orange-100 text-[#F97316]'
                  }`}>
                    {user.is_verified ? 'Verified' : 'Pending'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.is_active 
                      ? 'bg-blue-100 text-[#003366]' 
                      : 'bg-red-100 text-[#DC2626]'
                  }`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <Hash className="h-4 w-4 text-[#64748B] mr-2" />
                  <span className={`text-sm font-medium ${
                    user.passport?.token_number 
                      ? 'text-[#003366] bg-blue-50 px-2 py-1 rounded' 
                      : 'text-[#64748B] italic'
                  }`}>
                    {user.passport?.token_number || "Not Assigned"}
                  </span>
                </div>
              </td>
              
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onViewUser(user)}
                    className="p-2 text-[#64748B] hover:text-[#003366] hover:bg-[#F1F5F9] rounded-lg transition-colors duration-200"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditUser(user)}
                    className="p-2 text-[#64748B] hover:text-[#F59E0B] hover:bg-orange-50 rounded-lg transition-colors duration-200"
                    title="Edit User"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}