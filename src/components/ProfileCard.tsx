import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Snackbar, Alert } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileCard() {
  const { themeMode } = useContext(ThemeContext)!;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(`Скопировано: ${text}`);
    setSnackbarOpen(true);
  };

  const themeColors = {
    light: { bg: "rgba(255, 255, 255, 0.7)", color: "#000" },
    dark: { bg: "rgba(18, 11, 21, 0.7)", color: "#fff" },
    blue: { bg: "rgba(0, 51, 204, 0.7)", color: "#fff" },
    green: { bg: "rgba(34, 139, 34, 0.7)", color: "#fff" },
  };

  const contacts = [
    { icon: <GitHubIcon fontSize="small" />, text: "github.com/daradanci", link: "https://github.com/daradanci", isLink: true },
    { icon: <TelegramIcon fontSize="small" />, text: "@daradanci", link: "https://t.me/daradanci", isLink: true },
    { icon: <LocalPhoneIcon fontSize="small" />, text: "+79013491799", link: "+79013491799", isLink: false },
    { icon: <EmailIcon fontSize="small" />, text: "daradanci@gmail.com", link: "daradanci@gmail.com", isLink: false }
  ];

  return (
    <>
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
          <Typography variant="h4" sx={{ fontSize: { xs: "30px", md: "34px" } }}>Привет! Я – фронтендер daradanci.</Typography>
          <Typography variant="subtitle1">Помогаю создавать удобные и эффективные веб-приложения.</Typography>
          <Typography variant="subtitle1">Если у вас есть интересный проект — свяжитесь со мной!</Typography>

          <TableContainer>
            <Table size="small">
              <TableBody>
                {[0, 2].map((i) => (
                  <TableRow key={i}>
                    {[contacts[i], contacts[i + 1]].map((contact, index) => (
                      <TableCell key={index} align="center" sx={{ color: themeColors[themeMode]?.color || themeColors.light.color }}>
                        {contact?.isLink ? (
                          <IconButton color="inherit" component="a" href={contact.link} target="_blank" rel="noopener noreferrer">
                            {contact.icon}
                          </IconButton>
                        ) : (
                          <IconButton color="inherit" onClick={() => copyToClipboard(contact.link)}>
                            {contact.icon}
                          </IconButton>
                        )}
                        <Typography 
                          variant="body2"
                          sx={{ 
                            cursor: "pointer", 
                            color: themeColors[themeMode]?.color || themeColors.light.color, 
                            transition: "0.2s",
                            '&:hover': {
                              textDecoration: "underline"
                            },
                            '&:active': {
                              transform: "scale(0.95)"
                            }
                          }}
                        >
                          {contact?.isLink ? (
                            <a href={contact.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                              {contact.text}
                            </a>
                          ) : (
                            <span onClick={() => copyToClipboard(contact.link)}>{contact.text}</span>
                          )}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </motion.div>

      {/* Snackbar - стильное уведомление */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
