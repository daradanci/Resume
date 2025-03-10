"use client";

import { useAnimationFrame } from "framer-motion";
import { useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AnimatedCube() {
  const ref = useRef<HTMLDivElement>(null);
  const { themeMode } = useContext(ThemeContext)!; // Получаем текущую тему

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const rotate = Math.sin(t / 10000) * 200;
    const y = (1 + Math.sin(t / 1000)) * -50;
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });

  // Цвета куба в зависимости от темы
  const themeColors: Record<string, string[]> = {
    light: ["#ff6a00", "#ff9e00", "#ffc400", "#ffd700", "#ffbb00", "#ffaa00"],
    dark: ["#0a0a2a", "#121243", "#1b1b5c", "#252575", "#30308E", "#3b3ba8"],
    blue: ["#001f3f", "#003366", "#004080", "#0055aa", "#0077dd", "#0099ff"],
    green: ["#004d00", "#006600", "#008000", "#22aa22", "#44cc44", "#66ff66"],
  };
  
  const colors = themeColors[themeMode] || themeColors.light;

  return (
    <div className="cube-container">
      <div className="cube" ref={ref}>
        <div className="side front" style={{ backgroundColor: colors[0] }} />
        <div className="side right" style={{ backgroundColor: colors[1] }} />
        <div className="side back" style={{ backgroundColor: colors[2] }} />
        <div className="side left" style={{ backgroundColor: colors[3] }} />
        <div className="side top" style={{ backgroundColor: colors[4] }} />
        <div className="side bottom" style={{ backgroundColor: colors[5] }} />
      </div>
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>{`
      .cube-container {
          position: fixed; 
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: -1; /* Отправляем куб в фон */
      }

      .cube {
          width: 300px;
          height: 300px;
          position: relative;
          transform-style: preserve-3d;
      }

      .side {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.6;
          border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .front { transform: rotateY(0deg) translateZ(150px); }
      .right { transform: rotateY(90deg) translateZ(150px); }
      .back { transform: rotateY(180deg) translateZ(150px); }
      .left { transform: rotateY(-90deg) translateZ(150px); }
      .top { transform: rotateX(90deg) translateZ(150px); }
      .bottom { transform: rotateX(-90deg) translateZ(150px); }
  `}</style>
  );
}
