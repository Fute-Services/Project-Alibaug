import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/Amenities/tropical court.webp";
import LeftNavbar from "../Navbar/LeftNavbar";
import backIcon from "../../assets/back butten.png";
import icon3d from "../../assets/Amenities/3d icon.png";
import compassImage from "../../assets/Amenities/compass.png";
import cam03 from "../../assets/Gallery/Cam 03 Tropical Courtyard Green P.jpg (1).webp";

interface SubAmenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string | string[]; // SVG coordinates for the shape highlight
    images: string[];
}

interface TropicalCourtProps {
    onBack: () => void;
}

const subAmenitiesData: SubAmenity[] = [
    {
        id: 1,
        number: "01",
        title: "Entry / Exit",
        description: "The main gateway to the tropical courtyard, framed by lush foliage and elegant pathway lighting.",
        poly: "1475,539,1456,527,1468,494,1467,474,1451,460,1430,448,1442,427,1477,429,1509,439,1535,441,1535,501,1507,494",
        images: [
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Walking Track",
        description: "A beautifully paved path looping around the lawn, ideal for morning walks and peaceful evening jogs.",
        poly: "1435,452,1405,434,1393,411,1386,376,1382,350,1354,338,1297,336,1272,359,1234,378,1195,394,1129,403,1069,396,1017,387,973,385,897,410,836,487,826,530,827,592,861,656,906,693,962,711,1020,711,1067,700,1118,690,1186,684,1218,697,1286,676,1319,625,1360,585,1419,562,1461,529,1472,541,1442,592,1328,681,1283,711,1199,723,1162,711,1118,711,1080,719,1038,730,973,732,936,726,890,711,848,686,813,614,808,553,815,495,848,432,897,385,957,371,989,364,1050,369,1090,376,1167,376,1225,361,1269,343,1304,320,1330,322,1365,322,1395,347,1423,385,1440,422",
        images: [
        ]
    },
    {
        id: 3,
        number: "03",
        title: "Tropical Garden",
        description: "A curated sanctuary of exotic broad-leafed plants, flowering ginger, and towering palms.",
        poly: "610,784,607,739,659,735,689,714,708,749,771,725,838,742,875,732,864,698,943,733,1038,735,1111,712,1171,716,1200,725,1223,719,1232,739,1235,761,1211,777",
        images: [
        ]
    },
    {
        id: 4,
        number: "04",
        title: "Gazebo + seating",
        description: "A sheltered outdoor pavilion providing a comfortable shaded retreat for reading and social interactions.",
        poly: "785,679,759,674,742,653,740,627,752,604,782,597,810,609,822,641,813,662",
        images: [
        ]
    },
    {
        id: 5,
        number: "05",
        title: "Fragrance Garden",
        description: "A sensory pathway lined with aromatic flowers and plants, filling the air with sweet natural scents.",
        poly: "778,548,742,539,719,497,714,469,743,391,791,352,873,354,961,321,975,363,876,398",
        images: [
        ]
    },
    {
        id: 6,
        number: "06",
        title: "Multipurpose / event lawn",
        description: "A vast green lawn for community events, morning yoga, or simple relaxation under the open sky.",
        poly: "1141,687,1017,713,933,708,862,660,833,611,820,548,836,485,869,443,915,403,973,391,1020,391,1094,401,1157,405,1214,385,1277,356,1265,403,1286,436,1321,454,1361,452,1391,405,1405,440,1458,466,1468,490,1458,524,1440,548,1381,580,1354,590,1325,618,1295,659,1286,680,1218,697,1186,681",
        images: [
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Deck",
        description: "An elevated wooden deck overlooking the garden, designed for quiet lounging and sunbathing.",
        poly: "1297,447,1265,419,1269,375,1284,347,1302,336,1333,333,1358,338,1386,356,1393,398,1384,427,1340,454",
        images: [
        ]
    },
    {
        id: 8,
        number: "08",
        title: "Water feature with selfie point",
        description: "A modern linear water cascade that adds soothing soundscapes and a picture-perfect backdrop.",
        poly: "1328,680,1346,701,1356,727,1365,734,1479,657,1437,596",
        images: [
        ]
    },
    {
        id: 9,
        number: "09",
        title: "Outdoor Gym",
        description: "Equipped with state-of-the-art open-air fitness machines for healthy workouts in a natural setting.",
        poly: "575,388,577,440,602,430,637,433,652,428,649,369",
        images: [
        ]
    },
    {
        id: 10,
        number: "10",
        title: "Seating Ledge",
        description: "Comfortable stone ledges placed strategically along the gardens for spontaneous rest and conversation.",
        poly: ["1141,364,1150,384,1230,364,1220,340", "1241,743,1262,778,1337,746,1311,711"],
        images: [
        ]
    },
    {
        id: 11,
        number: "11",
        title: "Pet Park",
        description: "A fenced, secure play area built specifically for pets to exercise and socialize off-leash.",
        poly: "574,439,525,464,502,464,484,439,490,415,500,406,528,390,575,385",
        images: [
        ]
    },
    {
        id: 12,
        number: "12",
        title: "Deck Fountains",
        description: "Playful water jets integrated into the pool deck that create dynamic movement and cooling breeze.",
        poly: "614,621,591,611,589,590,598,570,624,567,642,586,635,607",
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

export default function TropicalCourt({ onBack }: TropicalCourtProps) {
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
                    src={is3DActive ? cam03 : bgImage}
                    alt={is3DActive ? "3D Tropical Court View" : "Tropical Courtyard Green Plan"}
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
                            Tropical Courtyard Green
                        </h2>
                    </div>
                )}







                {/* Right Controls Container (Groups 3D button and list box on mobile/tablet to avoid overlap) */}
                {!is3DActive && (
                    <div className="fixed top-[50%] -translate-y-1/2 lg:top-[14%] lg:translate-y-0 right-[4%] lg:right-[1%] z-[999] flex flex-col items-end gap-4 lg:gap-5 scale-[.72] lg:scale-100 origin-right">
                        {/* Explore 3D View Button */}
                        <div
                            onClick={() => {
                                setIs3DActive(true);
                            }}
                            className="z-[999] flex items-center gap-1.5 md:gap-2.5 lg:gap-3.5 pl-0.5 lg:pl-1 pr-6 md:pr-10 lg:pr-16 py-0.5 lg:py-1 rounded-full hover:scale-[1.02] transition-all duration-300 cursor-pointer"
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
                            className="z-[999] w-[145px] md:w-[185px] lg:w-[250px] py-1 md:py-2 lg:py-2.5 px-1.5 md:px-2.5 lg:px-3.5 rounded-[12px] md:rounded-[16px] lg:rounded-[20px] shadow-2xl transition-all duration-300"
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
                                                className={`w-3.5 h-3.5 md:w-5 md:h-5 lg:w-[21px] lg:h-[21px] rounded-full flex items-center justify-center font-bold text-[7px] md:text-[9px] lg:text-[10px] transition-all duration-300 shrink-0 ${isHovered
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
                    <div className="fixed lg:absolute bottom-[22%] md:bottom-[5%] lg:bottom-10 md:right-[25%] lg:right-[14%] z-[999] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 pointer-events-none">
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
                                    Tropical Courtyard Green
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

            </div>
        </div>
    );
}
