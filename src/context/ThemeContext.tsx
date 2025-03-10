import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Типы для темы и контекста
type ThemeMode = "light" | "dark" | "blue" | "green";
type BackgroundMode = "retro" | "dots" | "dots_moving" | "floating" | "cube";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  backgroundMode: BackgroundMode;
  setBackgroundMode: (mode: BackgroundMode) => void;
}

// Создаём контекст
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Определяем темы
const themes: Record<ThemeMode, Theme> = {
  light: createTheme({
    palette: { mode: "light", primary: { main: "#1976d2" }, background: { default: "#ffffff" } },
  }),
  dark: createTheme({
    palette: { mode: "dark", primary: { main: "#bb86fc" }, background: { default: "#121212" } },
  }),
  blue: createTheme({
    palette: { mode: "light", primary: { main: "#0033cc" }, background: { default: "#e0f2ff" } },
  }),
  green: createTheme({
    palette: { mode: "light", primary: { main: "#228A4C" }, background: { default: "#f7fff7" } },
  }),
};

// Провайдер темы
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const storedTheme = (localStorage.getItem("theme") as ThemeMode) || "light";
  const storedBackground = (localStorage.getItem("background") as BackgroundMode) || "dots";
  const [themeMode, setThemeMode] = useState<ThemeMode>(storedTheme);
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(storedBackground);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("background", backgroundMode);
  }, [backgroundMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, backgroundMode, setBackgroundMode }}>
      <ThemeProvider theme={themes[themeMode]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
