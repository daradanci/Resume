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

    const scroll = (direction: "left" | "right") => {
        if (ref.current) {
            const scrollAmount = 220;
            ref.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div id="projects">
            <button className="scroll-btn left" onClick={() => scroll("left")}>&larr;</button>
            <motion.ul ref={ref} style={{ maskImage }}>
                {colors.map((color, index) => (
                    <motion.li
                        key={index}
                        style={{ background: color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {`Проект ${index + 1}`}
                    </motion.li>
                ))}
            </motion.ul>
            <button className="scroll-btn right" onClick={() => scroll("right")}>&rarr;</button>
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
        `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0) 100%)`
    );

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0) 100%)`
            );
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0) 100%)`
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
                width: 1400px;
                margin: 0 auto;
                overflow: hidden;
                position: relative;
                padding: 20px 50px; 
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
                scroll-snap-type: x mandatory;
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
                scroll-snap-align: center;
                transition: transform 0.3s ease;
            }

            #projects li:hover {
                transform: scale(1.05);
            }

            .scroll-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                cursor: pointer;
                padding: 10px;
                font-size: 24px;
                border-radius: 50%;
                transition: background 0.3s ease;
                z-index: 10;
            }


            .scroll-btn:hover {
                background: rgba(0, 0, 0, 0.8);
            }

            .scroll-btn.left {
                left: -20px;
            }

            .scroll-btn.right {
                right: 20px;
            }

            @media (max-width: 600px) {
                #projects ul {
                    flex-wrap: wrap;
                    justify-content: center;
                    overflow: visible;
                }

                #projects li {
                    flex: 0 0 calc(50% - 20px);
                }

                .scroll-btn {
                    display: none;
                }
            }
        `}</style>
    );
}
