"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Modal } from "../modal/CertificateCheck";

const examCards = [
  {
    title: "Check Certificate Validity",
    description:
      "Verify the authenticity of your certificate quickly and securely through our official online verification portal.",
    buttonText: "Check Certificate",
    image: "/certificate.png",
    link: "#",
    overlay: "from-[#005B9E]/70 to-[#00A5E5]/50",
    circleColor: "#F9C400",
  },
  {
    title: "Check Labor Result",
    description:
      "Access your labor test results instantly with our trusted verification system designed for your convenience.",
    buttonText: "Check Result",
    image: "/labor-bg.png",
    link: "#",
    overlay: "from-[#00A5E5]/70 to-[#005B9E]/50",
    circleColor: "#F9C400",
  },
];

export const ExamResultSection = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-[#F9FBFD] to-[#E8F4FA]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#005B9E] mb-16 text-center drop-shadow-md">
          Exam Result
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {examCards.map((card, idx) => (
            <motion.div
              key={idx}
              className="relative h-[430px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-[#E2F1FA]"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover brightness-95 transition-transform duration-500"
                />
              </motion.div>

              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.overlay} group-hover:from-[#F9C400]/50 group-hover:to-[#005B9E]/50 transition-all duration-700`}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  repeatType: "mirror",
                }}
                style={{ backgroundColor: card.circleColor }}
                className="absolute bottom-[-50px] right-[10%] w-[220px] h-[220px] blur-3xl rounded-full"
              />

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#F9C400] to-[#FFFFFF] drop-shadow-lg"
                  >
                    {card.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white text-base md:text-lg leading-relaxed drop-shadow-md bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10"
                  >
                    {card.description}
                  </motion.p>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  onClick={() => setOpenModal(card.title)}
                  className="mt-6 inline-block cursor-pointer px-8 py-3 font-semibold rounded-full shadow-lg text-[#005B9E] bg-gradient-to-r from-[#F9C400]/90 to-[#FFD84A]/90 hover:from-[#FFD84A] hover:to-[#F9C400] transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  {card.buttonText} →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <Modal
        isOpen={openModal === "Check Certificate Validity"}
        onClose={() => setOpenModal(null)}
        title="Check Certificate Validity"
        onVerify={() => alert("Verifying certificate...")}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Certificate Serial Number
            </label>
            <input
              type="text"
              placeholder="Enter Certificate Serial Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>
        </div>
      </Modal>

      {/* Labor Result Modal */}
      <Modal
        isOpen={openModal === "Check Labor Result"}
        onClose={() => setOpenModal(null)}
        title="Check Labor Result"
        onVerify={() => alert("Verifying labor result...")}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Occupation Key
            </label>
            <input
              type="text"
              placeholder="Enter Occupation Key"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Nationality Code
            </label>
            <input
              type="text"
              placeholder="Enter Nationality Code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
