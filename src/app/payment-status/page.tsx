"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Clock,
    CheckCircle,
    AlertCircle,
    Upload,
    Phone,
    Building2,
    Copy,
    Check,
    Loader2,
    XCircle,
    FileText,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Types
interface PaymentData {
    id: string;
    status: "pending_amount" | "pending_payment" | "pending_verification" | "approved" | "rejected";
    amount: number | null;
    bankAccountTitle: string;
    bankAccountNumber: string;
    paymentMethod: string;
    screenshotUrl: string | null;
    transactionId: string | null;
    adminNotes: string | null;
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

export default function PaymentStatusPage() {
    const [payment, setPayment] = useState<PaymentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = getUserData();
        const token = getAuthToken();

        if (!token || !userData) {
            router.push("/signin");
            return;
        }

        if (userData.role === "admin") {
            router.push("/admin");
            return;
        }

        setUser(userData);
        fetchPaymentStatus();
    }, [router]);

    const fetchPaymentStatus = async () => {
        try {
            const token = getAuthToken();
            const response = await fetch("http://localhost:5000/api/payments/my-status", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (result.success) {
                setPayment(result.data);
            }
        } catch (err) {
            console.error("Error fetching payment status:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyAccount = () => {
        if (payment?.bankAccountNumber) {
            navigator.clipboard.writeText(payment.bankAccountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setScreenshotFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitProof = async () => {
        if (!transactionId.trim()) {
            setError("Please enter the transaction ID");
            return;
        }
        if (!screenshotFile) {
            setError("Please upload a screenshot of your payment");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const token = getAuthToken();

            // First upload the screenshot
            const formData = new FormData();
            formData.append("screenshot", screenshotFile);

            const uploadResponse = await fetch("http://localhost:5000/api/passports/upload-payment-screenshot", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (!uploadResult.success) {
                throw new Error("Failed to upload screenshot");
            }

            // Submit payment proof
            const response = await fetch("http://localhost:5000/api/payments/submit-proof", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    transactionId: transactionId.trim(),
                    screenshotUrl: uploadResult.data.url,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setPayment((prev) => prev ? { ...prev, status: "pending_verification" } : null);
            } else {
                setError(result.message || "Failed to submit payment proof");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusConfig = () => {
        switch (payment?.status) {
            case "pending_amount":
                return {
                    icon: Clock,
                    title: "Awaiting Contact",
                    subtitle: "Our representative will reach out soon",
                    color: "from-amber-500 to-orange-500",
                    bgColor: "bg-amber-50",
                    borderColor: "border-amber-200",
                    textColor: "text-amber-700",
                };
            case "pending_payment":
                return {
                    icon: CreditCard,
                    title: "Payment Required",
                    subtitle: "Complete your payment to continue",
                    color: "from-blue-500 to-indigo-500",
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-200",
                    textColor: "text-blue-700",
                };
            case "pending_verification":
                return {
                    icon: FileText,
                    title: "Under Review",
                    subtitle: "We're verifying your payment",
                    color: "from-purple-500 to-pink-500",
                    bgColor: "bg-purple-50",
                    borderColor: "border-purple-200",
                    textColor: "text-purple-700",
                };
            case "approved":
                return {
                    icon: CheckCircle,
                    title: "Payment Approved!",
                    subtitle: "Your account is now active",
                    color: "from-emerald-500 to-green-500",
                    bgColor: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                    textColor: "text-emerald-700",
                };
            case "rejected":
                return {
                    icon: XCircle,
                    title: "Payment Issue",
                    subtitle: "Please review and resubmit",
                    color: "from-red-500 to-rose-500",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    textColor: "text-red-700",
                };
            default:
                return {
                    icon: AlertCircle,
                    title: "Loading...",
                    subtitle: "",
                    color: "from-gray-400 to-gray-500",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    textColor: "text-gray-700",
                };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-white/80">Loading payment status...</p>
                </motion.div>
            </div>
        );
    }

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Welcome, {user?.firstName || "User"}!
                    </h1>
                    <p className="text-blue-200/80">Payment & Account Status</p>
                </motion.div>

                {/* Main Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden"
                >
                    {/* Status Header */}
                    <div className={`bg-gradient-to-r ${statusConfig.color} p-6`}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <StatusIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{statusConfig.title}</h2>
                                <p className="text-white/80">{statusConfig.subtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content based on status */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {/* Pending Amount - Waiting for admin */}
                            {payment?.status === "pending_amount" && (
                                <motion.div
                                    key="pending_amount"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Phone className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        Hang Tight!
                                    </h3>
                                    <p className="text-blue-200/70 max-w-md mx-auto mb-6">
                                        Our customer representative will contact you shortly via call or SMS
                                        to discuss the details and finalize the payment amount.
                                    </p>
                                    <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-xl p-4 inline-block`}>
                                        <div className="flex items-center gap-2">
                                            <Clock className={`w-5 h-5 ${statusConfig.textColor}`} />
                                            <span className={`font-medium ${statusConfig.textColor}`}>
                                                Expected contact within 24-48 hours
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Pending Payment - Show payment details */}
                            {payment?.status === "pending_payment" && (
                                <motion.div
                                    key="pending_payment"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Amount to Pay */}
                                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 border border-blue-400/30">
                                        <p className="text-blue-200/70 text-sm mb-1">Amount to Pay</p>
                                        <p className="text-4xl font-bold text-white">
                                            PKR {payment.amount?.toLocaleString() || "0"}
                                        </p>
                                    </div>

                                    {/* Bank Details */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Building2 className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-white">Payment Details</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-blue-200/60">Payment Method</p>
                                                <p className="text-white font-medium capitalize">
                                                    {payment.paymentMethod}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-blue-200/60">Account Title</p>
                                                <p className="text-white font-medium">{payment.bankAccountTitle}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-blue-200/60">Account Number</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-mono text-lg">
                                                        {payment.bankAccountNumber}
                                                    </p>
                                                    <button
                                                        onClick={handleCopyAccount}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    >
                                                        {copied ? (
                                                            <Check className="w-4 h-4 text-green-400" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-blue-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upload Proof Section */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                            <Upload className="w-5 h-5 text-blue-400" />
                                            Submit Payment Proof
                                        </h4>

                                        {error && (
                                            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 mb-4">
                                                <p className="text-red-200 text-sm">{error}</p>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {/* Transaction ID Input */}
                                            <div>
                                                <label className="block text-sm text-blue-200/70 mb-2">
                                                    Transaction ID / Reference Number
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={transactionId}
                                                    onChange={(e) => setTransactionId(e.target.value)}
                                                    placeholder="Enter transaction ID"
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                                />
                                            </div>

                                            {/* Screenshot Upload */}
                                            <div>
                                                <label className="block text-sm text-blue-200/70 mb-2">
                                                    Payment Screenshot
                                                </label>
                                                <div
                                                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${screenshotPreview
                                                        ? "border-green-400/50 bg-green-500/10"
                                                        : "border-white/20 hover:border-blue-400/50"
                                                        }`}
                                                >
                                                    {screenshotPreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={screenshotPreview}
                                                                alt="Payment screenshot"
                                                                className="max-h-48 mx-auto rounded-lg"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    setScreenshotFile(null);
                                                                    setScreenshotPreview(null);
                                                                }}
                                                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <label className="cursor-pointer block">
                                                            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                                            <p className="text-white/70">Click to upload screenshot</p>
                                                            <p className="text-xs text-white/40 mt-1">PNG, JPG up to 5MB</p>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                onClick={handleSubmitProof}
                                                disabled={submitting}
                                                className="w-full py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Payment Proof
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Pending Verification */}
                            {payment?.status === "pending_verification" && (
                                <motion.div
                                    key="pending_verification"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FileText className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        Payment Submitted Successfully!
                                    </h3>
                                    <p className="text-blue-200/70 max-w-md mx-auto mb-6">
                                        We're currently verifying your payment. You'll receive a confirmation
                                        email once your payment has been approved.
                                    </p>
                                    <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4 inline-block">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-purple-300" />
                                            <span className="font-medium text-purple-200">
                                                Verification usually takes 1-2 business days
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Approved */}
                            {payment?.status === "approved" && (
                                <motion.div
                                    key="approved"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        You're All Set!
                                    </h3>
                                    <p className="text-blue-200/70 max-w-md mx-auto mb-6">
                                        Your payment has been verified and approved. You now have full access
                                        to all services.
                                    </p>
                                    <Button
                                        onClick={() => router.push("/")}
                                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-6 rounded-xl"
                                    >
                                        Go to Landing Page
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            )}

                            {/* Rejected */}
                            {payment?.status === "rejected" && (
                                <motion.div
                                    key="rejected"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-4"
                                >
                                    {payment.adminNotes && (
                                        <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6">
                                            <p className="text-red-200/70 text-sm mb-1">Reason:</p>
                                            <p className="text-white">{payment.adminNotes}</p>
                                        </div>
                                    )}
                                    <p className="text-blue-200/70 text-center mb-6">
                                        Please review the issue above and resubmit your payment proof.
                                    </p>
                                    <Button
                                        onClick={() => fetchPaymentStatus()}
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl"
                                    >
                                        Refresh Status
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Help Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center"
                >
                    <p className="text-blue-200/60 text-sm">
                        Need help?{" "}
                        <a href="mailto:support@visaa.com" className="text-blue-400 hover:underline">
                            Contact Support
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
