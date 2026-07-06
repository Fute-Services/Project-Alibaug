import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../assets/project_details/coral_bay.webp";
import miniMapImage from "../../assets/project_details/Project Details.webp";
import html2canvas from "html2canvas";
// import logo from "../../assets/Home/Frame 29.webp";
import compassImage from "../../assets/Amenities/compass.png";
import backIcon from "../../assets/back butten.png";

import plot1 from "../../assets/project_details/coral bay/1.png";
import plot2 from "../../assets/project_details/coral bay/2.png";
import plot3 from "../../assets/project_details/coral bay/3.png";
import plot4 from "../../assets/project_details/coral bay/4.png";
import plot5 from "../../assets/project_details/coral bay/5.png";
import plot6 from "../../assets/project_details/coral bay/6.webp";
import plot7 from "../../assets/project_details/coral bay/7.png";
import plot8 from "../../assets/project_details/coral bay/8.png";
import plot9 from "../../assets/project_details/coral bay/9.png";
import plot10 from "../../assets/project_details/coral bay/10.png";
import plot11 from "../../assets/project_details/coral bay/11.png";
import plot12 from "../../assets/project_details/coral bay/12.png";
import plot13 from "../../assets/project_details/coral bay/13.png";
import plot14 from "../../assets/project_details/coral bay/14.png";
import plot15 from "../../assets/project_details/coral bay/15.png";
import plot16 from "../../assets/project_details/coral bay/16.png";
import plot17 from "../../assets/project_details/coral bay/17.png";
import plot18 from "../../assets/project_details/coral bay/18.webp";
import plot19 from "../../assets/project_details/coral bay/19.webp";
import plot20 from "../../assets/project_details/coral bay/20.webp";
import plot21 from "../../assets/project_details/coral bay/21.webp";
import plot22 from "../../assets/project_details/coral bay/22.png";
import plot23 from "../../assets/project_details/coral bay/23.png";
import plot24 from "../../assets/project_details/coral bay/24.webp";
import plot25 from "../../assets/project_details/coral bay/25.png";
import plot26 from "../../assets/project_details/coral bay/26.png";
import plot27 from "../../assets/project_details/coral bay/27.png";
import plot28 from "../../assets/project_details/coral bay/28.png";
import plot29 from "../../assets/project_details/coral bay/29.webp";
import plot30 from "../../assets/project_details/coral bay/30.png";
import plot31 from "../../assets/project_details/coral bay/31.png";
import plot32 from "../../assets/project_details/coral bay/32.png";
import plot33 from "../../assets/project_details/coral bay/33.png";
import plot34 from "../../assets/project_details/coral bay/34.png";
import plot35 from "../../assets/project_details/coral bay/35.png";
import plot36 from "../../assets/project_details/coral bay/36.png";
import plot37 from "../../assets/project_details/coral bay/37.png";
import plot38 from "../../assets/project_details/coral bay/38.png";
import plot39 from "../../assets/project_details/coral bay/39.png";
import plot40 from "../../assets/project_details/coral bay/40.png";
import plot41 from "../../assets/project_details/coral bay/41.png";
import plot42 from "../../assets/project_details/coral bay/42.webp";
import plot43 from "../../assets/project_details/coral bay/43.png";
import plot44 from "../../assets/project_details/coral bay/44.png";
import plot45 from "../../assets/project_details/coral bay/45.png";
import plot46 from "../../assets/project_details/coral bay/46.png";
import plot47 from "../../assets/project_details/coral bay/47.png";
import plot48 from "../../assets/project_details/coral bay/48.png";
import plot49 from "../../assets/project_details/coral bay/49.png";
import plot50 from "../../assets/project_details/coral bay/50.png";
import plot51 from "../../assets/project_details/coral bay/51.png";
import plot52 from "../../assets/project_details/coral bay/52.png";
import plot53 from "../../assets/project_details/coral bay/53.png";
import plot54 from "../../assets/project_details/coral bay/54.png";
import plot55 from "../../assets/project_details/coral bay/55.png";
import plot56 from "../../assets/project_details/coral bay/56.png";
import plot57 from "../../assets/project_details/coral bay/57.png";
import plot58 from "../../assets/project_details/coral bay/58.png";
import plot59 from "../../assets/project_details/coral bay/59.png";
import plot60 from "../../assets/project_details/coral bay/60.png";
import plot61 from "../../assets/project_details/coral bay/61.webp";
import plot62 from "../../assets/project_details/coral bay/62.webp";
import plot63 from "../../assets/project_details/coral bay/63.webp";
import plot64 from "../../assets/project_details/coral bay/64.png";
import plot65 from "../../assets/project_details/coral bay/65.png";
import plot66 from "../../assets/project_details/coral bay/66.png";
import plot67 from "../../assets/project_details/coral bay/67.png";
import plot68 from "../../assets/project_details/coral bay/68.png";
import plot69 from "../../assets/project_details/coral bay/69.png";
import plot70 from "../../assets/project_details/coral bay/70.png";

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
    22: plot22,
    23: plot23,
    24: plot24,
    25: plot25,
    26: plot26,
    27: plot27,
    28: plot28,
    29: plot29,
    30: plot30,
    31: plot31,
    32: plot32,
    33: plot33,
    34: plot34,
    35: plot35,
    36: plot36,
    37: plot37,
    38: plot38,
    39: plot39,
    40: plot40,
    41: plot41,
    42: plot42,
    43: plot43,
    44: plot44,
    45: plot45,
    46: plot46,
    47: plot47,
    48: plot48,
    49: plot49,
    50: plot50,
    51: plot51,
    52: plot52,
    53: plot53,
    54: plot54,
    55: plot55,
    56: plot56,
    57: plot57,
    58: plot58,
    59: plot59,
    60: plot60,
    61: plot61,
    62: plot62,
    63: plot63,
    64: plot64,
    65: plot65,
    66: plot66,
    67: plot67,
    68: plot68,
    69: plot69,
    70: plot70,
};

