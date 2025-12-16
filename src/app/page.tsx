"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChatModal } from "@/components/ChatModal";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { motion } from "framer-motion";
import {
  Languages,
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
import companyDataZh from "@/data/companyData.json";
import companyDataEn from "@/data/companyData.en.json";
import uiTextZh from "@/data/uiText.json";
import uiTextEn from "@/data/uiText.en.json";

// 定义类型
type CompanyData = typeof companyDataZh;
type UIText = typeof uiTextZh;

// 优化的动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  },
  viewport: { once: true, margin: "0px" },
};

// 语言切换按钮组件
const LanguageToggle = memo(({ uiText }: { uiText: UIText }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      title={uiText.navigation.switchLanguage}
    >
      <Languages className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-gray-700">{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
});
LanguageToggle.displayName = "LanguageToggle";

// 主页面组件
export default function HomePage() {
  const { language } = useLanguage();
  const companyData = language === 'zh' ? companyDataZh : (companyDataEn as unknown as CompanyData);
  const uiText = language === 'zh' ? uiTextZh : (uiTextEn as unknown as UIText);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <LanguageToggle uiText={uiText} />
      
      {/* 聊天模态框 */}
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
      
      {/* 浮动聊天按钮 */}
      <FloatingChatButton onClick={() => setIsChatModalOpen(true)} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div {...fadeInUp}>
            {/* Logo - 大气简洁设计 */}
            <div className="mb-16 flex justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <Image
                  src="/images/team/favorite.png"
                  alt="工厂AI数字员工"
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* 标签 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-8 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white tracking-wider uppercase">
                {companyData.companyInfo.tagline}
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                工厂AI数字员工
              </span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-10 font-medium"
            >
              {companyData.companyInfo.slogan}
            </motion.p>

            {/* 描述 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {companyData.companyInfo.subtitle}
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <Button 
                size="lg" 
                onClick={() => setIsChatModalOpen(true)}
                className="cta-button px-12 py-7 text-lg font-semibold tracking-wide w-full sm:w-auto min-h-[64px] shadow-xl hover:shadow-2xl transition-all"
              >
                <Bot className="w-6 h-6 mr-3" />
                {language === 'zh' ? '开始使用' : 'Get Started'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="secondary-button px-12 py-7 text-lg font-semibold tracking-wide w-full sm:w-auto min-h-[64px] border-2"
              >
                <Link href="/chat">
                  {language === 'zh' ? '了解更多' : 'Learn More'}
                </Link>
              </Button>
            </motion.div>

            {/* 特性卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: language === 'zh' ? '7×24小时服务' : '24/7 Service',
                  desc: language === 'zh' ? '全天候智能助手' : 'Round-the-clock AI assistant',
                  color: '#8B2F39'
                },
                {
                  icon: Zap,
                  title: language === 'zh' ? '快速响应' : 'Fast Response',
                  desc: language === 'zh' ? '秒级智能回复' : 'Second-level response',
                  color: '#6B4C7A'
                },
                {
                  icon: TrendingUp,
                  title: language === 'zh' ? '效率提升' : 'Efficiency Boost',
                  desc: language === 'zh' ? '降本增效40%' : '40% efficiency improvement',
                  color: '#C9A872'
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: feature.color + '15' }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base text-center leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {companyData.companyInfo.name}. {language === 'zh' ? '版权所有' : 'All rights reserved.'}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {companyData.companyInfo.focus}
        </p>
      </footer>
    </main>
  );
}
