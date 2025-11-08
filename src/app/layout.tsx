import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// 配置 Inter 字体
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "HTZL.AI - 慧途智联科技",
  description: "慧途智联科技专注于AI技术产业化，提供智能交通、工业边缘计算等解决方案。",
};

// 智能 Tidio 加载组件
function TidioLoader() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            let tidioLoaded = false;
            
            function loadTidio() {
              if (tidioLoaded) return;
              tidioLoaded = true;
              
              const script = document.createElement('script');
              script.src = '//code.tidio.co/7prorjb4pf725ic5jkcjwh5wpttl1pcm.js';
              script.async = true;
              script.defer = true;
              
              // 添加错误处理
              script.onerror = function() {
                console.warn('Tidio chat failed to load');
              };
              
              document.body.appendChild(script);
              
              // 清除事件监听器，避免重复加载
              ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(event => {
                document.removeEventListener(event, loadTidio, { passive: true });
              });
            }
            
            // 页面加载完成后延迟3秒加载（确保不影响首屏性能）
            window.addEventListener('load', function() {
              setTimeout(loadTidio, 3000);
            });
            
            // 用户交互时立即加载（提升用户体验）
            ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(event => {
              document.addEventListener(event, loadTidio, { passive: true, once: true });
            });
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 关键资源预加载 - 首屏极速优化 */}
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/blue_logo_huitu.webp"
          as="image"
          type="image/webp"
        />
        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
        {/* DNS 预解析和预连接 */}
        <link rel="dns-prefetch" href="https://htzl.ai" />
        <link rel="preconnect" href="https://htzl.ai" crossOrigin="anonymous" />
        {/* Tidio 域名预解析（不影响性能） */}
        <link rel="dns-prefetch" href="//code.tidio.co" />
        {/* 资源提示 */}
        <link rel="prefetch" href="/images/industry-case.webp" />
        <link rel="prefetch" href="/images/local-llm-demo.webp" />
        <link rel="prefetch" href="/images/ai-workstation-demo.webp" />
        {/* 优化加载性能 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#007BFF" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
        {/* 智能延迟加载 Tidio 聊天组件 */}
        <TidioLoader />
      </body>
    </html>
  );
}
