import { ThemeProviderWrapper } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedBackground from "./components/backgrounds/AnimatedBackground";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProviderWrapper>
      <AnimatedBackground />
      <ThemeToggle />
      <Home />
    </ThemeProviderWrapper>
  );
}
