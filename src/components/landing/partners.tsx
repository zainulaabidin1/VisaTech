import React from "react";
import { Globe } from "lucide-react";

const partners = [
  {
    name: "BMET",
    logo: "/bmet.png", // update image path
    link: "https://www.bmet.gov.bd/",
    gradient: "from-[#E8F4FA] to-[#CBE8F6]",
  },
  {
    name: "NAVTTC",
    logo: "/navttc.png",
    link: "https://www.navttc.gov.pk/",
    gradient: "from-[#F4FBF9] to-[#D3F2EB]",
  },
  {
    name: "TVEC",
    logo: "/tvec.png",
    link: "https://www.tvec.gov.lk/",
    gradient: "from-[#F7F8FC] to-[#DEE5FB]",
  },
  {
    name: "NSDC",
    logo: "/nsdc.png",
    link: "https://www.nsdcindia.org/",
    gradient: "from-[#FFF9EC] to-[#FDE7B2]",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F9FBFD] to-[#E8F4FA]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-[#005B9E] mb-16">
          Our Partners
        </h2>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${partner.gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between items-center text-center`}
            >
              <h3 className="text-2xl font-bold text-[#004C80] mb-8">
                {partner.name}
              </h3>

              {/* Logo with soft gradient circle behind */}
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute w-48 h-48 rounded-full bg-white/50 blur-2xl" />
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="relative w-44 h-44 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 bg-[#00A5E5] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#008FCC] transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
