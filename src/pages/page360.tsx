import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Home/Coral reserve logo.png";

export default function IframePage() {
  const navigate = useNavigate();
  const [tourLoaded, setTourLoaded] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#0b0c0a] relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-5 absolute bottom-8 right-10 z-50
          flex items-center gap-2
            w-12 h-12 rounded-full bg-gradient-to-b border border-white/20
bg-gradient-to-br
from-[#A56A09] cursor-pointer

to-[#8C5707]/70
               text-white/80 font-medium text-[10px] shadow-sm shadow-black/40
               flex items-center justify-center  duration-300 translate-all hover:text-black/60
               hover:scale-110 transition-all"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Loading overlay — shown until the tour is ready, avoids white flash */}
      {!tourLoaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-[#0b0c0a]">
          <img
            src={logo}
            alt="Coral Reserve"
            className="h-5 md:h-6 w-auto object-contain opacity-90 animate-pulse"
          />
          <div className="w-10 h-10 rounded-full border-2 border-white/15 border-t-[#A56A09] animate-spin" />
          <p className="text-white/50 text-xs tracking-widest uppercase">Loading 360&deg; Experience</p>
        </div>
      )}

      {/* Iframe — sensor + fullscreen permissions for smooth pan/gyro control */}
      <iframe
        src="https://futeservices.com/26-27/Hiranadani/Alibaug%20Plots/index.html"
        title="360 View"
        className={`w-full h-full border-0 transition-opacity duration-700 ${tourLoaded ? "opacity-100" : "opacity-0"}`}
        allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; autoplay"
        allowFullScreen
        onLoad={() => setTourLoaded(true)}
      />
    </div>
  );
}
