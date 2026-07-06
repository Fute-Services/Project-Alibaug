import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import bgImage from "../assets/homepagefinal1.webp";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import ActiveLeisure from "../components/Amenities/activeleisure";
import TropicalCourt from "../components/Amenities/tropicalcourt";
import CommunityResort from "../components/Amenities/community resort";
import QuietCoastal from "../components/Amenities/quiet coastal";
import LagoonCourt from "../components/Amenities/lagoon court";
import CoastalGreen from "../components/Amenities/coastelgreen";
import ActiveArena from "../components/Amenities/activearena";
import logo from "../assets/Home/Coral reserve logo.png";
import compassImage from "../assets/Amenities/compass.png";


interface Amenity {
    id: number;
    number: string;
    title: string;
    description: string;
    poly: string; // SVG coordinates for the map shape
    sidebarRect: { x: number; y: number; w: number; h: number }; // SVG bounding box for sidebar overlays
    center: [number, number]; // Coordinates for tooltip overlay
    images: string[];
}

const amenitiesData: Amenity[] = [
    {
        id: 1,
        number: "01",
        title: "Active leisure & Famiy\nrecreation park",
        description: "A sprawling green sanctuary designed for family gatherings, group recreational activities, and leisure strolls.",
        poly: "304,615,354,615,372,564,572,583,567,787,547,826,517,829,497,851,476,846,476,826,415,826,403,865,247,842",
        sidebarRect: { x: 1710, y: 250, w: 270, h: 60 },
        center: [260, 710],
        images: [
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Tropical Courtyard Green",
        description: "A lush garden space curated with tropical plants, providing a vibrant, oxygen-rich environment for daily reflection.",
        poly: "561,380,547,446,717,446,733,374,695,367,651,380",
        sidebarRect: { x: 1710, y: 330, w: 270, h: 60 },
        center: [320, 390],
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 3,
        number: "03",
        title: "Community Resort Green",
        description: "The social hub of the estate, layout featuring modern outdoor lounging and vibrant community spaces.",
        poly: "922,432,1024,448,1027,412,993,291,972,282,954,282,936,296",
        sidebarRect: { x: 1710, y: 410, w: 270, h: 60 },
        center: [480, 340],
        images: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 4,
        number: "04",
        title: "Quiet Coastal Retreat",
        description: "A calming coastal escape crafted with natural textures and seating areas to enjoy the gentle sea breeze.",
        poly: "1372,351,1330,357,1332,383,1343,396,1366,401,1388,401,1405,399,1423,367,1429,299,1368,299",
        sidebarRect: { x: 1710, y: 490, w: 270, h: 60 },
        center: [520, 650],
        images: [
            "https://images.unsplash.com/photo-1473116763269-25541579ffb7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 5,
        number: "05",
        title: "Lagoon Court",
        description: "A serene lagoon-themed zone with peaceful water features, reflecting the natural beauty of the surroundings.",
        poly: "1197,733,1211,628,1222,619,1243,621,1257,622,1291,608,1323,631,1284,664,1238,708",
        sidebarRect: { x: 1710, y: 570, w: 270, h: 60 },
        center: [690, 330],
        images: [
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 6,
        number: "06",
        title: "Coastal Green",
        description: "Scenic pathways and viewpoints designed to integrate seamlessly with the coastal topography.",
        poly: "1123,933,1156,924,1186,908,1202,883,1190,853,1148,842,1125,847,1129,879,1120,906",
        sidebarRect: { x: 1710, y: 650, w: 270, h: 60 },
        center: [620, 610],
        images: [
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Active Arena",
        description: "A premium court layout for active sports, fitness, and energetic community recreation.",
        poly: "1477,599,1473,785,1539,788,1541,596",
        sidebarRect: { x: 1710, y: 730, w: 270, h: 60 },
        center: [745, 665],
        images: [
            "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
        ]
    }
];

const projectSectorsData = [
    {
        id: 1,
        poly1: "503,305,664,312,758,282,806,310,769,571,460,556",
        circle: "602,291,26",
        title: "CORAL COURT",
        path: "/coral-court",
        rect: "513,730,549,911"
    },
    {
        id: 2,
        poly1: "858,268,901,216,1020,188,1102,419,1086,587,970,574,940,765,912,774,846,770,810,769,846,524,824,519",
        circle: "845,952,23",
        title: "CORAL NEST",
        path: "/coral-nest",
        rect: "827,730,864,914"
    },
    {
        id: 3,
        poly1: "1250,193,1325,193,1546,188,1546,334,1543,397,1519,450,1461,514,1491,551,1473,578,1416,721,1396,770,1357,770,1291,818,1229,874,1174,840,1140,845,1120,840,1156,560,1259,555",
        circle: "1179,442,27",
        title: "CORAL BAY",
        path: "/coral-bay",
        rect: "1373,730,1412,927"
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

    return [(minX + maxX) / 2, minY];
}

export default function Amenities() {
    const [hoveredAmenityId, setHoveredAmenityId] = useState<number | null>(null);
    const [hoveredProjectTooltipId, setHoveredProjectTooltipId] = useState<number | null>(null);
    const [selectedAmenityId, setSelectedAmenityId] = useState<number | null>(null);
    const [activeGalleryId, setActiveGalleryId] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const centerScroll = () => {
            const el = scrollRef.current;
            if (!el) return;
            // Only center the horizontal scroll on mobile/tablet (map wider than
            // viewport). On desktop the map fills the screen, so keep it flush-left
            // to avoid revealing the background as a black strip on the right.
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

    const selectedAmenity = amenitiesData.find((a) => a.id === activeGalleryId);

    const handleOpenGallery = (id: number) => {
        if (id === 1 || id === 2 || id === 3 || id === 4 || id === 5 || id === 6 || id === 7) {
            setSelectedAmenityId(id);
        } else {
            setActiveGalleryId(id);
            setCurrentImageIndex(0);
        }
    };

    const handleNextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedAmenity) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedAmenity.images.length);
        }
    };

    const handlePrevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (selectedAmenity) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedAmenity.images.length) % selectedAmenity.images.length);
        }
    };

    if (selectedAmenityId === 1) {
        return <ActiveLeisure onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 2) {
        return <TropicalCourt onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 3) {
        return <CommunityResort onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 4) {
        return <QuietCoastal onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 5) {
        return <LagoonCourt onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 6) {
        return <CoastalGreen onBack={() => setSelectedAmenityId(null)} />;
    }
    if (selectedAmenityId === 7) {
        return <ActiveArena onBack={() => setSelectedAmenityId(null)} />;
    }




    return (
        <div
            className="relative w-screen h-screen overflow-hidden font-sans select-none"
            style={{ background: "linear-gradient(180deg, #BFC18D 0%, #9BA06E 100%)" }}
        >
            {/* Left Sidebar and Right Sidebar should be absolute to viewport */}
            <div className="absolute top-[53%] lg:top-[55%] left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2">
                <LeftNavbar />
            </div>

            <div
                className="absolute top-[50%] right-[2%] lg:right-[-5%] z-[999] -translate-y-1/2 w-[145px] md:w-[185px] lg:w-[325px] py-1 md:py-2 lg:py-3 px-1.5 md:px-2.5 lg:px-4 rounded-[12px] md:rounded-[16px] lg:rounded-[24px] transition-all duration-300"
                style={{
                    background: "rgba(42, 46, 34, 0.55)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
            >
                <div className="flex flex-col">
                    {amenitiesData.map((amenity, index) => {
                        const isHovered = hoveredAmenityId === amenity.id;
                        return (
                            <div
                                key={amenity.id}
                                onMouseEnter={() => setHoveredAmenityId(amenity.id)}
                                onMouseLeave={() => setHoveredAmenityId(null)}
                                onClick={() => handleOpenGallery(amenity.id)}
                                className={`group flex items-center gap-1 md:gap-2 lg:gap-3 py-0.5 md:py-1 lg:py-3 px-0.5 md:px-1 transition-all duration-300 cursor-pointer ${isHovered ? "bg-white/5 rounded-md lg:rounded-xl translate-x-1" : ""
                                    } ${index !== amenitiesData.length - 1 ? "border-b border-white/20" : ""
                                    }`}
                            >
                                {/* Number Badge */}
                                <div
                                    className={`w-3.5 h-3.5 md:w-5 md:h-5 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-bold text-[7px] md:text-[9px] lg:text-xs transition-all duration-300 shrink-0 ${isHovered
                                        ? "bg-[#DB9B2F] text-slate-950 scale-105 shadow-md shadow-[#DB9B2F]/30"
                                        : "bg-[#DB9B2F] text-[#2a2d1e]"
                                        }`}
                                    style={{
                                        backgroundColor: "#DB9B2F",
                                        color: "#2a2d1e"
                                    }}
                                >
                                    {amenity.number}
                                </div>

                                {/* Amenity Title */}
                                <span
                                    className={`text-[7px] md:text-[9.5px] lg:text-[12.5px] font-medium tracking-wide leading-tight whitespace-pre-line transition-colors duration-300 ${isHovered ? "text-[#FFEFA8]" : "text-white/80 group-hover:text-white"
                                        }`}
                                >
                                    {amenity.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Interactive Map & Tooltips Wrapper Container */}
            <div ref={scrollRef} className="flex h-screen w-screen overflow-hidden justify-center items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="relative w-full aspect-[1982/1024] shrink-0 lg:h-full lg:aspect-auto">
                    {/* ================= BRAND LOGO (top-left) ================= */}
                    {/* Same treatment as HomePage: fixed height, w-auto keeps the
                        wide ~12:1 wordmark crisp and undistorted. */}
                    <img
                        src={logo}
                        alt="Coral Reserve"
                        className="absolute top-4 left-10 md:top-5 md:left-16 lg:top-7 lg:left-24 z-50 h-[12px] md:h-[16px] lg:h-[19px] w-auto object-contain pointer-events-none select-none"
                    />

                    {/* Background Floor Plan Image */}
                    <img
                        src={bgImage}
                        alt="Amenities Floor Plan"
                        className="absolute inset-0 w-full h-full object-contain lg:object-fill"
                    />

                    {/* SVG Interactive Layer */}
                    <svg
                        className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                        viewBox="0 0 2020 1044"
                        preserveAspectRatio={aspectStyle}
                    >
                        {/* Draw project sector polygons first */}
                        {projectSectorsData.map((item: any) => (
                            <polygon
                                key={`project-poly-${item.id}`}
                                points={item.poly1}
                                fill="transparent"
                                className="cursor-default transition-all duration-200 ease-in-out pointer-events-auto"
                                onMouseEnter={() => setHoveredProjectTooltipId(item.id)}
                                onMouseLeave={() => setHoveredProjectTooltipId(null)}
                            />
                        ))}

                        {/* Draw all active SVG regions for amenities on top */}
                        {amenitiesData.map((amenity) => {
                            const isHovered = hoveredAmenityId === amenity.id;
                            return (
                                <polygon
                                    key={amenity.id}
                                    points={amenity.poly}
                                    className="cursor-pointer transition-all duration-300 ease-in-out outline-none pointer-events-auto"
                                    fill={isHovered ? "rgba(219, 156, 47, 0.45)" : "rgba(255, 255, 255, 0.01)"}
                                    strokeWidth={isHovered ? 3.5 : 0}
                                    strokeDasharray={isHovered ? "8, 4" : undefined}
                                    onMouseEnter={() => setHoveredAmenityId(amenity.id)}
                                    onMouseLeave={() => setHoveredAmenityId(null)}
                                    onClick={() => handleOpenGallery(amenity.id)}
                                />
                            );
                        })}
                    </svg>

                    {/* Floating Tooltips above Map Areas on Hover */}
                    <AnimatePresence>
                        {hoveredAmenityId !== null && (() => {
                            const hoveredAmenity = amenitiesData.find((a) => a.id === hoveredAmenityId);
                            if (!hoveredAmenity) return null;
                            const [cx, cy] = getPolygonCenter(hoveredAmenity.poly);

                            return (
                                <motion.div
                                    key={`tooltip-${hoveredAmenity.id}`}
                                    initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "15%" }}
                                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "0%" }}
                                    exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "15%" }}
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                    className="absolute pointer-events-none flex flex-col items-center z-[1000]"
                                    style={{
                                        left: `${(cx / 2020) * 100}%`,
                                        top: `${(cy / 1044) * 100}%`,
                                        marginTop: "-34px",
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
                                            {hoveredAmenity.number}
                                        </span>
                                        <span className="text-[10px] font-bold text-[#FFEFA8] tracking-wider uppercase font-sans whitespace-nowrap">
                                            {hoveredAmenity.title.replace("\n", " ")}
                                        </span>
                                    </div>

                                    {/* Tooltip Pointer (pointing down) */}
                                    <div className="w-[12px] h-[6px] -mt-[1px] overflow-hidden flex justify-center z-10">
                                        <svg
                                            width="12"
                                            height="6"
                                            viewBox="0 0 12 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0 0 H12 L8 4 C7 5 5 5 4 4 L0 0 Z"
                                                fill="rgba(28, 30, 22, 0.9)"
                                                stroke="rgba(255, 255, 255, 0.2)"
                                                strokeWidth="1"
                                            />
                                        </svg>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>

                    {/* Sector Name Marking Tooltips */}
                    <AnimatePresence>
                        {projectSectorsData.map((item: any, index: number) => {
                            const [x1, y1, x2, y2] = item.rect.split(",").map(Number);
                            const rx = (x1 + x2) / 2;
                            const ry = (y1 + y2) / 2;
                            const isThisTooltipHovered = hoveredProjectTooltipId === item.id;

                            return (
                                <motion.div
                                    key={`project-tooltip-${item.id}`}
                                    onMouseEnter={() => setHoveredProjectTooltipId(item.id)}
                                    onMouseLeave={() => setHoveredProjectTooltipId(null)}
                                    initial={{ opacity: 0, scale: 0.75, x: "-50%", y: "-40%" }}
                                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "0%" }}
                                    exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-15%" }}
                                    transition={{
                                        type: "tween",
                                        ease: [0.34, 1.56, 0.64, 1],
                                        duration: 0.65,
                                        delay: 0.5 + (index * 0.12)
                                    }}
                                    className="absolute pointer-events-auto flex flex-col items-center z-[1001] cursor-default"
                                    style={{
                                        left: `${(rx / 1982) * 100}%`,
                                        top: `${(ry / 1024) * 100}%`,
                                        marginTop: "15px",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    {/* Smooth Curved Pointer Arrow (Pointing Up) */}
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
                                            className="text-[9px] lg:text-[13px] font-bold tracking-wider font-sans uppercase transition-colors duration-300"
                                            style={{
                                                color: isThisTooltipHovered ? "#FFFFFF" : "#4a3b2c",
                                            }}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Premium Luxury Gallery Modal Overlay */}
            <AnimatePresence>
                {activeGalleryId !== null && selectedAmenity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[2000] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setActiveGalleryId(null)}
                    >
                        {/* Modal Glass Box */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 180 }}
                            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-[80vh] md:h-[70vh]"
                            style={{
                                background: "linear-gradient(135deg, rgba(28, 30, 22, 0.95) 0%, rgba(18, 20, 14, 0.98) 100%)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 border border-white/15 text-white hover:bg-[#DB9B2F] hover:text-slate-950 transition-all duration-300"
                                onClick={() => setActiveGalleryId(null)}
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Dynamic Image Gallery Slider */}
                            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center group h-[50%] md:h-full">
                                {/* Images */}
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={selectedAmenity.images[currentImageIndex]}
                                        alt={`${selectedAmenity.title} - ${currentImageIndex + 1}`}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Dark Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-[#DB9B2F] hover:text-slate-950 transition-all duration-300 z-10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-[#DB9B2F] hover:text-slate-950 transition-all duration-300 z-10"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Slider Position Indicator Dots */}
                                <div className="absolute bottom-6 flex gap-2 z-10">
                                    {selectedAmenity.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex(index);
                                            }}
                                            className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? "w-6 bg-[#DB9B2F]" : "w-2 bg-white/40 hover:bg-white"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Information Panel */}
                            <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 h-[50%] md:h-full">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[12px] font-bold text-[#DB9B2F] tracking-widest uppercase px-2 py-0.5 rounded border border-[#DB9B2F]/30 bg-[#DB9B2F]/10">
                                            Amenity {selectedAmenity.number}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide font-sans mb-4 leading-snug">
                                        {selectedAmenity.title}
                                    </h3>

                                    <p className="text-[13px] md:text-sm text-white/70 font-light leading-relaxed mb-6 font-sans">
                                        {selectedAmenity.description}
                                    </p>
                                </div>

                                {/* Interactive Action Buttons */}
                                <div className="flex flex-col gap-3">
                                    <div className="text-[11px] text-[#DB9B2F] uppercase tracking-wider font-semibold">
                                        Gallery View ({currentImageIndex + 1} / {selectedAmenity.images.length})
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedAmenity.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === idx ? "border-[#DB9B2F] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                                    }`}
                                            >
                                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= COMPASS ================= */}
            <div className="absolute bottom-2 md:bottom-4 lg:bottom-14 right-[20%] md:right-[15%] lg:right-[15%] z-[999] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 pointer-events-none select-none">
                <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
            </div>

        </div>
    );
}
