"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true)
  const phoneNumber = "03095484001"
  
  // Optional: Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    // You can use either method:
    
    // Method 1: Direct link (recommended)
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
    
    // Method 2: Or if you want to open in the same window:
    // window.location.href = `https://wa.me/${phoneNumber}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className="fixed bottom-6 right-6 z-50 group"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Floating animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Button
          onClick={handleClick}
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7 text-white" />
          
          {/* Notification badge (optional) */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
          </span>
        </Button>
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with us on WhatsApp
        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-gray-900 transform rotate-45"></div>
      </div>
    </motion.div>
  )
}