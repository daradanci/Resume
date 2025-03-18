import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedBackground from "./components/backgrounds/AnimatedBackground";
import Home from "./pages/Home";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = 'Моё портфолио';
  }, []);

  return (
    <ThemeProviderWrapper>
      <Router basename="/Resume">
        <AnimatedBackground />
        <ThemeToggle/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}
