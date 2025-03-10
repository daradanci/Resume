import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { updateSun, drawGridLines, generateDots, updateDots, Dot } from "../../utils/sunAndGrid";

export default function RetroWave() {
  const { themeMode } = useContext(ThemeContext)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let lineOffset = 0;
  let dots: Dot[] = []; // ✅ Теперь dots имеет правильный импортированный тип

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sunRadius = 220;
    let sunPulseDirection = 1;

    const themeColors = {
      light: { dots: ["rgba(254, 229, 191, 0.8)", "rgba(135, 206, 250, 0.7)"], sun: "rgba(255, 223, 186, 0.7)", horizon: [ "#87CEEB", "#ADD8E6", "#FFDDC1"] },
      dark: { dots: ["rgba(255, 105, 180, 0.9)", "rgba(138, 43, 226, 0.7)"], sun: "rgba(255, 140, 0, 0.8)", horizon: ["#110033", "#ff00ff", "#3F046F"] },
      blue: { dots: ["rgba(0, 255, 255, 0.8)", "rgba(0, 191, 255, 0.7)"], sun: "rgba(194, 251, 252, 0.7)", horizon: ["#0033ff", "#7700ff", "#220044"] },
      green: { dots: ["rgba(0, 255, 100, 0.8)", "rgba(50, 255, 150, 0.7)"], sun: "rgba(255, 0, 102, 0.7)", horizon: ["#00ff99", "#ffff00", "#225500"] },
    };

    const colors = themeColors[themeMode] || themeColors.dark;
    dots = generateDots(canvas, colors, 25); // ✅ Теперь dots имеет правильный тип

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      const gradient = ctx.createLinearGradient(0, -canvas.height / 2, 0, canvas.height / 2);
      gradient.addColorStop(0, colors.horizon[0]);
      gradient.addColorStop(0.5, colors.horizon[1]);
      gradient.addColorStop(1, colors.horizon[2]);
      ctx.fillStyle = gradient;
      ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

      ({ sunRadius, sunPulseDirection } = updateSun(ctx, canvas, colors, sunRadius, sunPulseDirection));
      lineOffset = drawGridLines(ctx, canvas, sunRadius, gradient, lineOffset);
      updateDots(ctx, canvas, dots);

      ctx.restore();
      animationFrameId = requestAnimationFrame(drawScene);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = generateDots(canvas, colors, 25); // ✅ Без приведения типа
    };

    resizeCanvas();
    drawScene();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode]);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, backgroundColor: "#000" }} />;
}
