import { useEffect, useState, useContext } from "react";
import { motion, Transition } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

export default function FrutigerAeroBackground() {
  const { themeMode } = useContext(ThemeContext)!;

  const themeColors: Record<string, { bg: string; bubble: string }> = {
    light: {
      bg: "linear-gradient(135deg, #AEE1FF, #FFFFFF)",
      bubble: "radial-gradient(circle, rgba(255,255,255,0.6) 30%, rgba(254, 229, 191, 0.8) 70%)",
    },
    dark: {
      bg: "linear-gradient(135deg, #1A1A1A, #444)",
      bubble: "radial-gradient(circle, rgba(150,150,150,0.9) 30%, rgba(100,100,100,0.6) 70%)",
    },
    blue: {
      bg: "linear-gradient(135deg, #135ABF, #87CEEB)",
      bubble: "radial-gradient(circle, rgba(173, 216, 230, 1) 30%, rgba(135, 206, 250, 0.6) 70%)",
    },
    green: {
      bg: "linear-gradient(135deg, #00A86B, #90EE90)",
      bubble: "radial-gradient(circle, rgba(144,238,144,1) 30%, rgba(34,139,34,0.6) 70%)",
    },
  };

  const floatingAnimation = {
    y: [0, -30, 0],
    x: [0, 15, -15, 0],
    scale: [1, 1.3, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    } satisfies Transition,
  };

  const [bubbles, setBubbles] = useState<{ top: string; left: string; size: string }[]>([]);

  useEffect(() => {
    setBubbles(
      [...Array(20)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 120 + 80}px`,
      }))
    );
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
        background: themeColors[themeMode]?.bg || themeColors.light.bg,
      }}  
    >
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          animate={floatingAnimation}
          style={{
            position: "absolute",
            top: bubble.top,
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            background: themeColors[themeMode]?.bubble || themeColors.light.bubble,
            borderRadius: "50%",
            // filter: "blur(8px)",
            opacity: 0.9,
            boxShadow: "0 5px 15px rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}
    </motion.div>
  );
}
