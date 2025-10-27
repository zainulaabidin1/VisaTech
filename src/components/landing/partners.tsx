import React from "react";
import { Globe, ExternalLink, Award, Handshake } from "lucide-react";

const partners = [
  {
    name: "BMET",
    logo: "/bmet.png",
    link: "https://www.bmet.gov.bd/",
    country: "Bangladesh",
    description: "Bureau of Manpower, Employment and Training",
  },
  {
    name: "NAVTTC",
    logo: "/navttc.png",
    link: "https://www.navttc.gov.pk/",
    country: "Pakistan",
    description: "National Vocational & Technical Training Commission",
  },
  {
    name: "TVEC",
    logo: "/tvec.png",
    link: "https://www.tvec.gov.lk/",
    country: "Sri Lanka",
    description: "Tertiary and Vocational Education Commission",
  },
  {
    name: "NSDC",
    logo: "/nsdc.png",
    link: "https://www.nsdcindia.org/",
    country: "India",
    description: "National Skill Development Corporation",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#003366]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#F59E0B]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003366]/10 to-[#F59E0B]/10 rounded-full px-5 py-2 mb-6">
            <Handshake className="w-5 h-5 text-[#003366]" />
            <span className="text-sm font-semibold text-[#003366] tracking-wide uppercase">
              Strategic Partnerships
            </span>
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#003366] to-[#004D99] bg-clip-text text-transparent mb-4">
            Our Trusted Partners
          </h2>
          
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Collaborating with leading organizations to drive excellence in vocational training and skill development
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] hover:border-[#003366]/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003366] via-[#F59E0B] to-[#059669]" />
              
              {/* Card Content */}
              <div className="p-8 flex flex-col items-center text-center h-full">
                {/* Country Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#059669] to-[#047857]" />
                  <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                    {partner.country}
                  </span>
                </div>

                {/* Partner Name */}
                <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] mb-6 flex-grow">
                  {partner.description}
                </p>

                {/* Logo Container */}
                <div className="relative mb-6 flex items-center justify-center w-full">
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] opacity-50 group-hover:opacity-70 transition-opacity" />
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110 filter drop-shadow-md"
                  />
                </div>

                {/* Visit Button */}
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003366] to-[#004D99] text-white font-semibold py-2.5 px-6 rounded-full hover:from-[#004D99] hover:to-[#003366] transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                >
                  <Globe className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/0 via-transparent to-[#F59E0B]/0 group-hover:from-[#003366]/5 group-hover:to-[#F59E0B]/5 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats or Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004D99] rounded-full mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#1E293B] mb-1">4+</p>
            <p className="text-sm text-[#64748B]">Countries</p>
          </div>
          
          <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full mb-3">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#1E293B] mb-1">Strong</p>
            <p className="text-sm text-[#64748B]">Partnerships</p>
          </div>
          
          <div className="text-center p-6 bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-full mb-3">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#1E293B] mb-1">Regional</p>
            <p className="text-sm text-[#64748B]">Impact</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;