import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, MotionValue } from "framer-motion";
import { useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const themeColors: Record<string, string[]> = {
    light: ["#FFD1A9", "#FFE4B5", "#FFD1A9", "#FFBFA3", "#FFA8A0", "#FF9190"],
    dark: ["#003366", "#0055aa", "#0077dd", "#0099ff", "#005588", "#001133"],
    blue: ["#001f3f", "#003366", "#004080", "#0055aa", "#0077dd", "#0099ff"],
    green: ["#004d00", "#006600", "#008000", "#22aa22", "#44cc44", "#66ff66"],
};

export default function ProjectScroll() {
    const ref = useRef<HTMLUListElement | null>(null);
    const { themeMode } = useContext(ThemeContext)!;
    const { scrollXProgress } = useScroll({ container: ref });
    const maskImage = useScrollOverflowMask(scrollXProgress);
    const colors = themeColors[themeMode] || themeColors.dark;

    return (
        <div id="projects">
            <motion.ul ref={ref} style={{ maskImage }}>
                {colors.map((color, index) => (
                    <motion.li key={index} style={{ background: color }}>
                        {`Проект ${index + 1}`}
                    </motion.li>
                ))}
            </motion.ul>
            <StyleSheet />
        </div>
    );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    );

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            );
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            );
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            );
        }
    });

    return maskImage;
}

function StyleSheet() {
    return (
        <style>{`
            #projects {
                width: 100vw;
                max-width: 600px;
                margin: 0 auto;
                overflow: hidden;
                position: relative;
                padding: 20px 0;
            }

            #projects ul {
                display: flex;
                list-style: none;
                height: 120px;
                overflow-x: scroll;
                padding: 10px 0;
                gap: 20px;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            #projects ul::-webkit-scrollbar {
                display: none;
            }

            #projects li {
                flex: 0 0 200px;
                background: var(--accent);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: bold;
                color: white;
                border-radius: 12px;
                padding: 20px;
            }
        `}</style>
    );
}
