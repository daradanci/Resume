import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button, ButtonGroup, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { themeMode, setThemeMode, backgroundMode, setBackgroundMode } = themeContext;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <ButtonGroup variant="outlined" color="primary" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setThemeMode("light")} variant={themeMode === "light" ? "contained" : "outlined"}>
          Светлая
        </Button>
        <Button onClick={() => setThemeMode("dark")} variant={themeMode === "dark" ? "contained" : "outlined"}>
          Тёмная
        </Button>
        <Button onClick={() => setThemeMode("blue")} variant={themeMode === "blue" ? "contained" : "outlined"}>
          Синяя
        </Button>
        <Button onClick={() => setThemeMode("green")} variant={themeMode === "green" ? "contained" : "outlined"}>
          Зеленая
        </Button>
      </ButtonGroup>

      <FormControl variant="outlined" style={{ width: "100%", maxWidth: "220px" }}>
        <InputLabel>Фон</InputLabel>
        <Select value={backgroundMode} onChange={(e) => setBackgroundMode(e.target.value as any)} label="Фон">
          <MenuItem value="retro">Ретровейв</MenuItem>
          <MenuItem value="dots">Плавающие точки</MenuItem>
          <MenuItem value="dots_moving">Ползущие точки</MenuItem>
          <MenuItem value="floating">Плавающие фигуры</MenuItem>
          <MenuItem value="cube">Куб</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
