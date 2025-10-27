"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, CheckCircle, TrendingUp, Globe2, Award, Target } from "lucide-react";

const advantages = [
  {
    icon: <Users className="text-[#003366] w-7 h-7" />,
    title: "Enhanced Workforce Competence",
    description:
      "Ensures professional workers have the qualifications and skills necessary to excel in the Saudi labor market.",
    color: "from-[#059669]/10 to-[#047857]/10",
    borderColor: "border-[#059669]/20",
  },
  {
    icon: <CheckCircle className="text-[#F59E0B] w-7 h-7" />,
    title: "Quality Assurance",
    description:
      "Improves job performance and labor market outcomes by verifying professional qualifications.",
    color: "from-[#F59E0B]/10 to-[#D97706]/10",
    borderColor: "border-[#F59E0B]/20",
  },
  {
    icon: <TrendingUp className="text-[#059669] w-7 h-7" />,
    title: "Increased Productivity",
    description:
      "Completion of accreditation requirements leads to better-equipped employees and higher productivity.",
    color: "from-[#003366]/10 to-[#004D99]/10",
    borderColor: "border-[#003366]/20",
  },
  {
    icon: <Globe2 className="text-[#003366] w-7 h-7" />,
    title: "Global Competitive Edge",
    description:
      "Enhances the competitiveness of the Saudi workforce on the global stage.",
    color: "from-[#F59E0B]/10 to-[#D97706]/10",
    borderColor: "border-[#F59E0B]/20",
  },
];

export default function Advantages() {
  return (
    <section className="relative bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F59E0B]/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#059669]/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F59E0B]/10 to-[#D97706]/10 border border-[#F59E0B]/20 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm font-medium text-[#1E293B]">
              Program Benefits
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            Advantages of Professional
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
            Accreditation Program
          </h2>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/20 to-[#F59E0B]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white min-h-[500px]">
              <Image
                src="/advantages.png"
                alt="Professional Accreditation Program"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#059669]/10 to-[#047857]/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#003366]">50K+</p>
                    <p className="text-sm text-[#64748B]">Certified Professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Advantages Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${adv.borderColor} group cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${adv.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {adv.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#003366] mb-2 group-hover:text-[#F59E0B] transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003366]/5 to-[#059669]/5 rounded-full px-6 py-3 border border-[#E2E8F0]">
            <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <p className="text-sm text-[#64748B] font-medium">
              Join the growing community of certified professionals
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}