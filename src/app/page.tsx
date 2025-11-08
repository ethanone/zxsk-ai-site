"use client";

import dynamic from "next/dynamic";
import { Suspense, memo, useMemo, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  Network,
  Cpu,
  BrainCircuit,
  Briefcase,
  Layers,
  Shield,
  Factory,
  BatteryCharging,
  Target,
  Leaf,
  Mountain,
  Wind,
  Sun,
  Building,
  Car,
  Zap,
  Rocket,
  Phone,
  Mail,
  CheckCircle,
  GitCompareArrows,
  Monitor,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import companyData from "@/data/companyData.json";

// 动态导入重型组件以改善初始加载性能
const VantaNetBackground = dynamic(() => import("@/components/ui/VantaNetBackground"), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50" />,
  ssr: false,
});

const Timeline = dynamic(() => import("@/components/ui/Timeline").then(mod => ({ default: mod.Timeline })), {
  loading: () => <div className="h-32 bg-muted animate-pulse rounded" />,
});

// 类型定义
interface TargetMarket {
  name: string;
  icon: string;
}

// 图标映射
const iconMap = {
  Car, Shield, Cpu, Building, Monitor, Factory, BatteryCharging, 
  Rocket, Zap, Leaf, Mountain, Wind, Sun, Network, BrainCircuit,
  Briefcase, Layers, Target, CheckCircle, GitCompareArrows
};

// 优化的动画配置
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  taglineSpace: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
  },
} as const;

// 响应式Section组件
const Section = memo(({
  children,
  className = "",
  id,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
} & HTMLMotionProps<"section">) => (
  <motion.section
    id={id}
    variants={animations.staggerContainer}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.1 }}
    className={`container mx-auto px-4 py-8 md:py-12 lg:py-16 ${className}`}
    {...props}
  >
    {children}
  </motion.section>
));
Section.displayName = "Section";

// 优化的Header组件 - 增加移动端导航
const Header = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // 防止移动端菜单打开时页面滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "#about", label: "关于我们" },
    { href: "#products", label: "核心产品" },
    { href: "#tech-advantages", label: "技术优势" },
    { href: "#markets", label: "目标市场" },
    { href: "#advantages", label: "竞争优势" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-white to-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src="/blue_logo_huitu.webp"
              alt="HTZL.AI Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110 animate-[spin_30s_linear_infinite]"
              priority
            />
            <span className="font-bold text-xl md:text-3xl text-primary [text-shadow:0_0_12px_theme(colors.primary/0.4)]">
              HTZL.AI
            </span>
          </a>
          <span className="hidden lg:block text-sm md:text-lg text-foreground/80 font-medium tracking-wider">
            Horizon Tech Zone Link
          </span>
        </div>
        
        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm lg:text-base font-medium">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-muted-foreground transition-colors duration-300 hover:text-primary group"
              onClick={closeMobileMenu}
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex">
            <a href="#contact">联系我们</a>
          </Button>
          
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md">
          <nav className="grid grid-cols-2 gap-4 p-4">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-gray-800 transition-all py-3 px-4 rounded-xl 
                    bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl
                    hover:bg-primary/10 hover:text-primary 
                    text-center border border-gray-100"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-4 col-span-2 shadow-lg">
              <a href="#contact" onClick={closeMobileMenu}>联系我们</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
});
Header.displayName = "Header";


