import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import FloatingShapes from "./FloatingShapes";
import AnimatedCube from "./AnimatedCube";
import DottedBackground from "./DottedBackground";
import MovingDottedBackground from "./MovingDottedBackground";
import RetroWave from "./Retro";

export default function AnimatedBackground() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { backgroundMode } = themeContext;

  return (
    <>
      {backgroundMode === "retro" && <RetroWave />}
      {backgroundMode === "dots" && <DottedBackground />}
      {backgroundMode === "dots_moving" && <MovingDottedBackground />}
      {backgroundMode === "floating" && <FloatingShapes />}
      {backgroundMode === "cube" && <AnimatedCube />}
    </>
  );
}
