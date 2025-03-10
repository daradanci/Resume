import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Типы для темы и фона
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

// Функция для получения корректных значений из localStorage
const getStoredTheme = (): ThemeMode => {
  const storedTheme = localStorage.getItem("theme") as ThemeMode;
  return ["light", "dark", "blue", "green"].includes(storedTheme) ? storedTheme : "light";
};

const getStoredBackground = (): BackgroundMode => {
  const storedBackground = localStorage.getItem("background") as BackgroundMode;
  return ["retro", "dots", "dots_moving", "floating", "cube"].includes(storedBackground) ? storedBackground : "retro";
};

// Провайдер темы
export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredTheme());
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(() => getStoredBackground());

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
