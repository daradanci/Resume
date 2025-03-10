import { Typography, Paper, Box } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import lightAvatar from "../images/avas/ava_fuzzy.jpg"; // Светлая тема
import darkAvatar from "../images/avas/ava_d_who.jpg"; // Темная тема
import blueAvatar from "../images/avas/ava_cat.jpg"; // Дополнительная тема
import greenAvatar from "../images/avas/ava_dog.jpg"; // Дополнительная тема
import ProjectScroll from "../components/ProjectScroll";

export default function Home() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { themeMode } = themeContext;

  // Объект соответствия тем и изображений
  const themeImages: Record<string, string> = {
    light: lightAvatar,
    dark: darkAvatar,
    blue: blueAvatar,
    green: greenAvatar,
  };

  // Выбираем изображение по текущей теме, если тема не найдена - дефолтное
  const imageSrc = themeImages[themeMode] || lightAvatar;

  return (
    // <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
        <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
        }}
        >
        <motion.img
            src={imageSrc}
            alt="Avatar"
            width={150}
            height={150}
            style={{ borderRadius: "50%", marginBottom: 16 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 0.9, rotate: 10 }}
        />
        </motion.button>


      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper
          elevation={themeMode === "dark" ? 8 : 3}
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: themeMode === "dark" ? "rgb(18, 11, 21)" : themeMode === "blue" ? "#0033cc" : themeMode === "green" ? "#228B22" : "#fff",
            color: themeMode === "dark" ? "#fff" : themeMode === "blue" ? "#fff" : themeMode === "green" ? "#fff" : "#000",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4">Привет! Я – разработчик.</Typography>
          <Typography variant="subtitle1">Добро пожаловать на мой сайт-резюме.</Typography>
          <Typography variant="subtitle1">Здесь ещё не всё готово, но очень скоро всё будет готово.</Typography>
        </Paper>
      </motion.div>
      <Box>
      <ProjectScroll/>

      </Box>
    {/* </Box> */}
    </motion.div>
  );
}
