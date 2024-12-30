"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  success: boolean;
}

export function Alert({ message, isVisible, onClose, success }: AlertProps) {
  const SECONDS_TO_AUTO_CLOSE = 5000;
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, SECONDS_TO_AUTO_CLOSE); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 transform translate-x-1/2 z-50"
        >
          <div
            className={`${
              success ? "bg-green-500" : "bg-red-500"
            } text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2`}
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
