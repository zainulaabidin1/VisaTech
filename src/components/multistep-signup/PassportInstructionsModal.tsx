"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

type PassportInstructionsModalProps = {
  show: boolean
  onClose: () => void
  onConfirm: () => void
}

export function PassportInstructionsModal({
  show,
  onClose,
  onConfirm,
}: PassportInstructionsModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-3">
              Instructions for uploading Passport
            </h2>

            <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-4">
              <li>Only PNG, JPEG or JPG images must be used</li>
              <li>The size of the photo should not exceed 2 MBs</li>
              <li>
                If your last name is blank, please provide your father’s name as
                the last name
              </li>
              <li>
                The MRZ code should be clearly visible otherwise the request will
                be rejected
              </li>
              <li>
                The MRZ is 2 or 3 lines of letters, symbols, and numbers at the
                bottom of your passport details page
              </li>
            </ol>

            <div className="flex justify-center mt-4">
              <Image
                src="/passport-example.png"
                width={400}
                height={200}
                alt="passport example"
                className="rounded-lg border"
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              >
                I Understand
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
