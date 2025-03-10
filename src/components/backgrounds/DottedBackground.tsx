import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DottedBackground() {
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
    let dots: { x: number; y: number; size: number; opacity: number; speed: number; vx: number; vy: number; color: string }[] = [];
    let mouse = { x: -100, y: -100 }; // Начальное положение курсора за пределами экрана

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
            size: dotSize + Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.3 - 0.15,
            vx: 0,
            vy: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach((dot) => {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 80;

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDistance - distance) / maxDistance;
          dot.vx += Math.cos(angle) * force * 2;
          dot.vy += Math.sin(angle) * force * 2;
        }

        dot.vx *= 0.95;
        dot.vy *= 0.95;

        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawDots);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    resizeCanvas();
    drawDots();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
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
        transition: "background-color 0.5s ease",
      }}
    />
  );
}
