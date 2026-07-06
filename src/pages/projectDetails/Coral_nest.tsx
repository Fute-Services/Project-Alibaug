import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/project_details/cora_nest.webp";
import miniMapImage from "../../assets/project_details/Project Details.webp";
import html2canvas from "html2canvas";
// import logo from "../../assets/Home/Coral reserve logo.png";
import compassImage from "../../assets/Amenities/compass.png";
import backIcon from "../../assets/back butten.png";

import coralnest1 from '../../assets/project_details/coralnest/1.png';
import coralnest2 from '../../assets/project_details/coralnest/2.png';
import coralnest3 from '../../assets/project_details/coralnest/3.png';
import coralnest4 from '../../assets/project_details/coralnest/4.png';
import coralnest5 from '../../assets/project_details/coralnest/5.png';
import coralnest6 from '../../assets/project_details/coralnest/6.png';
import coralnest7 from '../../assets/project_details/coralnest/7.png';
import coralnest8 from '../../assets/project_details/coralnest/8.webp';
import coralnest9 from '../../assets/project_details/coralnest/9.png';
import coralnest10 from '../../assets/project_details/coralnest/10.png';
import coralnest11 from '../../assets/project_details/coralnest/11.png';
import coralnest12 from '../../assets/project_details/coralnest/12.webp';
import coralnest13 from '../../assets/project_details/coralnest/13.png';
import coralnest14 from '../../assets/project_details/coralnest/14.png';
import coralnest15 from '../../assets/project_details/coralnest/15.png';
import coralnest16 from '../../assets/project_details/coralnest/16.png';
import coralnest17 from '../../assets/project_details/coralnest/17.webp';
import coralnest18 from '../../assets/project_details/coralnest/18.png';
import coralnest19 from '../../assets/project_details/coralnest/19.png';
import coralnest20 from '../../assets/project_details/coralnest/20.png';
import coralnest21 from '../../assets/project_details/coralnest/21.png';
import coralnest22 from '../../assets/project_details/coralnest/22.png';
import coralnest23 from '../../assets/project_details/coralnest/23.png';
import coralnest24 from '../../assets/project_details/coralnest/24.webp';
import coralnest25 from '../../assets/project_details/coralnest/25.png';
import coralnest26 from '../../assets/project_details/coralnest/26.png';
import coralnest27 from '../../assets/project_details/coralnest/27.png';
import coralnest28 from '../../assets/project_details/coralnest/28.png';
import coralnest29 from '../../assets/project_details/coralnest/29.webp';
import coralnest30 from '../../assets/project_details/coralnest/30.png';
const plotAreas: Record<number, { sqmt: string; sqft: string }> = {
    1: { sqmt: "235.20", sqft: "2,531.69" },
    2: { sqmt: "206.89", sqft: "2,226.96" },
    3: { sqmt: "211.64", sqft: "2,278.09" },
    4: { sqmt: "218.67", sqft: "2,353.76" },
    5: { sqmt: "236.88", sqft: "2,549.77" },
    6: { sqmt: "507.66", sqft: "5,464.45" },
    7: { sqmt: "451.65", sqft: "4,861.56" },
    8: { sqmt: "370.09", sqft: "3,983.64" },
    9: { sqmt: "202.58", sqft: "2,180.57" },
    10: { sqmt: "202.58", sqft: "2,180.57" },
    11: { sqmt: "202.58", sqft: "2,180.57" },
    12: { sqmt: "303.50", sqft: "3,266.87" },
    13: { sqmt: "324.06", sqft: "3,488.18" },
    14: { sqmt: "349.56", sqft: "3,762.66" },
    15: { sqmt: "211.63", sqft: "2,277.98" },
    16: { sqmt: "211.80", sqft: "2,279.81" },
    17: { sqmt: "228.92", sqft: "2,464.09" },
    18: { sqmt: "243.81", sqft: "2,624.37" },
    19: { sqmt: "247.23", sqft: "2,661.18" },
    20: { sqmt: "253.60", sqft: "2,729.75" },
    21: { sqmt: "354.72", sqft: "3,818.20" },
    22: { sqmt: "423.30", sqft: "4,556.40" },
    23: { sqmt: "357.10", sqft: "3,843.82" },
    24: { sqmt: "206.26", sqft: "2,220.18" },
    25: { sqmt: "206.26", sqft: "2,220.18" },
    26: { sqmt: "206.25", sqft: "2,220.07" },
    27: { sqmt: "206.25", sqft: "2,220.07" },
    28: { sqmt: "232.97", sqft: "2,507.68" },
    29: { sqmt: "222.07", sqft: "2,390.36" },
    30: { sqmt: "319.50", sqft: "3,439.09" },
};

