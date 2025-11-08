"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  HeartPulse,
  Zap,
  PenTool,
  FileText,
  Stethoscope,
  Home,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  Lightbulb,
  Shield,
} from "lucide-react";
import companyData from "@/data/companyData.json";

// 图标映射
const iconMap = {
  Sparkles, Cpu, HeartPulse, Zap, PenTool, FileText, 
  Stethoscope, Home, TrendingUp, Shield, CheckCircle2,
  Users, Target, Lightbulb,
};

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 响应式 Section 组件
const Section = memo(({ children, className = "", id }: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="container mx-auto max-w-7xl">
      {children}
    </div>
  </section>
));
Section.displayName = "Section";

// Logo 组件 - 使用真实的 UUMI logo 图片
const UUMILogo = memo(({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={className}>
    <Image
      src="/uumi-logo.png"
      alt="UUMI Logo"
      width={48}
      height={48}
      className="w-full h-full object-contain"
      priority
    />
  </div>
));
UUMILogo.displayName = "UUMILogo";

// 导航栏组件
const Navigation = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "首页", href: "#home" },
    { label: "关于UUMI", href: "#about" },
    { label: "核心团队", href: "#team" },
    { label: "优势与服务", href: "#services" },
    { label: "成功案例", href: "#cases" },
    { label: "联系我们", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-md">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - 全新设计 */}
          <a href="#home" className="flex items-center space-x-3 group">
            {/* Logo 图标 */}
            <div className="relative">
              <UUMILogo className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg" />
            </div>
            
            {/* Logo 文字 */}
            <div className="relative">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                UUMI
              </h1>
              <p className="text-xs text-gray-600 hidden md:block font-semibold tracking-wide">悠悠米科技</p>
              {/* 底部装饰线 */}
              <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button className="gradient-primary text-white shadow-lg hover:shadow-xl transition-shadow">
              开始咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg px-4 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4 gradient-primary text-white">
              开始咨询
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
});
Navigation.displayName = "Navigation";

// Hero Section
const HeroSection = memo(() => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
    {/* 科技感背景装饰 */}
    <div className="absolute inset-0 tech-grid opacity-50" />
    
    {/* 浮动光点装饰 */}
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60" />
    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
    <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1.5s' }} />
    
    {/* 渐变光晕装饰 */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
    
    <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center">
      <motion.div {...fadeInUp}>
        <Badge className="mb-6 gradient-primary text-white border-0 shadow-lg px-6 py-2 text-sm">
          成立于 2023 · AI 智能化转型专家
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tech-title">
          <span className="tech-text-animated">让智能带来全新视界</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          四川悠悠米科技有限公司专注于将人工智能技术深度应用于解决实际产业痛点
        </p>
        
        <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          通过融合 AI 技术与行业知识，显著提升效率、优化流程、降低成本，最终解放生产力
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="tech-button gradient-primary text-white shadow-xl hover:shadow-2xl transition-all px-8 py-6 text-lg">
            了解更多我们的服务
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="tech-button border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
            <Phone className="mr-2 w-5 h-5" />
            联系我们
          </Button>
        </div>
      </motion.div>
    </div>
    
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
    </div>
  </section>
));
HeroSection.displayName = "HeroSection";

