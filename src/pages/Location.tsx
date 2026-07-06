
import LeftNavbar from "../components/Navbar/LeftNavbar";
// import { useState } from 'react'
import Video1 from '../assets/Location/Hiranandani Sands MAP (2).mp4';
import locationPoster from '../assets/Location/location_alibaug.webp';

import logo from '../assets/Home/Frame 29.webp';
export default function Location() {
    // 1. Define your data array
    // const navItems = [
    //     { id: 'site', label: 'Site Location' },
    //     { id: 'neighbourhood', label: 'Neighbourhood' },
    //     { id: 'network', label: 'Network Road' },
    //     { id: 'transport', label: 'Transport Infra' },
    // ];

    // 2. State to keep track of the active tab (defaults to 'transport' based on your image)
    // const [activeTab, setActiveTab] = useState('transport');
    return (
        /* 1. Relative container binds the absolute navbar inside it */
        <div className="relative w-full h-screen bg-[#FCF5F3] overflow-hidden justify-center items-center flex">

            {/* Top Logo Panel */}
            <div className="absolute top-12 md:top-14 lg:top-4 left-0 w-full z-50 pointer-events-none">
                <div className="flex justify-between items-center w-full py-10 px-4">
                    <div className="relative -ml-10 -mt-7 pointer-events-auto">
                        <img src={logo} className="h-[56px]" alt="Logo" />

                    </div>
                </div>
            </div>

            {/* Left Navbar Placement */}
            <div className="absolute top-[48%] lg:top-[55%] left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2">
                <LeftNavbar />
            </div>

            {/* The Background Image */}
            {/* <img src={locationImg} alt="Location Map" className="w-full object-fill" /> */}
            <div className="w-[94%] h-[55%] md:w-[85%] md:h-[70%] lg:w-[75%] lg:h-[75%] ">
                <video
                    src={Video1}
                    poster={locationPoster}
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-contain lg:object-fill rounded-xl"
                >
                    Your browser does not support the video tag.
                </video></div>

            {/* 3. Absolute Navbar Wrapper 
            <div className="absolute top-[27%] md:top-[20%] lg:top-10 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md p-1 md:p-2 rounded-full border border-white/10 shadow-lg">

               
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`p-1 md:px-2 lg:px-6 md:py-1 lg:py-2.5 text-nowrap rounded-full text-[7px] md:text-[9px] lg:text-sm transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-[#FCE0AD] to-[#F5C480] text-[#1C160C] font-semibold shadow-md border-transparent'
                                : 'bg-[#262626]/30 text-white border border-white/50 font-medium hover:bg-[#333333]'
                                }`}
                        >
                            {item.label}
                        </button>
                    );
                })}

            </div>*/}
        </div>
    );
}