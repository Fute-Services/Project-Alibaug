import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import videoBg from "../../assets/Home/Screen/screen1_bg.mp4";
import hiranandaniLogo from "../../assets/Home/Hiranandani-communities-logo.webp";

// Embed custom SVG sparkle icon from icon.svg
const ExploreIcon = () => (
    <svg className="w-4 h-4 fill-current mr-2.5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1990_1085)">
            <path d="M8.26822 11.0422C7.83145 10.8966 7.83145 10.2798 8.26822 10.1342L10.8319 9.28053C11.3955 9.09262 11.9076 8.77603 12.3275 8.35584C12.7475 7.93565 13.0638 7.42342 13.2514 6.85975L14.1051 4.29734C14.2507 3.86057 14.8675 3.86057 15.0131 4.29734L15.8667 6.86107C16.0547 7.42464 16.3712 7.9367 16.7914 8.35666C17.2116 8.77661 17.7239 9.09293 18.2875 9.28053L20.8499 10.1342C20.9456 10.1656 21.0289 10.2264 21.0879 10.3079C21.1469 10.3894 21.1787 10.4875 21.1787 10.5882C21.1787 10.6889 21.1469 10.7869 21.0879 10.8685C21.0289 10.95 20.9456 11.0108 20.8499 11.0422L18.2862 11.8959C17.7228 12.0836 17.2108 12.4 16.7909 12.82C16.3709 13.2399 16.0545 13.7519 15.8667 14.3153L15.0131 16.8791C14.9817 16.9747 14.9209 17.058 14.8393 17.117C14.7578 17.1761 14.6597 17.2079 14.5591 17.2079C14.4584 17.2079 14.3603 17.1761 14.2788 17.117C14.1973 17.058 14.1365 16.9747 14.1051 16.8791L13.2514 14.3153C13.0636 13.7519 12.7472 13.2399 12.3273 12.82C11.9073 12.4 11.3954 12.0836 10.8319 11.8959L8.26822 11.0422ZM1.51941 16.1551C1.4621 16.1361 1.41222 16.0995 1.37687 16.0506C1.34151 16.0016 1.32249 15.9428 1.32249 15.8824C1.32249 15.822 1.34151 15.7632 1.37687 15.7143C1.41222 15.6653 1.4621 15.6287 1.51941 15.6098L3.05738 15.0976C3.74299 14.8686 4.28035 14.3312 4.50932 13.6456L5.02154 12.1076C5.04052 12.0503 5.07708 12.0004 5.12602 11.9651C5.17497 11.9297 5.23381 11.9107 5.29419 11.9107C5.35457 11.9107 5.41341 11.9297 5.46236 11.9651C5.5113 12.0004 5.54786 12.0503 5.56684 12.1076L6.07906 13.6456C6.19172 13.9837 6.38158 14.291 6.63359 14.543C6.88561 14.795 7.19286 14.9849 7.531 15.0976L9.06897 15.6098C9.12629 15.6287 9.17617 15.6653 9.21152 15.7143C9.24687 15.7632 9.2659 15.822 9.2659 15.8824C9.2659 15.9428 9.24687 16.0016 9.21152 16.0506C9.17617 16.0995 9.12629 16.1361 9.06897 16.1551L7.531 16.6673C7.19286 16.7799 6.88561 16.9698 6.63359 17.2218C6.38158 17.4738 6.19172 17.7811 6.07906 18.1192L5.56684 19.6572C5.54786 19.7145 5.5113 19.7644 5.46236 19.7997C5.41341 19.8351 5.35457 19.8541 5.29419 19.8541C5.23381 19.8541 5.17497 19.8351 5.12603 19.7997C5.07708 19.7644 5.04052 19.7145 5.02154 19.6572L4.50932 18.1192C4.39667 17.7811 4.20681 17.4738 3.95479 17.2218C3.70277 16.9698 3.39552 16.7799 3.05738 16.6673L1.51941 16.1551ZM0.131004 6.79886C0.0933171 6.7858 0.060638 6.76131 0.0375098 6.72882C0.0143815 6.69632 0.00195347 6.65742 0.00195347 6.61754C0.00195347 6.57765 0.0143815 6.53875 0.0375098 6.50626C0.060638 6.47376 0.093317 6.44927 0.131004 6.43621L1.15543 6.09473C1.61338 5.94252 1.97207 5.58384 2.12428 5.12589L2.46575 4.10146C2.47882 4.06377 2.5033 4.03109 2.5358 4.00796C2.5683 3.98484 2.60719 3.97241 2.64708 3.97241C2.68697 3.97241 2.72586 3.98484 2.75836 4.00796C2.79086 4.03109 2.81534 4.06377 2.82841 4.10146L3.16989 5.12589C3.24496 5.35157 3.37162 5.55664 3.5398 5.72482C3.70797 5.893 3.91305 6.01966 4.13873 6.09473L5.16316 6.43621C5.20085 6.44927 5.23352 6.47376 5.25665 6.50625C5.27978 6.53875 5.29221 6.57765 5.29221 6.61754C5.29221 6.65742 5.27978 6.69632 5.25665 6.72882C5.23352 6.76131 5.20085 6.7858 5.16316 6.79886L4.13873 7.14034C3.91305 7.21542 3.70798 7.34207 3.5398 7.51025C3.37162 7.67843 3.24496 7.8835 3.16989 8.10918L2.82841 9.13229C2.81534 9.16998 2.79086 9.20265 2.75836 9.22578C2.72586 9.24891 2.68697 9.26134 2.64708 9.26134C2.60719 9.26134 2.5683 9.24891 2.5358 9.22578C2.5033 9.20265 2.47882 9.16998 2.46575 9.13229L2.12428 8.10786C1.97207 7.64991 1.61338 7.29123 1.15543 7.13902L0.132327 6.79886L0.131004 6.79886Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_1990_1085">
                <rect width="21.1769" height="21.1769" fill="currentColor" transform="translate(9.25671e-07 21.1769) rotate(-90)" />
            </clipPath>
        </defs>
    </svg>
);


const VolumeMutedIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7H4.5c-.83 0-1.5.67-1.5 1.5v3.6c0 .83.67 1.5 1.5 1.5h2.79l4.41 4.41c.63.63 1.71.18 1.71-.71v-4.89l4.89 4.89c-.58.45-1.24.79-1.97.96a.993.993 0 0 0-.74 1.2c.18.53.74.86 1.28.73 1.12-.27 2.14-.83 2.99-1.59l1.83 1.83a.996.996 0 1 0 1.41-1.41L5.05 3.63a.996.996 0 0 0-1.42 0zM11.41 6.59 9.62 8.38l1.79 1.79V6.59zM19 12c0-1.88-.77-3.58-2.01-4.81a.996.996 0 1 0-1.41 1.41c.79.79 1.28 1.88 1.28 3.08 0 .57-.11 1.12-.31 1.62l1.52 1.52c.59-.88.93-1.92.93-2.82zm-3-6.12c2.28 1.55 3.81 4.14 3.97 7.09l1.99 1.99c-.19-3.87-2.29-7.23-5.3-9.1a.997.997 0 0 0-1.39.38 1.01 1.01 0 0 0 .39 1.39z" />
    </svg>
);

const VolumeUnmutedIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
);

interface Screen1Props {
    onExploreClick?: () => void;
}

