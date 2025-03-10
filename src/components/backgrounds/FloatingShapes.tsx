import { useEffect, useState, useContext } from "react";
import { motion, Transition } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";

export default function FloatingShapes() {
  const { themeMode } = useContext(ThemeContext)!; // Получаем текущую тему

  // Определяем цвета для каждой темы
  const themeColors: Record<string, string> = {
    light: "rgba(135, 229, 255, 0.8)", // Синий для светлой темы
    dark: "rgba(255, 255, 255, 0.2)", // Белый для темной темы
    blue: "rgba(19, 70, 181, 0.25)", // Голубой для синей темы
    green: "rgba(0, 255, 0, 0.2)", // Зеленый для зеленой темы
  };

  // Определяем текущий цвет для плавающих фигур
  const shapeColor = themeColors[themeMode] || themeColors.light;

  const floatingAnimation = {
    y: [0, -20, 0],
    x: [0, 10, -10, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    } satisfies Transition,
  };

  // Генерируем случайные позиции и размеры один раз
  const [shapes, setShapes] = useState<{ top: string; left: string; size: string }[]>([]);

  useEffect(() => {
    setShapes(
      [...Array(15)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 200 + 50}px`,
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
      }}
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={floatingAnimation}
          style={{
            position: "absolute",
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            backgroundColor: shapeColor, // Устанавливаем цвет в зависимости от темы
            borderRadius: "50%",
            filter: "blur(20px)",
          }}
        />
      ))}
    </motion.div>
  );
}
