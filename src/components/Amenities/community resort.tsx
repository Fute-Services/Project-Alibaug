import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bgImage from "../../assets/Amenities/community resort.webp";
import LeftNavbar from "../Navbar/LeftNavbar";
import backIcon from "../../assets/back butten.png";
import icon3d from "../../assets/Amenities/3d icon.png";
import compassImage from "../../assets/Amenities/compass.png";


// Import active leisure cameras as default 3D renders (change these paths when new renders are added)
import cam01 from "../../assets/Gallery/CAM 07 COMMUNITY RESORT GREEN (1).webp";
import cam02 from "../../assets/Gallery/CAM 08 COMMUNITY RESORT GREEN  (1).webp";

interface SubAmenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string | string[]; // SVG coordinates for the shape highlight
    images: string[];
}

interface CommunityResortProps {
    onBack: () => void;
}

const subAmenitiesData: SubAmenity[] = [
    {
        id: 1,
        number: "01",
        title: "Entry / Exit",
        description: "The welcoming gateway that guides residents into the calming landscape of the community resort green.",
        poly: [
            "820,243,847,242,861,252,885,252,906,249,913,224,864,205,841,217",
            "1153,830,1165,781,1197,771,1237,781,1255,813,1255,869,1251,914,1249,927,1227,925,1213,892,1202,857"
        ],
        images: [
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Palm Breeze Walk",
        description: "A scenic walking trail flanked by elegant palm trees, offering gentle breezes and dappled sunlight.",
        poly: "911,245,927,236,957,228,985,226,1011,238,1022,266,1017,282,996,306,971,312,936,312,908,312,882,322,854,350,834,396,836,446,852,488,890,513,924,532,957,539,999,565,1017,599,1017,634,1013,660,982,707,940,716,922,693,919,658,919,644,908,623,882,616,862,609,854,620,868,627,887,635,901,655,897,686,903,704,915,728,943,739,968,742,1001,726,1022,698,1039,674,1043,646,1038,609,1027,574,1003,544,975,529,943,520,917,511,875,490,852,455,852,415,862,382,876,361,894,352,917,338,940,334,966,334,997,329,1025,312,1029,273,1031,254,1020,224,994,214,961,214,929,221",
        images: [
        ]
    },
    {
        id: 3,
        number: "03",
        title: "Meditation Deck",
        description: "A circular stone-paved deck positioned in a quiet garden corner, built specifically for mindfulness and meditation.",
        poly: "950,517,917,515,883,496,857,459,855,424,857,403,864,379,882,352,903,347,940,337,957,337,999,333,1013,323,1027,323,1039,349,1031,372,1006,389,950,371,919,373,904,401,911,420,929,438,959,446,982,473,978,501",
        images: [
        ]
    },
    {
        id: 4,
        number: "04",
        title: "Lagoon",
        description: "A calming water feature simulating a natural tropical lagoon, adding tranquil visual depth to the site.",
        poly: "931,608,911,592,896,575,894,557,917,550,945,550,982,575,1001,598,1003,636,996,662,983,685,948,696,929,661,936,634,947,634,959,640,980,629,989,622,983,592,968,589,943,598",
        images: [
        ]
    },
    {
        id: 5,
        number: "05",
        title: "The Coastal Whisper Cabana",
        description: "An elegant wooden retreat structure in the center of the resort layout, ideal for lounging and relaxation.",
        poly: "908,620,922,615,943,608,940,592,978,585,992,624,957,638,948,627,920,638",
        images: [
        ]
    },
    {
        id: 6,
        number: "06",
        title: "The Green Horizon",
        description: "A beautifully manicured open lawn that provides a vast green canvas for leisure, picnics, and social gatherings.",
        poly: "950,519,1006,549,1027,575,1043,603,1043,650,1031,690,1010,715,976,739,927,734,910,718,894,690,896,661,896,638,880,634,869,629,850,647,840,704,855,760,885,799,910,808,954,806,987,813,1018,853,1053,837,1088,813,1151,781,1143,746,1160,734,1167,701,1127,661,1118,603,1109,559,1062,487,1052,452,1006,437,959,431,978,468,978,498",
        images: [
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Bridge Over The Pond",
        description: "A wooden bridge crossing the calm pond, connecting different garden areas with a scenic walkway path.",
        poly: "992,858,1046,844,1073,829,1092,813,1111,841,1048,879,992,879",
        images: [
        ]
    },
    {
        id: 8,
        number: "08",
        title: "Butterfly Garden",
        description: "A colorful garden curated with nectar-rich flowering plants, designed to attract local butterfly species.",
        poly: "785,713,743,729,740,750,735,795,745,834,754,867,757,906,775,914,813,911,824,939,876,932,901,900,917,886,866,829,831,802,810,753,806,729",
        images: [
        ]
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

export default function CommunityResort({ onBack }: CommunityResortProps) {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
    const [is3DActive, setIs3DActive] = useState<boolean>(false);
    const [active3DImageIndex, setActive3DImageIndex] = useState<number>(0);
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
                {/* Background Image (2D Plan or 3D Render) */}
                <img
                    src={is3DActive ? (active3DImageIndex === 0 ? cam01 : cam02) : bgImage}
                    alt={is3DActive ? "3D Community Resort View" : "Community Resort Green Plan"}
                    className={`absolute inset-0 w-full h-full transition-all duration-500 ${is3DActive ? "object-cover" : "object-contain lg:object-fill"}`}
                />

                {/* Navigation Bars - Left Navbar Container */}
                <div className="fixed lg:absolute top-[50%] left-[4%] md:left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 lg:gap-5 scale-[.5] md:scale-[.72] lg:scale-100">
                    <LeftNavbar />
                    {/* Back Button */}
                    <button
                        onClick={is3DActive ? () => setIs3DActive(false) : onBack}
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                        title="Go Back"
                    >
                        <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
                    </button>
                </div>

                {/* Top Header Label */}
                {!is3DActive && (
                    <div className="fixed lg:absolute top-4 md:top-6 lg:top-10 left-1/2 -translate-x-1/2 z-[500] pointer-events-none text-center w-full max-w-[90%] md:max-w-xl">
                        <h2 className="text-[#644406] text-[10px] md:text-sm lg:text-2xl font-bold tracking-widest uppercase text-center font-sans drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
                            Community Resort Green
                        </h2>
                    </div>
                )}

                {/* 3D Navigation Controls */}
                {is3DActive && (
                    <div className="fixed lg:absolute bottom-2 md:bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 z-[999] flex gap-2 md:gap-4">
                        <button
                            onClick={() => setActive3DImageIndex((prev) => (prev - 1 + 2) % 2)}
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer bg-[#FFE2A4] text-[#644406] border border-[#DB9B2F]/40 hover:bg-[#DB9B2F] hover:text-[#FFE2A4]"
                            title="Previous View"
                        >
                            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                        </button>
                        <button
                            onClick={() => setActive3DImageIndex((prev) => (prev + 1) % 2)}
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer bg-[#FFE2A4] text-[#644406] border border-[#DB9B2F]/40 hover:bg-[#DB9B2F] hover:text-[#FFE2A4]"
                            title="Next View"
                        >
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                        </button>
                    </div>
                )}

                {/* Bottom Right Minimap */}
                {is3DActive && (
                    <div
                        className="fixed lg:absolute bottom-2 md:bottom-4 lg:bottom-10 right-[4%] z-[999] w-[100px] h-[75px] md:w-[140px] md:h-[105px] lg:w-[180px] lg:h-[135px] rounded-[10px] md:rounded-[15px] lg:rounded-[20px] shadow-2xl transition-all duration-300"
                        style={{
                            background: "rgba(255, 255, 255, 0.45)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "2px solid rgba(255, 255, 255, 0.8)",
                        }}
                    >
                        <div className="relative w-full h-full rounded-[8px] md:rounded-[12px] lg:rounded-[14px] overflow-hidden bg-slate-900/60">
                            <img
                                src={bgImage}
                                alt="Minimap"
                                className="w-full h-full object-cover opacity-90"
                            />
                            {/* Cam 01 Dot */}
                            <button
                                onClick={() => setActive3DImageIndex(0)}
                                className="absolute transition-all duration-300 hover:scale-125 cursor-pointer z-10"
                                style={{
                                    left: "50%",
                                    top: "30%",
                                    transform: "translate(-50%, -50%)",
                                }}
                                title="Camera 1"
                            >
                                <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5">
                                    {active3DImageIndex === 0 && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400  opacity-75"></span>
                                    )}
                                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5 bg-yellow-500 shadow-md shadow-yellow-500/50 border border-white"></span>
                                </span>
                            </button>

                            {/* Cam 02 Dot */}
                            <button
                                onClick={() => setActive3DImageIndex(1)}
                                className="absolute transition-all duration-300 hover:scale-125 cursor-pointer z-10"
                                style={{
                                    left: "50%",
                                    top: "60%",
                                    transform: "translate(-50%, -50%)",
                                }}
                                title="Camera 2"
                            >
                                <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5">
                                    {active3DImageIndex === 1 && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    )}
                                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 lg:h-3.5 lg:w-3.5 bg-blue-500 shadow-md shadow-blue-500/50  border border-white"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}

            {/* Right Controls Container (Groups 3D button and list box on mobile/tablet to avoid overlap) */}
            {!is3DActive && (
                <div className="fixed top-[50%] -translate-y-1/2 right-[4%] lg:right-auto lg:top-auto lg:translate-y-0 z-[999] flex flex-col items-end gap-4 lg:contents scale-[.72] lg:scale-100 origin-right">
                    {/* Explore 3D View Button */}
                    <div
                        onClick={() => {
                            setIs3DActive(true);
                            setActive3DImageIndex(0);
                        }}
                        className="lg:absolute lg:top-[14%] lg:right-[-2%] z-[999] flex items-center gap-1.5 md:gap-2.5 lg:gap-3.5 pl-0.5 lg:pl-1 pr-6 md:pr-10 lg:pr-16 py-0.5 lg:py-1 rounded-full hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        style={{
                            backgroundColor: "#FFE2A4",
                        }}
                    >
                        <div
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ backgroundColor: "#DB9B2F" }}
                        >
                            <img src={icon3d} alt="3D" className="w-4 h-4 md:w-5 md:h-5 lg:w-6.5 lg:h-6.5 object-contain" />
                        </div>
                        <span className="text-[8px] md:text-[10px] lg:text-[14px] font-semibold text-[#644406] font-sans">
                            Explore 3D View
                        </span>
                    </div>

                    {/* Right Sidebar - Glass Box Amenities List */}
                    <div
                        className="lg:absolute lg:top-[50%] lg:-translate-y-1/2 lg:right-[-2.5%] z-[999] w-[145px] md:w-[185px] lg:w-[275px] py-1 md:py-2 lg:py-2.5 px-1.5 md:px-2.5 lg:px-3.5 rounded-[12px] md:rounded-[16px] lg:rounded-[20px] shadow-2xl transition-all duration-300"
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
                                            className={`w-3.5 h-3.5 md:w-5 md:h-5 lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center font-bold text-[7px] md:text-[9px] lg:text-[11px] transition-all duration-300 shrink-0 ${isHovered
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
                                            className={`text-[7px] md:text-[9.5px] lg:text-[11.5px] font-medium tracking-wide leading-tight transition-colors duration-300 ${isHovered ? "text-[#FFEFA8]" : "text-white/80 group-hover:text-white"
                                                }`}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* SVG Polygons Interactive Layer */}
            {!is3DActive && (
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
            )}

            {/* Floating Tooltips above Polygons on Hover */}
            {!is3DActive && (
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
            )}

            {!is3DActive && (
                <div className="fixed lg:absolute bottom-[22%] md:bottom-[5%] lg:bottom-10 md:right-[10%] lg:right-[14%] z-[999] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 pointer-events-none">
                    <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
                </div>
            )}

            {/* Image Name / Title Card */}
            {is3DActive && (
                <div className="fixed lg:absolute bottom-[36px] md:bottom-[54px] lg:bottom-[96px] left-1/2 -translate-x-1/2 z-[999] text-center pointer-events-none select-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active3DImageIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="px-3 py-1 md:px-4 md:py-1.5 lg:px-6 lg:py-2 rounded-full border border-[#DB9B2F]/20 bg-black/60 backdrop-blur-md shadow-2xl min-w-[120px] md:min-w-[160px] lg:min-w-[200px]"
                        >
                            <span 
                                className="text-[#FFE2A4] text-[7.5px] md:text-[10px] lg:text-[15px] font-normal tracking-[0.25em] uppercase whitespace-nowrap"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Community Resort Green
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            </div>
        </div>
    );
}