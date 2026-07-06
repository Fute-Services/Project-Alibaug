import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1 from "./screen1";
import bgImage from "../../assets/Home/Screen/screen 2,3.webp";
import homepageBg from "../../assets/homepagefinal.webp";

interface IntroSequenceProps {
    onComplete: () => void;
}

type Step = "screen1" | "screen2" | "screen3" | "screen4";

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [step, setStep] = useState<Step>("screen1");

    // Preload the homepage background image to prevent blink when navigating to it
    useEffect(() => {
        const img = new Image();
        img.src = homepageBg;
    }, []);



    useEffect(() => {
        if (step === "screen2") {
            const t = setTimeout(() => {
                setStep("screen3");
            }, 2500); // Display Screen 2 for 2 seconds
            return () => clearTimeout(t);
        }
        if (step === "screen3") {
            const t = setTimeout(() => {
                setStep("screen4");
            }, 2500); // Display Screen 3 for 2 seconds
            return () => clearTimeout(t);
        }
        if (step === "screen4") {
            const t = setTimeout(() => {
                onComplete();
            }, 2800); // Display Screen 4 for 2.8 seconds
            return () => clearTimeout(t);
        }
    }, [step, onComplete]);

    const handleExplore = () => {
        setStep("screen2");
    };

    // Determine the Y offset of the tall background container based on the current step
    let backgroundY = "0vh";
    if (step === "screen3") backgroundY = "0vh"; // Keep it on the sky/teal for screen 3
    if (step === "screen4") backgroundY = "-200vh";

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black select-none z-[9999]">
            <AnimatePresence>
                {step === "screen1" && (
                    <motion.div
                        key="screen1"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full z-20"
                    >
                        <Screen1 onExploreClick={handleExplore} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Continuous Scrolling Background & Overlays (visible during screen 2, 3, and 4) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: step !== "screen1" ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                style={{ pointerEvents: step !== "screen1" ? "auto" : "none" }}
            >
                {/* The single tall background container containing the tall image */}
                <motion.div
                    animate={{ y: backgroundY }}
                    transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute top-0 left-0 w-full h-[300vh] z-0"
                >
                    <img
                        src={bgImage}
                        alt="Continuous Background Landscape"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Dark Elegant Overlay */}
                <div className="absolute inset-0 bg-black/45 z-10" />

                {/* Text overlays (fading in and out centered in viewport) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {step === "screen2" && (
                            <motion.h2
                                key="text-screen2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-center px-6 text-xl md:text-3xl lg:text-[36px] font-medium tracking-[0.1em] uppercase leading-relaxed max-w-[900px]"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                INDIA'S BEST BEACH DESTINATION
                            </motion.h2>
                        )}

                        {step === "screen3" && (
                            <motion.h2
                                key="text-screen3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-center px-6 text-lg md:text-2xl lg:text-[28px] font-medium tracking-[0.15em] uppercase leading-relaxed max-w-[850px]"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                NOW PRESENTING
                            </motion.h2>
                        )}

                        {step === "screen4" && (
                            <motion.div
                                key="text-screen4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col items-center text-center px-6 max-w-[1000px]"
                            >
                                {/* Heading */}
                                <h2
                                    className="text-white text-xl md:text-3xl lg:text-[40px] font-medium tracking-[0.12em] uppercase leading-snug mb-6"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    CORAL RESERVE
                                </h2>

                                {/* Subheading */}
                                <p
                                    className="text-white/90 text-xs md:text-sm lg:text-[15px] font-normal tracking-[0.2em] uppercase leading-relaxed max-w-[750px]"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    FINEST PLOTTED DEVELOPMENT AT HIRANANDANI SANDS, ALIBAUG
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}