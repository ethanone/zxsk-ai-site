import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/contexts/LanguageContext";

// 配置 Inter 字体 - 优化加载
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: "知象数据 - 为知识产权全链条激活数据价值 | AI数据服务平台",
  description: "知象数据专注于为知识产权全产业链提供专业的数据服务和智能解决方案。服务政府机关、保护中心、产业园区、代理机构，提供数智研判、智慧监管、海外保护、产业导航等关键场景解决方案。依托政府权威开放数据库，遵循国家信息安全和数据安全标准，为客户提供低成本、高实效的数据服务。",
  keywords: ["知识产权", "数据服务", "知象数据", "AI数据平台", "专利数据", "商标数据", "版权保护", "数智研判", "智慧监管", "海外保护", "产业导航", "数据治理", "数据安全"],
  authors: [{ name: "Zhixiang Data" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "知象数据 - 为知识产权全链条激活数据价值",
    description: "专业的知识产权数据服务商 | AI驱动 | 权威数据源 | 安全合规 | 智能应用",
    url: "https://www.zhixiang-data.com",
    siteName: "知象数据",
    locale: "zh_CN",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 移动端视口优化 - 防止缩放和布局问题 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#8B2F2F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* DNS 预连接 - 性能优化 */}
        <link rel="dns-prefetch" href="https://www.zhixiang-data.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
