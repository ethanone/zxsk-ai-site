"use client";

import { memo, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = memo(({ isOpen, onClose }: ChatModalProps) => {
  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary to-secondary">
              <h2 className="text-xl font-semibold text-white">工厂AI数字员工</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="关闭"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* iframe 容器 */}
            <div className="flex-1 relative">
              <iframe
                src="https://udify.app/chatbot/4q0zyeskIKOWQAVq"
                className="absolute inset-0 w-full h-full border-0"
                allow="microphone"
                title="AI Chat"
              />
              {/* 遮盖 Powered by Dify 水印 */}
              <div 
                className="absolute top-0 right-0 w-48 h-14 bg-[#1f1f1f] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ChatModal.displayName = "ChatModal";
