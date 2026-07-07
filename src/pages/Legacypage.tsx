import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import backIcon from "../assets/back butten.png";
import circleImg from "../assets/project view/circle.png";
import legacyImg from "../assets/project view/lagacy.webp";
import logo from "../assets/project view/Alibaugh 2 [Vectorized] (1).svg";
import rightCircleImg from "../assets/project view/lagacy_rigth circle.png";
import yearsIcon from "../assets/project view/years_icon.png";
import awardsIcon from "../assets/project view/awards_icon.png";
import familiesIcon from "../assets/project view/families_icon.png";

export default function Legalpage() {
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
                staggerChildren: 0.12,
                delayChildren: 0.1
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

    const fadeInRight: Variants = {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gray-950 flex items-center justify-center font-sans select-none">
            <div className="relative w-full h-full flex flex-col-reverse md:flex-row bg-[#FFEBC9] overflow-hidden">
                {/* Left Half: Content Area */}
                <div className="w-full md:w-[60%] h-[60vh] md:h-full flex flex-col justify-center pl-16 md:pl-[14vw] pr-6 md:pr-[4vw] py-8 md:py-12 relative z-10 overflow-y-auto">
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
                        className="relative z-10 w-full flex flex-col justify-center h-auto max-w-[800px] text-left gap-1.5 md:gap-3 lg:gap-4"
                    >
                        {/* Main Luxury Title */}
                        <motion.h1
                            variants={fadeInLeft}
                            className="text-[#105CA8] text-[10px] md:text-[15px] lg:text-[24px] xl:text-[30px] 2xl:text-[36px] font-normal tracking-[0.06em] [word-spacing:0.18em] uppercase leading-[1.25] font-serif"
                            style={{ fontFamily: "'Cinzel', serif" }}
                        >
                            <span className="block md:whitespace-nowrap">THE HIRANANDANI LEGACY:</span>
                            <span className="block md:whitespace-nowrap">OVER 45 YEARS OF EXCELLENCE</span>
                        </motion.h1>

                        {/* Subtitle / Foundation of trust */}
                        <motion.h2
                            variants={fadeInLeft}
                            className="text-[#105CA8] font-bold text-[7px] md:text-[10px] lg:text-[13px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: "'Cinzel', serif" }}
                        >
                            A FOUNDATION OF TRUST
                        </motion.h2>

                        {/* Description Paragraph */}
                        <motion.p
                            variants={fadeInLeft}
                            className="text-[7.5px] md:text-[10px] lg:text-[15px] leading-relaxed font-normal text-left max-w-[650px] tracking-wide text-[#105CA8]/85"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Established in 1978, the Hiranandani Group is one of Mumbai’s most prestigious real estate developers, built on a vision of creating a "New India" through self-sufficient and enduring townships.
                        </motion.p>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-3 gap-3 md:gap-8 w-full max-w-[750px] text-left mt-1 md:mt-2 md:-ml-[40px]">
                            {/* Stat 1 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                                <h3
                                    className="text-[#105CA8] text-[8px] md:text-[12px] lg:text-[22px] font-normal uppercase whitespace-nowrap"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    45+ YEARS
                                </h3>
                                <img src={yearsIcon} alt="Years" className="h-5 md:h-8 lg:h-12 w-auto object-contain self-center my-0.5 md:my-1.5 pointer-events-none select-none" />
                                <p
                                    className="text-[6.5px] md:text-[9px] lg:text-[13.5px] text-[#105CA8]/80 font-normal leading-snug text-center"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    of exceeding<br />expectations
                                </p>
                            </motion.div>

                            {/* Stat 2 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                                <h3
                                    className="text-[#105CA8] text-[8px] md:text-[12px] lg:text-[22px] font-normal uppercase whitespace-nowrap"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    100+ AWARDS
                                </h3>
                                <img src={awardsIcon} alt="Awards" className="h-5 md:h-8 lg:h-12 w-auto object-contain self-center my-0.5 md:my-1.5 pointer-events-none select-none" />
                                <p
                                    className="text-[6.5px] md:text-[9px] lg:text-[13.5px] text-[#105CA8]/80 font-normal leading-snug text-center"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    won for excellence in development.
                                </p>
                            </motion.div>

                            {/* Stat 3 */}
                            <motion.div variants={fadeInLeft} className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                                <h3
                                    className="text-[#105CA8] text-[8px] md:text-[12px] lg:text-[22px] font-normal uppercase whitespace-nowrap"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    22,000+ FAMILIES
                                </h3>
                                <img src={familiesIcon} alt="Families" className="h-5 md:h-8 lg:h-12 w-auto object-contain self-center my-0.5 md:my-1.5 pointer-events-none select-none" />
                                <p
                                    className="text-[6.5px] md:text-[9px] lg:text-[13.5px] text-[#105CA8]/80 font-normal leading-snug text-center"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    happy calling our townships home.
                                </p>
                            </motion.div>
                        </div>

                        {/* Proudly Serving Info */}
                        <motion.div
                            variants={fadeInLeft}
                            className="text-[7.5px] md:text-[10px] lg:text-[14px] text-[#105CA8] font-normal text-left mt-1 md:mt-4 tracking-wide [word-spacing:.38em]"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            <span className="font-bold">Proudly Serving: </span>
                            Powai, Panvel, Chennai, Thane, Gandhinagar, Khandala
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Half: Legacy building/eagle statue Image */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="w-full md:w-[40%] h-[40vh] md:h-full relative overflow-hidden z-0"
                >
                    <img
                        src={legacyImg}
                        alt="The Legacy Building"
                        className="w-full h-full object-cover object-bottom"
                    />
                </motion.div>

                {/* Top Right Logo Overlay */}
                <motion.div
                    variants={fadeInRight}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-8 right-8 md:right-[4%] z-20 w-[125px] md:w-[150px] opacity-90"
                >
                    <img src={logo} alt="Hiranandani Sands" className="w-full h-auto object-contain" />
                </motion.div>

                {/* Background decorative right circle image */}
                <motion.img
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    src={rightCircleImg}
                    alt="right circle background"
                    className="absolute top-[0%] right-[0%] w-auto h-auto max-w-[250px] md:max-w-[320px] lg:max-w-[400px] pointer-events-none z-10 select-none"
                />
            </div>

            {/* Left Navbar */}
            <div className="absolute top-[45%] lg:top-[50%] left-[4%] md:left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2 scale-[.5] md:scale-[.72] lg:scale-100">
                <LeftNavbar />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate("/project-info")}
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