const plotAreas: Record<number, { sqmt: string; sqft: string }> = {
    1: { sqmt: "143.52", sqft: "1,544.84" },
    2: { sqmt: "139.77", sqft: "1,504.48" },
    3: { sqmt: "140.80", sqft: "1,515.57" },
    4: { sqmt: "155.25", sqft: "1,671.11" },
    5: { sqmt: "255.93", sqft: "2,754.83" },
    6: { sqmt: "296.51", sqft: "3,191.63" },
    7: { sqmt: "227.80", sqft: "2,452.03" },
    8: { sqmt: "190.32", sqft: "2,048.60" },
    9: { sqmt: "152.58", sqft: "1,642.37" },
    10: { sqmt: "147.90", sqft: "1,591.99" },
    11: { sqmt: "212.31", sqft: "2,285.30" },
    12: { sqmt: "141.59", sqft: "1,524.07" },
    13: { sqmt: "147.13", sqft: "1,583.70" },
    14: { sqmt: "151.90", sqft: "1,635.05" },
    15: { sqmt: "150.99", sqft: "1,625.25" },
    16: { sqmt: "149.75", sqft: "1,611.90" },
    17: { sqmt: "139.50", sqft: "1,501.57" },
    18: { sqmt: "139.50", sqft: "1,501.57" },
    19: { sqmt: "139.50", sqft: "1,501.57" },
    20: { sqmt: "218.75", sqft: "2,354.62" },
    21: { sqmt: "189.75", sqft: "2,042.46" },
    22: { sqmt: "138.75", sqft: "1,493.50" },
    23: { sqmt: "258.29", sqft: "2,780.23" },
    24: { sqmt: "203.45", sqft: "2,189.93" },
    25: { sqmt: "145.06", sqft: "1,561.42" },
    26: { sqmt: "145.79", sqft: "1,569.28" },
    27: { sqmt: "145.85", sqft: "1,569.92" },
    28: { sqmt: "143.83", sqft: "1,548.18" },
    29: { sqmt: "139.28", sqft: "1,499.20" },
    30: { sqmt: "138.82", sqft: "1,494.25" },
    31: { sqmt: "138.67", sqft: "1,492.64" },
    32: { sqmt: "139.25", sqft: "1,498.88" },
    33: { sqmt: "329.92", sqft: "3,551.25" },
    34: { sqmt: "269.99", sqft: "2,906.17" },
    35: { sqmt: "273.92", sqft: "2,948.47" },
    36: { sqmt: "275.91", sqft: "2,969.89" },
    37: { sqmt: "276.99", sqft: "2,981.52" },
    38: { sqmt: "341.24", sqft: "3,673.10" },
    39: { sqmt: "150.96", sqft: "1,624.93" },
    40: { sqmt: "150.79", sqft: "1,623.10" },
    41: { sqmt: "151.46", sqft: "1,630.31" },
    42: { sqmt: "161.30", sqft: "1,736.23" },
    43: { sqmt: "167.76", sqft: "1,805.76" },
    44: { sqmt: "163.91", sqft: "1,764.32" },
    45: { sqmt: "163.70", sqft: "1,762.06" },
    46: { sqmt: "161.82", sqft: "1,741.83" },
    47: { sqmt: "151.60", sqft: "1,631.82" },
    48: { sqmt: "277.54", sqft: "2,987.44" },
    49: { sqmt: "193.78", sqft: "2,085.84" },
    50: { sqmt: "253.13", sqft: "2,724.69" },
    51: { sqmt: "143.04", sqft: "1,539.68" },
    52: { sqmt: "208.34", sqft: "2,242.57" },
    53: { sqmt: "139.49", sqft: "1,501.47" },
    54: { sqmt: "139.50", sqft: "1,501.57" },
    55: { sqmt: "139.56", sqft: "1,502.22" },
    56: { sqmt: "207.70", sqft: "2,235.68" },
    57: { sqmt: "146.69", sqft: "1,578.97" },
    58: { sqmt: "141.51", sqft: "1,523.21" },
    59: { sqmt: "367.66", sqft: "3,957.49" },
    60: { sqmt: "287.29", sqft: "3,092.38" },
    61: { sqmt: "151.13", sqft: "1,626.76" },
    62: { sqmt: "155.67", sqft: "1,675.63" },
    63: { sqmt: "148.06", sqft: "1,593.71" },
    64: { sqmt: "144.34", sqft: "1,553.67" },
    65: { sqmt: "181.79", sqft: "1,956.78" },
    66: { sqmt: "179.43", sqft: "1,931.38" },
    67: { sqmt: "180.45", sqft: "1,942.36" },
    68: { sqmt: "204.34", sqft: "2,199.51" },
    69: { sqmt: "138.97", sqft: "1,495.87" },
    70: { sqmt: "139.37", sqft: "1,500.17" },
};

