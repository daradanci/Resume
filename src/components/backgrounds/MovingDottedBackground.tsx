import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function MovingDottedBackground() {
  const { themeMode } = useContext(ThemeContext)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const spacing = 30; // Расстояние между точками
    const dotSize = 2; // Базовый размер точек
    let dots: { x: number; y: number; size: number; opacity: number; speed: number; glow: number; color: string }[] = [];

    // Цвета точек для разных тем
    const themeColors: Record<string, string[]> = {
      light: ["rgba(254, 229, 191, 0.8)", "rgba(135, 206, 250, 0.7)", "rgba(141, 248, 223, 0.4)"],
      dark: ["rgba(255, 255, 255, 0.8)", "rgba(200, 200, 255, 0.7)", "rgba(180, 180, 255, 0.6)"],
      blue: ["rgba(0, 150, 255, 0.8)", "rgba(50, 180, 255, 0.7)", "rgba(100, 200, 255, 0.6)"],
      green: ["rgba(0, 255, 100, 0.8)", "rgba(50, 255, 150, 0.7)", "rgba(100, 255, 200, 0.6)"],
    };

    const colors = themeColors[themeMode] || themeColors.light;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateDots();
    };

    const generateDots = () => {
      dots = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            size: dotSize + Math.random() * 2, // Рандомный размер
            opacity: Math.random() * 0.5 + 0.2, // Рандомная прозрачность
            speed: Math.random() * 0.5 - 0.25, // Лёгкое движение
            glow: Math.random() * 4 + 2, // Интенсивность свечения
            color: colors[Math.floor(Math.random() * colors.length)], // Выбираем случайный цвет из палитры
          });
        }
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

        // Создаём свечение
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = dot.glow; // Интенсивность свечения
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Двигаем точки вверх и вниз
        dot.y += dot.speed;
        if (dot.y > canvas.height) dot.y = 0;
        if (dot.y < 0) dot.y = canvas.height;

        // Пульсация свечения
        dot.glow += Math.sin(Date.now() / 1000) * 0.3;
      });

      animationFrameId = requestAnimationFrame(drawDots);
    };

    resizeCanvas();
    drawDots();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: themeMode === "dark" ? "#000" : "#f5f5f5",
      }}
    />
  );
}
