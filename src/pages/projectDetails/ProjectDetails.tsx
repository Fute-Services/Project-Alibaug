import { useState, useMemo, useEffect, useRef } from "react";
import bgImage from "../../assets/project_details/Project Details.webp";
import LeftNavbar from "../../components/Navbar/LeftNavbar";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../assets/Home/Coral reserve logo.png';
import { useNavigate } from "react-router-dom";

export default function ProjectDetails() {
    const [hoveredTooltipId, setHoveredTooltipId] = useState(null);

    // Tracks which sidebar row color-range is currently hovered
    const [activeRangeId, setActiveRangeId] = useState<number | null>(null);
    const navigate = useNavigate();
    const plotData = [
        { id: 1, circle: "602,291,26", name: " CORAL COURT", path: "/coral-court", rect: "513,730,549,911" },
        { id: 2, circle: "845,952,23", name: "CORAL NEST ", path: "/coral-nest ", rect: "827,730,864,914" },
        { id: 3, circle: "1179,442,27", name: "CORAL BAY ", path: "/coral-bay", rect: "1373,730,1412,927" }
    ]


    // Using your exact range boundaries and datasets
    const filterByRange = useMemo(() =>
        [

            {
                id: 1, StartRange: 1450, EndRange: 1500, noOfPlots: 6, name: "1450-1500",
                hoveredColor: "rgb(229, 209, 162)", hoveredColor1: "rgba(240, 175, 25, 0.90)",
                polygons: [
                    { id: 1, poly: "1250,245,1288,247,1297,359,1253,359" },
                    { id: 2, poly: "1319,323,1369,324,1371,354,1320,354" },
                    { id: 3, poly: "1211,585,1244,583,1248,625,1220,629" }

                ]
            },

            {
                id: 2, StartRange: 1500, EndRange: 1750, noOfPlots: 35, name: "1500-1750",
                hoveredColor: "rgb(148, 186, 175)", hoveredColor1: "rgba(64, 223, 183, 0.50)",
                polygons: [
                    { id: 1, poly: "1502,268,1547,269,1546,315,1544,376,1542,388,1497,381,1500,322" },
                    { id: 2, poly: "1246,359,1295,359,1302,481,1257,479,1253,439,1248,401" },
                    { id: 3, poly: "1421,321,1474,320,1470,372,1460,411,1441,451,1402,430,1421,388,1421,367,1423,344" },
                    { id: 4, poly: "1138,637,1181,645,1164,733,1153,878,1110,876,1117,798,1125,721" },
                    { id: 5, poly: "1421,605,1469,631,1434,682,1414,732,1371,710" },
                    { id: 6, poly: "1320,354,1371,354,1369,382,1323,384" },
                    { id: 7, poly: "1323,424,1372,423,1371,482,1325,482" },
                    { id: 8, poly: "1244,734,1272,701,1307,739,1278,762,1239,792,1208,757" },
                    { id: 9, poly: "1213,846,1262,809,1295,848,1246,886 " },
                    { id: 10, poly: "1318,653,1306,670,1297,676,1343,700,1358,672" },
                    { id: 11, poly: " 1467,462,1441,502,1479,529,1511,483" }
                ]
            },




            {
                id: 3, StartRange: 1750, EndRange: 2000, noOfPlots: 6, name: "1750-2000",
                hoveredColor: "rgb(124, 118, 130)", hoveredColor1: "rgba(118, 68, 218, 0.80)",
                polygons: [
                    { id: 1, poly: "1362,277,1463,277,1470,279,1474,289,1474,319,1362,319" },
                    { id: 2, poly: "1497,380,1542,389,1533,431,1525,463,1514,484,1470,458,1483,430,1493,401" }

                ]
            },
            {
                id: 4, StartRange: 2000, EndRange: 2500, noOfPlots: 24, name: "2000-2500",
                hoveredColor: "rgb(195, 202, 204)", hoveredColor1: "rgba(247, 248, 248, 0.70)",
                polygons: [
                    { id: 1, poly: "1320,323,1316,291,1321,279,1330,274,1360,277,1360,323" },
                    { id: 2, poly: "1260,479,1302,482,1302,507,1297,515,1288,521,1274,524,1260,526" },
                    { id: 3, poly: "1260,809,1323,755,1358,802,1343,809,1320,813,1309,823,1313,837,1297,848" },
                    { id: 4, poly: "1181,884,1213,847,1246,887,1230,893,1218,910,1201,901" },
                    { id: 5, poly: "1141,639,1181,644,1192,630,1218,630,1213,590,1195,581,1178,591,1164,591,1150,598,1139,606,1143,625" },
                    { id: 6, poly: " 1309,613,1325,591,1385,620,1372,643" },
                    { id: 7, poly: " 1272,703,1285,694,1302,680,1344,703,1334,711,1307,738" },
                    { id: 8, poly: " 1206,757,1237,792,1208,818,1194,816,1185,802,1185,790,1190,771" },
                    { id: 9, poly: "989,286,1031,274,1048,309,1054,328,1061,354,1069,375,1073,389,1029,405" },
                    { id: 10, poly: "886,593,1010,608,1015,559,950,552,910,547,896,544,891,556" },
                    { id: 11, poly: "849,338,891,338,887,379,879,459,837,450,849,377" },
                    { id: 12, poly: " 815,588,820,579,858,588,835,739,794,734,798,707,799,685,805,665,814,646,819,632,815,614,822,599" },
                    { id: 13, poly: "905,459,950,464,945,515,912,509,901,495" },
                    { id: 14, poly: "905,462,950,466,945,515,921,510,903,506,901,492" },

                ]
            },
            {
                id: 5, StartRange: 2500, EndRange: 3000, noOfPlots: 24, name: "2500-3000",
                hoveredColor: "rgb(182, 148, 148)", hoveredColor1: "rgba(223, 121, 151, 0.7)",
                polygons: [
                    { id: 1, poly: "457,400,509,410,488,533,474,541,432,540" },
                    { id: 2, poly: "499,547,500,591,689,599,689,552,586,547,542,545,513,547" },
                    { id: 3, poly: "590,473,637,475,635,523,591,521" },
                    { id: 4, poly: "752,555,710,551,724,455,733,451,773,458,761,467,770,481,756,493,756,514,758,535" },
                    { id: 5, poly: " 845,292,889,301,889,334,845,338,847,310" },
                    { id: 6, poly: " 833,455,880,460,873,486,863,497,851,500,826,495" },
                    { id: 7, poly: "884,595,954,602,931,717,866,707" },
                    { id: 8, poly: " 819,534,849,539,863,551,858,586,810,579" },
                    { id: 9, poly: " 1306,210,1306,247,1509,247,1512,217,1498,203,1462,210,1437,205,1413,203,1393,210,1381,203,1353,210,1325,205" },
                    { id: 10, poly: " 1241,581,1253,562,1285,564,1297,576,1292,598,1276,611,1250,626" },
                    { id: 11, poly: " 1371,711,1423,735,1411,740,1411,756,1407,768,1402,779,1350,733,1365,726" },
                    { id: 12, poly: " 1323,592,1332,569,1348,560,1386,564,1399,576,1393,595,1381,618" },
                    { id: 13, poly: " 1309,614,1299,632,1292,641,1357,672,1369,644" }
                ]
            },
            {
                id: 6, StartRange: 3000, EndRange: 3500, noOfPlots: 11, name: "3000-3500",
                hoveredColor: "rgb(140, 178, 199)", hoveredColor1: "rgba(64, 172, 226, 0.70)",
                polygons: [
                    { id: 1, poly: "518,324,510,379,566,382,624,379,683,368,727,353,712,309,668,324,632,331,569,331" },
                    { id: 2, poly: "737,370,782,356,773,429,732,424" },
                    { id: 3, poly: "637,475,697,475,690,513,683,522,670,524,639,524" },
                    { id: 4, poly: "952,466,1012,473,1010,503,1003,513,994,519,968,519,945,512" },
                    { id: 5, poly: "1026,407,1075,389,1085,422,1085,445,1087,466,1090,487,1087,533,1052,527,1041,519,1036,505,1041,450" },
                    // { id: 6, poly: "1372,425,1404,431,1436,450,1417,482,1372,482" },
                    { id: 6, poly: "1371,424,1375,480,1424,480,1443,452,1426,442,1401,430" },
                    { id: 7, poly: "1322,755,1350,734,1405,783,1396,800,1363,802" }
                ]

            },
            {
                id: 7, StartRange: 3500, EndRange: 4000, noOfPlots: 9, name: "3500-4000",
                hoveredColor: "rgb(167, 200, 114)", hoveredColor1: "rgba(152, 223, 70, 0.70)",
                polygons: [
                    { id: 1, poly: "970,212,989,289,1034,272,1031,251,1020,244,1020,230,1010,217,991,210" },
                    { id: 2, poly: "1017,557,1078,567,1082,580,1078,597,1076,615,1066,620,1010,608" },
                    { id: 3, poly: "866,709,933,718,921,772,859,762" },
                    { id: 4, poly: "688,553,754,557,745,601,689,599" },
                    { id: 5, poly: "518,471,591,473,588,522,528,520,516,511,513,504" },
                    { id: 6, poly: "1511,210,1544,210,1553,218,1549,269,1502,267,1502,250,1511,248" },
                    { id: 7, poly: "1327,481,1423,481,1397,523,1385,530,1343,528,1330,518,1327,502" },
                    { id: 8, poly: "1244,208,1265,203,1285,210,1306,210,1306,249,1250,247,1244,226" },
                    { id: 9, poly: " 793,733,835,740,824,807,786,803,789,758" }

                ]
            },
            {
                id: 8, StartRange: 4000, EndRange: 4500, noOfPlots: 1, name: "4000-4500",
                hoveredColor: "rgb(101, 121, 80)", hoveredColor1: "rgba(102, 177, 41, 0.70)",
                polygons: [
                    { id: 1, poly: "432,540,425,582,434,587,444,584,455,584,500,592,500,549,488,543,481,535,472,542" },

                ]
            },

            {
                id: 9, StartRange: 4500, EndRange: 5000, noOfPlots: 4, name: "4500-5000",
                hoveredColor: "rgb(101, 114, 157)", hoveredColor1: "rgba(75, 115, 236, 0.70)",
                polygons: [
                    { id: 1, poly: "465,335,485,322,514,333,513,371,506,408,457,398,465,370,467,350" },
                    { id: 2, poly: "715,311,734,374,787,352,775,332,756,316,736,311" },
                    { id: 3, poly: "904,223,929,283,984,261,971,216,946,214,925,217" },
                    { id: 4, poly: "832,760,825,805,842,803,855,805,878,805,891,805,917,809,919,771" }
                ]
            },
            {
                id: 10, StartRange: 5001, EndRange: 5001, noOfPlots: 1, name: "5000+",
                hoveredColor: "rgb(156, 141, 119)", hoveredColor1: "rgba(185, 121, 37, 0.70)",
                polygons: [
                    { id: 1, poly: "852,290,889,299,929,285,907,229,884,236,866,248,852,269" }

                ]
            }




        ]
        , []);

    // 1. Establish Range States for both Lower and Upper bounds
    const [minSqFt, setMinSqFt] = useState<number>(1450);
    const [maxSqFt, setMaxSqFt] = useState<number>(5001);

    const ABSOLUTE_MIN = 1450;
    const ABSOLUTE_MAX = 5001;
    const totalRange = ABSOLUTE_MAX - ABSOLUTE_MIN;

    // Calculate percentage coordinates for the track styling and floating value positioning
    const minPercent = ((minSqFt - ABSOLUTE_MIN) / totalRange) * 100;
    const maxPercent = ((maxSqFt - ABSOLUTE_MIN) / totalRange) * 100;

    // const totalPlots = useMemo(() => filterByRange.reduce((acc, curr) => acc + curr.noOfPlots, 0), [filterByRange]);

    const totalPlots = useMemo(() => {
        return filterByRange.reduce((acc, curr) => {
            // Evaluate if this specific row category is hidden/disabled by the slider bounds
            const isRowDisabledBySlider = curr.StartRange > maxSqFt || curr.EndRange < minSqFt;

            // Only add to total if it falls between the active handles
            return isRowDisabledBySlider ? acc : acc + curr.noOfPlots;
        }, 0);
    }, [filterByRange, minSqFt, maxSqFt]); // Rememoize whenever filters shift


    // 1. Setup a state to detect if the screen is mobile/tablet
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
            // 1024px is standard Tailwind 'lg' breakpoint (Laptops and up)
            setIsMobileOrTablet(window.innerWidth < 1024);
            requestAnimationFrame(centerScroll);
        };

        // Run on mount
        handleResize();
        requestAnimationFrame(centerScroll);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 2. Determine the aspect ratio string dynamically
    const aspectStyle = isMobileOrTablet ? "xMidYMid meet" : "none";




    // Handle Range Adjustments safely ensuring handles don't cross over
    // const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.min(Number(e.target.value), maxSqFt - 100); // 100 sqft buffer
    //     setMinSqFt(value);
    //     setSqYdRange(value);
    // };

    // const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.max(Number(e.target.value), minSqFt + 100);
    //     setMaxSqFt(value);
    //     setSqYdRange(value);
    // };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Reduce the buffer to 10 so handles can get much closer together near 5000+
        const value = Math.min(Number(e.target.value), maxSqFt);
        setMinSqFt(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minSqFt + 10);
        setMaxSqFt(value);
    };




    return (
        <div
            className="relative w-screen h-screen overflow-hidden"
            style={{ background: "linear-gradient(180deg, #BFC18D 0%, #9BA06E 100%)" }}
        >

            {/* Left Navbar Placement */}
            <div className="absolute top-[53%] lg:top-[55%] left-[6%] z-[999] -translate-y-1/2 -translate-x-1/2">
                <LeftNavbar />
            </div>
            {/* ================= SIDEBAR LEGEND PANEL ================= */}
            <div className="absolute top-[53%] md:top-[53%] lg:top-[55%] right-[1%] z-[999] -translate-y-1/2 w-[100px] md:w-[150px] lg:w-[250px] font-sans select-none">
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
                            <span>1450</span>

                            {/* Clean Centered Highlight Badge */}
                            <h2 className="text-[6px] md:text-[9px] lg:text-[14px] font-medium tracking-wide text-[#ffcf66] font-mono normal-case">
                                {/* {minSqFt}-{maxSqFt} */}
                                {minSqFt} - {maxSqFt > 5000 ? "5000+" : maxSqFt}

                                <span className="text-[4px] md:text-[6px] lg:text-[10px] text-[#a19e95]/80 font-sans"></span>
                            </h2>

                            {/* Right Anchor */}
                            <span>5000+</span>

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
                                // className="absolute w-full h-full appearance-none pointer-events-none bg-transparent outline-none z-20 dual-range-input"
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
                    {/* Main Grid Table Container */}
                    <div className="rounded-lg lg:rounded-2xl border border-[#434638] bg-[#2a2c23]/95 overflow-hidden shadow-inner">

                        {/* Metadata Table Header */}
                        <div className="grid grid-cols-12 text-[5px] md:text-[7px] lg:text-[10px] font-medium 
                        text-[#c4cbb7] border-b border-[#434638] bg-[#23251e]/50 py-1 md:py-2 lg:py-3 text-center items-center">
                            <div className="col-span-3 border-r border-[#434638] h-full flex items-center justify-center">Type</div>
                            <div className="col-span-6 border-r border-[#434638] px-1 leading-tight">
                                Area range of plots<br />
                                <span className="text-[5px] md:text-[8px] lg:text-[9px] opacity-70 font-mono">Area in SQ FT</span>
                            </div>
                            <div className="col-span-3">No of Plots</div>
                        </div>

                        {/* Dynamic Sidebar Items List divide-[#434638]*/}
                        <div className="max-h-[50px] md:max-h-[140px] lg:max-h-[290px] overflow-y-auto split-rows divide-y divide-white/10 ">
                            {filterByRange.map((row) => {
                                // const isRowDisabledBySlider = row.StartRange > sqYdRange;
                                const isRowDisabledBySlider = row.StartRange > maxSqFt || row.EndRange < minSqFt;
                                return (
                                    <div
                                        key={row.id}
                                        onMouseEnter={() => !isRowDisabledBySlider && setActiveRangeId(row.id)}
                                        onMouseLeave={() => !isRowDisabledBySlider && setActiveRangeId(null)}
                                        className={`grid grid-cols-12 items-center text-xs transition-all duration-150
                                             text-center py-1
                                ${isRowDisabledBySlider
                                                ? "opacity-90 pointer-events-none bg-black/30 text-gray-500"
                                                : activeRangeId === row.id
                                                    ? "bg-[#3e4235] text-white font-semibold"
                                                    : "bg-transparent text-[#e0e4d7] hover:bg-[#34372c]/50"
                                            }`}
                                    >
                                        {/* Dynamic Color Swatch Indicator */}
                                        <div className="col-span-3 border-r border-[#434638] flex justify-center
                                         items-center h-full">
                                            <div
                                                className={`w-2 md:w-3 h-1 md:h-2 lg:w-6 lg:h-3 rounded-full 
                                                    shadow-inner border border-black/20 ${isRowDisabledBySlider ? "grayscale opacity-50" : ""}`}
                                                style={{ backgroundColor: row.hoveredColor || '#7d755a' }}
                                            />
                                        </div>

                                        {/* Range Labels */}
                                        <div className="col-span-6 border-r border-[#434638] font-mono
                                         text-[5px] md:text-[8px] lg:text-[10px] tracking-wide py-0.5">
                                            {row.name}
                                        </div>

                                        {/* Quantity Value */}
                                        <div className="col-span-3 font-mono  text-[5px] md:text-[8px] lg:text-[10px] text-[#cbd0c2]">
                                            {row.noOfPlots}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>



                    </div>

                    {/* Premium Summary Footer Row */}
                    <div className="grid grid-cols-12 rounded-full items-center 
                    bg-gradient-to-r from-[#110a05] via-[#4a3112] to-[#8c5d23]  mt-1 lg:mt-3 mb-1 lg:mb-3 py-0 lg:py-[1px]  font-semibold uppercase tracking-wider text-[#e3dac9] shadow-inner">
                        {/* Left text aligned neatly inside the pill capsule */}
                        <div className="col-span-4 text-left pl-4 font-bold tracking-widest text-[5px] md:text-[7px] lg:text-[8px] text-[#cfc4b2]">
                            TOTAL
                        </div>

                        <div className="col-span-4"></div>

                        {/* Right total number aligned neatly inside the pill capsule */}
                        <div className="col-span-4 text-right pr-4 font-mono text-[#ecd4a7] font-bold text-[5px] md:text-[9px] lg:text-[10px]">
                            {totalPlots}
                        </div>
                    </div>
                </div>
            </div>
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

                    {/* Base Image Layout Floorplan */}
                    <img
                        src={bgImage}
                        alt="Layout Blueprint"
                        className="absolute inset-0 w-full h-full object-contain lg:object-fill"
                    />
                    {/* ================= VECTOR OVERLAY LAYER ================= */}
                    <svg
                        className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                        viewBox="0 0 1982 1024"
                        // preserveAspectRatio="none"
                        // preserveAspectRatio="xMidYMid meet"
                        preserveAspectRatio={aspectStyle}
                    >
                        {/* <image
                    href={bgImage}
                    width="100%"
                    height="100%"
                    // preserveAspectRatio="xMidYMid meet"
                    preserveAspectRatio={aspectStyle}
                /> */}
                        {/* ========================================== */}
                        {/* POLYGON RENDERING LAYER                     */}
                        {/* ========================================== */}
                        {filterByRange.map((rangeRow) => {
                            // const isGroupOutofSliderRange = rangeRow.StartRange > sqYdRange;
                            // const isTargetedGroupHovered = activeRangeId === rangeRow.id;
                            // const isAnySidebarRowHovered = activeRangeId !== null;
                            // const isRowDisabledBySlider = rangeRow.StartRange > sqYdRange;
                            const isGroupOutofSliderRange = rangeRow.StartRange > maxSqFt || rangeRow.EndRange < minSqFt;
                            const isRowDisabledBySlider = rangeRow.StartRange > maxSqFt || rangeRow.EndRange < minSqFt;

                            const isTargetedGroupHovered = activeRangeId === rangeRow.id;
                            const isAnySidebarRowHovered = activeRangeId !== null;
                            return rangeRow.polygons.map((plot) => (
                                <polygon
                                    key={`plot-${rangeRow.id}-${plot.id}`}
                                    points={plot.poly}
                                    className="transition-all duration-300 pointer-events-auto cursor-pointer"
                                    onMouseEnter={() => !isRowDisabledBySlider && setActiveRangeId(rangeRow.id)}
                                    onMouseLeave={() => !isRowDisabledBySlider && setActiveRangeId(null)}
                                    // Color Fill Logic
                                    fill={
                                        isGroupOutofSliderRange
                                            ? "#1a1a1a" // Out of range: Muted dead gray
                                            : isTargetedGroupHovered
                                                ? rangeRow.hoveredColor1 // Hovered target: Your vibrant custom highlight color
                                                : isAnySidebarRowHovered
                                                    ? "#1a1a1a" // Remaining plots: Deep, frosted dark gray overlay
                                                    : "transparent" // Default baseline state
                                    }

                                    // Opacity Handling
                                    fillOpacity={
                                        isGroupOutofSliderRange
                                            ? 0.80
                                            : isTargetedGroupHovered
                                                ? 0.95 // Keep highlighted item beautifully rich and visible
                                                : isAnySidebarRowHovered
                                                    ? 0   // Full alpha blending control handled by the rgba string above
                                                    : 0
                                    }

                                    // Sharp Borders for the Highlighted Target
                                    // stroke={isTargetedGroupHovered && !isGroupOutofSliderRange ? "#ffffff" : "transparent"}
                                    // strokeWidth={isTargetedGroupHovered && !isGroupOutofSliderRange ? "2" : "0"}
                                    strokeLinejoin="round"

                                    // Inline Styling for Filters & Blending
                                    style={{
                                        filter: isGroupOutofSliderRange
                                            ? "grayscale(0.95) contrast(0.75)"
                                            : "none",

                                        // Creates a seamless contrast mask over all unselected plots 
                                        // pulling the user's focus straight to the highlighted item
                                        mixBlendMode: isAnySidebarRowHovered && !isTargetedGroupHovered ? "multiply" : "normal"
                                    }}
                                />
                            ));
                        })}
                    </svg>




                    {/* 
            <AnimatePresence>
                {plotData.map((item: any, index: number) => { // Added index to map arguments
                    // If you want to sync it with your map polygons, keep your conditional filter rule active here:
                    // if (hoveredId !== item.id) return null;

                    const [cx, cy] = item.circle.split(",").map(Number);
                    const isThisTooltipHovered = hoveredTooltipId === item.id;

                    return (
                        <motion.div
                            key={`tooltip-${item.id}`}
                            onMouseEnter={() => setHoveredTooltipId(item.id)}
                            onMouseLeave={() => setHoveredTooltipId(null)}
                            onClick={() => navigate(`${item.path}`)}

                            // --- FRAMER MOTION POPUP ANIMATION CONFIG ENGINE ---
                            initial={{ opacity: 0, scale: 0.75, x: "-50%", y: "-60%" }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
                            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-85%" }}
                            transition={{
                                type: "tween",
                                // Custom luxury back-overshoot curve matching your CSS signature look
                                ease: [0.34, 1.56, 0.64, 1],
                                duration: 0.65,
                                // Creates the staggered wave effect when the tooltips mount onto the layout!
                                // delay: index * 0.12
                                delay: 0.5 + (index * 0.12)
                            }}
                            // ---------------------------------------------------

                            className="absolute pointer-events-auto flex flex-col items-center"
                            style={{
                                left: `${(cx / 1982) * 100}%`,
                                top: `${(cy /  1024) * 100}%`,
                                marginTop: "-15px",
                                // marginTop: aspectStyle === "xMidYMid meet" ? "-15px" : "-60px",
                                transformOrigin: "bottom center", // Ensures the spring pops upwards directly from the arrow tip point
                            }}
                        >
                           
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
                                    {item.name}
                                </span>
                            </div>

                        
                            <div className="w-[32px] h-[12px] -mt-[1px] overflow-hidden flex justify-center">
                                <svg
                                    width="32"
                                    height="12"
                                    viewBox="0 0 32 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-all duration-300"
                                >
                                    <path
                                        d="M0 0 H32 L20.5 8.25 C18.0 10.25 14.0 10.25 11.5 8.25 L0 0 Z"
                                        fill={isThisTooltipHovered ? "rgb(169, 128, 87)" : "rgba(244, 237, 217, 0.45)"}
                                        stroke={isThisTooltipHovered ? "rgba(255,255,255,0.7)" : "rgba(255, 255, 255, 0.4)"}
                                        strokeWidth="1.2"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence> */}




                    <AnimatePresence>

                        {plotData.map((item: any, index: number) => {
                            // 1. Destructure and parse the 4 bounding box coordinates from the string
                            const [x1, y1, x2, y2] = item.rect.split(",").map(Number);

                            // 2. Compute the precise midpoint horizontally (rx) and vertically (ry)
                            const rx = (x1 + x2) / 2;
                            const ry = (y1 + y2) / 2;

                            const isThisTooltipHovered = hoveredTooltipId === item.id;

                            return (
                                <motion.div
                                    key={`tooltip-${item.id}`}
                                    onMouseEnter={() => setHoveredTooltipId(item.id)}
                                    onMouseLeave={() => setHoveredTooltipId(null)}
                                    onClick={() => navigate(`${item.path}`)}

                                    initial={{ opacity: 0, scale: 0.75, x: "-50%", y: "-40%" }}
                                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "0%" }}
                                    exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-15%" }}
                                    transition={{
                                        type: "tween",
                                        ease: [0.34, 1.56, 0.64, 1],
                                        duration: 0.65,
                                        delay: 0.5 + (index * 0.12)
                                    }}

                                    className="absolute pointer-events-auto flex flex-col items-center cursor-pointer"
                                    style={{
                                        // 3. Map the computed center point relative to your layout grid (1982x1024)
                                        left: `${(rx / 1982) * 100}%`,
                                        top: `${(ry / 1024) * 100}%`,
                                        marginTop: "15px",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    {/* Smooth Curved Glassmorphism Pointer Arrow (Pointing Up) */}
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
                                            className="text-[5px] md:text-[9px] lg:text-[13px] font-bold tracking-wider font-sans uppercase transition-colors duration-300"
                                            style={{
                                                color: isThisTooltipHovered ? "#FFFFFF" : "#4a3b2c",
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence></div></div>
        </div>
    );
}