import { useContext } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ThemeContext } from "../context/ThemeContext";

const projects = [
  {
    id: 1,
    title: "Videmanmc.ru",
    description: "Разрабатываю сайт для игрового сервера.",
    date: "Декабрь 2024",
    stack: ["React", "Redux-Toolkit", "MUI", "sitemap"],
    links: { github: "https://github.com/VidemanMC/website", demo: "https://videmanmc.ru/" }
  },
  {
    id: 2,
    title: "CelestialNotes",
    description: "Участвовал в хакатоне, разработал фронтенд приложения облачного хранилища заметок",
    date: "Май 2023",
    stack: ["React", "Redux", "axios", "bootstrap"],
    links: { github: "https://github.com/Eaglise/ST_KR__Cloud_Notes/tree/Frontend%3D)", demo: "https://daradanci.github.io/ST_KR__Cloud_Notes/" }
  },
  {
    id: 3,
    title: "FrontCloudCamp",
    description: "Разработал приложение для валидации данных.",
    date: "Июнь 2023",
    stack: ["React", "Redux Toolkit", "yup", "emotion", "formik"],
    links: { github: "https://github.com/daradanci/FrontCloudCamp", demo: "https://daradanci.github.io/FrontCloudCamp/" }
  },
  {
    id: 4,
    title: "COCOMOOD",
    description: "Разработал фронтенд для трекера прочитанных книг. Командные усилия привели к победе на хакатоне.",
    date: "Октябрь 2024",
    stack: ["Vue", "pinia", "js-cookie", "canvasjs", "bootstrap"],
    links: { github: "https://github.com/Eaglise/COCOMOOD/tree/Frontend", demo: "https://daradanci.github.io/COCOMOOD/" }
  }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const themeColors = {
  light: { bg: "rgba(255, 255, 255, 0.7)", color: "#000" },
  dark: { bg: "rgba(18, 11, 21, 0.7)", color: "#fff" },
  blue: { bg: "rgba(0, 51, 204, 0.7)", color: "#fff" },
  green: { bg: "rgba(34, 139, 34, 0.7)", color: "#fff" },
};

const ProjectList = () => {
  const { themeMode } = useContext(ThemeContext)!;
  return (
    <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "20px", width: { xs: "380px", md: "700px" } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Slider {...settings}>
          {projects.map((project) => (
            <Box key={project.id} sx={{ padding: "10px" }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    padding: "16px",
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: themeColors[themeMode]?.bg || themeColors.light.bg,
                    color: themeColors[themeMode]?.color || themeColors.light.color,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
                    <Typography variant="body2" gutterBottom>
                      <CalendarMonthIcon sx={{ fontSize: 16, verticalAlign: "middle", marginRight: "4px" }} />
                      {project.date}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>{project.description}</Typography>
                    <Typography variant="body2" fontWeight="bold">Стек:</Typography>
                    <Typography variant="body2" sx={{ marginBottom: "8px" }}>{project.stack.join(", ")}</Typography>
                    <Box display="flex" gap={1}>
                      <IconButton href={project.links.github} target="_blank" aria-label="GitHub" sx={{ color: themeColors[themeMode]?.color || themeColors.light.color }}>
                        <GitHubIcon sx={{mr:'6px'}}/>
                        <Typography variant="body2" fontWeight="bold">GitHub</Typography>
                      </IconButton>
                      <IconButton href={project.links.demo} target="_blank" aria-label="Demo" sx={{ color: themeColors[themeMode]?.color || themeColors.light.color }}>
                        <WebIcon sx={{mr:'6px'}}/>
                        <Typography variant="body2" fontWeight="bold">Сайт</Typography>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Slider>
      </motion.div>
    </Box>
  );
};

export default ProjectList;
