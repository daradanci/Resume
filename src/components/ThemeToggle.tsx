import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Drawer, IconButton, ButtonGroup, Button, Select, MenuItem, FormControl, InputLabel, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

export default function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { themeMode, setThemeMode, backgroundMode, setBackgroundMode } = themeContext;
  const themeGradients = {
    light: "rgba(255, 255, 255, 0.7)",
    dark: "rgba(18, 11, 21, 0.7)",
    blue: "rgba(26, 5, 51, 0.26)",
    green: "rgba(167, 15, 88, 0.39)",
  };

  const themeTextColors = {
    light: "#000",
    dark: "#fff",
    blue: "#fff",
    green: "#fff",
  };
  
  return (
    <>
      {!open && (
        <IconButton onClick={() => setOpen(true)} style={{ position: "absolute", top: 10, left: 10 }}>
          <MenuIcon fontSize="large" />
        </IconButton>
      )}

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} 
        slotProps={{
          paper: {
            sx: {
              background: themeGradients[themeMode] || themeGradients.light,
              color: themeTextColors[themeMode] || themeTextColors.light,
            }
          }
        }}>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: 250, padding: "20px", color: themeTextColors[themeMode] || themeTextColors.light }}
        >
          <List>
            <ListItem>
              <strong>Выбор темы</strong>
            </ListItem>
            <ListItem>
              <ButtonGroup variant="outlined" color="primary" fullWidth>
                <Button onClick={() => setThemeMode("light")} variant={themeMode === "light" ? "contained" : "outlined"}>
                  Светлая
                </Button>
                <Button onClick={() => setThemeMode("dark")} variant={themeMode === "dark" ? "contained" : "outlined"}>
                  Тёмная
                </Button>
              </ButtonGroup>
            </ListItem>
            <ListItem>
              <ButtonGroup variant="outlined" color="primary" fullWidth>
                <Button onClick={() => setThemeMode("blue")} variant={themeMode === "blue" ? "contained" : "outlined"}>
                  Синяя
                </Button>
                <Button onClick={() => setThemeMode("green")} variant={themeMode === "green" ? "contained" : "outlined"}>
                  Зеленая
                </Button>
              </ButtonGroup>
            </ListItem>

            <ListItem>
              <strong>Выбор фона</strong>
            </ListItem>
            <ListItem>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Фон</InputLabel>
                <Select value={backgroundMode} onChange={(e) => setBackgroundMode(e.target.value as any)} label="Фон"
                  sx={{ color: themeTextColors[themeMode] || themeTextColors.light }}>
                  <MenuItem value="retro">Ретровейв</MenuItem>
                  <MenuItem value="dots">Плавающие точки</MenuItem>
                  <MenuItem value="dots_moving">Ползущие точки</MenuItem>
                  <MenuItem value="floating">Frutiger Aero</MenuItem>
                  <MenuItem value="cube">Куб</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </motion.div>
      </Drawer>
    </>
  );
}
