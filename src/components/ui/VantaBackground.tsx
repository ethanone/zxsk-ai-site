"use client";

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Manually declare the Vanta module for TypeScript
declare global {
  interface Window {
    VANTA: {
      NET: (options: object) => {
        destroy: () => void;
      };
    };
  }
}

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<unknown>(null);

  useEffect(() => {
    if (window.VANTA && !vantaEffect && vantaRef.current) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x007bff, // primary blue
          backgroundColor: 0xffffff, // white
          points: 12.00,
          maxDistance: 24.00,
          spacing: 18.00,
        })
      );
    }
    return () => {
      if (vantaEffect && typeof vantaEffect === 'object' && 'destroy' in (vantaEffect as Record<string, unknown>)) {
        (vantaEffect as { destroy?: () => void }).destroy?.();
      }
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 -z-10 h-screen" />;
};

export default VantaBackground; 
