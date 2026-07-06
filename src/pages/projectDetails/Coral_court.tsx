import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/project_details/Master Plan Coral Court 1.webp";
import miniMapImage from "../../assets/project_details/Project Details.webp";
import html2canvas from "html2canvas";
// import logo from "../../assets/Home/Frame 29.webp";
import compassImage from "../../assets/Amenities/compass.png";
import backIcon from "../../assets/back butten.png";

// Import all plot images statically as requested
import plot1 from "../../assets/project_details/coral court/1.webp";
import plot2 from "../../assets/project_details/coral court/2.webp";
import plot3 from "../../assets/project_details/coral court/3.png";
import plot4 from "../../assets/project_details/coral court/4.png";
import plot5 from "../../assets/project_details/coral court/5.png";
import plot6 from "../../assets/project_details/coral court/6.webp";
import plot7 from "../../assets/project_details/coral court/7.png";
import plot8 from "../../assets/project_details/coral court/8.png";
import plot9 from "../../assets/project_details/coral court/9.webp";
import plot10 from "../../assets/project_details/coral court/10.png";
import plot11 from "../../assets/project_details/coral court/11.png";
import plot12 from "../../assets/project_details/coral court/12.png";
import plot13 from "../../assets/project_details/coral court/13.png";
import plot14 from "../../assets/project_details/coral court/14.png";
import plot15 from "../../assets/project_details/coral court/15.png";
import plot16 from "../../assets/project_details/coral court/16.webp";
import plot17 from "../../assets/project_details/coral court/17.webp";
import plot18 from "../../assets/project_details/coral court/18.webp";
import plot19 from "../../assets/project_details/coral court/c19.webp";
import plot20 from "../../assets/project_details/coral court/c20.png";
import plot21 from "../../assets/project_details/coral court/c21.png";

const plotImages: Record<number, string> = {
    1: plot1,
    2: plot2,
    3: plot3,
    4: plot4,
    5: plot5,
    6: plot6,
    7: plot7,
    8: plot8,
    9: plot9,
    10: plot10,
    11: plot11,
    12: plot12,
    13: plot13,
    14: plot14,
    15: plot15,
    16: plot16,
    17: plot17,
    18: plot18,
    19: plot19,
    20: plot20,
    21: plot21,
};

const plotAreas: Record<number, { sqmt: string; sqft: string }> = {
    1: { sqmt: "253.51", sqft: "2,728.78" },
    2: { sqmt: "261.56", sqft: "2,815.43" },
    3: { sqmt: "341.61", sqft: "3,677.09" },
    4: { sqmt: "235.05", sqft: "2,530.07" },
    5: { sqmt: "243.46", sqft: "2,620.60" },
    6: { sqmt: "244.20", sqft: "2,628.56" },
    7: { sqmt: "259.31", sqft: "2,791.21" },
    8: { sqmt: "397.75", sqft: "4,281.38" },
    9: { sqmt: "250.87", sqft: "2,700.36" },
    10: { sqmt: "235.40", sqft: "2,533.84" },
    11: { sqmt: "235.43", sqft: "2,534.16" },
    12: { sqmt: "436.40", sqft: "4,697.40" },
    13: { sqmt: "317.20", sqft: "3,414.34" },
    14: { sqmt: "312.55", sqft: "3,364.28" },
    15: { sqmt: "313.32", sqft: "3,372.57" },
    16: { sqmt: "304.39", sqft: "3,276.45" },
    17: { sqmt: "442.31", sqft: "4,761.02" },
    18: { sqmt: "324.05", sqft: "3,488.07" },
    19: { sqmt: "280.87", sqft: "3,023.28" },
    20: { sqmt: "237.31", sqft: "2,554.40" },
    21: { sqmt: "345.01", sqft: "3,713.68" },
};

