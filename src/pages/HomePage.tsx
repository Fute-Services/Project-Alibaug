import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/homepagefinal1.webp";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import RightNavbar from "../components/Navbar/RightNavbar";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/Home/Coral reserve logo.png';
import backIcon from "../assets/back butten.png";
import compassImage from "../assets/Amenities/compass.png";

export default function HomePage() {
    const [hoveredTooltipId, setHoveredTooltipId] = useState<number | null>(null);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const centerScroll = () => {
            const el = scrollRef.current;
            if (!el) return;
            // Only center the horizontal scroll on mobile/tablet (where the map is
            // wider than the viewport). On desktop the map fills the screen, so keep
            // it flush-left — otherwise stray overflow would shift it and reveal the
            // background as a black strip on the right.
            if (window.innerWidth < 1024 && el.scrollWidth > el.clientWidth) {
                el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
            } else {
                el.scrollLeft = 0;
            }
        };
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
            requestAnimationFrame(centerScroll);
        };
        handleResize();
        requestAnimationFrame(centerScroll);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const aspectStyle = isMobileOrTablet ? "xMidYMid meet" : "none";

    const plotData = [
        {
            id: 1,
            poly1: "503,305,664,312,758,282,806,310,769,571,460,556",
            circle: "602,291,26",
            name: "CORAL COURT",
            path: "/coral-court",
            rect: "513,730,549,911"
        },
        {
            id: 2,
            poly1: "858,268,901,216,1020,188,1102,419,1086,587,970,574,940,765,912,774,846,770,810,769,846,524,824,519",
            circle: "845,952,23",
            name: "CORAL NEST",
            path: "/coral-nest",
            rect: "827,730,864,914"
        },
        {
            id: 3,
            poly1: "1250,193,1325,193,1546,188,1546,334,1543,397,1519,450,1461,514,1491,551,1473,578,1416,721,1396,770,1357,770,1291,818,1229,874,1174,840,1140,845,1120,840,1156,560,1259,555",
            circle: "1179,442,27",
            name: "CORAL BAY",
            path: "/coral-bay",
            rect: "1373,730,1412,927"
        }
    ];

    return (
        <div
            className="relative w-screen h-screen overflow-hidden font-sans select-none"
            style={{ background: "linear-gradient(180deg, #BFC18D 0%, #9BA06E 100%)" }}
        >
            {/* Left Navigation Bar */}
            <div className="absolute top-[50%] left-[4%] md:left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 lg:gap-5 scale-[.5] md:scale-[.72] lg:scale-100">
                <LeftNavbar />
                {/* Back Button — kept in the same column so the gap to the
                    Brochure button stays constant on every screen height */}
                <button
                    onClick={() => navigate("/")}
                    className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                    title="Back to Intro"
                >
                    <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
                </button>
            </div>

            {/* Right Navigation Bar */}
            <RightNavbar />

            {/* Main Center Container */}
            <div ref={scrollRef} className="flex h-screen w-screen overflow-hidden justify-center items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="relative w-full aspect-[1982/1024] shrink-0 lg:h-full lg:aspect-auto">
                    {/* ================= BRAND LOGO (top-left) ================= */}
                    {/* The source is a wide ~12:1 wordmark, so we fix a modest
                        height and let the width scale (w-auto) to keep it crisp
                        and undistorted, with a consistent top-left margin. */}
                    <img
                        src={logo}
                        alt="Coral Reserve"
                        className="absolute top-4 left-10 md:top-5 md:left-16 lg:top-7 lg:left-24 z-50 h-[12px] md:h-[16px] lg:h-[19px] w-auto object-contain pointer-events-none select-none"
                    />

                    {/* Base Image Layout Floorplan */}
                    <img
                        src={bgImage}
                        alt="Layout Blueprint"
                        className="absolute inset-0 w-full h-full object-contain lg:object-fill"
                    />

                    {/* Interactive SVG Overlay Layer */}
                    <svg
                        className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                        viewBox="0 0 2020 1044"
                        preserveAspectRatio={aspectStyle}
                    >
                        {plotData.map((item: any) => (
                            <polygon
                                key={item.id}
                                points={item.poly1}
                                fill="transparent"
                                className="cursor-default transition-all duration-200 ease-in-out pointer-events-auto"
                                onMouseEnter={() => setHoveredTooltipId(item.id)}
                                onMouseLeave={() => setHoveredTooltipId(null)}
                            />
                        ))}
                    </svg>

                    {/* Glassmorphism Tooltips */}
                    <AnimatePresence>
                        {plotData.map((item: any, index: number) => {
                            const [x1, y1, x2, y2] = item.rect.split(",").map(Number);
                            const rx = (x1 + x2) / 2;
                            const ry = (y1 + y2) / 2;
                            const isThisTooltipHovered = hoveredTooltipId === item.id;

                            return (
                                <motion.div
                                    key={`tooltip-${item.id}`}
                                    onMouseEnter={() => setHoveredTooltipId(item.id)}
                                    onMouseLeave={() => setHoveredTooltipId(null)}
                                    initial={{ opacity: 0, scale: 0.75, x: "-50%", y: "-40%" }}
                                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "0%" }}
                                    exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-15%" }}
                                    transition={{
                                        type: "tween",
                                        ease: [0.34, 1.56, 0.64, 1],
                                        duration: 0.65,
                                        delay: 0.5 + (index * 0.12)
                                    }}
                                    className="absolute pointer-events-auto flex flex-col items-center cursor-default"
                                    style={{
                                        left: `${(rx / 1982) * 100}%`,
                                        top: `${(ry / 1024) * 100}%`,
                                        marginTop: "15px",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    {/* Smooth Curved Glassmorphism Pointer Arrow (Pointing Up) */}
                                    <div className="w-[32px] h-[12px] -mb-[1px] overflow-hidden flex justify-center z-10">
                                        <svg
                                            width="32"
                                            height="12"
                                            viewBox="0 0 32 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="transition-all duration-300 rotate-180"
                                        >
                                            <path
                                                d="M0 0 H32 L20.5 8.25 C18.0 10.25 14.0 10.25 11.5 8.25 L0 0 Z"
                                                fill={isThisTooltipHovered ? "rgb(169, 128, 87)" : "rgba(244, 237, 217, 0.45)"}
                                                stroke={isThisTooltipHovered ? "rgba(255,255,255,0.7)" : "rgba(255, 255, 255, 0.4)"}
                                                strokeWidth="1.2"
                                            />
                                        </svg>
                                    </div>

                                    {/* Tooltip Glass Body Box */}
                                    <div
                                        className="w-auto h-auto px-2 py-1 lg:px-4 lg:py-1.5 rounded-lg flex items-center justify-center border transition-all duration-300 backdrop-blur-md"
                                        style={{
                                            background: isThisTooltipHovered
                                                ? "linear-gradient(135deg, rgba(219, 155, 47, 0.5) 0%, rgba(163, 112, 30, 0.5) 45%, rgb(169, 128, 87) 100%)"
                                                : "linear-gradient(135deg, rgba(244, 237, 217, 0.55), rgba(244, 237, 217, 0.35))",
                                            borderColor: isThisTooltipHovered ? "rgba(255,255,255,0.7)" : "rgba(255, 255, 255, 0.4)",
                                        }}
                                    >
                                        <span
                                            className="text-[10px] md:text-[11px] lg:text-[13px] font-bold tracking-wider font-sans uppercase transition-colors duration-300"
                                            style={{
                                                color: isThisTooltipHovered ? "#FFFFFF" : "#4a3b2c",
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* ================= COMPASS ================= */}
                    <div className="absolute bottom-2 md:bottom-4 lg:bottom-14 right-[20%] md:right-[15%] lg:right-[15%] z-[999] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 pointer-events-none select-none">
                        <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
}