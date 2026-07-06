import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import backIcon from "../assets/back butten.png";
import logo from "../assets/Home/Coral reserve logo.png";

// Import all gallery images
import img1 from "../assets/Gallery/CAM 04 QUIET COSTAL RETREAT.webp";
import img2 from "../assets/Gallery/CAM 05 QUIET COSTAL RETREAT.webp";
import img3 from "../assets/Gallery/CAM 06 LAGOON COURT .webp";
import img4 from "../assets/Gallery/CAM 07 COMMUNITY RESORT GREEN (1).webp";
import img5 from "../assets/Gallery/CAM 08 COMMUNITY RESORT GREEN  (1).webp";
import img6 from "../assets/Gallery/Cam 01 Leisure & Family Park P.jpg (1).webp";
import img7 from "../assets/Gallery/Cam 02 Family and Social Lawn p.jpg (1).webp";
import img8 from "../assets/Gallery/Cam 03 Tropical Courtyard Green P.jpg (1).webp";
import img9 from "../assets/Gallery/GATE.webp";

import img10 from "../assets/Amenities/active leisure.webp";
import img11 from "../assets/Amenities/tropical court.webp";
import img12 from "../assets/Amenities/community resort.webp";
import img13 from "../assets/Amenities/Quiet Coastal Retreat.webp";
import img14 from "../assets/Amenities/Lagoon Court.webp";
import img15 from "../assets/Amenities/Active Coastal Green.webp";
import img16 from "../assets/Amenities/Active Arena.webp";

const galleryImages = [
    { src: img6, name: "Active leisure & Famiy recreation park" },
    { src: img7, name: "Active leisure & Famiy recreation park" },
    { src: img8, name: "Tropical Courtyard Green" },
    { src: img1, name: "Quiet Coastal Retreat" },
    { src: img2, name: "Quiet Coastal Retreat" },
    { src: img3, name: "Lagoon Court" },
    { src: img4, name: "Community Resort Green" },
    { src: img5, name: "Community Resort Green" },
    { src: img9, name: "Gate" },
    { src: img10, name: "Active leisure & Famiy recreation park" },
    { src: img11, name: "Tropical Courtyard Green" },
    { src: img12, name: "Community Resort Green" },
    { src: img13, name: "Quiet Coastal Retreat" },
    { src: img14, name: "Lagoon Court" },
    { src: img15, name: "Coastal Green" },
    { src: img16, name: "Active Arena" }
];

export default function Gallery() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right

    const handleNext = () => {
        setDirection(1);
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Framer motion variants for smooth transitions
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.6 },
                opacity: { duration: 0.4 }
            }
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir > 0 ? "-100%" : dir < 0 ? "100%" : 0,
            opacity: 0,
            transition: {
                x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.6 },
                opacity: { duration: 0.4 }
            }
        })
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gray-950 flex items-center justify-center font-sans select-none">
            {/* Contained slideshow container */}
            <div className="relative w-full h-full bg-slate-950 overflow-hidden shadow-2xl">
                {/* Slideshow Display Layer */}
                <div className="absolute inset-0 w-full h-full">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.img
                            key={currentImageIndex}
                            src={galleryImages[currentImageIndex].src}
                            custom={direction}
                            variants={slideVariants as any}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full object-cover select-none"
                            alt={galleryImages[currentImageIndex].name}
                        />
                    </AnimatePresence>
                </div>

                {/* Subtle Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-[2]" />

                {/* Top Brand Logo (top-left, same as home page) */}
                <img
                    src={logo}
                    alt="Coral Reserve"
                    className="absolute top-4 left-10 md:top-5 md:left-16 lg:top-7 lg:left-24 z-[1000] h-[12px] md:h-[16px] lg:h-[19px] w-auto object-contain pointer-events-none select-none"
                />

                {/* Image Name / Title Card */}
                <div className="absolute bottom-[36px] md:bottom-[54px] lg:bottom-[96px] left-1/2 -translate-x-1/2 z-[999] text-center pointer-events-none select-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
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
                                {galleryImages[currentImageIndex].name}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Back Button (matching community resort / other pages style) */}
                <button
                    onClick={() => navigate("/home")}
                    className="absolute bottom-2 md:bottom-4 lg:bottom-10 left-[6%] z-[999] -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                    title="Go Back"
                >
                    <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
                </button>

                {/* Bottom Center Next/Prev Buttons (identical style to the 3D view page buttons) */}
                <div className="absolute bottom-2 md:bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 z-[999] flex gap-2 md:gap-4">
                    <button
                        onClick={handlePrev}
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer bg-[#FFE2A4] text-[#644406] border border-[#DB9B2F]/40 hover:bg-[#DB9B2F] hover:text-[#FFE2A4]"
                        title="Previous Image"
                    >
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer bg-[#FFE2A4] text-[#644406] border border-[#DB9B2F]/40 hover:bg-[#DB9B2F] hover:text-[#FFE2A4]"
                        title="Next Image"
                    >
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}