export default function Screen1({ onExploreClick }: Screen1Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(false);

    const handleUnmute = () => {
        const video = videoRef.current;
        if (video) {
            console.log("screen1 video: Unmuting video...");
            video.muted = false;
            video.volume = 1.0;
            video.removeAttribute('muted');
            video.play().catch(error => {
                console.error("screen1 video: Play failed on unmute:", error);
            });
        }
        setIsMuted(false);
    };

    const toggleMute = (e?: React.SyntheticEvent) => {
        if (e) e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            const targetMuted = !video.muted;
            video.muted = targetMuted;
            setIsMuted(targetMuted);
            if (!targetMuted) {
                video.volume = 1.0;
                video.removeAttribute('muted');
                video.play().catch(error => {
                    console.error("screen1 video: Play failed on toggle unmute:", error);
                });
            }
        }
    };

    // Attempt to play unmuted on mount, fallback to muted if blocked by browser autoplay policy
    useEffect(() => {
        const video = videoRef.current;
        let interactionCleanup = () => { };

        const handleInteraction = () => {
            handleUnmute();
            interactionCleanup();
        };

        const setupInteractionListeners = () => {
            window.addEventListener("click", handleInteraction);
            window.addEventListener("touchstart", handleInteraction);
            interactionCleanup = () => {
                window.removeEventListener("click", handleInteraction);
                window.removeEventListener("touchstart", handleInteraction);
            };
        };

        if (video) {
            // Start unmuted
            video.muted = false;
            video.volume = 1.0;
            video.play()
                .then(() => {
                    console.log("screen1 video: Unmuted autoplay succeeded!");
                    setIsMuted(false);
                })
                .catch(error => {
                    console.log("screen1 video: Unmuted autoplay blocked by browser, falling back to muted autoplay.", error);
                    video.muted = true;
                    setIsMuted(true);
                    // Play muted so video doesn't freeze
                    video.play().catch(e => {
                        console.error("screen1 video: Muted play also failed:", e);
                    });
                    // Listen for first interaction to unmute
                    setupInteractionListeners();
                });
        }

        return () => {
            interactionCleanup();
        };
    }, []);



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 70, damping: 15 }
        }
    };

    const triggerUnmute = () => {
        handleUnmute();
    };

    return (
        <div
            onClick={triggerUnmute}
            className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black select-none"
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                src={videoBg}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark elegant overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Main Centered Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 flex flex-col items-center text-center text-white px-4"
            >
                {/* Brand Logo Section — Hiranandani Communities logo.
                    The asset is ~3:1, so w-full h-auto keeps its aspect ratio
                    without distortion; the max-w cap keeps it a comfortable,
                    non-overlapping size above the subtitle and Explore button. */}
                <motion.div variants={fadeInUp} className="flex flex-col items-center mb-6 max-w-[300px] md:max-w-[410px] lg:max-w-[500px]">
                    <img src={hiranandaniLogo} alt="Hiranandani Communities" className="w-full h-auto object-contain" />
                </motion.div>

                {/* Subtitle / Attributes */}
                <motion.p
                    variants={fadeInUp}
                    className="text-xs md:text-sm lg:text-[16px] tracking-[0.25em] font-normal uppercase opacity-85 mb-8 font-sans"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    Residences | Hospitality | Entertainment
                </motion.p>

                {/* Explore Button */}
                <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onExploreClick?.();
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onExploreClick?.();
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex items-center justify-center px-9 py-2.5 rounded-full border border-white bg-black/10 backdrop-blur-sm text-white text-[17px] tracking-wider hover:bg-[#DB9B2F] hover:border-[#DB9B2F] hover:text-slate-950 transition-all duration-300 cursor-pointer font-normal mt-4"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    <ExploreIcon />
                    explore
                </motion.button>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={toggleMute}
                onTouchEnd={(e) => {
                    e.preventDefault();
                    toggleMute(e);
                }}
                onTouchStart={(e) => {
                    e.stopPropagation();
                }}
                className="absolute bottom-8 right-8 z-30 flex items-center justify-center p-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:bg-[#DB9B2F] hover:border-[#DB9B2F] hover:text-slate-950 transition-all duration-300 cursor-pointer shadow-lg"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
                {isMuted ? <VolumeMutedIcon /> : <VolumeUnmutedIcon />}
            </motion.button>
        </div>
    );
}