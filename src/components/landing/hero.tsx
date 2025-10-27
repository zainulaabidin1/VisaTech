import React, { useState } from 'react';
import { ArrowRight, Award, Globe, TrendingUp, Sparkles } from 'lucide-react';

export default function Hero() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const features = [
    { icon: Award, text: "Industry-Leading Certification" },
    { icon: Globe, text: "Global Recognition" },
    { icon: TrendingUp, text: "Career Advancement" }
  ];

  const stats = [
    { value: "50K+", label: "Certified Professionals" },
    { value: "150+", label: "Countries Worldwide" },
    { value: "98%", label: "Success Rate" },
    { value: "500+", label: "Corporate Partners" }
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            font-family: 'Poppins', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section - Full Screen */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#003366] via-[#004D99] to-[#0066B2] py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-[#00A5E5]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-30" />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-8xl mx-20 px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-sm font-semibold text-white tracking-wide">Professional Accreditation & Certification</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-white tracking-tight">
                Transform Your
                <br />
                <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#FBBF24] bg-clip-text text-transparent">
                  Professional Journey
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-medium max-w-xl">
                Achieve internationally recognized professional certifications and unlock global career opportunities with world-class training programs.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-sm text-white font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap mb-12">
                <button
                  onClick={() => setIsSignUpOpen(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-bold rounded-full shadow-2xl hover:shadow-[#F59E0B]/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-base">Start Your Certification</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full font-semibold backdrop-blur-sm transition-all duration-300"
                >
                  Sign In
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-left">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:flex items-center justify-center h-full max-h-[800px]">
              <div className="relative w-full max-w-lg animate-float">
                {/* Decorative Background Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#FCD34D]/20 rounded-3xl blur-2xl" />
                
                {/* Main Image Container */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-2 border border-white/20 shadow-2xl">
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] aspect-[3/4]">
                    {/* Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop" 
                      alt="Professional team collaboration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Stats Cards - Adjusted positioning */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl border border-[#E2E8F0] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#1E293B]">98%</div>
                      <div className="text-xs text-[#64748B] font-medium">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-[#E2E8F0] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#004D99] flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#1E293B]">150+</div>
                      <div className="text-xs text-[#64748B] font-medium">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsSignUpOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004D99] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] mb-2">Start Your Journey</h3>
              <p className="text-[#64748B] font-medium">Create your account to begin certification</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#003366] focus:outline-none transition-colors font-medium"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#003366] focus:outline-none transition-colors font-medium"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#003366] focus:outline-none transition-colors font-medium"
              />
            </div>

            <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#003366] to-[#004D99] hover:from-[#004D99] hover:to-[#0066B2] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-3">
              Create Account
            </button>
            
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="w-full px-6 py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsSignInOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004D99] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] mb-2">Welcome Back</h3>
              <p className="text-[#64748B] font-medium">Sign in to continue your journey</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#003366] focus:outline-none transition-colors font-medium"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0] focus:border-[#003366] focus:outline-none transition-colors font-medium"
              />
            </div>

            <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#003366] to-[#004D99] hover:from-[#004D99] hover:to-[#0066B2] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-3">
              Sign In
            </button>
            
            <button
              onClick={() => setIsSignInOpen(false)}
              className="w-full px-6 py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}