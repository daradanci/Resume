import { motion } from "framer-motion";

export default function WavyBackground() {
  return (
    <svg
      viewBox="0 0 1440 320"
      style={{ position: "absolute", bottom: 0, width: "100vw", height: "30vh" }}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        fill="#0099ff"
        d="M0,160L30,165.3C60,171,120,181,180,181.3C240,181,300,171,360,181.3C420,192,480,224,540,208C600,192,660,128,720,117.3C780,107,840,149,900,149.3C960,149,1020,107,1080,112C1140,117,1200,171,1260,181.3C1320,192,1380,160,1410,144L1440,128L1440,320L0,320Z"
      />
    </svg>
  );
}
