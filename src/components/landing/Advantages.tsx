"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, CheckCircle, LineChart, Globe2 } from "lucide-react";

const advantages = [
  {
    icon: <Users className="text-[#005B9E] w-8 h-8" />,
    title: "Enhanced Workforce Competence",
    description:
      "The program ensures that professional workers have the qualifications and skills necessary to be competent in the Saudi labor market.",
  },
  {
    icon: <CheckCircle className="text-[#00A5E5] w-8 h-8" />,
    title: "Quality Assurance in Job Performance",
    description:
      "This program contributes to improving job performance and the quality of labor market outcomes by verifying professional qualifications.",
  },
  {
    icon: <LineChart className="text-[#F9C400] w-8 h-8" />,
    title: "Increased Productivity",
    description:
      "Completion of professional accreditation program requirements leads to increased productivity as employees are better equipped to perform their roles effectively.",
  },
  {
    icon: <Globe2 className="text-[#005B9E] w-8 h-8" />,
    title: "Competitive Edge for Saudi Arabia",
    description:
      "The Professional Accreditation Program enhances the competitiveness of the Saudi workforce globally.",
  },
];

export default function Advantages() {
  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/40 to-blue-100/10 py-20 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#00A5E5]/10 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#F9C400]/20 blur-3xl rounded-full -z-10" />

      <div className="container mx-auto px-6 md:px-10">
        {/* Centered Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-[#005B9E] mb-14"
        >
          Advantages of{" "}
          <span className="text-[#00A5E5]">Professional Accreditation Program</span>
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl min-h-[450px] flex"
          >
            <Image
              src="/advantages.png" // Replace with your actual image path
              alt="Professional Accreditation Program"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-8 flex flex-col justify-between"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {advantages.map((adv, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-50"
                >
                  <div className="mb-3">{adv.icon}</div>
                  <h3 className="font-semibold text-lg text-[#005B9E] mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
