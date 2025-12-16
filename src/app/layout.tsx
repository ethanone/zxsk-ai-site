import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "工厂AI数字员工 - 让每个工厂都拥有AI数字员工 | 智能工厂平台",
  description: "工厂AI数字员工平台提供7×24小时智能助手服务，为您的工厂提供专业的生产管理、质量检测、设备运维等全方位AI服务。智能生产、AI质检、设备运维、数据分析，助力工厂降本增效。",
  keywords: ["工厂AI", "数字员工", "智能制造", "AI助手", "生产管理", "质量检测", "设备运维", "工厂智能化", "工业AI", "智能工厂"],
  authors: [{ name: "Factory AI Digital Employee" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "工厂AI数字员工 - 让每个工厂都拥有AI数字员工",
    description: "智能工厂平台 | AI驱动 | 7×24小时服务 | 降本增效 | 智能分析",
    url: "https://www.factory-ai.com",
    siteName: "工厂AI数字员工",
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
        <link rel="dns-prefetch" href="https://www.factory-ai.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
      )}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
