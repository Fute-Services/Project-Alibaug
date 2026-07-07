import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/Amenities/Active Arena.webp";
import LeftNavbar from "../Navbar/LeftNavbar";
import backIcon from "../../assets/back butten.png";
import compassImage from "../../assets/Amenities/compass.png";

interface SubAmenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string | string[]; // SVG coordinates for the highlight shape
    images: string[];
}

interface ActiveArenaProps {
    onBack: () => void;
}


const subAmenitiesData: SubAmenity[] = [
    {
        id: 1,
        number: "01",
        title: "Seating",
        description: "Comfortable spectator seating areas located around the tennis and basketball courts.",
        poly: [
            "976,322,1008,326,1013,310,976,301",
            "883,285,922,278,929,294,890,302",
            "869,516,868,563,889,563,892,514",
            "833,715,859,715,854,750,831,748",
            "827,818,848,820,847,853,824,853"
        ],
        images: []
    },
    {
        id: 2,
        number: "02",
        title: "Tennis Court",
        description: "A premium tennis court layout equipped with high-quality netting and boundary lines.",
        poly: "892,361,1013,369,1006,606,885,600",
        images: []
    },
    {
        id: 3,
        number: "03",
        title: "Basketball Court",
        description: "A premium multipurpose court designed for professional basketball matches and energetic community games.",
        poly: "864,607,1008,609,999,854,864,854",
        images: []
    }
];

function getPolygonCenter(poly: string | string[]): [number, number] {
    const polyString = Array.isArray(poly) ? poly[0] : poly;
    const parts = polyString.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
    if (parts.length < 2) return [0, 0];

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < parts.length; i += 2) {
        const x = parts[i];
        const y = parts[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }

    return [(minX + maxX) / 2, minY + 10];
}

