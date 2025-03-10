import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedBackground from "./components/backgrounds/AnimatedBackground";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProviderWrapper>
      <Router basename="/repository-name">
        <AnimatedBackground />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}
