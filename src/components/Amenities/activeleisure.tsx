import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/Amenities/active leisure.webp";
import LeftNavbar from "../Navbar/LeftNavbar";
import backIcon from "../../assets/back butten.png";
import icon3d from "../../assets/Amenities/3d icon.png";
import compassImage from "../../assets/Amenities/compass.png";
import cam01 from "../../assets/Gallery/Cam 01 Leisure & Family Park P.jpg (1).webp";
// import cam02 from "../../assets/Gallery/Cam 02 Family and Social Lawn p.jpg (1).webp";

interface SubAmenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string; // SVG coordinates for the shape highlight
    images: string[];
}

interface ActiveLeisureProps {
    onBack: () => void;
}

const subAmenitiesData: SubAmenity[] = [
    {
        id: 1,
        number: "01",
        title: "Coastal Garden",
        description: "A serene garden trail featuring indigenous coastal plants and peaceful ocean vistas.",
        poly: "806,266,864,324,887,298,894,266,896,250,892,212,824,208",
        images: [
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Celebration Lawn",
        description: "A massive circular green lawn designed for community events, family gatherings, and celebrations.",
        poly: "665,676,705,648,733,637,766,634,819,653,850,684,866,704,913,677,954,606,966,537,961,488,938,439,901,404,862,390,850,410,827,420,803,431,754,439,721,450,689,474,666,511,640,609,659,616",
        images: [
        ]
    },
    {
        id: 3,
        number: "03",
        title: "Performance Deck",
        description: "An elegant wooden circular stage for community performances, music, and recreational activities.",
        poly: "701,684,733,705,743,715,752,715,766,708,829,708,824,684,806,668,770,657,728,663",
        images: [
            ""]
    },
    {
        id: 4,
        number: "04",
        title: "Amphitheatre",
        description: "Tiered seating looking over the performance deck, offering a perfect venue for evening gatherings.",
        poly: "658,624,663,673,670,701,686,736,714,757,738,767,775,774,824,760,855,767,864,781,866,801,840,851,855,876,845,885,822,871,759,879,687,862,635,827,602,788,575,743,598,675,617,634,635,617",
        images: [
        ]
    },
    {
        id: 5,
        number: "05",
        title: "Pathway",
        description: "Beautifully paved jogging and walking trails weaving through the lush green landscape.",
        poly: "866,390,915,412,945,444,963,488,970,549,959,603,947,635,917,677,870,712,863,731,884,731,905,720,931,701,949,671,963,650,977,645,980,657,986,666,1000,673,1029,668,1059,666,1082,673,1094,685,1089,708,1080,720,1077,733,1092,734,1108,740,1112,715,1122,696,1127,675,1141,666,1117,647,1096,642,1070,622,1035,584,1033,552,1031,524,1035,498,1052,486,1084,477,1105,486,1117,495,1120,479,1119,451,1105,435,1101,409,1120,391,1140,370,1162,356,1180,356,1210,365,1239,360,1260,353,1269,321,1274,271,1229,255,1175,265,1131,237,1098,223,1050,220,1015,249,1029,256,1043,249,1075,234,1092,239,1118,258,1135,276,1167,288,1205,274,1233,269,1237,279,1244,302,1233,326,1219,339,1188,337,1153,328,1125,340,1114,354,1095,377,1060,375,1039,379,1025,412,978,427,917,394,913,373,913,345,908,324,873,317,887,361",
        images: [
        ]
    },
    {
        id: 6,
        number: "06",
        title: "Plaza",
        description: "A centralized social plaza with shade structures, seating, and interactive details.",
        poly: "1116,500,1129,532,1143,546,1164,546,1185,532,1188,516,1190,495,1190,479,1167,453,1130,451,1118,474",
        images: [
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Family Deck",
        description: "A quiet, secluded deck space built for families to enjoy picnics and private relaxation.",
        poly: "1160,330,1167,288,1193,283,1214,274,1235,269,1253,279,1258,305,1249,325,1241,335,1223,340,1206,344",
        images: [
        ]
    },
    {
        id: 8,
        number: "08",
        title: "Picnic",
        description: "Dedicated lawns for outdoor lunches, yoga, and quiet sunbathing surrounded by trees.",
        poly: "1064,372,1067,346,1055,328,1045,319,1025,295,1020,267,1041,251,1053,239,1085,237,1108,251,1130,270,1167,290,1164,323,1125,346,1101,379",
        images: [
        ]
    }
];

function getPolygonCenter(polyString: string): [number, number] {
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

export default function ActiveLeisure({ onBack }: ActiveLeisureProps) {
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
                {/* Background Image (2D Plan or 3D Render) */}
                <img
                    src={is3DActive ? cam01 : bgImage}
                    alt={is3DActive ? "3D Active Leisure View" : "Active Leisure & Family Recreation Park Plan"}
                    className={`absolute inset-0 w-full h-full transition-all duration-500 ${is3DActive ? "object-cover" : "object-contain lg:object-fill"}`}
                />

                {/* Navigation Bars - Left Navbar Container */}
                <div className="fixed lg:absolute top-[50%] left-[4%] md:left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 lg:gap-5 scale-[.5] md:scale-[.72] lg:scale-100">
                    <LeftNavbar />

                    {/* Back Button (using custom back butten.png asset) */}
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
                        <h2 className="text-[#644406] text-[10px] md:text-sm lg:text-2xl font-bold tracking-wide uppercase text-center font-sans drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
                            Active leisure & Famiy recreation park
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

                        {/* Right Sidebar - Glass Box Amenities List */}
                        <div
                            className="lg:absolute lg:top-[50%] lg:-translate-y-1/2 lg:right-[-6%] z-[999] w-[145px] md:w-[185px] lg:w-[275px] py-1 md:py-2 lg:py-2.5 px-1.5 md:px-2.5 lg:px-3.5 rounded-[12px] md:rounded-[16px] lg:rounded-[20px] shadow-2xl transition-all duration-300"
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
                            return (
                                <polygon
                                    key={item.id}
                                    points={item.poly}
                                    className="cursor-pointer transition-all duration-300 ease-in-out outline-none"
                                    fill={isHovered ? "rgba(219, 156, 47, 0.45)" : "rgba(255, 255, 255, 0.01)"}
                                    onMouseEnter={() => setHoveredItemId(item.id)}
                                    onMouseLeave={() => setHoveredItemId(null)}
                                />
                            );
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
                        <div className="px-3 py-1 md:px-4 md:py-1.5 lg:px-6 lg:py-2 rounded-full border border-[#DB9B2F]/20 bg-black/60 backdrop-blur-md shadow-2xl min-w-[120px] md:min-w-[160px] lg:min-w-[200px]">
                            <span
                                className="text-[#FFE2A4] text-[7.5px] md:text-[10px] lg:text-[15px] font-normal tracking-[0.25em] uppercase whitespace-nowrap"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Active leisure & Famiy recreation park
                            </span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
