import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/Amenities/Active Coastal Green.webp";
import LeftNavbar from "../Navbar/LeftNavbar";
import backIcon from "../../assets/back butten.png";
import compassImage from "../../assets/Amenities/compass.png";
import icon3d from "../../assets/Amenities/3d icon.png";

// Import 3D render for Active Coastal Green
import cam01 from "../../assets/Gallery/Cam 02 Family and Social Lawn p.jpg (1).webp";

interface SubAmenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string | string[]; // SVG coordinates for the highlight shape
    images: string[];
}

interface CoastalGreenProps {
    onBack: () => void;
}


const subAmenitiesData: SubAmenity[] = [
    {
        id: 1,
        number: "01",
        title: "Entry / Exit",
        description: "Welcoming entry and exit points leading residents into the active coastal green.",
        poly: ["957,250,1004,257,1011,287,1003,308,959,285,924,278,920,256", "1006,665,1017,646,1034,646,1045,614,1024,599,989,651"],
        images: []
    },
    {
        id: 2,
        number: "02",
        title: "Pedestrian Pathway",
        description: "A wide, beautifully paved pedestrian pathway wrapping around the central lawn.",
        poly: "926,276,921,255,837,281,812,342,818,426,835,444,851,454,856,475,856,503,816,556,811,603,814,642,825,649,854,687,893,698,925,710,963,698,998,677,1010,661,1038,629,1073,601,1117,570,1150,512,1161,458,1149,409,1105,349,1031,292,974,265,939,257,933,278,993,304,1024,322,1049,332,1070,351,1103,379,1121,411,1133,435,1135,476,1121,519,1094,554,1061,575,1033,595,990,663,930,680,883,673,848,627,839,585,858,536,874,515,883,486,869,435,844,393,846,344,857,309",
        images: []
    },
    {
        id: 3,
        number: "03",
        title: "The Fit Forest Area",
        description: "An open-air wellness and body workout area integrated within dense trees.",
        poly: "1010,276,1008,251,1043,228,1076,227,1090,260,1108,269,1125,270,1164,288,1174,321,1153,340,1125,358",
        images: []
    },
    {
        id: 4,
        number: "04",
        title: "Coconut Grooves",
        description: "Beautiful groves of tall coconut palms providing deep coastal vibes.",
        poly: "1242,498,1235,456,1232,416,1242,396,1267,400,1293,393,1323,412,1333,459,1314,498",
        images: []
    },
    {
        id: 5,
        number: "05",
        title: "Velvet Meadows",
        description: "A large, lush central green lawn for social interaction, play, and community events.",
        poly: "976,661,1032,601,1064,573,1111,540,1129,484,1125,423,1097,374,1059,339,992,302,927,277,866,302,826,351,834,403,875,452,878,500,857,538,831,592,838,633,857,661,899,682,947,675",
        images: []
    },
    {
        id: 6,
        number: "06",
        title: "Coastal Seating Bowl",
        description: "A circular seating structure built as a scenic viewing point on the slope.",
        poly: "770,346,742,353,715,344,701,309,708,283,733,264,780,258,808,243,820,251,827,279,801,306",
        images: []
    },
    {
        id: 7,
        number: "07",
        title: "The Grand Canopy",
        description: "A grand spreading shade tree serving as a central shelter point.",
        poly: "819,533,852,503,848,465,847,446,806,398,754,397,679,460,768,479",
        images: []
    },
    {
        id: 8,
        number: "08",
        title: "Tiny Trails Play Groove",
        description: "An interactive and safe adventure play groove built specifically for children.",
        poly: "714,631,675,640,694,600,712,582,742,575,773,587,787,608,787,629,766,622,747,626",
        images: []
    },
    {
        id: 9,
        number: "09",
        title: "Kids play -EPDM",
        description: "An interactive and safe adventure play groove built specifically for children.",
        poly: "698,720,831,668,880,726,859,766,812,778,733,769",
        images: []
    },
    {
        id: 10,
        number: "10",
        title: "Peripheral landscape",
        description: "An interactive and safe adventure play groove built specifically for children.",
        poly: "672,467,722,468,764,481,820,537,806,594,763,575,712,570,687,584,668,636,665,535",
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

export default function CoastalGreen({ onBack }: CoastalGreenProps) {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
    const [is3DActive, setIs3DActive] = useState<boolean>(false);
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
                    src={is3DActive ? cam01 : bgImage}
                    alt={is3DActive ? "3D Active Coastal Green View" : "Active Coastal Green Plan"}
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
                            Coastal Green
                        </h2>
                    </div>
                )}



                {/* Right Controls Container (Groups 3D button and list box on mobile/tablet to avoid overlap) */}
                {!is3DActive && (
                    <div className="fixed top-[50%] -translate-y-1/2 right-[4%] lg:right-auto lg:top-auto lg:translate-y-0 z-[999] flex flex-col items-end gap-4 lg:contents scale-[.72] lg:scale-100 origin-right">
                        {/* Explore 3D View Button */}
                        <div
                            onClick={() => {
                                setIs3DActive(true);
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

                        {/* Right Sidebar - Glass Box Amenities List (Compact Style) */}
                        <div
                            className="lg:absolute lg:top-[55%] lg:-translate-y-1/2 lg:right-[-2.5%] z-[999] w-[145px] md:w-[185px] lg:w-[245px] py-1 md:py-2 lg:py-2.5 px-1.5 md:px-2.5 lg:px-3 rounded-[12px] md:rounded-[16px] lg:rounded-[20px]  transition-all duration-300"
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

                {/* Compass Overlay in Bottom Right */}
                {!is3DActive && (
                    <div className="fixed lg:absolute bottom-[22%] md:bottom-[4%] lg:bottom-10 md:right-[22%] lg:right-[14%] z-[999] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 pointer-events-none">
                        <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
                    </div>
                )}

                {/* Image Name / Title Card */}
                {is3DActive && (
                    <div className="fixed lg:absolute bottom-[36px] md:bottom-[54px] lg:bottom-[96px] left-1/2 -translate-x-1/2 z-[999] text-center pointer-events-none select-none">
                        <AnimatePresence mode="wait">
                            <motion.div
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
                                    Coastal Green
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

            </div>
        </div>
    );
}
