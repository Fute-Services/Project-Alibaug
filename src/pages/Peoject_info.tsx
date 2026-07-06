import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import backIcon from "../assets/back butten.png";
import projectOverviewImg from "../assets/project view/Project overview.webp";
import legacyBtnImg from "../assets/project view/lagacy butten.png";
import line from "../assets/project view/gold_line.png"
import circleImg from "../assets/project view/circle.png";

export default function ProjectInfo() {
    const navigate = useNavigate();

    const [isTrueMobile, setIsTrueMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsTrueMobile(window.screen.width < 500);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
            }
        }
    };

    const fadeInLeft: Variants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
        }
    };


    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gray-950 flex items-center justify-center font-sans select-none">
            <div className="relative w-full h-full flex flex-col-reverse md:flex-row bg-[#FFEBC9] overflow-hidden">
                {/* Left Half: Project Information details */}
                <div className="w-full md:w-[56%] h-[60vh] md:h-full flex flex-col justify-center pl-16 md:pl-[16vw] pr-6 md:pr-[4vw] py-8 md:py-12 relative z-10 overflow-y-auto">
                    {/* Background decorative circle image */}
                    <motion.img
                        initial={{ y: -200, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.7 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        src={circleImg}
                        alt="circle background"
                        className="absolute top-[-25%] left-[-20%] w-auto h-auto max-w-[250px] md:max-w-[320px] lg:max-w-[400px] pointer-events-none z-0 select-none"
                    />


                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10 flex flex-col gap-1.5 md:gap-3 lg:gap-4.5 max-w-[560px]"
                    >
                        <div>
                            <motion.h1
                                variants={fadeInLeft}
                                className="text-[#1B3E59] text-lg md:text-[24px] lg:text-[44px] font-normal tracking-wide uppercase leading-none font-serif mb-0.5 lg:mb-2"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Project Overview
                            </motion.h1>

                            <motion.p
                                variants={fadeInLeft}
                                className="mb-1.5 lg:mb-4 text-[#062442] font-serif text-[8px] md:text-[11px] lg:text-[18px] font-normal uppercase tracking-widest"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                a destination beyond ordinary
                            </motion.p>

                            <motion.p
                                variants={fadeInLeft}
                                className="text-[7.5px] md:text-[10px] lg:text-[15px] leading-relaxed font-['Outfit'] text-left tracking-wide [word-spacing:.38em] text-[#1f4b76]/85"
                            >
                                Hiranandani Sands is a destination-led coastal township that brings together nature, hospitality, recreation and residences to create a unique lifestyle experience in Alibaug.
                            </motion.p>
                        </div>

                        {/* Staggered lists */}
                        <div className="flex flex-col gap-1.5 md:gap-2.5 lg:gap-4">
                            {/* Section 1 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col gap-0.5 md:gap-1">
                                <h3
                                    className="font-semibold text-[8px] md:text-[10.5px] lg:text-[15px] tracking-wide text-[#1f4b76]/80"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Nature At Its Core
                                </h3>
                                <ul className="flex flex-col gap-0.5">
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        3 KM+ Coastline
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        100+ Acres Wetlands
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        27+ Acres Reserve Forest
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Section 2 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col gap-0.5 md:gap-1">
                                <h3
                                    className="font-semibold text-[8px] md:text-[10.5px] lg:text-[15px] tracking-wide text-[#1f4b76]/80"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Life By The Water
                                </h3>
                                <ul className="flex flex-col gap-0.5">
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        Private Jetty
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        Yacht Club
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        Water Sports Arena
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Section 3 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col gap-0.5 md:gap-1">
                                <h3
                                    className="font-semibold text-[8px] md:text-[10.5px] lg:text-[15px] tracking-wide text-[#1f4b76]/80"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Destination Living
                                </h3>
                                <ul className="flex flex-col gap-0.5">
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        5-Star Hospitality
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        Retail & Dining Experiences
                                    </li>
                                    <li className="flex items-center gap-1 text-[7px] md:text-[9.5px] lg:text-[13.5px] font-normal text-[#1f4b76]/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        <span className="text-[#1f4b76]/60 text-xs shrink-0 select-none">•</span>
                                        Entertainment & Recreation
                                    </li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Button and separator line */}
                        <div className="mt-2 flex flex-col gap-3">
                            <motion.button
                                variants={fadeInLeft}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/Legacypage")}
                                className="cursor-pointer block self-start"
                            >
                                <img src={legacyBtnImg} alt="The Legacy" className="h-[18px] md:h-[26px] lg:h-[42px] w-auto object-contain" />
                            </motion.button>

                            {/* Horizontal Gold Separator Line */}
                            <motion.div
                                variants={fadeInLeft}
                                className="h-[1px] w-[45%]"
                            >
                                <img src={line} alt="line" className="h-full w-full object-cover" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Half: Project Overview Image */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="w-full md:w-[44%] h-[40vh] md:h-full relative overflow-hidden z-0"
                >
                    <img
                        src={projectOverviewImg}
                        alt="Project Overview Aerial"
                        className="w-full h-full object-contain object-right"
                    />
                </motion.div>
            </div>

            {/* Left Navbar */}
            <div className="absolute top-[45%] lg:top-[50%] left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2">
                <LeftNavbar />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate("/home")}
                className={`absolute left-[6%] z-[999] -translate-x-1/2 w-11 h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer ${isTrueMobile
                    ? "bottom-[35%]"
                    : "bottom-[22%] lg:bottom-10"
                    }`}
                title="Go Back"
            >
                <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
            </button>
        </div>
    );
}
