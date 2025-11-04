"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Filter,
  Plus,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTable } from "@/components/admin/UserTable";
import { UserModal } from "@/components/modal/UserModal";
import { EditUserModal } from "@/components/modal/EditUserModal";
import { User, EditableUser } from "@/lib/types/user";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/users/all');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data.users);
        calculateStats(result.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (userList: User[]) => {
    const total = userList.length;
    const verified = userList.filter(user => user.is_verified).length;
    const pending = total - verified;
    
    setStats({ total, verified, pending });
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(user => {
        if (statusFilter === "verified") return user.is_verified;
        if (statusFilter === "pending") return !user.is_verified;
        if (statusFilter === "active") return user.is_active;
        return true;
      });
    }

    setFilteredUsers(filtered);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
          setUsers(users.filter(user => user.id !== userId));
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const handleUpdateUser = async (updatedUserData: EditableUser) => {
    try {
      console.log('🔄 Updating user:', updatedUserData.id, updatedUserData);
      
      const response = await fetch(`http://localhost:5000/api/users/${updatedUserData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData)
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ User updated successfully');
        // Update the local state with the returned user data
        setUsers(users.map(user => 
          user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
        ));
        setEditingUser(null);
        alert('User updated successfully');
      } else {
        console.error('❌ Failed to update user:', result.message);
        alert(result.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('❌ Error updating user:', error);
      alert('Error updating user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1E293B]">User Management</h1>
            <p className="text-[#64748B] mt-2">Manage and monitor all registered users</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white text-[#003366] border border-[#E2E8F0] hover:bg-[#F1F5F9]">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-[#003366] to-[#004D99] text-white hover:from-[#004D99] hover:to-[#003366]">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#64748B] text-sm font-medium">Total Users</p>
                <h3 className="text-2xl font-bold text-[#1E293B] mt-1">{stats.total}</h3>
              </div>
              <div className="p-3 bg-[#F1F5F9] rounded-xl">
                <Users className="h-6 w-6 text-[#003366]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#64748B] text-sm font-medium">Verified</p>
                <h3 className="text-2xl font-bold text-[#059669] mt-1">{stats.verified}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <UserCheck className="h-6 w-6 text-[#059669]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#64748B] text-sm font-medium">Pending</p>
                <h3 className="text-2xl font-bold text-[#F97316] mt-1">{stats.pending}</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <UserX className="h-6 w-6 text-[#F97316]" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#E2E8F0] focus:border-[#003366] focus:ring-[#003366]"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-md text-[#1E293B] bg-white focus:border-[#003366] focus:ring-[#003366] outline-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
            </select>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden"
      >
        <UserTable
          users={filteredUsers}
          isLoading={isLoading}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </motion.div>

      {/* Modals */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
}