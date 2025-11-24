"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Zap,
  FileText,
  Home,
  TrendingUp,
  CheckCircle2,
  Shield,
  Languages,
  Quote,
  MessageCircle,
} from "lucide-react";
import companyDataZh from "@/data/companyData.json";
import companyDataEn from "@/data/companyData.en.json";
import uiTextZh from "@/data/uiText.json";
import uiTextEn from "@/data/uiText.en.json";

// 定义类型
type CompanyData = typeof companyDataZh;
type UIText = typeof uiTextZh;

// 图标映射
const iconMap = {
  Sparkles, Cpu, Zap, FileText, 
  Home, TrendingUp, Shield, CheckCircle2,
};

const iconColorMap: Record<string, { base: string; accent: string }> = {
  Sparkles: { base: "#FDF4FF", accent: "#C026D3" },
  Cpu: { base: "#ECFDF5", accent: "#047857" },
  Zap: { base: "#FEF3C7", accent: "#C2410C" },
  FileText: { base: "#F5F5F4", accent: "#7C3AED" },
  Home: { base: "#EEF2FF", accent: "#4338CA" },
  TrendingUp: { base: "#F0F9FF", accent: "#0EA5E9" },
  Shield: { base: "#FFF1F2", accent: "#BE123C" },
  CheckCircle2: { base: "#F0FDF4", accent: "#16A34A" },
};

const defaultIconPalette = { base: "#FFF7ED", accent: "#8B2F2F" };

// 优化的动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  },
  viewport: { once: true, margin: "-100px" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// 响应式 Section 组件
type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
};

