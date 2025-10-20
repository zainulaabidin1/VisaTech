import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#005B9E] via-[#007FC8] to-[#00A5E5] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/20 pt-8">
        
        {/* Left Section - Links */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-medium text-white/90">
          <a href="#" className="hover:text-[#F9C400] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#F9C400] transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-[#F9C400] transition-colors">
            Knowledge Center
          </a>
        </div>

        {/* Center Section - Social Icons */}
        <div className="flex items-center gap-4">
          {[Facebook, Twitter, Linkedin, Youtube].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-[#F9C400]/90 transition-all duration-300"
            >
              <Icon className="w-5 h-5 text-white hover:text-[#005B9E]" />
            </a>
          ))}
        </div>

        {/* Right Section - Logos and Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p className="text-white/80 text-sm mb-2">
            © 2025 PACC — All rights reserved
          </p>

          <div className="flex items-center gap-3">
            <Image
              src="/takamol.png"
              alt="Takamol"
              width={80}
              height={30}
              className="object-contain"
            />
            <Image
              src="/hrsd.png"
              alt="Human Resources and Social Development"
              width={80}
              height={30}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