// 优化的Hero Section - 保留粒子效果
const HeroSection = memo(() => {
  return (
    <Section className="!p-0">
      <VantaNetBackground
        className="min-h-[90vh] sm:min-h-screen flex items-start sm:items-center justify-center relative pt-16 sm:pt-0"
        backgroundColor={0xffffff}
        dotColor={0x0066FF}
        lineColor={0x4A90E2}
        points={12.0}
        maxDistance={20.0}
        spacing={12.0}
        speed={0.6}
        scale={1.3}
        scaleMobile={0.9}
        colorMode="gradient"
        colorGradient={[
          [0x0066FF, 0.15],
          [0x1E88E5, 0.25],
          [0x0D47A1, 0.35],
          [0x1A237E, 0.42],
          [0x0277BD, 0.38],
          [0x01579B, 0.45],
        ]}
      >
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-5 gap-4 sm:gap-8 items-start lg:items-center">
            {/* 左侧内容区 - 增加宽度比例 */}
            <motion.div
              variants={animations.fadeIn}
              initial="initial"
              animate="animate"
              className="flex flex-col items-start space-y-4 md:space-y-6 text-left relative z-30 order-1 lg:col-span-3"
            >
              <div className="relative">
                {/* 恢复磨砂背景效果 */}
                <div className="absolute -inset-4">
                  <div className="w-full h-full max-w-lg rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl opacity-40" />
                </div>
                <h1 className="relative text-2xl sm:text-4xl font-bold tracking-tighter lg:text-6xl text-gray-900 dark:text-white drop-shadow-lg">
                  <br />
                  <span className="whitespace-nowrap">{companyData.companyInfo.name}</span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-5xl text-[#007BFF] [text-shadow:1px_1px_2px_rgba(0,0,0,0.15)]">智能连接未来</span>
                </h1>
                <motion.p
                  variants={animations.taglineSpace}
                  className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-semibold mt-4 drop-shadow-sm"
                >
                  Empowering Smart Mobility and AI Innovation
                </motion.p>
              </div>
              <div className="w-full max-w-3xl text-base md:text-lg pt-0 space-y-1 bg-white/88 rounded-xl p-3 md:p-4 lg:p-6 shadow-md border border-gray-200/20 dark:bg-black/82 dark:shadow-2xl dark:border-gray-700/40 backdrop-blur-md backdrop-saturate-100 ring-1 ring-white/10">
                {companyData.aboutUs.mission.map((line, idx) => (
                  <p
                    key={idx}
                    className="font-semibold text-gray-1000 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <Button size="lg" asChild className="mt-0 shadow-lg">
                <a href="#products">探索方案及产品</a>
              </Button>
            </motion.div>

            {/* 右侧Logo区 - 减小容器大小并调整定位 */}
            <motion.div 
              variants={animations.fadeIn} 
              initial="initial"
              animate="animate"
              className="hidden lg:flex justify-center relative z-30 mt-6 lg:mt-0 order-2 lg:col-span-2"
            >
              <div className="relative aspect-square w-full max-w-[320px] mx-auto">
                {/* Logo背景光晕 - 减小scale */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl scale-105"></div>
                <div className="animate-[spin_30s_linear_infinite] w-full h-full">
                  <Image
                    src="/logo.webp"
                    alt="HTZL.AI Logo"
                    fill
                    className="object-contain drop-shadow-xl transform-gpu will-change-transform"
                    priority
                    sizes="(max-width: 1024px) 0px, 320px"
                    quality={90}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </VantaNetBackground>
    </Section>
  );
});
HeroSection.displayName = "HeroSection";

// 优化的About Section
const AboutSection = memo(() => (
  <Section id="about" className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 border border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">关于我们</h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
        <strong>
          致力于在2030年前成为AI技术产业化关键细分领域的引领者。我们专注于将人工智能技术深度应用于解决实际产业痛点，帮助企业客户实现智能化转型，提升效率、降低成本、解放生产力。
        </strong>
        <br />
        <span className="text-base md:text-lg text-muted-foreground/80 font-bold">
        Committed to becoming a leader in the commercialization and industrialization of AI technologies within key industry segments by 2030.
        </span>
      </p>
      <div className="mt-6 flex justify-center flex-wrap gap-2">
        {companyData.aboutUs.values.map(value => (
          <Badge key={value} variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {value}
          </Badge>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">创始人：CTO+CEO+创新架构师</CardTitle>
          <p className="text-muted-foreground pt-2 text-sm md:text-base">
            5年通信工程 + MBA，是少有在产业端（工业、能源、投资）和通讯端（集成商、设备商）都有实战经验的
            <strong className="font-bold text-primary">&ldquo;双栖人才&rdquo;</strong>
            。作为<strong className="font-bold text-primary">电子科大科技园重点培育项目</strong>的核心主导，我们深度链接了中国最顶尖的前沿技术成果和人才资源。
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-4">关键经历</h4>
            <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded" />}>
              <Timeline
                items={[
                  {
                    icon: <Briefcase className="w-5 h-5" />, 
                    title: "产业实践",
                    description: "在金风科技、三一重工、PPP投资等行业巨头积累深厚实战经验。",
                  },
                ]}
              />
            </Suspense>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold">核心团队</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-base md:text-lg text-muted-foreground">
            公司核心团队由来自全球芯片现货巨头、世界500强、知名高校的多元人才组成，兼具国际视野与本土实践经验。成员曾操盘亚太市场、构建区域销售体系，主导AI医疗、智能电力等项目落地，累计为客户创造数亿级价值。我们深耕AI与行业融合，精通机器学习算法与系统架构，擅长将复杂技术转化为可落地的商业方案，以&ldquo;<span className='text-primary'>技术创新、协同共赢</span>&rdquo;为核心价值观，持续驱动技术突破与客户价值增长。
            </p>
          </div>
        </CardContent>
        <div className="text-center mt-0 pb-6">
          <Button size="lg" asChild>
            <a href="mailto:info@htzl.ai">加入我们</a>
          </Button>
        </div>
      </Card>
    </div>
  </Section>
));
AboutSection.displayName = "AboutSection";

// 优化的Product Lines Section
const ProductLinesSection = memo(() => (
  <Section id="products">
    <motion.div variants={animations.fadeIn} className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">核心产品线</h2>
    </motion.div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start">
      {companyData.productLines.map((line) => (
        <motion.div variants={animations.fadeIn} key={line.name} className="flex h-full">
          <div className="p-[2px] w-full rounded-xl bg-[linear-gradient(135deg,_#000066_0%,_#007BFF_50%,_#00A651_100%)] transition-all hover:shadow-xl hover:scale-105">
            <Card className="w-full h-full flex flex-col border-0 shadow-none rounded-xl">
              <CardHeader className="p-4">
                <CardTitle className="flex items-start gap-4">
                  {line.name.startsWith("时空") && (
                    <Network className="w-8 h-8 md:w-9 md:h-9 text-primary flex-shrink-0 mt-1 [filter:drop-shadow(0_0_6px_theme(colors.primary/0.6))] animate-pulse" />
                  )}
                  {line.name.startsWith("车辆") && (
                    <Cpu className="w-8 h-8 md:w-9 md:h-9 text-primary flex-shrink-0 mt-1 [filter:drop-shadow(0_0_6px_theme(colors.primary/0.6))] animate-pulse" />
                  )}
                  {line.name.startsWith("AI") && (
                    <BrainCircuit className="w-8 h-8 md:w-9 md:h-9 text-primary flex-shrink-0 mt-1 [filter:drop-shadow(0_0_6px_theme(colors.primary/0.6))] animate-pulse" />
                  )}
                  <span className="text-lg md:text-xl whitespace-normal break-words">{line.name}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground pt-2">{line.description}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col px-4 pb-4">
                <Accordion type="single" collapsible className="w-full">
                  {line.products.map((product) => (
                    <AccordionItem key={product.name} value={product.name}>
                      <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline">
                        {product.name}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        <p className="text-sm md:text-base text-muted-foreground">
                          {product.description}
                        </p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm md:text-base pl-1">
                          {(product.features || product.services)?.map(
                            (feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 [filter:drop-shadow(0_0_6px_theme(colors.primary/0.6))] animate-pulse" />
                                <span
                                  className={
                                    feature.includes("100Hz") || feature.includes("5-10厘米")
                                      ? "animate-pulse font-bold text-primary"
                                      : ""
                                  }
                                >
                                  {feature}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-auto pt-6 space-y-4">
                  {line.applications && (
                    <div>
                      <h4 className="font-semibold mb-3">应用领域</h4>
                      <div className="flex flex-wrap gap-2">
                        {line.applications.map(app => (
                          <span key={app} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">{app}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {line.coreTechnology && (
                    <div>
                      <h4 className="font-semibold mb-2">核心技术</h4>
                      <p className="text-muted-foreground text-sm md:text-base">{line.coreTechnology}</p>
                    </div>
                  )}
                  {line.keyFeatures && (
                    <div>
                      <h4 className="font-semibold mb-2">关键特性</h4>
                       <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:text-base">
                        {line.keyFeatures.map(feature => (
                          <li key={feature} className="flex items-center gap-2">
                             <Zap className="h-4 w-4 text-primary flex-shrink-0 [filter:drop-shadow(0_0_6px_theme(colors.primary/0.6))] animate-pulse"/>
                             <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
));
ProductLinesSection.displayName = "ProductLinesSection";

// 优化的Technical Advantages Section
const TechnicalAdvantagesSection = memo(() => (
  <Section id="tech-advantages">
    <motion.div variants={animations.fadeIn} className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">我们的独特优势</h2>
      <p className="text-base md:text-lg text-gray-200 mt-4 max-w-2xl mx-auto drop-shadow-md">
        <strong>我们不仅仅是提供理论建议，而是深入产业一线，将复杂的AI技术转化为可落地、产生实际价值的商业解决方案</strong>
      </p>
    </motion.div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {[
        {
          icon: <GitCompareArrows className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
          title: "产业深度融合与价值转化",
          description:
            "我们扎根于智慧交通、新能源、低空经济、工业诊断等垂直领域，拥有深刻的行业洞见。创始人具备'T型'知识结构，深厚的技术背景和MBA商业视野，确保解决方案的技术前瞻性与商业可行性，将复杂的AI技术转化为可落地、产生实际价值的商业解决方案。",
        },
        {
          icon: <Network className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
          title: "高效率与灵活性优势",
          description:
            "'一人公司'的组织模式，意味着沟通直接、决策迅速、执行力强，为您提供高性价比、结果导向的专业服务。我们摒弃了传统的'象牙塔'式咨询，独创了一套'嵌入式'服务模式，以'边缘智能硬件 + 行业数据'为双核驱动。",
        },
        {
          icon: <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
          title: "技术与商业的完美结合",
          description:
            "我们致力于'AI技术咨询与应用孵化'，不仅帮您规划蓝图，更陪您走完从0到1的关键孵化阶段，直至AI应用能独立创造商业价值。依托成都国家大学科技园的创新土壤和资源网络，我们能为您链接最前沿的AI生态。",
        },
      ].map((advantage) => (
        <motion.div variants={animations.fadeIn} key={advantage.title}>
          <Card className="h-full text-left p-4 md:p-6 lg:p-8 hover:shadow-lg transition-shadow rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              {advantage.icon}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{advantage.title}</h3>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">{advantage.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </Section>
));
TechnicalAdvantagesSection.displayName = "TechnicalAdvantagesSection";

// 优化的Target Markets Section - 移除复杂的Portal组件
const TargetMarketsSection = memo(() => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set<string>());
  const [mobilePopup, setMobilePopup] = useState<{ name: string, img: string } | null>(null);
  
  const marketImages = useMemo(() => ({
    "智慧农业": "/images/nongye.webp",
    "智慧风电": "/images/wind.webp", 
    "智慧光伏": "/images/solar.webp",
    "交通运输": "/images/transport.webp",
    "智慧城市": "/images/smartcity-demo.webp",
    "工业检测": "/images/industrial-inspect-demo.webp",
    "AI工作站": "/images/ai-workstation-demo.webp",
    "本地大模型": "/images/local-llm-demo.webp",
  }), []);

  // 预加载图片函数
  const preloadImage = useCallback((src: string) => {
    if (preloadedImages.has(src)) return;
    
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      setPreloadedImages(prev => new Set([...prev, src]));
    };
  }, [preloadedImages]);

  // 在组件挂载后延迟预加载图片
  useEffect(() => {
    const timer = setTimeout(() => {
      Object.values(marketImages).forEach(src => {
        preloadImage(src);
      });
    }, 2000); // 延迟2秒开始预加载，等主要内容加载完成

    return () => clearTimeout(timer);
  }, [marketImages, preloadImage]);

  const handleMouseEnter = useCallback((marketName: string, event: React.MouseEvent) => {
    const imageSrc = marketImages[marketName as keyof typeof marketImages];
    if (imageSrc && window.innerWidth >= 768) { // 只在桌面端显示
      setHoveredCard(marketName);
      setMousePosition({ x: event.clientX, y: event.clientY });
      // 如果图片还没预加载，立即加载
      if (!preloadedImages.has(imageSrc)) {
        preloadImage(imageSrc);
      }
    }
  }, [marketImages, preloadedImages, preloadImage]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (hoveredCard && window.innerWidth >= 768) {
      // 计算边界，防止图片超出视窗
      const imageWidth = 580;
      const imageHeight = 400;
      const padding = 20; // 边缘安全距离
      const headerHeight = 64; // 导航栏高度
      
      let x = event.clientX;
      let y = event.clientY;
      
      // 检查右边界
      const rightEdge = window.innerWidth - imageWidth - padding;
      x = Math.min(x, rightEdge);
      
      // 检查左边界
      x = Math.max(x, imageWidth / 2 + padding);
      
      // 检查顶部边界，考虑导航栏高度
      y = Math.max(y, imageHeight + padding + headerHeight);
      
      // 检查底部边界
      const bottomEdge = window.innerHeight - padding;
      y = Math.min(y, bottomEdge);
      
      setMousePosition({ x, y });
    }
  }, [hoveredCard]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const handleCardClick = useCallback((marketName: string) => {
    const imageSrc = marketImages[marketName as keyof typeof marketImages];
    if (imageSrc && typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobilePopup({ name: marketName, img: imageSrc });
    }
  }, [marketImages]);

  return (
    <Section id="markets" className="relative bg-muted">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industry-case.webp"
          alt="行业案例背景"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20">
        <motion.div variants={animations.fadeIn} className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">目标市场</h2>
          <p className="text-base md:text-lg text-gray-200 mt-4 max-w-3xl mx-auto">
            <strong>我们的技术服务于多个关键领域，致力于推动各行各业的智能化转型与升级。</strong>
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {companyData.targetMarkets.map((market: TargetMarket) => {
            const IconComponent = iconMap[market.icon as keyof typeof iconMap];
            const hasSpecialBg = marketImages[market.name as keyof typeof marketImages];
            
            return (
              <motion.div 
                variants={animations.fadeIn} 
                key={market.name} 
                className="group relative"
                onMouseEnter={(e) => handleMouseEnter(market.name, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(market.name)}
              >
                <Card
                  className={`h-full text-center p-4 md:p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-emerald-300/40 hover:shadow-2xl hover:-translate-y-2 rounded-xl hover:bg-primary/5
    ${hasSpecialBg
      ? 'bg-gradient-to-br from-emerald-200 via-cyan-100 to-blue-50 border-2 border-emerald-300 shadow-xl dark:from-emerald-800 dark:via-cyan-900 dark:to-slate-900'
      : 'bg-white/80 dark:bg-black/60'}
    relative overflow-hidden group cursor-pointer`}
                >
                  {/* 恢复原有的背景图片效果 */}
                  {hasSpecialBg && (
                    <div
                      className="absolute inset-0 z-0 transition-all duration-300 opacity-20 md:opacity-0 md:group-hover:opacity-20"
                      style={{
                        backgroundImage: `url('${hasSpecialBg}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.7)"
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                    )}
                    <h4 className="text-sm md:text-lg font-semibold transition-colors duration-300 text-foreground group-hover:text-primary">
                      {market.name}
                    </h4>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 桌面端悬停图片弹出效果 */}
        {hoveredCard && marketImages[hoveredCard as keyof typeof marketImages] && (
          <div 
            className="hidden md:block fixed z-[9999] pointer-events-none"
            style={{
              left: Math.max(mousePosition.x - 290, 20), // 图片宽度一半 + 边距
              top: Math.max(mousePosition.y - 420, 84), // 确保不会被导航栏遮挡
              transform: `translate3d(0, 0, 0)`, // 启用硬件加速
            }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-2xl border-2 border-primary/20 overflow-hidden w-[580px] h-[400px] backdrop-blur-sm transition-transform duration-200 ease-out">
              <div className="relative w-full h-full">
                <Image
                  src={marketImages[hoveredCard as keyof typeof marketImages]}
                  alt={`${hoveredCard}案例图片`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-300"
                  sizes="580px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-white font-semibold text-lg drop-shadow-lg">
                    {hoveredCard}
                  </h5>
                </div>
              </div>
              {/* 小箭头 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-white dark:border-t-gray-900/90"></div>
              </div>
            </div>
          </div>
        )}

        {/* 移动端点击弹出大图 */}
        {mobilePopup && (
          <div 
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center md:hidden" 
            onClick={() => setMobilePopup(null)}
          >
            <div className="relative w-11/12 max-w-sm rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-white">
              <button 
                className="absolute top-3 right-3 z-10 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setMobilePopup(null); 
                }}
              >
                ×
              </button>
              <div className="w-full h-64 relative">
                <Image
                  src={mobilePopup.img}
                  alt={`${mobilePopup.name}案例图片`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-300"
                  loading="lazy"
                  sizes="320px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h5 className="text-white font-semibold text-base drop-shadow-lg">
                    {mobilePopup.name}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
});
TargetMarketsSection.displayName = "TargetMarketsSection";

// 优化的Competitive Advantages Section
const CompetitiveAdvantagesSection = memo(() => (
  <Section id="advantages" className="bg-muted">
    <motion.div variants={animations.fadeIn} className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">竞争优势</h2>
    </motion.div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {companyData.competitiveAdvantages.map((advantage, index) => {
        const [title, description] = advantage.split("：");
        const icons = [
          <Zap key="tech" className="w-6 h-6 md:w-7 md:h-7 text-primary" />,
          <Layers key="mode" className="w-6 h-6 md:w-7 md:h-7 text-primary" />,
          <Target key="eco" className="w-6 h-6 md:w-7 md:h-7 text-primary" />,
          <Building key="base" className="w-6 h-6 md:w-7 md:h-7 text-primary" />,
        ];
        
        return (
          <motion.li variants={animations.fadeIn} key={index}>
            <Card className="h-full text-left p-4 md:p-6 rounded-xl transition-colors duration-300 border border-transparent hover:border-primary/20 hover:bg-primary/5">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-4">
                  <div className="inline-block rounded-full bg-primary/10 p-3">
                    {icons[index]}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-foreground">{title}</h4>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm md:text-base text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          </motion.li>
        );
      })}
    </ul>
  </Section>
));
CompetitiveAdvantagesSection.displayName = "CompetitiveAdvantagesSection";

// 优化的Contact Section
const ContactSection = memo(() => (
  <Section id="contact" className="text-center">
    <motion.div variants={animations.fadeIn} className="max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">联系我们</h2>
      <p className="text-base md:text-lg text-gray-200 mt-4 drop-shadow-md">
      <strong>我们期待与您合作，共同探索数据驱动的无限可能。</strong>
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <a href={`mailto:${companyData.contact.email}`}>  
            <Mail className="mr-2 h-5 w-5" />
            {companyData.contact.email}
          </a>
        </Button>
        <Button size="lg" variant="outline">  
          <Phone className="mr-2 h-5 w-5" />
          {companyData.contact.phone}
        </Button>
        <Button 
          size="lg" 
          onClick={() => {
            if (typeof window !== 'undefined' && window.tidioChatApi?.open) {
              window.tidioChatApi.open();
            }
          }} 
          className="bg-primary text-white"
        >  
          <Mail className="mr-2 h-5 w-5" />
          开启聊天
        </Button>
      </div>
    </motion.div>
  </Section>
));
ContactSection.displayName = "ContactSection";

// 优化的Footer
const Footer = memo(() => (
  <footer className="bg-gradient-to-b from-[#0D1B2A] via-[#0D1B2A] to-gray-900 text-gray-400">
    <div className="container mx-auto px-4 py-6 md:py-8 text-center text-sm">
      <p>
        © {new Date().getFullYear()} {companyData.companyInfo.name}. All Rights Reserved.
      </p>
      <p className="mt-2">{companyData.companyInfo.address}</p>
    </div>
  </footer>
));
Footer.displayName = "Footer";

// 主页面组件 - 首屏极速优化版本
export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground">
        <Header />
        <main>
          {/* 首屏关键内容 - 立即显示 */}
          <HeroSection />
          
          {/* 渐变分隔 */}
          <div className="h-[2vh] bg-gradient-to-b from-white to-[#0D1B2A]" />
          
          {/* 非首屏内容 - 懒加载 */}
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
              <div className="text-white text-xl">加载中...</div>
            </div>
          }>
            <LazyMainContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

// 懒加载的主要内容组件
const LazyMainContent = memo(() => (
  <Suspense fallback={
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
  }>
    <VantaNetBackground 
      className="relative"
      backgroundColor={0x0D1B2A}
      dotColor={0x007BFF}
      lineColor={0x0056cc}
      points={8.0}
      maxDistance={15.0}
      spacing={12.0}
      speed={0.6}
      scale={1.5}
      scaleMobile={0.9}
    >
      <div className="relative z-10">
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ProductLinesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TechnicalAdvantagesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TargetMarketsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CompetitiveAdvantagesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </div>
    </VantaNetBackground>
  </Suspense>
));
LazyMainContent.displayName = "LazyMainContent";

// 区块加载骨架屏
const SectionSkeleton = memo(() => (
  <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-300 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
));
SectionSkeleton.displayName = "SectionSkeleton";

// 全局类型声明
declare global {
  interface Window {
    tidioChatApi?: {
      open: () => void;
    };
  }
}
