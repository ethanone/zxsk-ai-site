"use client";

import React, {
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
  useState,
} from "react";
import * as THREE from "three";
import { useInView } from "framer-motion";
import { Loader2 } from "lucide-react";

// A neat spinner overlay to show while Vanta is initializing.
const SpinnerOverlay = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

// Define component props interface for better type safety
interface VantaNetBackgroundProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  dotColor?: number;
  lineColor?: number;
  backgroundColor?: number;
  transparentBackground?: boolean;
  // 新增粒子效果参数
  points?: number;
  maxDistance?: number;
  spacing?: number;
  scale?: number;
  scaleMobile?: number;
  // 动态效果参数
  speed?: number;
  showDots?: boolean;
  // 渐变色相关
  color?: number;
  colorMode?: "gradient" | "solid";
  colorGradient?: [number, number][];
}

const isMobile = () => {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Mobile|Tablet|Phone/i.test(navigator.userAgent);
};

const VantaNetBackground = ({
  children,
  className,
  style,
  dotColor = 0x2ad1dc,
  lineColor = 0x0056cc,
  backgroundColor = 0x0D1B2A,
  transparentBackground = false,
  // 新增参数默认值
  points = 8.0,
  maxDistance = 15.0,
  spacing = 20.0,
  scale = 1.0,
  scaleMobile = 0.5,
  // 动态效果默认值
  speed = 1.0,
  showDots = true,
  // 渐变色相关默认值
  color = 0x2ad1dc,
  colorMode = "solid",
  colorGradient = undefined,
}: VantaNetBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  // Trigger loading when the component is about to enter the viewport
  const isInView = useInView(vantaRef, { once: true, margin: "100px" });

  useEffect(() => {
    // 移动端直接跳过 Vanta 动画，但设置fallback背景
    if (isMobile()) {
      setLoading(false);
      if (vantaRef.current) {
        vantaRef.current.style.background = transparentBackground 
          ? "transparent" 
          : `#${backgroundColor.toString(16).padStart(6, "0")}`;
      }
      return;
    }
    // If not in view or already initialized, do nothing.
    if (!isInView) return;

    setLoading(true);
    let effect: unknown;
    
    // Dynamically import Vanta to enable code splitting and lazy loading
    import("vanta/dist/vanta.net.min.js")
      .then((vantaModule) => {
        if (!vantaRef.current) return;

        const NET = vantaModule.default;
        const vantaOptions: Record<string, unknown> = {
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: !isMobile(), // 桌面端开启鼠标控制
          touchControls: false,       // 移动端禁用触摸控制
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: scale,
          scaleMobile: scaleMobile,
          color: color || lineColor,
          points: points,
          maxDistance: maxDistance,
          spacing: spacing,
          speed: speed,
          showDots: showDots,
        };

        if (colorMode === "gradient" && colorGradient) {
          vantaOptions.colorMode = colorMode;
          vantaOptions.colorGradient = colorGradient;
        }

        if (!transparentBackground) {
          vantaOptions.backgroundColor = backgroundColor;
        }

        effect = NET(vantaOptions);
        setVantaEffect(effect);

        // 简化材质修复，减少性能开销
        setTimeout(() => {
          const eff = effect as Record<string, unknown>;
          if (eff && typeof eff === 'object' && 'scene' in eff && eff.scene) {
            const scene = eff.scene as THREE.Scene;
            scene.traverse((child) => {
              if (child instanceof THREE.LineSegments || child instanceof THREE.Points) {
                const mat = child.material as THREE.Material & { vertexColors?: boolean };
                if (mat && 'vertexColors' in mat) {
                  mat.vertexColors = false;
                }
              }
            });
          }
        }, 5);
      })
      .finally(() => {
        setLoading(false);
      });

    // Cleanup function to destroy the effect when the component unmounts or props change
    return () => {
      if (effect && typeof effect === 'object' && 'destroy' in (effect as Record<string, unknown>)) {
        (effect as { destroy?: () => void }).destroy?.();
      }
    };
  }, [isInView, dotColor, lineColor, backgroundColor, transparentBackground, points, maxDistance, spacing, scale, scaleMobile, speed, showDots, color, colorMode, colorGradient]);

  // Provide a static fallback background before the effect is initialized
  const fallbackStyle: CSSProperties = vantaEffect
    ? {}
    : {
        backgroundColor: transparentBackground
          ? "transparent"
          : `#${backgroundColor.toString(16).padStart(6, "0")}`,
        backgroundImage: transparentBackground
          ? "none"
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      };

  return (
    <div
      ref={vantaRef}
      className={className}
      style={{ ...style, ...fallbackStyle, position: "relative", zIndex: 0 }}
    >
      {loading && <SpinnerOverlay />}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default VantaNetBackground; 