export default function Coral_court() {
    const navigate = useNavigate();

    const [activeRangeId, setActiveRangeId] = useState<number | null>(null);

    // Hover states for the two park areas
    const [hoveredParkId, setHoveredParkId] = useState<number | null>(null);

    // Hover state for a single specific plot polygon
    const [hoveredPlotId, setHoveredPlotId] = useState<number | null>(null);

    // Modal State for Selected Plot
    const [selectedPlot, setSelectedPlot] = useState<{ id: number; name?: string } | null>(null);

    // Helper to get image path for a plot
    const getPlotImage = (plotId: number) => {
        return plotImages[plotId] || "";
    };

    // Inside your component:
    const popupRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!popupRef.current) return;

        const fileName = `Plot_${selectedPlot?.id}_Details.jpeg`;

        try {
            const canvas = await html2canvas(popupRef.current, {
                useCORS: true,
                logging: false,
                scale: 2,
                // Run a preprocessing step on the cloned element
                onclone: (clonedDocument) => {
                    // Find all elements within the cloned container
                    const elements = clonedDocument.querySelectorAll('*');

                    elements.forEach((el) => {
                        const htmlEl = el as HTMLElement;
                        // Read the computed styles of the element
                        const style = window.getComputedStyle(htmlEl);

                        // If the color or background uses oklab/oklch, fallback to safe values
                        if (style.backgroundColor.includes('oklab') || style.backgroundColor.includes('oklch')) {
                            htmlEl.style.backgroundColor = '#1e1e1b'; // Force a solid fallback
                        }
                        if (style.color.includes('oklab') || style.color.includes('oklch')) {
                            htmlEl.style.color = '#e3dac9'; // Force a solid text fallback
                        }
                        if (style.borderColor.includes('oklab') || style.borderColor.includes('oklch')) {
                            htmlEl.style.borderColor = 'rgba(255,255,255,0.15)';
                        }
                    });
                }
            });

            const dataUrl = canvas.toDataURL("image/jpeg");

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error generating popup snapshot:", error);
        }
    };

    // Ranges data representing the 21 plots grouped by size
    const filterByRange = useMemo(
        () => [
            {
                id: 1,
                StartRange: 2500,
                EndRange: 3000,
                noOfPlots: 10,
                name: "2500 - 3000",
                hoveredColor: "rgb(182, 148, 148)",
                hoveredColor1: "rgba(223, 121, 151, 0.7)",
                polygons: [
                    { id: 1, poly: "1064,427,1118,434,1108,493,1055,488", name: "Plot 1" }, // Plot 1
                    { id: 2, poly: "1057,485,1108,493,1095,544,1048,539", name: "Plot 2" }, // Plot 2
                    { id: 4, poly: "1024,540,968,537,968,591,1020,591", name: "Plot 4" }, // Plot 4
                    { id: 5, poly: "966,540,915,535,919,589,971,589", name: "Plot 5" }, // Plot 5
                    { id: 6, poly: "920,534,866,534,866,587,915,587", name: "Plot 6" }, // Plot 6
                    { id: 7, poly: "866,534,813,532,813,583,866,583", name: "Plot 7" }, // Plot 7
                    { id: 9, poly: "735,525,780,525,791,520,796,483,742,475", name: "Plot 9" }, // Plot 9
                    { id: 10, poly: "796,483,810,431,752,420,742,473", name: "Plot 10" }, // Plot 10
                    { id: 11, poly: "810,429,819,380,768,368,759,422", name: "Plot 11" }, // Plot 11
                    { id: 20, poly: "915,452,913,505,964,506,969,452", name: "Plot 20" }, // Plot 20


                ],
            },
            {
                id: 2,
                StartRange: 3000,
                EndRange: 3500,
                noOfPlots: 6,
                name: "3000 - 3500",
                hoveredColor: "rgb(140, 178, 199)",
                hoveredColor1: "rgba(64, 172, 226, 0.70)",
                polygons: [
                    { id: 13, poly: "824,343,840,278,890,285,887,348", name: "Plot 13" }, // Plot 13
                    { id: 14, poly: "889,348,950,344,947,283,890,283", name: "Plot 14" }, // Plot 14
                    { id: 15, poly: "952,344,945,287,997,273,1015,330", name: "Plot 15" }, // Plot 15
                    { id: 16, poly: "1015,330,997,273,1052,259,1069,313", name: "Plot 16" }, // Plot 16
                    { id: 18, poly: "1078,338,1071,398,1125,401,1137,317", name: "Plot 18" }, // Plot 18
                    { id: 19, poly: "968,452,964,506,1010,506,1024,494,1031,453", name: "Plot 19" }, // Plot 19


                ],
            },
            {
                id: 3,
                StartRange: 3500,
                EndRange: 4000,
                noOfPlots: 2,
                name: "3500 - 4000",
                hoveredColor: "rgb(167, 200, 114)",
                hoveredColor1: "rgba(152, 223, 70, 0.70)",
                polygons: [
                    { id: 3, poly: "1024,541,1022,592,1087,597,1094,546", name: "Plot 3" }, // Plot 3
                    { id: 21, poly: "915,453,836,450,829,492,841,502,913,504", name: "Plot 21" }, // Plot 21
                ],
            },
            {
                id: 4,
                StartRange: 4000,
                EndRange: 4500,
                noOfPlots: 1,
                name: "4000 - 4500",
                hoveredColor: "rgb(101, 121, 80)",
                hoveredColor1: "rgba(102, 177, 41, 0.70)",
                polygons: [
                    { id: 8, poly: "789,524,737,524,728,577,812,579,812,537", name: "Plot 8" }, // Plot 8
                ],
            },
            {
                id: 5,
                StartRange: 4500,
                EndRange: 5000,
                noOfPlots: 2,
                name: "4500 - 5000",
                hoveredColor: "rgb(101, 114, 157)",
                hoveredColor1: "rgba(75, 115, 236, 0.70)",
                polygons: [
                    { id: 12, poly: "817,377,838,285,785,271,766,367", name: "Plot 12" }, // Plot 12
                    { id: 17, poly: "1078,335,1052,264,1101,251,1134,316", name: "Plot 17" }, // Plot 17
                ],
            },
        ],
        []
    );

    // 1. Establish Range States for both Lower and Upper bounds
    const [minSqFt, setMinSqFt] = useState<number>(2500);
    const [maxSqFt, setMaxSqFt] = useState<number>(5000);

    const ABSOLUTE_MIN = 2500;
    const ABSOLUTE_MAX = 5000;
    const totalRange = ABSOLUTE_MAX - ABSOLUTE_MIN;

    // Calculate percentage coordinates for the track styling and floating value positioning
    const minPercent = ((minSqFt - ABSOLUTE_MIN) / totalRange) * 100;
    const maxPercent = ((maxSqFt - ABSOLUTE_MIN) / totalRange) * 100;

    // Handle Range Adjustments safely ensuring handles don't cross over
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxSqFt);
        setMinSqFt(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minSqFt + 10);
        setMaxSqFt(value);
    };

    const totalPlots = useMemo(() => {
        return filterByRange.reduce((acc, curr) => {
            // Evaluate if this specific row category is hidden/disabled by the slider bounds
            const isRowDisabledBySlider = curr.StartRange > maxSqFt || curr.EndRange < minSqFt;

            // Only add to total if it falls between the active handles
            return isRowDisabledBySlider ? acc : acc + curr.noOfPlots;
        }, 0);
    }, [filterByRange, minSqFt, maxSqFt]); // Rememoize whenever filters shift

    // Responsive scaling mode state
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    useEffect(() => {
        const centerScroll = () => {
            const el = scrollRef.current;
            if (el && el.scrollWidth > el.clientWidth) {
                el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
            }
        };
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
            requestAnimationFrame(centerScroll);
        };
        handleResize();
        requestAnimationFrame(centerScroll);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const aspectStyle = isMobileOrTablet ? "xMidYMid meet" : "none";



    return (
        <div ref={scrollRef} className="relative w-screen h-screen overflow-x-auto overflow-y-hidden lg:overflow-hidden bg-[#161713] flex items-center justify-start lg:justify-center font-sans select-none z-[1000] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative h-full aspect-[1982/1024] shrink-0 lg:w-full lg:h-full lg:aspect-auto flex items-center justify-center overflow-hidden">
                {/* Background Blueprint Image */}
                <img
                    src={bgImage}
                    alt="Coral Court Layout"
                    className="absolute inset-0 w-full h-full object-contain lg:object-fill z-0 select-none"
                />

                {/* Top Header Panel */}
                <div className="fixed top-2 md:top-3 lg:top-[50px] left-0 w-full z-[1000] pointer-events-none">
                    <div className="flex justify-between items-center w-full py-2 px-4 md:py-4 lg:py-10">
                        {/* Brand Logo
                        <div className="relative -ml-5 -mt-3 md:-ml-8 md:-mt-5 lg:-ml-10 lg:-mt-7 pointer-events-auto cursor-pointer" onClick={() => navigate("/home")}>
                            <div className="absolute -top-4 -left-6 md:-top-6 md:-left-8 lg:-top-8 lg:-left-12 w-[180px] h-[80px] md:w-[280px] md:h-[120px] lg:w-[380px] lg:h-[160px] bg-black/90 blur-3xl rounded-full z-0" />
                            <img src={logo} className="h-[25px] md:h-[45px] lg:h-[70px] relative z-10" alt="Hiranandani Sands Logo" />
                        </div>
                        */}

                        {/* Page Title */}
                        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto top-2 ">
                            <h1
                                className="text-[#644406] text-[10px] md:text-lg lg:text-3xl font-semibold tracking-[0.25em] uppercase drop-shadow-md"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Coral Court
                            </h1>
                        </div>
                    </div>
                </div>

                {/* ================= LEFT PARK INFO CARD ================= */}
                <div className="fixed top-[55%] left-6 lg:left-12 z-[999] -translate-y-1/2 w-[175px] lg:w-[235px] font-sans">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="rounded-2xl lg:rounded-[24px] border border-[#4d5240]/30 bg-black/45 backdrop-blur-md p-4 lg:p-5 text-[#e0e4d7] shadow-2xl"
                    >
                        {/* <span className="text-[8px] lg:text-[10px] tracking-[0.25em] text-[#e2c792] uppercase font-bold block mb-4 border-b border-white/10 pb-1.5">AMENITIES</span> */}

                        <div className="flex flex-col gap-3">
                            {/* Park 01 */}
                            <div
                                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 ${hoveredParkId === 1 ? "bg-white/10 border border-[#e2c792]/40" : "bg-transparent border border-transparent"
                                    }`}
                                onMouseEnter={() => setHoveredParkId(1)}
                                onMouseLeave={() => setHoveredParkId(null)}
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    01
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Tropical Courtyard <br /> Green
                                </span>
                            </div>

                            {/* Horizontal Divider */}
                            <div className="h-[1px] bg-white/10 w-full my-0.5"></div>

                            {/* Park 02 */}
                            <div
                                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 ${hoveredParkId === 2 ? "bg-white/10 border border-[#e2c792]/40" : "bg-transparent border border-transparent"
                                    }`}
                                onMouseEnter={() => setHoveredParkId(2)}
                                onMouseLeave={() => setHoveredParkId(null)}
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    02
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Active Leisure & Family <br /> Recreation Park
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ================= RIGHT PANEL CONTROLS ================= */}
                <div className="fixed lg:absolute top-[55%] right-[2%] z-[999] -translate-y-1/2 w-[160px] lg:w-[260px] flex flex-col gap-4 items-center">

                    {/* Main Legend Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="rounded-xl lg:rounded-2xl border border-[#8a867c]/40 bg-[#96938a]/85 p-2.5 lg:p-3 text-white shadow-2xl w-full flex flex-col gap-3"
                    >
                        <div className="rounded-[10px] lg:rounded-[15px] border border-[#4d5240]/30 bg-[#5c614d]/70 py-[1px] md:py-1 px-1 lg:px-2 text-[#e0e4d7] shadow-sm">

                            {/* Header Range Tracker Slider Card */}
                            <div className="rounded-[13px] lg:rounded-[20px] border border-[#f5cb6c]/90 bg-[#14120c] px-4 pt-2 pb-4 lg:pt-3 lg:pb-6 mb-1 lg:mb-4 shadow-lg text-center relative overflow-hidden">
                                <span className="text-[5px] md:text-[7px] lg:text-[9px] tracking-[0.2em] text-[#a19e95] uppercase font-bold block mb-1">
                                    Filters
                                </span>
                                <h2 className="text-[6px] md:text-[9px] lg:text-[14px]
                         font-medium tracking-wide text-[#fffcf5] mb-1">
                                    Size Sq.Ft.
                                </h2>
                                {/* Outer Limits & Center Live Track Labels */}
                                <div className="flex justify-between items-center text-[5px] md:text-[8px] lg:text-[11px] text-[#a4aa99]/60 mt-2 px-0.5 font-mono uppercase tracking-wider">

                                    {/* Left Anchor */}
                                    <span>{ABSOLUTE_MIN}</span>

                                    {/* Clean Centered Highlight Badge */}
                                    <h2 className="text-[6px] md:text-[9px] lg:text-[14px] font-medium tracking-wide text-[#ffcf66] font-mono normal-case">
                                        {minSqFt} - {maxSqFt}
                                    </h2>

                                    {/* Right Anchor */}
                                    <span>{ABSOLUTE_MAX}</span>

                                </div>



                                {/* Dual Slider Engine Wrapper */}
                                <div className="relative w-full flex items-center h-6 ">

                                    {/* Track Background */}
                                    <div
                                        className="absolute h-[3px] lg:h-[5px] rounded-lg w-full left-0 top-1/2 -translate-y-1/2"
                                        style={{
                                            background: `linear-gradient(to right, 
                                        #362f1d 0%, 
                                        #362f1d ${minPercent}%, 
                                        #dfaa3b ${minPercent}%, 
                                        #b88223 ${maxPercent}%, 
                                        #362f1d ${maxPercent}%, 
                                        #362f1d 100%)`,
                                            boxShadow: '0 0 8px rgba(223, 170, 59, 0.2)'
                                        }}
                                    />

                                    {/* Floating Tracker Indicators (Mention Numbers While Scrolling) 
                            <div
                                className="absolute text-[5px] md:text-[8px] lg:text-[10px] text-[#ffcf66] font-mono font-bold -top-4 transition-all duration-75 -translate-x-1/2 pointer-events-none whitespace-nowrap px-1 bg-[#14120c]/80 rounded border border-[#ffcf66]/20 shadow-md"
                                style={{ left: `${minPercent}%` }}
                            >
                                {minSqFt}
                            </div>
                            <div
                                className="absolute text-[5px] md:text-[8px] lg:text-[10px] text-[#ffcf66] font-mono font-bold -top-4 transition-all duration-75 -translate-x-1/2 pointer-events-none whitespace-nowrap px-1 bg-[#14120c]/80 rounded border border-[#ffcf66]/20 shadow-md"
                                style={{ left: `${maxPercent}%` }}
                            >
                                {maxSqFt}
                            </div>*/}

                                    {/* Native Ranges Layered Surface Stack */}
                                    <input
                                        type="range"
                                        min={ABSOLUTE_MIN}
                                        max={ABSOLUTE_MAX}
                                        value={minSqFt}
                                        onChange={handleMinChange}
                                        className={`absolute w-full h-full appearance-none pointer-events-none bg-transparent outline-none dual-range-input ${minSqFt > ABSOLUTE_MAX - 150 ? "z-30" : "z-20"
                                            }`}
                                    />
                                    <input
                                        type="range"
                                        min={ABSOLUTE_MIN}
                                        max={ABSOLUTE_MAX}
                                        value={maxSqFt}
                                        onChange={handleMaxChange}
                                        className="absolute w-full h-full appearance-none pointer-events-none bg-transparent outline-none z-25 dual-range-input"
                                    />

                                    {/* Global Shadow DOM Thumb Styling Override */}
                                    <style>{`
                                .dual-range-input {
                                    -webkit-appearance: none;
                                    appearance: none;
                                }
                                .dual-range-input::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    appearance: none;
                                    width: 14px;
                                    height: 14px;
                                    border-radius: 50%;
                                    background: #ffcf66;
                                    border: 3px solid #6b490b;
                                    cursor: pointer;
                                    box-shadow: 0 0 12px #ffc84a, 0 0 20px #ffc84a;
                                    transition: transform 0.1s;
                                    pointer-events: auto; /* Re-enable pointer events for handles */
                                }
                                .dual-range-input::-webkit-slider-thumb:hover {
                                    transform: scale(1.2);
                                }
                                .dual-range-input::-moz-range-thumb {
                                    width: 14px;
                                    height: 14px;
                                    border-radius: 50%;
                                    background: #ffcf66;
                                    border: 3px solid #6b490b;
                                    cursor: pointer;
                                    box-shadow: 0 0 12px #ffc84a, 0 0 20px #ffc84a;
                                    transition: transform 0.1s;
                                    pointer-events: auto;
                                }
                                .dual-range-input::-moz-range-thumb:hover {
                                    transform: scale(1.2);
                                }
                            `}</style>
                                </div>
                            </div>

                        </div>
                        {/* Grid Table Container */}
                        <div className="rounded-lg lg:rounded-xl border border-[#5a574f] bg-[#48463f]/90 overflow-hidden">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 text-[6px] lg:text-[9px] font-bold text-white border-b border-[#5a574f] bg-[#3d3a33] py-1.5 text-center items-center">
                                <div className="col-span-3 border-r border-[#5a574f] h-full flex items-center justify-center">Type</div>
                                <div className="col-span-6 border-r border-[#5a574f] px-1 leading-tight">
                                    Area range of plots<br />
                                    <span className="text-[5px] lg:text-[7px] opacity-70 font-mono">Area in SQ FT</span>
                                </div>
                                <div className="col-span-3">No of Plots</div>
                            </div>

                            {/* Table Rows */}
                            <div className="divide-y divide-white/5">
                                {filterByRange.map((row) => {
                                    const isRowDisabled = row.StartRange > maxSqFt || row.EndRange < minSqFt;

                                    return (
                                        <div
                                            key={row.id}
                                            onMouseEnter={() => !isRowDisabled && setActiveRangeId(row.id)}
                                            onMouseLeave={() => !isRowDisabled && setActiveRangeId(null)}
                                            className={`grid grid-cols-12 items-center text-center py-1 transition-all duration-150 ${isRowDisabled
                                                ? "opacity-40 bg-black/40 text-gray-500 pointer-events-none"
                                                : activeRangeId === row.id
                                                    ? "bg-[#3e4235] text-white font-semibold"
                                                    : "bg-[#4c4a42] text-white hover:bg-[#34372c]/40"
                                                }`}
                                        >
                                            {/* Color Swatch */}
                                            <div className="col-span-3 border-r border-[#5a574f] flex justify-center items-center h-full">
                                                <div
                                                    className="w-2.5 h-1.5 lg:w-5 lg:h-2.5 rounded-full border border-black/20"
                                                    style={{ backgroundColor: row.hoveredColor }}
                                                />
                                            </div>

                                            {/* Range Name */}
                                            <div className="col-span-6 border-r border-[#5a574f] font-mono text-[7px] lg:text-[10px] tracking-wide">
                                                {row.name}
                                            </div>

                                            {/* Plot Count */}
                                            <div className="col-span-3 font-mono text-[7px] lg:text-[10px]">
                                                {row.noOfPlots}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Table Total Footer */}
                        <div className="grid grid-cols-12 rounded-full items-center bg-gradient-to-r from-[#110a05] via-[#4a3112] to-[#8c5d23] mt-1 lg:mt-3 mb-1 lg:mb-3 py-0 lg:py-[1px] font-semibold uppercase tracking-wider text-[#e3dac9] shadow-inner">
                            <div className="col-span-4 text-left pl-4 font-bold tracking-widest text-[7px] lg:text-[8px] text-[#cfc4b2]">
                                TOTAL
                            </div>
                            <div className="col-span-4"></div>
                            <div className="col-span-4 text-right pr-4 font-mono text-[#ecd4a7] font-bold text-[9px] lg:text-[10px]">
                                {totalPlots}
                            </div>
                        </div>
                    </motion.div>

                    {/* Separate Floating Mini-map Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => navigate("/project-details")}
                        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/20 w-[140px] lg:w-[220px] h-20 lg:h-28 self-center"
                    >
                        <img
                            src={miniMapImage}
                            alt="Back to Master Plan"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* ================= VECTOR PLOT HIGHLIGHT LAYER ================= */}
                <svg
                    className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                    viewBox="0 0 1982 1024"
                    preserveAspectRatio={aspectStyle}
                >
                    {filterByRange.map((rangeRow) => {
                        const isRowDisabled = rangeRow.StartRange > maxSqFt || rangeRow.EndRange < minSqFt;

                        // Tracks if this specific row category is hovered in the sidebar table
                        const isGroupHovered = activeRangeId === rangeRow.id;

                        return rangeRow.polygons.map((plot: any) => {
                            // FIX: Using plot.id to match your setHoveredPlotId(plot.id) hook exactly
                            const isSinglePlotHovered = hoveredPlotId === plot.id;

                            // FIX: Track if any row or plot interaction is live using your true state definitions
                            const isAnyHoverActive = activeRangeId !== null || hoveredPlotId !== null;

                            // Determines if this specific plot polygon gets the highlight fill
                            const isHighlighted = isSinglePlotHovered || (isGroupHovered && hoveredPlotId === null);

                            return (
                                <polygon
                                    key={`plot-${rangeRow.id}-${plot.id}`}
                                    points={plot.poly}
                                    className="transition-all duration-300 pointer-events-auto cursor-pointer"

                                    // Mouse events correctly binding to your state setter hooks
                                    onMouseEnter={() => !isRowDisabled && setHoveredPlotId(plot.id)}
                                    onMouseLeave={() => !isRowDisabled && setHoveredPlotId(null)}
                                    onClick={() => {
                                        if (!isRowDisabled) {
                                            setSelectedPlot({ id: plot.id, name: 'name' in plot ? (plot as any).name : undefined });
                                        }
                                    }}
                                    fill={
                                        isRowDisabled
                                            ? "#111" // Out of range - dark dim
                                            : isHighlighted
                                                ? rangeRow.hoveredColor1 // Hover highlighted (active group row / active single plot)
                                                : isAnyHoverActive
                                                    ? "rgba(17, 17, 17, 0.4)" // Dim unselected layers when focused on one
                                                    : "transparent" // Default resting map state
                                    }
                                    fillOpacity={isRowDisabled ? 0.75 : isHighlighted ? 0.9 : isAnyHoverActive ? 0.6 : 0}
                                    stroke={isHighlighted && !isRowDisabled ? rangeRow.hoveredColor : "transparent"}
                                    strokeWidth={isHighlighted && !isRowDisabled ? "1.5" : "0"}
                                    strokeLinejoin="round"
                                    style={{
                                        mixBlendMode: isAnyHoverActive && !isHighlighted ? "multiply" : "normal",
                                    }}
                                />
                            );
                        });
                    })}
                    {/* Park Polygons Layer */}
                    {/* Tropical Courtyard Green (Park 1) */}
                    <polygon
                        points="989,434,1003,420,1020,411,1024,397,1011,379,989,379,957,381,933,381,911,393,911,418,922,441,955,446"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(1)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 1 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        // stroke={hoveredParkId === 1 ? "#ffcf66" : "transparent"}
                        // strokeWidth={hoveredParkId === 1 ? "1.5" : "0"}
                        strokeLinejoin="round"
                    />
                    {/* Active Leisure & Family Recreation Park (Park 2) */}
                    <polygon
                        points="568,816,585,804,610,800,627,798,646,805,660,819,666,828,699,800,709,774,711,748,706,720,688,699,666,679,650,697,619,694,582,711,556,746,557,783"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(2)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 2 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        // stroke={hoveredParkId === 2 ? "#ffcf66" : "transparent"}
                        // strokeWidth={hoveredParkId === 2 ? "1.5" : "0"}
                        strokeLinejoin="round"
                    />
                </svg>

                {/* ================= COMPASS ================= */}
                <div className="fixed bottom-2 md:bottom-4 lg:bottom-10 right-[20%] md:right-[22%] lg:right-[20%] z-[999] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 pointer-events-none select-none">
                    <img src={compassImage} alt="Compass" className="w-full h-full object-contain" />
                </div>

                {/* ================= BACK BUTTON ================= */}
                <button
                    onClick={() => navigate("/project-details")}
                    className="fixed bottom-2 md:bottom-4 lg:bottom-10 left-[6%] z-[999] -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
                    title="Go Back to Master Plan"
                >
                    <img src={backIcon} alt="Back" className="w-full h-full object-contain" />
                </button>

                {/* Plot Details Modal */}
                <AnimatePresence>
                    {selectedPlot && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPlot(null)}
                            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                ref={popupRef}
                                className="relative bg-[#1e1e1b]/10 border border-white/15 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col md:flex-row gap-6 p-6 lg:p-8 text-[#e3dac9] overflow-hidden"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPlot(null)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Close"
                                    data-html2canvas-ignore="true"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Left Section - Image */}
                                <div className="flex-1 flex items-center justify-center aspect-square max-h-[300px] md:max-h-none overflow-hidden">
                                    {getPlotImage(selectedPlot.id) ? (
                                        <img
                                            src={getPlotImage(selectedPlot.id)}
                                            alt={`Plot ${selectedPlot.id} Details`}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-md bg-white p-6"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-white/40 h-full w-full py-12">
                                            <span className="text-sm font-semibold">Layout image for Plot {selectedPlot.id}</span>
                                            <span className="text-xs mt-1">({(selectedPlot.id === 19 || selectedPlot.id === 20 || selectedPlot.id === 21) ? `c${selectedPlot.id}.png` : `${selectedPlot.id}.png`})</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Section - Details */}
                                <div className="flex-1 flex flex-col justify-center gap-4 py-4 pr-4">
                                    <h2 className="text-2xl font-bold tracking-wide text-white">
                                        Plot Details
                                    </h2>
                                    <div className="flex flex-col gap-2 text-sm lg:text-base text-white">
                                        <div>
                                            <span className="font-normal text-white/90">Plot No. : </span>
                                            <span className="font-bold text-lg text-white">{selectedPlot.id}</span>
                                        </div>
                                        <div>
                                            <span className="font-normal text-white/90">Type : </span>
                                            <span className="text-[#df9b2f] font-bold">CORAL COURT</span>
                                        </div>
                                        {plotAreas[selectedPlot.id] && (
                                            <div className="mt-4 flex flex-col gap-1">
                                                <span className="text-sm font-bold tracking-wide text-white">Plot Area</span>
                                                <div className="flex gap-6 text-sm text-white">
                                                    <div>
                                                        <span className="font-normal text-white/70">SQ. MT. : </span>
                                                        <span className="font-bold">{plotAreas[selectedPlot.id].sqmt}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-normal text-white/70">SQ. FT. : </span>
                                                        <span className="font-bold">{plotAreas[selectedPlot.id].sqft}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        disabled={!getPlotImage(selectedPlot.id)}
                                        data-html2canvas-ignore="true"
                                        className="mt-4 self-start bg-[#df9b2f] hover:bg-[#c58420] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                                    >
                                        Download
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}