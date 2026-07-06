import { useState } from "react";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import logo from '../assets/Home/Coral reserve logo.png';

export default function Walkthrough() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        /* Relative container binds the absolute navbar inside it */
        <div className="relative w-full h-screen bg-[#FCF5F3] overflow-hidden justify-center items-center flex">

            {/* Top Logo (same size/placement as Home page) */}
            <img
                src={logo}
                alt="Coral Reserve"
                className="absolute top-4 left-10 md:top-5 md:left-16 lg:top-7 lg:left-24 z-50 h-[12px] md:h-[16px] lg:h-[19px] w-auto object-contain pointer-events-none select-none"
            />

            {/* Left Navbar Placement */}
            <div className="absolute top-[48%] lg:top-[55%] left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2">
                <LeftNavbar />
            </div>

            {/* The Video iframe container */}
            <div className="w-[75%] h-[75%] relative rounded-xl overflow-hidden shadow-2xl bg-black">
                {!videoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
                    </div>
                )}
                <iframe
                    src="https://player.vimeo.com/video/1206030348?h=abb706b8ad&autoplay=1&loop=1&muted=1&dnt=1"
                    className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Project Walkthrough"
                    onLoad={() => setVideoLoaded(true)}
                ></iframe>
            </div>
        </div>
    );
}