export default function ActiveArena({ onBack }: ActiveArenaProps) {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const center = () => {
            const el = scrollRef.current;
            if (el && el.scrollWidth > el.clientWidth) {
                el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
            }
        };
        requestAnimationFrame(center);
        window.addEventListener('resize', center);
        return () => window.removeEventListener('resize', center);
    }, []);

    return (
        <div ref={scrollRef} className="relative w-screen h-screen overflow-hidden bg-slate-950 flex items-center justify-center font-sans select-none z-[1000] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative w-full aspect-[1982/1024] shrink-0 lg:h-full lg:aspect-auto flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={bgImage}
                    alt="Active Arena Plan"
                    className="absolute inset-0 w-full h-full object-contain lg:object-fill"
                />

                {/* Navigation Bars - Left Navbar Container */}
                <div className="fixed lg:absolute top-[50%] left-[4%] md:left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 lg:gap-5 scale-[.5] md:scale-[.72] lg:scale-100">
                    <LeftNavbar />

                    {/* Back Button */}
                    <button
                        onClick={onBack}
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                        title="Go Back"
                    >
                        <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
                    </button>
                </div>

                {/* Top Header Label */}
                <div className="fixed lg:absolute top-4 md:top-6 lg:top-10 left-1/2 -translate-x-1/2 z-[500] pointer-events-none text-center w-full max-w-[90%] md:max-w-xl">
                    <h2 className="text-[#644406] text-[10px] md:text-sm lg:text-2xl font-bold tracking-widest uppercase text-center font-sans drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
                        Active Arena
                    </h2>
                </div>

            {/* Right Sidebar - Glass Box Amenities List (Compact Style) */}
            <div
                className="fixed lg:absolute top-[50%] right-[4%] lg:right-[-2.5%] z-[999] -translate-y-1/2 w-[145px] md:w-[185px] lg:w-[245px] py-1 md:py-2 lg:py-2.5 px-1.5 md:px-2.5 lg:px-3 rounded-[12px] md:rounded-[16px] lg:rounded-[20px] scale-[.72] lg:scale-100 origin-right transition-all duration-300"
                style={{
                    background: "rgba(42, 46, 34, 0.45)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
            >
                <div className="flex flex-col">
                    {subAmenitiesData.map((item, index) => {
                        const isHovered = hoveredItemId === item.id;
                        return (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredItemId(item.id)}
                                onMouseLeave={() => setHoveredItemId(null)}
                                className={`group flex items-center gap-1 md:gap-2 lg:gap-3 py-0.5 md:py-1 lg:py-2 px-0.5 md:px-1 transition-all duration-300 cursor-pointer ${isHovered ? "bg-white/5 rounded-md lg:rounded-xl translate-x-1" : ""
                                    } ${index !== subAmenitiesData.length - 1 ? "border-b border-white/20" : ""
                                    }`}
                            >
                                {/* Number Badge */}
                                <div
                                    className={`w-3.5 h-3.5 md:w-5 md:h-5 lg:w-[25px] lg:h-[25px] rounded-full flex items-center justify-center font-bold text-[7px] md:text-[9px] lg:text-[10px] transition-all duration-300 shrink-0 ${isHovered
                                        ? "bg-[#DB9B2F] text-slate-950 scale-105 shadow-md shadow-[#DB9B2F]/30"
                                        : "bg-[#DB9B2F] text-[#2a2d1e]"
                                        }`}
                                    style={{
                                        backgroundColor: "#DB9B2F",
                                        color: "#2a2d1e"
                                    }}
                                >
                                    {item.number}
                                </div>

                                {/* Sub-Amenity Title */}
                                <span
                                    className={`text-[7px] md:text-[9.5px] lg:text-[10.5px] font-medium tracking-wide leading-tight transition-colors duration-300 ${isHovered ? "text-[#FFEFA8]" : "text-white/80 group-hover:text-white"
                                        }`}
                                >
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SVG Polygons Interactive Layer */}
            <svg
                className="absolute inset-0 w-full h-full select-none"
                viewBox="0 0 1982 1024"
                preserveAspectRatio="none"
            >
                {subAmenitiesData.map((item) => {
                    const isHovered = hoveredItemId === item.id;
                    const polys = Array.isArray(item.poly) ? item.poly : [item.poly];
                    return polys.map((polyString, idx) => (
                        <polygon
                            key={`${item.id}-${idx}`}
                            points={polyString}
                            className="cursor-pointer transition-all duration-300 ease-in-out outline-none"
                            fill={isHovered ? "rgba(219, 156, 47, 0.45)" : "rgba(255, 255, 255, 0.01)"}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
                        />
                    ));
                })}
            </svg>

            {/* Floating Tooltips above Polygons on Hover */}
            <AnimatePresence>
                {hoveredItemId !== null && (() => {
                    const item = subAmenitiesData.find((a) => a.id === hoveredItemId);
                    if (!item) return null;
                    const [cx, cy] = getPolygonCenter(item.poly);

                    return (
                        <motion.div
                            key={`tooltip-${item.id}`}
                            initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-120%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
                            exit={{ opacity: 0, scale: 0.85, x: "-50%", y: "-110%" }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute pointer-events-none flex flex-col items-center z-[1000]"
                            style={{
                                left: `${(cx / 2020) * 100}%`,
                                top: `${(cy / 1044) * 100}%`,
                                marginTop: "-18px",
                            }}
                        >
                            {/* Tooltip Glass Container */}
                            <div
                                className="px-2 py-1 rounded border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-xl"
                                style={{
                                    background: "rgba(28, 30, 22, 0.9)",
                                }}
                            >
                                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#DB9B2F] text-slate-950 font-bold text-[9px] shrink-0">
                                    {item.number}
                                </span>
                                <span className="text-[10px] font-bold text-[#FFEFA8] tracking-wider uppercase font-sans whitespace-nowrap">
                                    {item.title}
                                </span>
                            </div>

                            {/* Tooltip Pointer */}
                            <div className="w-[12px] h-[6px] -mt-[1px] overflow-hidden flex justify-center">
                                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0 H12 L8 4 C7 5 5 5 4 4 L0 0 Z" fill="rgba(28, 30, 22, 0.9)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                                </svg>
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>

            {/* Compass Overlay in Bottom Right */}
            <div className="fixed lg:absolute bottom-[22%] md:bottom-[5%] lg:bottom-10 md:right-[10%] lg:right-[14%] z-[999] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 pointer-events-none">
                <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
            </div>

            </div>
        </div>
    );
}
