"use client";

import { memo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingChatButtonProps {
  onClick: () => void;
}

export const FloatingChatButton = memo(({ onClick }: FloatingChatButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
      aria-label="打开聊天"
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="hover"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 脉动动画 */}
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
    </motion.button>
  );
});

FloatingChatButton.displayName = "FloatingChatButton";
