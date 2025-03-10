export interface ThemeColors {
  dots: string[];
  sun: string;
  horizon: string[];
}

export interface Dot {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: string;
}

export const generateDots = (canvas: HTMLCanvasElement, colors: ThemeColors, spacing: number): Dot[] => {
  const horizonY = (canvas.height * 2) / 3;
  const dots: Dot[] = [];
  for (let x = -canvas.width / 2; x < canvas.width / 2; x += spacing) {
    for (let z = 100; z > 1; z -= 2) {
      dots.push({
        x,
        y: horizonY,
        z,
        size: 2 + Math.random() * 2,
        speed: Math.random() * 0.1 + 0.1,
        color: colors.dots[Math.floor(Math.random() * colors.dots.length)],
      });
    }
  }
  return dots;
};

export const updateDots = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dots: Dot[]) => {
  dots.forEach((dot) => {
    const perspective = 100 / (100 - dot.z);
    const px = dot.x * perspective;
    const py = (dot.y - canvas.height / 2) * perspective;
    const psize = dot.size * perspective;

    ctx.beginPath();
    ctx.arc(px, py, psize, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();

    dot.z += dot.speed;
    if (dot.z >= 100) dot.z = 1;
  });
};

export const updateSun = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, colors: ThemeColors, sunRadius: number, sunPulseDirection: number) => {
  ctx.shadowBlur = 50;
  ctx.shadowColor = colors.sun;

  ctx.beginPath();
  ctx.arc(0, -canvas.height / 6, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = colors.sun;
  ctx.fill();
  ctx.shadowBlur = 0;

  sunRadius += sunPulseDirection * 0.3;
  if (sunRadius > 130 || sunRadius < 110) {
    sunPulseDirection *= -1;
  }

  return { sunRadius, sunPulseDirection };
};

export const drawGridLines = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  sunRadius: number,
  gradient: CanvasGradient,
  lineOffset: number
) => {
  const lineSpacing = 44; // Увеличенное расстояние между линиями

  for (let i = -sunRadius; i <= sunRadius; i += lineSpacing) {
    const lineY = -canvas.height / 4 + i + lineOffset;
    const relativeHeight = (lineY + canvas.height / 2) / canvas.height; // Нормализованная высота
    const lineWidth = 0.1 + relativeHeight * 40; // Минимальная толщина 0.1, максимальная 30

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-sunRadius * 1.5, lineY);
    ctx.lineTo(sunRadius * 1.5, lineY);
    ctx.stroke();
  }
  return (lineOffset + 0.5) % lineSpacing;
};