export default function Coral_nest() {
    const navigate = useNavigate();

    // Define the shape of the plot state
    interface SelectedPlotType {
        plotNo: string | number;
        type: string;
        Image: string;
    }

    // Define the shape of your raw plot data item (adjust fields based on your API/data)
    // interface PlotDataItem {
    //     id: string | number;
    //     image: string;
    //     // add other properties if needed, e.g., name?: string;
    // }

    // Add this at the top of your component alongside your other states
    const [activePlotId, setActivePlotId] = useState<string | null>(null);
    const [activeRangeId, setActiveRangeId] = useState<number | null>(null);
    const [selectedPlot, setSelectedPlot] = useState<SelectedPlotType | null>(null);

    // Hover states for the park area
    const [hoveredParkId, setHoveredParkId] = useState<number | null>(null);

    // Download handler
    // const handleDownload = (imageUrl: string) => {
    //     if (!imageUrl) return;
    //     const fileName = `Plot_${selectedPlot?.plotNo}_Details.png`;
    //     fetch(imageUrl)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const url = window.URL.createObjectURL(blob);
    //             const a = document.createElement("a");
    //             a.href = url;
    //             a.download = fileName;
    //             document.body.appendChild(a);
    //             a.click();
    //             document.body.removeChild(a);
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch((error) => {
    //             console.error("Error downloading image:", error);
    //             const a = document.createElement("a");
    //             a.href = imageUrl;
    //             a.download = fileName;
    //             a.target = "_blank";
    //             document.body.appendChild(a);
    //             a.click();
    //             document.body.removeChild(a);
    //         });
    // };



    // Inside your component:
    const popupRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!popupRef.current) return;

        const fileName = `Plot_${selectedPlot?.plotNo}_Details.jpeg`;

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


    interface TooltipState {
        visible: boolean;
        x: number;
        y: number;
        text: string;
    }

    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        x: 0,
        y: 0,
        text: "",
    });

    // Ranges data representing the 30 plots grouped by size
    const filterByRange = useMemo(
        () => [
            {
                id: 1,
                StartRange: 2000,
                EndRange: 2500,
                noOfPlots: 14,
                name: "2000 - 2500",
                hoveredColor: "rgb(195, 202, 204)",
                hoveredColor1: "rgba(247, 248, 248, 0.70)",
                polygons: [
                    // { id: 9, poly: "827,394,880,390,866,532,817,525" },
                    // { id: 10, poly: "789,672,841,683,812,858,761,854" },
                    // { id: 11, poly: "880,631,868,691,1015,705,1020,650" },
                    // { id: 15, poly: "945,538,936,596,904,592,887,577,894,538" },
                    // { id: 16, poly: "1038,472,992,335,1043,318,1090,454" },

                    {
                        id: 4, name: "Plot-4",
                        poly: "826,394,876,391,876,408,875,443,824,440,833,413",
                        image: coralnest4
                    },
                    {
                        id: 3, name: "Plot-3",
                        poly: "824,440,876,441,873,463,871,490,819,482,822,459",
                        image: coralnest3
                    },
                    {
                        id: 2, name: "Plot-2", poly: "819,479,871,490,864,534,810,527,817,513",
                        image: coralnest2
                    },


                    {
                        id: 9, name: "Plot-9",
                        poly: "992,336,1044,316,1058,360,1008,381", image: coralnest9
                    },
                    {
                        id: 10, name: "Plot-10",
                        poly: "1008,380,1058,361,1064,377,1067,387,1074,408,1023,427", image: coralnest10
                    },
                    {
                        id: 11, name: "Plot-11",
                        poly: "1022,425,1072,407,1085,429,1086,443,1093,457,1037,471", image: coralnest11
                    },



                    {
                        id: 29, name: "Plot-29",
                        poly: "894,536,946,545,939,597,906,595,892,587,887,573", image: coralnest29
                    },
                    { id: 15, name: "Plot-15", poly: "976,645,1023,650,1016,709,969,702", image: coralnest15 },
                    { id: 16, name: "Plot-16", poly: "931,638,978,645,969,703,924,696", image: coralnest16 },
                    { id: 17, name: "Plot-17", poly: "929,638,922,699,869,689,876,647,883,635,894,633", image: coralnest17 },


                    {
                        id: 24, name: "Plot-24",
                        poly: "771,808,820,815,813,862,761,852,773,841,766,827", image: coralnest24
                    },
                    {
                        id: 25, name: "Plot-25",
                        poly: "778,764,826,771,819,818,771,808,766,794,775,782", image: coralnest25
                    },
                    {
                        id: 26, name: "Plot-26",
                        poly: "791,720,836,727,827,773,782,761,789,750,782,738", image: coralnest26
                    },
                    {
                        id: 27, name: "Plot-27",
                        poly: "794,675,841,682,834,729,789,719,775,706,791,705,791,691", image: coralnest27
                    },










                ],
            },
            {
                id: 2,
                StartRange: 2500,
                EndRange: 3000,
                noOfPlots: 6,
                name: "2500 - 3000",
                hoveredColor: "rgb(182, 148, 148)",
                hoveredColor1: "rgba(223, 121, 151, 0.70)",
                polygons: [
                    // { id: 1, poly: "869,690,945,701,922,834,852,822" },
                    // { id: 2,name:"Plot-28", poly: "841,683,787,671,796,620,829,624,847,636" },
                    { id: 1, name: "Plot-1", poly: "817,528,864,535,857,577,833,582,805,578", image: coralnest1 },
                    { id: 5, name: "Plot-5", poly: "876,389,880,351,824,342,824,393", image: coralnest5 },
                    { id: 28, name: "Plot-28", poly: "789,625,831,625,850,643,847,681,789,676,787,646", image: coralnest28 },
                    { id: 18, name: "Plot-18", poly: "869,690,946,701,939,750,862,734", image: coralnest18 },
                    { id: 19, name: "Plot-19", poly: "864,735,857,777,932,787,943,749", image: coralnest19 },
                    { id: 20, name: "Plot-20", poly: "859,779,936,789,922,836,852,824", image: coralnest20 },



                ],
            },
            {
                id: 3,
                StartRange: 3000,
                EndRange: 3500,
                noOfPlots: 3,
                name: "3000 - 3500",
                hoveredColor: "rgb(140, 178, 199)",
                hoveredColor1: "rgba(64, 172, 226, 0.70)",
                polygons: [
                    { id: 30, name: "Plot-30", poly: "947,543,936,596,1001,603,1020,589,1020,550", image: coralnest30 },
                    // { id: 13,name:"Plot-12", poly: "1055,606,1050,592,1053,531,1031,473,1090,456,1109,531,1109,620" },

                    {
                        id: 12, name: "Plot-12",
                        poly: "1036,473,1097,454,1097,473,1104,494,1106,519,1106,536,1055,533,1055,515", image: coralnest12
                    },
                    {
                        id: 13, name: "Plot-13",
                        poly: "1053,533,1106,536,1106,568,1104,585,1102,598,1104,620,1055,613,1050,601,1048,587"

                        , image: coralnest13
                    }

                ],
            },
            {
                id: 4,
                StartRange: 3500,
                EndRange: 4000,
                noOfPlots: 4,
                name: "3500 - 4000",
                hoveredColor: "rgb(167, 200, 114)",
                hoveredColor1: "rgba(152, 223, 70, 0.70)",
                polygons: [
                    { id: 8, name: "Plot-8", poly: "992,330,971,249,1018,246,1046,319", image: coralnest8 },
                    { id: 14, name: "Plot-14", poly: "1024,650,1013,706,1094,717,1099,659", image: coralnest14 },
                    { id: 21, name: "Plot-21", poly: "852,823,843,885,911,895,924,834", image: coralnest21 },
                    { id: 23, name: "Plot-23", poly: "813,858,799,937,750,932,757,853", image: coralnest23 }
                ],
            },
            {
                id: 5,
                StartRange: 4000,
                EndRange: 4500,
                noOfPlots: 2,
                name: "4000 - 4500",
                hoveredColor: "rgb(101, 114, 157)",
                hoveredColor1: "rgba(75, 115, 236, 0.70)",
                polygons: [
                    { id: 7, name: "Plot-7", poly: "894,263,922,329,987,312,968,247", image: coralnest7 },
                    { id: 22, name: "Plot-22", poly: "810,880,911,892,904,941,799,934", image: coralnest22 }
                ],
            },
            {
                id: 6,
                StartRange: 4500,
                EndRange: 5000,
                noOfPlots: 1,
                name: "4500 - 5000",
                hoveredColor: "rgb(156, 141, 119)",
                hoveredColor1: "rgba(185, 121, 37, 0.70)",
                polygons: [
                    { id: 6, name: "Plot-6", poly: "894,266,922,332,876,350,831,341,833,309,850,288", image: coralnest6 }
                ],
            },
        ],
        []
    );

    // 1. Establish Range States for both Lower and Upper bounds
    const [minSqFt, setMinSqFt] = useState<number>(2000);
    const [maxSqFt, setMaxSqFt] = useState<number>(5000);

    const ABSOLUTE_MIN = 2000;
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
                    alt="Coral Nest Layout"
                    className="absolute inset-0 w-full h-full object-contain lg:object-fill z-0 select-none"
                />

                {/* Top Header Panel */}
                {/* Brand Logo
                <div className="absolute top-2 md:top-3 lg:top-[50px] left-[10%] w-full z-[1000] pointer-events-none">
                    <div className="flex justify-between items-center w-full py-2 px-4 md:py-4 lg:py-10">
                        <div className="relative -ml-5 -mt-3 md:-ml-8 md:-mt-5 lg:-ml-10 lg:-mt-7 pointer-events-auto cursor-pointer" onClick={() => navigate("/home")}>
                            <img src={logo} className="h-[25px] md:h-[20px] lg:h-[20px] relative z-10" alt="Hiranandani Sands Logo" />
                        </div>
                    </div>
                </div>
                */}

                {/* Page Title */}
                <div className="fixed top-2 md:top-3 lg:top-[30px] left-0 w-full z-[1000] pointer-events-none">
                    <div className="flex justify-between items-center w-full py-2 px-4 md:py-4 lg:py-10">
                        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto top-2 md:top-4 lg:top-2">
                            <h1
                                className="text-[#644406] text-[10px] md:text-lg lg:text-3xl font-semibold tracking-[0.25em] uppercase drop-shadow-md"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Coral Nest
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
                        <div className="flex flex-col gap-3">
                            {/* Park 01 */}
                            <div
                                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 ${hoveredParkId === 1 ? "bg-white/10 border border-[#e2c792]/40" : "bg-transparent border border-transparent"
                                    }`}
                                onMouseEnter={() => setHoveredParkId(1)}
                                onMouseLeave={() => setHoveredParkId(null)}
                            // onClick={() => navigate("/amenities")}
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    01
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Community Resort <br /> Green
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
                        {/* Range Slider Container */}
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


                            </div></div>

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
                {/* <svg
                className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                viewBox="0 0 1982 1024"
                preserveAspectRatio={aspectStyle}
            >
                {filterByRange.map((rangeRow) => {
                    const isRowDisabled = rangeRow.StartRange > sqYdRange;
                    const isGroupHovered = activeRangeId === rangeRow.id;
                    const isAnyGroupHovered = activeRangeId !== null;

                    return rangeRow.polygons.map((plot: any) => (
                        <polygon
                            key={`plot-${rangeRow.id}-${plot.id}`}
                            points={plot.poly}
                            className="transition-all duration-300 pointer-events-auto cursor-pointer"

                            // --- ADD THIS ONCLICK HANDLER ---
                            onClick={() => {
                                if (!isRowDisabled) {
                                    setSelectedPlot({
                                        plotNo: plot.id, // or plot.id depending on your data structural setup
                                        type: "CORAL NEST", // Dynamically pass the zone type
                                        Image: plot.image
                                    });
                                }
                            }}
                            // --------------------------------

                            onMouseEnter={(e) => {
                                if (!isRowDisabled) {
                                    setActiveRangeId(rangeRow.id);
                                    setTooltip({
                                        visible: true,
                                        x: e.clientX,
                                        y: e.clientY,
                                        text: plot.name,
                                    });
                                }
                            }}
                            onMouseMove={(e) => {
                                setTooltip((prev) => ({
                                    ...prev,
                                    x: e.clientX,
                                    y: e.clientY,
                                }));
                            }}
                            onMouseLeave={() => {
                                if (!isRowDisabled) {
                                    setActiveRangeId(null);
                                    setTooltip((prev) => ({
                                        ...prev,
                                        visible: false,
                                    }));
                                }
                            }}
                            fill={
                                isRowDisabled
                                    ? "#111"
                                    : isGroupHovered
                                        ? rangeRow.hoveredColor1
                                        : isAnyGroupHovered
                                            ? "rgba(17,17,17,0.4)"
                                            : "transparent"
                            }
                            fillOpacity={isRowDisabled ? 0.75 : isGroupHovered ? 0.9 : isAnyGroupHovered ? 0.6 : 0}
                            stroke={isGroupHovered && !isRowDisabled ? rangeRow.hoveredColor : "transparent"}
                            strokeWidth={isGroupHovered && !isRowDisabled ? "1.5" : "0"}
                        />
                    ));
                })}

            
                
                <polygon
                    points="929,478,938,497,954,494,962,483,957,460,940,445,934,431,948,418,976,418,992,441,1001,473,994,504,968,525,936,530,915,511,911,481"
                    className="transition-all duration-300 pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredParkId(1)}
                    onMouseLeave={() => setHoveredParkId(null)}
                    fill={hoveredParkId === 1 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                    // stroke={hoveredParkId === 1 ? "rgb(219, 155, 47)" : "transparent"}
                    // strokeWidth={hoveredParkId === 1 ? "1.5" : "0"}
                    strokeLinejoin="round"
                />
            </svg> */}

                {/* ================= VECTOR PLOT HIGHLIGHT LAYER ================= */}
                <svg
                    className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                    viewBox="0 0 1982 1024"
                    preserveAspectRatio={aspectStyle}
                >
                    {filterByRange.map((rangeRow) => {
                        const isRowDisabled = rangeRow.EndRange < minSqFt || rangeRow.StartRange > maxSqFt;
                        const isGroupHovered = activeRangeId === rangeRow.id;

                        return rangeRow.polygons.map((plot: any) => {
                            const currentPlotGlobalId = `plot-${rangeRow.id}-${plot.id}`;
                            const isSinglePlotHovered = activePlotId === currentPlotGlobalId;

                            // Check if any hover state is active anywhere in the component
                            const isAnyHoverActive = activeRangeId !== null || activePlotId !== null;

                            // Determine if this specific polygon should be highlighted
                            const isHighlighted = isSinglePlotHovered || (isGroupHovered && activePlotId === null);

                            return (
                                <polygon
                                    key={currentPlotGlobalId}
                                    points={plot.poly}
                                    className="transition-all duration-300 pointer-events-auto cursor-pointer"

                                    onClick={() => {
                                        if (!isRowDisabled) {
                                            setSelectedPlot({
                                                plotNo: plot.id,
                                                type: "CORAL NEST",
                                                Image: plot.image
                                            });
                                        }
                                    }}

                                    onMouseEnter={() => {
                                        if (!isRowDisabled) {
                                            // 1. Highlight ONLY this plot
                                            setActivePlotId(currentPlotGlobalId);
                                            // 2. Keep the table row highlighted too if desired, or remove if you want them isolated
                                            setActiveRangeId(rangeRow.id);

                                            // setTooltip({
                                            //     visible: true,
                                            //     x: e.clientX,
                                            //     y: e.clientY,
                                            //     text: plot.name,
                                            // });
                                        }
                                    }}
                                    onMouseMove={(e) => {
                                        setTooltip((prev) => ({
                                            ...prev,
                                            x: e.clientX,
                                            y: e.clientY,
                                        }));
                                    }}
                                    onMouseLeave={() => {
                                        if (!isRowDisabled) {
                                            setActivePlotId(null);
                                            setActiveRangeId(null);
                                            setTooltip((prev) => ({
                                                ...prev,
                                                visible: false,
                                            }));
                                        }
                                    }}
                                    fill={
                                        isRowDisabled
                                            ? "#111"
                                            : isHighlighted
                                                ? rangeRow.hoveredColor1
                                                : isAnyHoverActive
                                                    ? "rgba(17,17,17,0.4)" // Dim unselected plots when something is hovered
                                                    : "transparent"
                                    }
                                    fillOpacity={
                                        isRowDisabled
                                            ? 0.75
                                            : isHighlighted
                                                ? 0.9
                                                : isAnyHoverActive
                                                    ? 0.6
                                                    : 0
                                    }
                                    stroke={isHighlighted && !isRowDisabled ? rangeRow.hoveredColor : "transparent"}
                                    strokeWidth={isHighlighted && !isRowDisabled ? "1.5" : "0"}
                                />
                            );
                        });
                    })}

                    {/* Park Polygons Layer */}
                    <polygon
                        points="929,478,938,497,954,494,962,483,957,460,940,445,934,431,948,418,976,418,992,441,1001,473,994,504,968,525,936,530,915,511,911,481"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(1)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        onClick={() => navigate("/amenities")}
                        fill={hoveredParkId === 1 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        // stroke={hoveredParkId === 1 ? "rgb(219, 155, 47)" : "transparent"}
                        strokeWidth={hoveredParkId === 1 ? "1.5" : "0"}
                        strokeLinejoin="round"
                    />
                </svg>


                {tooltip.visible && (
                    <div
                        className="fixed z-[9999] 
                    backdrop-blur-lg px-2 py-1 rounded-md bg-black/20 text-white 
                    text-[9px] pointer-events-none whitespace-nowrap shadow-lg"
                        style={{
                            left: tooltip.x + 12,
                            top: tooltip.y + 12,
                        }}
                    >
                        {tooltip.text}
                    </div>
                )}

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
                {/* Plot Details Modal */}
                <AnimatePresence>
                    {selectedPlot && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPlot(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Left Section - Image */}
                                <div className="flex-1 flex items-center justify-center aspect-square max-h-[300px] md:max-h-none overflow-hidden">
                                    {selectedPlot.Image ? (
                                        <img
                                            src={selectedPlot.Image}
                                            alt={`Plot ${selectedPlot.plotNo} Details`}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-md bg-white p-6"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-white/40 h-full w-full py-12">
                                            <span className="text-sm font-semibold">Layout image for Plot {selectedPlot.plotNo}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Section - Details */}
                                <div className="flex-1 flex flex-col justify-center gap-4 py-4 pr-4">
                                    <h2 className="text-2xl font-bold tracking-wide text-white">Plot Details</h2>
                                    <div className="flex flex-col gap-2 text-sm lg:text-base text-white">
                                        <div>
                                            <span className="font-normal text-white/90">Plot No. : </span>
                                            <span className="font-bold text-lg text-white">{selectedPlot.plotNo}</span>
                                        </div>
                                        <div>
                                            <span className="font-normal text-white/90">Type : </span>
                                            <span className="text-[#df9b2f] font-bold">{selectedPlot.type}</span>
                                        </div>
                                        {plotAreas[Number(selectedPlot.plotNo)] && (
                                            <div className="mt-4 flex flex-col gap-1">
                                                <span className="text-sm font-bold tracking-wide text-white">Plot Area</span>
                                                <div className="flex gap-6 text-sm text-white">
                                                    <div>
                                                        <span className="font-normal text-white/70">SQ. MT. : </span>
                                                        <span className="font-bold">{plotAreas[Number(selectedPlot.plotNo)].sqmt}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-normal text-white/70">SQ. FT. : </span>
                                                        <span className="font-bold">{plotAreas[Number(selectedPlot.plotNo)].sqft}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Download Button */}
                                    <button
                                        onClick={handleDownload}
                                        disabled={!selectedPlot.Image}
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