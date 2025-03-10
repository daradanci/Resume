import { useCallback, useContext } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ThemeContext } from "../../context/ThemeContext";

export default function ParticlesBackground() {
  const { themeMode } = useContext(ThemeContext)!;

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const themeColors: Record<string, string> = {
    light: "#ff6a00",
    dark: "#ffffff",
    blue: "#00ccff",
    green: "#00ff99",
  };

  const particleColor = themeColors[themeMode] || "#ffffff";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}>
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false }, // Отключаем полный экран, чтобы задать свой стиль
          background: { color: "transparent" }, // Делаем фон прозрачным
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
            links: {
              enable: true,
              distance: 150,
              color: particleColor,
              opacity: 0.3,
              width: 1,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}