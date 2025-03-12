import { useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import lightAvatar from "../images/avas/ava_fuzzy.jpg"; // Светлая тема
import darkAvatar from "../images/avas/ava_d_who.jpg"; // Темная тема
import blueAvatar from "../images/avas/ava_cat.jpg"; // Дополнительная тема
import greenAvatar from "../images/avas/ava_dog.jpg"; // Дополнительная тема
import ProjectList from "../components/ProjectList";
import ProfileCard from "../components/ProfileCard";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';



export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { themeMode } = themeContext;

  const themeImages: Record<string, string> = {
    light: lightAvatar,
    dark: darkAvatar,
    blue: blueAvatar,
    green: greenAvatar,
  };

  const themeColors: Record<string, { text: string; bg: string }> = {
    light: { text: "#000", bg: "rgba(255, 255, 255, 0.7)" },
    dark: { text: "#fff", bg: "rgba(18, 11, 21, 0.7)" },
    blue: { text: "#fff", bg: "rgba(0, 51, 204, 0.7)" },
    green: { text: "#fff", bg: "rgba(34, 139, 34, 0.7)" },
  };

  // Выбираем изображение и цвета по текущей теме
  const imageSrc = themeImages[themeMode] || lightAvatar;
  const textColor = themeColors[themeMode]?.text || "#000";
  const bgColor = themeColors[themeMode]?.bg || "rgba(255, 255, 255, 0.7)";

  return (
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
      <motion.div
        animate={showProfile ? { y: -50, scale: 0.85 } : { y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowProfile(true)}
        >
          <motion.img
            src={imageSrc}
            alt="Avatar"
            width={160}
            height={160}
            style={{ borderRadius: "50%", marginBottom: 16, userSelect: "none" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showProfile ? { opacity: 1, y: 30, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 0.95, rotate: 5 }}
            ref={(el) => {
              if (el) {
                (el.style as CSSStyleDeclaration & { webkitUserDrag?: string }).webkitUserDrag = "none";
              }
            }}
          />
          {!showProfile && 
          
          (<motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ y: [5, -5, 5], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{
              marginTop: 4,
              color: textColor,
              backgroundColor: bgColor,
              padding: "4px 8px",
              borderRadius: "8px",
              textAlign: "center",
              pointerEvents: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Нажми меня
          </motion.div>)
          }
          
        </motion.button>
      </motion.div>

      {showProfile && !showProjects && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ProfileCard />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button variant="contained" onClick={() => setShowProjects(true)}>
              <FollowTheSignsIcon sx={{mr: 1}}/>
              Перейти к проектам
            </Button>
          </Box>

        </motion.div>
      )}

      {showProjects && (
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Button variant="contained" onClick={() => setShowProjects(false)} sx={{ml:'30px'}}>
            <FollowTheSignsIcon sx={{ transform: "scaleX(-1)", mr: 1 }} />
            Назад к контактам
          </Button>
          <ProjectList />
        </motion.div>
      )}
    </motion.div>
  );
}