const Section = memo(({ children, className = "", id, fullHeight = true }: SectionProps) => {
  const layoutClass = fullHeight ? "min-h-screen flex items-center justify-center" : "";
  const spacingClass = fullHeight ? "py-20 sm:py-24 md:py-32" : "py-8 sm:py-10 md:py-12";

  return (
    <section
      id={id}
      className={`${layoutClass} ${spacingClass} px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}
    >
      <div className="container mx-auto max-w-7xl w-full">
        {children}
      </div>
    </section>
  );
});
Section.displayName = "Section";

// Logo 组件 - 左上角
const LogoComponent = memo(() => (
  <div className="fixed top-6 left-6 z-50">
    <Image
      src="/favorite.png"
      alt="知象数据 Logo"
      width={120}
      height={40}
      className="object-contain"
      priority
    />
  </div>
));
LogoComponent.displayName = "LogoComponent";

// 语言切换按钮组件
const LanguageToggle = memo(({ uiText }: { uiText: UIText }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      title={uiText.navigation.switchLanguage}
      aria-label={uiText.navigation.switchLanguage}
    >
      <Languages className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-gray-700">{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
});
LanguageToggle.displayName = "LanguageToggle";

// 第一屏: Hero Section
const HeroSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => {
  const { language } = useLanguage();
  
  return (
  <Section className="bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
    {/* 背景装饰 */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 text-center">
      <motion.div {...fadeInUp}>
        {/* 标签 */}
        <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-gradient-primary rounded-full">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white tracking-wider uppercase">{companyData.companyInfo.tagline}</span>
        </div>
        
        {/* 超大标题 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-8 md:mb-12 leading-[1.1] tracking-tight">
          <span className="block text-primary font-medium">
            {companyData.companyInfo.slogan.split('为知识产权全链条')[0]}
            {language === 'zh' ? '为知识产权全链条' : 'Activating Data Value'}
          </span>
          <span className="block text-gray-800 mt-2">
            {language === 'zh' ? '激活数据价值' : 'for the Entire IP Chain'}
          </span>
        </h1>
        
        {/* 副标题 */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 md:mb-16 max-w-4xl mx-auto font-light leading-[1.7]">
          {companyData.companyInfo.subtitle}
        </p>
        
        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="cta-button px-10 py-6 text-base tracking-wide w-full sm:w-auto min-h-[56px]" 
            asChild
          >
            <a href="#solutions">
              {uiText.hero.learnMore}
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="secondary-button px-10 py-6 text-base tracking-wide w-full sm:w-auto min-h-[56px]" 
            asChild
          >
            <a href="#contact">
              {uiText.hero.contactUs}
            </a>
          </Button>
        </div>

        {/* 统计数据 */}
        <div className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            { label: language === 'zh' ? '服务客户' : 'Clients', value: '500+' },
            { label: language === 'zh' ? '数据来源' : 'Data Sources', value: '50+' },
            { label: language === 'zh' ? '场景应用' : 'Applications', value: '100+' },
            { label: language === 'zh' ? '客户满意度' : 'Satisfaction', value: '95%' },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-light text-primary mb-1 md:mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-light">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </Section>
  );
});
HeroSection.displayName = "HeroSection";

// 第二屏: Solutions Section
const SolutionsSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => {
  const { language } = useLanguage();
  
  return (
  <Section id="solutions" className="bg-white" fullHeight={false}>
    <motion.div {...fadeInUp} className="text-center mb-6 sm:mb-8 md:mb-10">
      <p className="mb-3 md:mb-4 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.solutions.badge}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-5 tracking-tight text-gray-900 leading-[1.2]">
        {uiText.solutions.title.split(',')[0]}
      </h2>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary mb-4 md:mb-5">
        {language === 'zh' ? '费用低，实效强' : 'Low cost, strong effectiveness'}
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-light leading-[1.7]">
        {uiText.solutions.subtitle}
      </p>
    </motion.div>

    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {companyData.focusAreas.map((area, index) => {
        const Icon = iconMap[area.icon as keyof typeof iconMap] || Shield;
        return (
          <motion.div key={index} variants={fadeInUp}>
            <Card 
              className="tech-card group h-full bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-500"
              style={{ borderColor: area.color + '40' }}
            >
              <CardHeader className="pb-6 p-0">
                <div 
                  className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: area.color + '15' }}
                >
                  <Icon className="w-8 h-8" style={{ color: area.color }} />
                </div>
                <CardTitle className="text-xl md:text-2xl font-medium mb-4 tracking-tight" style={{ color: area.color }}>
                  {area.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-700 leading-[1.8] font-light text-base">{area.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
  );
});
SolutionsSection.displayName = "SolutionsSection";

// 第三屏: Data System Section
const DataSystemSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => (
  <Section className="bg-gradient-to-br from-gray-50 to-white" fullHeight={false}>
    <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-12 md:mb-14">
      <p className="mb-3 md:mb-4 text-gray-500 font-light text-xs md:text-sm tracking-[0.15em] uppercase">
        {uiText.dataSystem.badge}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-5 tracking-tight text-gray-900 leading-[1.2]">
        {uiText.dataSystem.title}
      </h2>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-secondary mb-5 md:mb-6">
        {uiText.dataSystem.titleHighlight}
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-light leading-[1.7]">
        {uiText.dataSystem.subtitle}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {companyData.coreAdvantages.map((advantage, index) => {
        const Icon = iconMap[advantage.icon as keyof typeof iconMap] || Sparkles;
        const palette = iconColorMap[advantage.icon as string] ?? defaultIconPalette;
        return (
          <motion.div
            key={index}
            {...fadeInUp}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="tech-card h-full bg-white p-8 md:p-10 hover:shadow-2xl transition-all duration-500">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-start space-x-5">
                  <div
                    className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-2xl border shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${palette.base}, ${palette.accent}22)`,
                      borderColor: `${palette.accent}33`,
                      color: palette.accent,
                    }}
                  >
                    <Icon className="w-7 h-7" />
                    <span className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight leading-tight pt-2">
                    {advantage.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 leading-[1.8] mb-6 font-light text-base md:text-lg">{advantage.description}</p>
                <div className="flex flex-wrap gap-3">
                  {advantage.highlights.map((highlight, idx) => (
                    <span key={idx} className="stat-badge text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </Section>
));
DataSystemSection.displayName = "DataSystemSection";

// 第四屏: Testimonials & Contact Section  
const TestimonialsContactSection = memo(({ companyData, uiText }: { companyData: CompanyData; uiText: UIText }) => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      company: "万商天勤",
      content: language === 'zh' 
        ? "知象数据实际上为我们节省了成本，并提供了更精准的客户开发商机；" 
        : "Zhixiang Data has actually saved us costs and provided more precise customer development opportunities;",
      icon: "Shield"
    },
    {
      company: "首捷集团",
      content: language === 'zh'
        ? "借由知象数据我们首次将业务覆盖到海外多个国家，并取得了不错的效果；"
        : "Through Zhixiang Data, we expanded our business to multiple overseas countries for the first time with good results;",
      icon: "TrendingUp"
    },
    {
      company: "交子金控",
      content: language === 'zh'
        ? "知象数据首次让我们见识到了数据驱动业务的可行性；"
        : "Zhixiang Data showed us the feasibility of data-driven business for the first time;",
      icon: "CheckCircle2"
    }
  ];

  return (
  <Section id="contact" className="bg-white" fullHeight={false}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
      {/* 左侧: 客户见证 */}
      <motion.div {...fadeInUp}>
        <p className="mb-4 text-gray-500 font-light text-xs tracking-[0.15em] uppercase">
          {uiText.testimonials.badge}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight text-gray-900 leading-[1.2]">
          {uiText.testimonials.title}
      </h2>
        <p className="text-lg text-secondary font-medium mb-8">
          {uiText.testimonials.titleHighlight}
        </p>
        <p className="text-base text-gray-600 mb-12 font-light leading-[1.8]">
          {uiText.testimonials.subtitle}
        </p>

        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          {...fadeInUp}
              transition={{ delay: index * 0.15 }}
              className="relative pl-6 border-l-4 border-primary py-2"
            >
              <Quote className="absolute -left-2 top-0 w-8 h-8 text-accent opacity-20" />
              <p className="text-gray-700 italic mb-3 leading-[1.8] text-base">{testimonial.content}</p>
              <p className="text-sm font-medium text-primary">— {testimonial.company}</p>
        </motion.div>
      ))}
    </div>
    </motion.div>

      {/* 右侧: 联系表单 */}
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <p className="mb-4 text-gray-500 font-light text-xs tracking-[0.15em] uppercase">
        {uiText.contact.badge}
      </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight text-gray-900 leading-[1.2]">
          {uiText.contact.title}
      </h2>
        <p className="text-lg text-accent font-medium mb-8">
          {uiText.contact.titleHighlight}
        </p>
        <p className="text-base text-gray-600 mb-12 font-light leading-[1.8]">
        {uiText.contact.subtitle}
      </p>

        {/* 联系卡片 */}
        <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white p-10 border-0 shadow-2xl">
          <CardContent className="p-0 space-y-8">
            <div>
              <h3 className="text-sm font-light mb-3 tracking-wider uppercase opacity-90">
                {uiText.contact.emailLabel}
              </h3>
              <a 
                href={`mailto:${companyData.contact.email}`} 
                className="text-xl font-light hover:text-accent-hover transition-colors"
              >
                {companyData.contact.email}
              </a>
          </div>

            {companyData.contact.phone && (
              <div>
                <h3 className="text-sm font-light mb-3 tracking-wider uppercase opacity-90">
                  {uiText.contact.phoneLabel}
                </h3>
                <a 
                  href={`tel:${companyData.contact.phone}`} 
                  className="text-xl font-light hover:text-accent-hover transition-colors"
                >
                  {companyData.contact.phone}
                </a>
                <p className="text-sm mt-2 opacity-80">{companyData.contact.workingHours}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-light mb-3 tracking-wider uppercase opacity-90">
                {uiText.contact.addressLabel}
              </h3>
              <p className="text-base font-light leading-relaxed opacity-90">
                {companyData.contact.address}
              </p>
              {!companyData.contact.phone && (
                <p className="text-sm mt-3 opacity-80">{companyData.contact.workingHours}</p>
              )}
        </div>

            <div className="pt-6">
              <Button 
                size="lg" 
                className="w-full bg-white text-primary hover:bg-gray-100 border-0 shadow-lg px-8 py-6 text-base font-semibold tracking-wide min-h-[56px]"
                asChild
              >
                <a href={`mailto:${companyData.contact.email}?subject=${encodeURIComponent(language === 'zh' ? '咨询知象数据服务' : 'Inquiry about Zhixiang Data Services')}`} className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{uiText.contact.cta}</span>
            </a>
          </Button>
        </div>
          </CardContent>
        </Card>

        {/* 服务列表 */}
        <div className="mt-10 space-y-4">
          {companyData.contact.services.map((service, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 font-light leading-relaxed">{service}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Footer */}
    <motion.div 
      {...fadeInUp} 
      transition={{ delay: 0.4 }}
      className="mt-12 pt-8 border-t border-gray-200 text-center"
    >
      <p className="text-sm text-gray-500 font-light">
        © {new Date().getFullYear()} {companyData.companyInfo.name}. {language === 'zh' ? '版权所有' : 'All rights reserved.'}
      </p>
      <p className="text-xs text-gray-400 mt-2 font-light">
        {language === 'zh' ? '专注于知识产权数据服务' : 'Focus on IP Data Services'}
      </p>
    </motion.div>
  </Section>
  );
});
TestimonialsContactSection.displayName = "TestimonialsContactSection";

// Main Page Component
export default function HomePage() {
  const { language } = useLanguage();
  const [companyData, setCompanyData] = useState<CompanyData>(companyDataZh);
  const [uiText, setUiText] = useState<UIText>(uiTextZh);

  useEffect(() => {
    setCompanyData(language === 'zh' ? companyDataZh : (companyDataEn as unknown as CompanyData));
    setUiText(language === 'zh' ? uiTextZh : (uiTextEn as unknown as UIText));
  }, [language]);

  return (
    <main className="min-h-screen bg-white">
      <LogoComponent />
      <LanguageToggle uiText={uiText} />
      <HeroSection companyData={companyData} uiText={uiText} />
      <SolutionsSection companyData={companyData} uiText={uiText} />
      <DataSystemSection companyData={companyData} uiText={uiText} />
      <TestimonialsContactSection companyData={companyData} uiText={uiText} />
    </main>
  );
}
