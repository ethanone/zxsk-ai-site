"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="返回首页"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-xl font-semibold text-white">工厂AI数字员工</h1>
          </div>
        </div>
      </header>

      {/* iframe 全屏容器 */}
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
    </div>
  );
}
