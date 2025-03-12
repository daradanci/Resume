import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AnimatedCube from "./AnimatedCube";
import DottedBackground from "./DottedBackground";
import MovingDottedBackground from "./MovingDottedBackground";
import RetroWave from "./Retro";
import FrutigerAero from "./FrutigerAero";

export default function AnimatedBackground() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { backgroundMode } = themeContext;

  return (
    <>
      {backgroundMode === "retro" && <RetroWave />}
      {backgroundMode === "dots" && <DottedBackground />}
      {backgroundMode === "dots_moving" && <MovingDottedBackground />}
      {backgroundMode === "floating" && <FrutigerAero/>}
      {backgroundMode === "cube" && <AnimatedCube />}
    </>
  );
}
