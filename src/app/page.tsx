"use client"

import { motion } from "framer-motion"
import Hero from "@/components/landing/hero"
import FindCenter from "@/components/landing/FindCenter" // ✅ import FindCenter
import { FeatureCards } from "../components/landing/feature-cards"
import { Stats } from "../components/landing/stats"
import { Updates } from "../components/landing/updates"
import PartnersSection from "../components/landing/partners"
import Header from "@/components/site/site-header"
import Footer from "../components/site/site-footer"
import { Parallax } from 'react-scroll-parallax'
import { useState, useEffect } from "react"
import { MultiStepSignupModal } from "../components/multistep-signup/MultiStepSignupModal"
import { ExamResultSection } from "@/components/landing/ExamResult"
import Advantages from "@/components/landing/Advantages"

export default function Page() {
  const [openSignup, setOpenSignup] = useState(false)

  useEffect(() => {
    const open = () => setOpenSignup(true)
    window.addEventListener("open-signup-modal", open)
    return () => window.removeEventListener("open-signup-modal", open)
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-blue-100/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground">
      {/* === Header === */}
      <Header />

      {/* === Hero Section === */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Parallax speed={-10}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent" />
          </Parallax>
          <div className="absolute top-[-200px] left-[50%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute bottom-[-200px] right-[40%] h-[400px] w-[400px] rounded-full bg-cyan-400/30 blur-3xl" />
        </div>

        <Hero />
      </section>
     

      {/* === FindCenter Section below Hero === */}
      <section className="relative">
        <FindCenter /> 
      </section>

      <section className="relative">
        <ExamResultSection /> 
      </section>

      <section className="relative">
        <Advantages /> 
      </section>


      {/* === Stats Section === */}
      {/* <section className="relative overflow-hidden bg-gradient-to-tr from-blue-100 via-blue-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20 md:py-28 text-center"
        >
          <h2 className="mb-10 text-3xl md:text-4xl font-semibold tracking-tight">
            Proven Impact
          </h2>
          <Stats />
        </motion.div>
      </section> */}


      {/* === Partners Section === */}
      <div className="relative bg-gradient-to-b from-accent/20 via-background to-muted/30 py-20 md:py-28">
        <svg
          className="absolute top-0 left-0 w-full text-blue-50 dark:text-slate-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0,64L1440,0L1440,320L0,320Z"></path>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center"
        >
          <PartnersSection />
        </motion.div>
      </div>

    

      {/* === Footer === */}
      <Footer />
      <MultiStepSignupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </main>
  )
}