// Focus Areas Section
const FocusAreasSection = memo(() => (
  <Section className="bg-gradient-to-b from-white to-purple-50">
    <motion.div {...fadeInUp} className="text-center mb-16">
      <Badge className="mb-4 gradient-secondary text-white border-0 shadow-md">
        核心服务板块
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 tech-title">
        我们的<span className="gradient-text">焦点领域</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        致力于为以下关键领域提供精准的智能化解决方案，应对其工作中的实际需求和挑战
      </p>
    </motion.div>

    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {companyData.focusAreas.map((area, index) => {
        const Icon = iconMap[area.icon as keyof typeof iconMap] || Sparkles;
        return (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="tech-card group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 h-full tech-grid">
              <CardHeader>
                <div 
                  className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative"
                  style={{ backgroundColor: `${area.color}20` }}
                >
                  <Icon className="w-8 h-8 animate-float" style={{ color: area.color }} />
                  {/* 科技光点 */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: area.color }} />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                  {area.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  </Section>
));
FocusAreasSection.displayName = "FocusAreasSection";

// About Section
const AboutSection = memo(() => (
  <Section id="about" className="bg-white">
    <div className="max-w-4xl mx-auto">
      <motion.div {...fadeInUp} className="text-center">
        <Badge className="mb-4 gradient-primary text-white border-0 shadow-md">
          关于 UUMI
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          专注<span className="gradient-text">AI技术深度应用</span>
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed text-left">
          {companyData.aboutUs.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="flex items-start space-x-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">核心目标</h4>
              <p className="text-gray-600">{companyData.aboutUs.mission}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <Target className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">企业愿景</h4>
              <p className="text-gray-600">{companyData.aboutUs.vision}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
));
AboutSection.displayName = "AboutSection";

// Core Advantages Section
const AdvantagesSection = memo(() => (
  <Section className="bg-gradient-to-b from-purple-50 to-white">
    <motion.div {...fadeInUp} className="text-center mb-16">
      <Badge className="mb-4 gradient-accent text-white border-0 shadow-md">
        核心竞争力
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        为什么选择<span className="gradient-text">UUMI</span>？
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {companyData.coreAdvantages.map((advantage, index) => {
        const Icon = iconMap[advantage.icon as keyof typeof iconMap] || Sparkles;
        return (
          <motion.div
            key={index}
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="tech-card h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 tech-grid">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-lg relative group-hover:shadow-purple-500/50 transition-shadow">
                    <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    {/* 光环效果 */}
                    <div className="absolute inset-0 rounded-xl bg-purple-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{advantage.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{advantage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {advantage.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      {highlight}
                    </Badge>
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
AdvantagesSection.displayName = "AdvantagesSection";

// Team Section
const TeamSection = memo(() => (
  <Section id="team" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16">
      <Badge className="mb-4 gradient-primary text-white border-0 shadow-md">
        核心团队
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        认识我们的<span className="gradient-text">专家团队</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {companyData.team.intro}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {companyData.team.leadership.map((member, index) => (
        <motion.div
          key={index}
          {...fadeInUp}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="tech-card group hover:shadow-2xl transition-all duration-300 text-center h-full">
            <CardHeader>
              <div className="w-32 h-32 mx-auto mb-4 rounded-full gradient-primary p-1 shadow-xl relative group-hover:shadow-purple-500/50 transition-shadow">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Users className="w-16 h-16 text-purple-600 group-hover:scale-110 transition-transform" />
                </div>
                {/* 旋转光环 */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity animate-spin-slow" />
              </div>
              <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
              <CardDescription className="text-purple-600 font-semibold">
                {member.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{member.education}</p>
              <p className="text-sm text-gray-500 mb-4">{member.background}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.expertise.slice(0, 3).map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </Section>
));
TeamSection.displayName = "TeamSection";

// Case Studies Section
const CaseStudiesSection = memo(() => (
  <Section id="cases" className="bg-gradient-to-b from-white to-purple-50">
    <motion.div {...fadeInUp} className="text-center mb-16">
      <Badge className="mb-4 gradient-secondary text-white border-0 shadow-md">
        成功案例
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        <span className="gradient-text">真实场景</span>的智能化落地
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        深度融合 AI 技术与行业知识，为客户创造切实的商业价值
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {companyData.caseStudies.map((caseStudy, index) => {
        const Icon = iconMap[caseStudy.icon as keyof typeof iconMap] || FileText;
        return (
          <motion.div
            key={caseStudy.id}
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="tech-card group hover:shadow-2xl transition-all duration-300 h-full overflow-hidden border-2 border-transparent hover:border-purple-200">
              {/* Header with Icon - 科技感顶部条 */}
              <div 
                className="h-1 relative overflow-hidden"
                style={{ backgroundColor: caseStudy.color }}
              >
                {/* 扫描线效果 */}
                <div className="absolute inset-0 w-1/3 bg-white/30 transform -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
              </div>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ backgroundColor: `${caseStudy.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: caseStudy.color }} />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2" style={{ backgroundColor: caseStudy.color, color: 'white' }}>
                      {caseStudy.category}
                    </Badge>
                    <CardTitle className="text-xl font-bold mb-2">
                      {caseStudy.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {caseStudy.subtitle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">核心技术</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pain Point (if exists) */}
                {caseStudy.painPoint && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      <strong>痛点：</strong>{caseStudy.painPoint}
                    </p>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">核心功能</h4>
                  <Accordion type="single" collapsible>
                    {caseStudy.features.map((feature, idx) => (
                      <AccordionItem key={idx} value={`feature-${idx}`}>
                        <AccordionTrigger className="text-sm">
                          {feature.name}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600">
                          {feature.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Outcome */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-green-800 mb-1">项目成果</h4>
                      <p className="text-sm text-green-700">{caseStudy.outcome}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </Section>
));
CaseStudiesSection.displayName = "CaseStudiesSection";

// Contact Section
const ContactSection = memo(() => (
  <Section id="contact" className="bg-white">
    <motion.div {...fadeInUp} className="text-center mb-16">
      <Badge className="mb-4 gradient-primary text-white border-0 shadow-md">
        联系我们
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        开启您的<span className="gradient-text">智能化转型</span>之旅
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        期待与各行各业深度融合，协作走向新的未来
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <motion.div {...fadeInUp} className="space-y-6">
        <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">联系电话</h4>
                  <a href={`tel:${companyData.contact.phone}`} className="text-purple-600 hover:text-purple-700 font-medium">
                    {companyData.contact.phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{companyData.contact.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">电子邮箱</h4>
                  <a href={`mailto:${companyData.contact.email}`} className="text-purple-600 hover:text-purple-700 font-medium">
                    {companyData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">公司地址</h4>
                  <p className="text-gray-600">
                    {companyData.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold mb-4">让智能带来全新视界</h3>
            <p className="mb-6 opacity-90">
              我们看到了AI的蓬勃发展，也看到了当下AI发展的困境。我们期待与各行各业深度融合，协作走向新的未来。
            </p>
            <Button size="lg" className="w-full bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
              预约咨询
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Company Values */}
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <h3 className="text-2xl font-bold mb-6">我们的核心价值观</h3>
        <div className="space-y-4">
          {companyData.aboutUs.values.map((value, index) => (
            <Card key={index} className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{value}</h4>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-purple-50 border-2 border-purple-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">行业专家顾问</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">{companyData.team.teamSize.advisors.medical}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">{companyData.team.teamSize.advisors.power}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">{companyData.team.teamSize.advisors.design}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </Section>
));
ContactSection.displayName = "ContactSection";

// Footer
const Footer = memo(() => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="/uumi-logo.png"
              alt="UUMI Logo"
              width={44}
              height={44}
              className="object-contain"
            />
            <div>
              <h3 className="text-xl font-black tracking-tight">UUMI</h3>
              <p className="text-sm text-gray-400 font-medium">悠悠米科技</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {companyData.companyInfo.slogan}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">快速链接</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#about" className="hover:text-white transition-colors">关于我们</a></li>
            <li><a href="#team" className="hover:text-white transition-colors">核心团队</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">服务领域</a></li>
            <li><a href="#cases" className="hover:text-white transition-colors">成功案例</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">联系我们</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">联系方式</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{companyData.contact.phone}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{companyData.contact.email}</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
              <span>{companyData.contact.addressShort}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {companyData.companyInfo.name}. 保留所有权利。</p>
        <p className="mt-2">成立于 {companyData.companyInfo.founded} · 专注 AI 智能化转型</p>
      </div>
    </div>
  </footer>
));
Footer.displayName = "Footer";

// Main Page Component
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FocusAreasSection />
      <AboutSection />
      <AdvantagesSection />
      <TeamSection />
      <CaseStudiesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
