"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  XCircle,
  Check,
  X,
  Loader2,
  ChevronDown,
  LogOut,
  FileText,
  AlertCircle,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Types
interface UserPayment {
  id: string;
  status: string;
  amount: number | null;
  screenshotUrl: string | null;
  transactionId: string | null;
  adminNotes: string | null;
  createdAt: string;
}

interface UserData {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  nationality: string;
  countryOfResidence: string;
  dateOfBirth: string;
  sex: string;
  educationLevel: string;
  experienceLevel: string;
  certification: string;
  nationalId: string;
  personalPhotoUrl: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  passport: any;
  payment: UserPayment | null;
}

interface Stats {
  totalUsers: number;
  payments: {
    pendingAmount: number;
    pendingPayment: number;
    pendingVerification: number;
    approved: number;
  };
}

// Auth utilities
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const getUserData = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionNotes, setRejectionNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    const token = getAuthToken();

    if (!token || !userData) {
      router.push("/signin");
      return;
    }

    if (userData.role !== "admin") {
      router.push("/payment-status");
      return;
    }

    fetchStats();
    fetchUsers();
  }, [router]);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  const fetchStats = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.email.toLowerCase().includes(term) ||
          u.firstName?.toLowerCase().includes(term) ||
          u.lastName?.toLowerCase().includes(term) ||
          u.phone?.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((u) => u.payment?.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleSetAmount = async () => {
    if (!selectedUser || !amountInput) return;

    setActionLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${selectedUser.id}/set-amount`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: parseFloat(amountInput) }),
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchUsers();
        fetchStats();
        setShowAmountModal(false);
        setAmountInput("");
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error setting amount:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprovePayment = async () => {
    if (!selectedUser?.payment) return;

    setActionLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `http://localhost:5000/api/admin/payments/${selectedUser.payment.id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notes: "Payment verified and approved" }),
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchUsers();
        fetchStats();
        setShowPaymentModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error approving payment:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedUser?.payment || !rejectionNotes.trim()) return;

    setActionLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `http://localhost:5000/api/admin/payments/${selectedUser.payment.id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notes: rejectionNotes }),
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchUsers();
        fetchStats();
        setShowPaymentModal(false);
        setRejectionNotes("");
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetToken = async () => {
    if (!selectedUser || !tokenInput.trim()) return;

    setActionLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${selectedUser.id}/set-token`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tokenNumber: tokenInput.trim() }),
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchUsers();
        setShowTokenModal(false);
        setTokenInput("");
        setSelectedUser(null);
        alert("Token number set successfully!");
      } else {
        alert(result.message || "Failed to set token number");
      }
    } catch (error) {
      console.error("Error setting token:", error);
      alert("Failed to set token number");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/signin");
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string; text: string; label: string }> = {
      pending_amount: { bg: "bg-amber-100", text: "text-amber-700", label: "Awaiting Amount" },
      pending_payment: { bg: "bg-blue-100", text: "text-blue-700", label: "Awaiting Payment" },
      pending_verification: { bg: "bg-purple-100", text: "text-purple-700", label: "Needs Review" },
      approved: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
    };
    const config = configs[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-500 text-sm">Manage users and payments</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-600 hover:border-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats?.totalUsers || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Pending Amount</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats?.payments.pendingAmount || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Awaiting Payment</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {stats?.payments.pendingPayment || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Needs Review</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.payments.pendingVerification || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Approved</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats?.payments.approved || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending_amount">Pending Amount</option>
              <option value="pending_payment">Awaiting Payment</option>
              <option value="pending_verification">Needs Review</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">User</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                      <p className="text-slate-500 mt-2">Loading users...</p>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-slate-500 mt-2">No users found</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.firstName?.[0] || user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{user.fullName || "N/A"}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700">{user.phone || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4">
                        {user.payment ? getStatusBadge(user.payment.status) : (
                          <span className="text-slate-400 text-sm">No payment</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {user.payment?.amount ? `PKR ${user.payment.amount.toLocaleString()}` : "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {/* Set Amount Button - for pending_amount status */}
                          {(!user.payment || user.payment.status === "pending_amount") && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowAmountModal(true);
                              }}
                              className="bg-amber-500 hover:bg-amber-600 text-white"
                            >
                              <DollarSign className="w-4 h-4 mr-1" />
                              Set Amount
                            </Button>
                          )}

                          {/* Review Payment Button - for pending_verification status */}
                          {user.payment?.status === "pending_verification" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowPaymentModal(true);
                              }}
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          )}

                          {/* Set Token Button - for users with passport */}
                          {user.passport && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setTokenInput(user.passport?.tokenNumber || "");
                                setShowTokenModal(true);
                              }}
                              className="bg-teal-500 hover:bg-teal-600 text-white"
                            >
                              <Ticket className="w-4 h-4 mr-1" />
                              Token
                            </Button>
                          )}

                          {/* View Details Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserDetailModal(true);
                            }}
                            className="border-slate-200"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Set Amount Modal */}
      <AnimatePresence>
        {showAmountModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAmountModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">Set Payment Amount</h3>
              <p className="text-slate-600 mb-4">
                Setting amount for <strong>{selectedUser.fullName || selectedUser.email}</strong>
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amount (PKR)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAmountModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSetAmount}
                  disabled={!amountInput || actionLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Set Amount"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Set Token Modal */}
      <AnimatePresence>
        {showTokenModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTokenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Ticket className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Set Token Number</h3>
              </div>

              <p className="text-slate-600 mb-4">
                Setting token for <strong>{selectedUser.fullName || selectedUser.email}</strong>
              </p>

              {selectedUser.passport && (
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Passport Number:</span>{" "}
                    {selectedUser.passport.passportNumber || "N/A"}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Token Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter token number (e.g., TKN-2024-001)"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTokenModal(false);
                    setTokenInput("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSetToken}
                  disabled={!tokenInput.trim() || actionLoading}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Set Token"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Review Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedUser?.payment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">Review Payment</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">User Details</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p><span className="text-slate-500">Name:</span> {selectedUser.fullName}</p>
                    <p><span className="text-slate-500">Email:</span> {selectedUser.email}</p>
                    <p><span className="text-slate-500">Phone:</span> {selectedUser.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Payment Details</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p>
                      <span className="text-slate-500">Amount:</span>{" "}
                      <strong>PKR {selectedUser.payment.amount?.toLocaleString()}</strong>
                    </p>
                    <p>
                      <span className="text-slate-500">Transaction ID:</span>{" "}
                      <strong>{selectedUser.payment.transactionId}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              {selectedUser.payment.screenshotUrl && (
                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-2">Payment Screenshot</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:5000${selectedUser.payment.screenshotUrl}`}
                      alt="Payment screenshot"
                      className="w-full max-h-80 object-contain bg-slate-100"
                    />
                  </div>
                </div>
              )}

              {/* Rejection Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rejection Notes (required if rejecting)
                </label>
                <textarea
                  value={rejectionNotes}
                  onChange={(e) => setRejectionNotes(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setRejectionNotes("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRejectPayment}
                  disabled={!rejectionNotes.trim() || actionLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleApprovePayment}
                  disabled={actionLoading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserDetailModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedUser.personalPhotoUrl ? (
                      <img
                        src={`http://localhost:5000${selectedUser.personalPhotoUrl}`}
                        alt={selectedUser.fullName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {selectedUser.firstName?.[0] || selectedUser.email[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedUser.fullName || "N/A"}</h2>
                      <p className="text-white/80">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUserDetailModal(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4">
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-800">{selectedUser.phone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Nationality</p>
                      <p className="font-medium text-slate-800">{selectedUser.nationality || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Country of Residence</p>
                      <p className="font-medium text-slate-800">{selectedUser.countryOfResidence || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date of Birth</p>
                      <p className="font-medium text-slate-800">{selectedUser.dateOfBirth || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Gender</p>
                      <p className="font-medium text-slate-800 capitalize">{selectedUser.sex || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">National ID</p>
                      <p className="font-medium text-slate-800">{selectedUser.nationalId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Education Level</p>
                      <p className="font-medium text-slate-800">{selectedUser.educationLevel || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Experience Level</p>
                      <p className="font-medium text-slate-800">{selectedUser.experienceLevel || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Certification</p>
                      <p className="font-medium text-slate-800">{selectedUser.certification || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Passport Information */}
                {selectedUser.passport && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Passport Information
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Passport Number</p>
                          <p className="font-medium text-slate-800">{selectedUser.passport.passportNumber || selectedUser.passport.passport_number || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Expiry Date</p>
                          <p className="font-medium text-slate-800">{selectedUser.passport.expiryDate || selectedUser.passport.expiry_date || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Issuing Country</p>
                          <p className="font-medium text-slate-800">{selectedUser.passport.issuingCountry || selectedUser.passport.issuing_country || "N/A"}</p>
                        </div>
                        {/* Token Number */}
                        <div className="col-span-2 md:col-span-3">
                          <p className="text-sm text-slate-500">Token Number</p>
                          {(selectedUser.passport.tokenNumber || selectedUser.passport.token_number) ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 font-semibold rounded-full text-sm mt-1">
                              <Ticket className="w-4 h-4" />
                              {selectedUser.passport.tokenNumber || selectedUser.passport.token_number}
                            </span>
                          ) : (
                            <p className="font-medium text-slate-400 italic">Not assigned yet</p>
                          )}
                        </div>
                      </div>

                      {/* Passport Scan Image */}
                      {(selectedUser.passport.passportImageUrl || selectedUser.passport.passport_image_url) && (
                        <div className="mt-4">
                          <p className="text-sm text-slate-500 mb-2 font-medium">Passport Scan</p>
                          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <img
                              src={`http://localhost:5000${selectedUser.passport.passportImageUrl || selectedUser.passport.passport_image_url}`}
                              alt="Passport Scan"
                              className="w-full max-h-96 object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {/* Passport Images */}
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {(selectedUser.passport.frontImageUrl || selectedUser.passport.front_image_url) && (
                          <div>
                            <p className="text-sm text-slate-500 mb-2">Front Image</p>
                            <img
                              src={`http://localhost:5000${selectedUser.passport.frontImageUrl || selectedUser.passport.front_image_url}`}
                              alt="Passport Front"
                              className="w-full rounded-lg border border-slate-200"
                            />
                          </div>
                        )}
                        {(selectedUser.passport.backImageUrl || selectedUser.passport.back_image_url) && (
                          <div>
                            <p className="text-sm text-slate-500 mb-2">Back Image</p>
                            <img
                              src={`http://localhost:5000${selectedUser.passport.backImageUrl || selectedUser.passport.back_image_url}`}
                              alt="Passport Back"
                              className="w-full rounded-lg border border-slate-200"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                {selectedUser.payment && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      Payment Information
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Status</p>
                          <div className="mt-1">{getStatusBadge(selectedUser.payment.status)}</div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Amount</p>
                          <p className="font-medium text-slate-800">
                            {selectedUser.payment.amount ? `PKR ${selectedUser.payment.amount.toLocaleString()}` : "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Transaction ID</p>
                          <p className="font-medium text-slate-800">{selectedUser.payment.transactionId || "N/A"}</p>
                        </div>
                      </div>

                      {/* Payment Screenshot */}
                      {selectedUser.payment.screenshotUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-slate-500 mb-2">Payment Screenshot</p>
                          <img
                            src={`http://localhost:5000${selectedUser.payment.screenshotUrl}`}
                            alt="Payment Screenshot"
                            className="max-w-md rounded-lg border border-slate-200"
                          />
                        </div>
                      )}

                      {selectedUser.payment.adminNotes && (
                        <div className="mt-4">
                          <p className="text-sm text-slate-500 mb-1">Admin Notes</p>
                          <p className="text-slate-700 bg-white rounded-lg p-3 border border-slate-200">
                            {selectedUser.payment.adminNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Account Status */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Email Verified:</span>
                    {selectedUser.isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Account Active:</span>
                    {selectedUser.isActive ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-slate-500">
                    Registered: {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}