export default function Coral_bay() {
    const navigate = useNavigate();

    const [activeRangeId, setActiveRangeId] = useState<number | null>(null);


    // Hover states for the four park areas
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

    // Ranges data representing the 70 plots grouped by size
    const filterByRange = useMemo(
        () => [
            {
                id: 1,
                StartRange: 1450,
                EndRange: 1500,
                noOfPlots: 6,
                name: "1450-1500",
                hoveredColor: "rgb(229, 209, 162)",
                hoveredColor1: "rgba(240, 175, 25, 0.90)",
                polygons: [
                    { id: 22, poly: "810,574,833,565,841,613,817,612", name: "plot22" },
                    { id: 29, poly: "847,369,883,367,883,343,843,343", name: "plot29" },
                    { id: 30, poly: "845,344,843,318,883,316,885,342", name: "plot30" },
                    { id: 31, poly: "880,316,880,291,843,291,845,316", name: "plot31" },
                    { id: 32, poly: "880,288,880,265,840,263,843,288", name: "plot32" },
                    { id: 69, poly: "952,360,952,335,908,337,908,363", name: "plot69" },




                ],
            },
            {
                id: 2,
                StartRange: 1500,
                EndRange: 1750,
                noOfPlots: 35,
                name: "1500-1750",
                hoveredColor: "rgb(148, 186, 175)",
                hoveredColor1: "rgba(64, 223, 183, 0.50)",
                polygons: [
                    // Skeletons for 35 plots (user can fill/add more as needed)
                    { id: 1, poly: "990,619,1004,592,1041,617,1032,638", name: "plot1" },
                    { id: 2, poly: "990,619,978,643,1015,661,1029,638", name: "plot2" },
                    { id: 3, poly: "978,643,966,666,1006,683,1015,662", name: "plot3" },
                    { id: 4, poly: "966,666,955,690,999,710,1008,685", name: "plot4" },
                    { id: 9, poly: "855,781,831,801,859,829,883,818", name: "plot9" },
                    { id: 10, poly: "833,798,810,821,841,849,864,835", name: "plot10" },

                    { id: 12, poly: "752,847,756,821,715,819,712,845", name: "plot12" },
                    { id: 13, poly: "754,821,759,794,722,793,715,819", name: "plot13" },
                    { id: 14, poly: "757,795,761,765,722,764,712,795", name: "plot14" },
                    { id: 15, poly: "761,767,764,737,719,734,719,760", name: "plot15" },
                    { id: 16, poly: "761,737,768,712,726,703,724,731", name: "plot16" },
                    { id: 17, poly: "766,712,770,685,729,675,729,703", name: "plot17" },
                    { id: 18, poly: "768,684,775,659,733,650,729,675", name: "plot18" },
                    { id: 19, poly: "782,635,743,624,735,649,775,657", name: "plot19" },
                    { id: 25, poly: "852,482,847,454,887,451,890,477", name: "plot25" },
                    { id: 26, poly: "889,451,887,423,845,426,848,451", name: "plot26" },
                    { id: 27, poly: "887,425,887,397,840,398,847,425", name: "plot27" },
                    { id: 28, poly: "885,395,883,368,845,368,845,395", name: "plot28" },
                    { id: 39, poly: "1080,310,1080,284,1118,286,1118,312", name: "plot39" },
                    { id: 40, poly: "1076,312,1076,334,1118,336,1118,312", name: "plot40" },
                    { id: 41, poly: "1076,334,1073,362,1115,364,1120,336", name: "plot41" },
                    { id: 42, poly: "1071,362,1071,386,1116,397,1118,363", name: "plot42" },
                    { id: 46, poly: "1092,486,1046,463,1034,482,1073,507", name: "plot46" },
                    { id: 47, poly: "1034,482,1020,501,1055,522,1069,508", name: "plot47" },
                    { id: 51, poly: "908,645,892,664,929,681,945,660", name: "plot51" },
                    { id: 53, poly: "866,681,845,696,873,731,894,714", name: "plot53" },
                    { id: 54, poly: "848,705,827,720,854,748,873,731", name: "plot54" },
                    { id: 55, poly: "829,722,806,736,833,764,859,748", name: "plot55" },
                    { id: 57, poly: "915,457,913,427,957,427,959,454", name: "plot57" },
                    { id: 58, poly: "913,455,915,478,957,476,957,452", name: "plot58" },
                    { id: 61, poly: "985,436,994,411,1034,425,1020,451", name: "plot61" },
                    { id: 62, poly: "1034,425,1046,395,1003,384,996,409", name: "plot62" },
                    { id: 63, poly: "1043,396,1048,363,1008,361,1006,381", name: "plot63" },
                    { id: 64, poly: "1010,363,1006,336,1048,336,1048,361", name: "plot64" },
                    { id: 70, poly: "911,387,908,363,952,363,952,387", name: "plot70" }


                ],
            },
            {
                id: 3,
                StartRange: 1750,
                EndRange: 2000,
                noOfPlots: 6,
                name: "1750-2000",
                hoveredColor: "rgb(124, 118, 130)",
                hoveredColor1: "rgba(118, 68, 218, 0.80)",
                polygons: [
                    { id: 43, poly: "1071,386,1066,415,1108,427,1113,395", name: "plot43" },
                    { id: 44, poly: "1066,416,1059,439,1097,453,1106,429", name: "plot44" },
                    { id: 45, poly: "1057,440,1046,463,1085,479,1101,456", name: "plot45" },
                    { id: 65, poly: "1015,333,1015,294,1043,293,1050,301,1050,335", name: "plot65" },
                    { id: 66, poly: "1015,333,980,333,982,294,1017,294", name: "plot66" },
                    { id: 67, poly: "945,291,947,333,980,333,982,292", name: "plot67" }
                ],
            },
            {
                id: 4,
                StartRange: 2000,
                EndRange: 2500,
                noOfPlots: 10,
                name: "2000-2500",
                hoveredColor: "rgb(195, 202, 204)",
                hoveredColor1: "rgba(247, 248, 248, 0.70)",
                polygons: [
                    { id: 7, poly: "854,785,887,817,948,771,915,734", name: "plot7" },
                    { id: 8, poly: "882,760,857,783,883,815,915,794", name: "plot8" },
                    { id: 11, poly: "810,821,780,853,812,877,841,849", name: "plot11" },
                    { id: 20, poly: "778,632,791,620,752,571,740,621", name: "plot20" },
                    { id: 21, poly: "791,619,819,614,810,576,761,579", name: "plot21" },
                    { id: 24, poly: "852,516,852,481,887,481,890,508,887,516,876,523", name: "plot24" },
                    { id: 49, poly: "954,630,968,609,913,583,897,602", name: "plot49" },
                    { id: 52, poly: "931,682,896,716,868,684,892,663", name: "plot52" },
                    { id: 56, poly: "806,738,785,743,785,783,803,794,834,769", name: "plot56" },
                    { id: 68, poly: "947,332,945,292,913,292,906,302,908,336", name: "plot68" },

                ],
            },
            {
                id: 5,
                StartRange: 2500,
                EndRange: 3000,
                noOfPlots: 8,
                name: "2500-3000",
                hoveredColor: "rgb(182, 148, 148)",
                hoveredColor1: "rgba(223, 121, 151, 0.7)",
                polygons: [
                    { id: 5, poly: "954,692,938,711,989,758,999,713", name: "plot5" },
                    { id: 23, poly: "843,612,834,568,855,550,876,554,885,565,887,577,878,593", name: "plot23" },
                    { id: 34, poly: "897,264,896,229,945,231,943,266", name: "plot34" },
                    { id: 35, poly: "947,229,945,266,992,266,996,228", name: "plot35" },
                    { id: 36, poly: "992,267,1039,269,1038,225,996,225", name: "plot36" },
                    { id: 37, poly: "1038,264,1039,227,1083,229,1083,265", name: "plot37" },
                    { id: 48, poly: "915,583,922,557,943,557,973,559,980,573,966,608", name: "plot48" },
                    { id: 50, poly: "899,605,876,626,940,656,957,633", name: "plot50" }



                ],
            },
            {
                id: 6,
                StartRange: 3000,
                EndRange: 3500,
                noOfPlots: 2,
                name: "3000-3500",
                hoveredColor: "rgb(140, 178, 199)",
                hoveredColor1: "rgba(64, 172, 226, 0.70)",
                polygons: [
                    { id: 6, poly: "940,711,917,732,955,777,989,760", name: "plot6" },
                    { id: 60, poly: "957,476,957,427,1020,453,1004,481", name: "plot60" }
                ],
            },
            {
                id: 7,
                StartRange: 3500,
                EndRange: 4000,
                noOfPlots: 3,
                name: "3500-4000",
                hoveredColor: "rgb(167, 200, 114)",
                hoveredColor1: "rgba(152, 223, 70, 0.70)",
                polygons: [
                    { id: 33, poly: "897,262,843,262,836,227,894,220", name: "plot33" },

                    { id: 38, poly: "1085,231,1080,284,1116,286,1118,231", name: "plot38" },
                    { id: 59, poly: "917,483,1003,482,982,518,961,524,920,520", name: "plot59" }
                ],
            },
        ],
        []
    );
    // 1. Establish Range States for both Lower and Upper bounds
    const [minSqFt, setMinSqFt] = useState<number>(1450);
    const [maxSqFt, setMaxSqFt] = useState<number>(4000);

    const ABSOLUTE_MIN = 1450;
    const ABSOLUTE_MAX = 4000;
    const totalRange = ABSOLUTE_MAX - ABSOLUTE_MIN;

    // Calculate percentage coordinates for the track styling and floating value positioning
    const minPercent = ((minSqFt - ABSOLUTE_MIN) / totalRange) * 100;
    const maxPercent = ((maxSqFt - ABSOLUTE_MIN) / totalRange) * 100;

    // const totalPlots = useMemo(
    //     () => filterByRange.reduce((acc, curr) => acc + curr.noOfPlots, 0),
    //     [filterByRange]
    // );

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



    // Handle Range Adjustments safely ensuring handles don't cross over
    // const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.min(Number(e.target.value), maxSqFt ); // 100 sqft buffer
    //     setMinSqFt(value);
    //     setSqYdRange(value);
    // };

    // const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Math.max(Number(e.target.value), minSqFt );
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
        <div ref={scrollRef} className="relative w-screen h-screen overflow-x-auto overflow-y-hidden lg:overflow-hidden bg-[#161713] flex items-center justify-start lg:justify-center font-sans select-none z-[1000] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative h-full aspect-[1982/1024] shrink-0 lg:w-full lg:h-full lg:aspect-auto flex items-center justify-center overflow-hidden">
                {/* Background Blueprint Image */}
                <img
                    src={bgImage}
                    alt="Coral Bay Layout"
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
                        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto top-2 
                         ">
                            <h1
                                className="text-[#644406] text-[10px] md:text-lg lg:text-3xl font-semibold tracking-[0.25em] uppercase drop-shadow-md"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Coral Bay
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
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    01
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Quiet Coastal <br /> Retreat
                                </span>
                            </div>

                            {/* Divider */}
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
                                    Lagoon Court
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] bg-white/10 w-full my-0.5"></div>

                            {/* Park 03 */}
                            <div
                                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 ${hoveredParkId === 3 ? "bg-white/10 border border-[#e2c792]/40" : "bg-transparent border border-transparent"
                                    }`}
                                onMouseEnter={() => setHoveredParkId(3)}
                                onMouseLeave={() => setHoveredParkId(null)}
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    03
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Coast Green
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] bg-white/10 w-full my-0.5"></div>

                            {/* Park 04 */}
                            <div
                                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 ${hoveredParkId === 4 ? "bg-white/10 border border-[#e2c792]/40" : "bg-transparent border border-transparent"
                                    }`}
                                onMouseEnter={() => setHoveredParkId(4)}
                                onMouseLeave={() => setHoveredParkId(null)}
                            >
                                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#df9b2f] text-black font-bold flex items-center justify-center text-[9px] lg:text-[11px] shrink-0 shadow-md">
                                    04
                                </div>
                                <span className="text-[10px] lg:text-[13px] font-semibold text-white leading-tight">
                                    Active Arena
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
                                        {/* {sqYdRange}  */}
                                        {minSqFt} - {maxSqFt}



                                        <span className="text-[4px] md:text-[6px] lg:text-[10px] text-[#a19e95]/80 font-sans"></span>
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
                                    // const isRowDisabled = row.StartRange > sqYdRange;
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
                    {/* Quiet Coastal Retreat (Park 1) */}
                    <polygon
                        points="990,431,1004,387,1006,336,954,333,955,385,910,389,915,431"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(1)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 1 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        strokeLinejoin="round"
                    />

                    {/* Lagoon Court (Park 2) */}
                    <polygon
                        points="787,751,910,647,873,625,822,642,806,642"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(2)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 2 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        strokeLinejoin="round"
                    />

                    {/* Coast Green (Park 3) */}
                    <polygon
                        points="733,910,747,917,764,906,784,892,778,868,759,854,735,850,722,866,743,887"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(3)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 3 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
                        strokeLinejoin="round"
                    />

                    {/* Active Arena (Park 4) */}
                    <polygon
                        points="1059,636,1053,795,1115,797,1116,633"
                        className="transition-all duration-300 pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredParkId(4)}
                        onMouseLeave={() => setHoveredParkId(null)}
                        fill={hoveredParkId === 4 ? "rgba(219, 155, 47, 0.4)" : "transparent"}
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
                                        </div>
                                    )}
                                </div>


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
                                            <span className="text-[#df9b2f] font-bold">CORAL BAY</span>
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
