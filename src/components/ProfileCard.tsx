import { useContext } from "react";
import { motion } from "framer-motion";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileCard() {
  const { themeMode } = useContext(ThemeContext)!;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Скопировано: ${text}`);
  };

  const themeColors = {
    light: { bg: "rgba(255, 255, 255, 0.7)", color: "#000" },
    dark: { bg: "rgba(18, 11, 21, 0.7)", color: "#fff" },
    blue: { bg: "rgba(0, 51, 204, 0.7)", color: "#fff" },
    green: { bg: "rgba(34, 139, 34, 0.7)", color: "#fff" },
  };

  const contacts = [
    { icon: <GitHubIcon fontSize="small" />, text: "github.com/daradanci", link: "https://github.com/daradanci" },
    { icon: <TelegramIcon fontSize="small" />, text: "@daradanci", link: "https://t.me/daradanci" },
    { icon: <LocalPhoneIcon fontSize="small" />, text: "+79013491799", link: "+79013491799" },
    { icon: <EmailIcon fontSize="small" />, text: "daradanci@gmail.com", link: "daradanci@gmail.com" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Paper
        elevation={themeMode === "dark" ? 8 : 3}
        sx={{
          padding: 4,
          textAlign: "center",
          backgroundColor: themeColors[themeMode]?.bg || themeColors.light.bg,
          color: themeColors[themeMode]?.color || themeColors.light.color,
          borderRadius: 2,
          backdropFilter: "blur(8px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{fontSize:{xs: "30px", md: "34px"}}}>Привет! Я – фронтендер daradanci.</Typography>
        <Typography variant="subtitle1">Помогаю создавать удобные и эффективные веб-приложения.</Typography>
        <Typography variant="subtitle1">Если у вас есть интересный проект — свяжитесь со мной!</Typography>

        {/* Контакты в виде таблицы */}
        <TableContainer>
          <Table size="small">
            <TableBody>
              {[0, 2].map((i) => (
                <TableRow key={i}>
                  <TableCell align="center" sx={{ color: themeColors[themeMode]?.color || themeColors.light.color }}>
                    <IconButton color="inherit" onClick={() => copyToClipboard(contacts[i].link)}>
                      {contacts[i].icon}
                    </IconButton>
                    <Typography 
                      variant="body2" 
                      onClick={() => copyToClipboard(contacts[i].link)} 
                      sx={{ cursor: "pointer", color: themeColors[themeMode]?.color || themeColors.light.color }}
                    >
                      {contacts[i].text}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ color: themeColors[themeMode]?.color || themeColors.light.color }}>
                    {contacts[i + 1] && (
                      <>
                        <IconButton color="inherit" onClick={() => copyToClipboard(contacts[i + 1].link)}>
                          {contacts[i + 1].icon}
                        </IconButton>
                        <Typography 
                          variant="body2" 
                          onClick={() => copyToClipboard(contacts[i + 1].link)} 
                          sx={{ cursor: "pointer", color: themeColors[themeMode]?.color || themeColors.light.color }}
                        >
                          {contacts[i + 1].text}
                        </Typography>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  );
}
