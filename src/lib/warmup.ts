// Warms up route chunks and page images in the background after the first
// page has finished loading, so in-app navigation never shows a loading
// flash. Runs in stages (most-visited pages first) with limited concurrency
// so it never competes with what the user is currently looking at.

const routeChunks = [
  () => import("../pages/HomePage"),
  () => import("../pages/IntroPage"),
  () => import("../pages/Amenities"),
  () => import("../pages/Gallery"),
  () => import("../pages/Peoject_info"),
  () => import("../pages/Legacypage"),
  () => import("../pages/projectDetails/ProjectDetails"),
  () => import("../pages/projectDetails/Coral_court"),
  () => import("../pages/projectDetails/Coral_nest"),
  () => import("../pages/projectDetails/Coral_bay"),
  () => import("../pages/Location"),
  () => import("../pages/page360"),
  () => import("../pages/Walkthrough"),
  () => import("../pages/Brochure"),
];

// Stage 1: main navigation backgrounds (home + amenities master plan)
const stage1Images = import.meta.glob(
  [
    "../assets/homepagefinal1.webp",
    "../assets/homepagefinal.webp",
    "../assets/Home/*.webp",
    "../assets/Home/Screen/*.webp",
  ],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Stage 2: amenity detail backgrounds + gallery
const stage2Images = import.meta.glob(
  [
    "../assets/Amenities/*.{webp,png}",
    "../assets/Gallery/*.webp",
    "../assets/back butten.png",
  ],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Stage 3: legacy / project view / location stills
const stage3Images = import.meta.glob(
  [
    "../assets/project view/*.{webp,png}",
    "../assets/project_details/*.webp",
    "../assets/Location/*.webp",
  ],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Stage 4: unit-plan sheets inside the three project detail sections
const stage4Images = import.meta.glob(
  ["../assets/project_details/**/*.{png,webp}"],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Stage 5: page videos (home intro + location map) — fetched fully into the
// HTTP cache so the <video> elements play instantly when their page opens.
const stageVideos = import.meta.glob(
  ["../assets/Home/Screen/*.mp4", "../assets/Location/*.mp4"],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Stage 6: the external 360 tour. Loading it once in an offscreen iframe
// pulls its player JS + first panorama tiles into the browser cache, so the
// /360 page opens near-instantly instead of downloading everything live.
const TOUR_URL =
  "https://futeservices.com/26-27/Hiranadani/Alibaug%20Plots/index.html";

async function prefetchVideos(urls: string[]): Promise<void> {
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      await res.blob();
    } catch {
      /* offline / cancelled — ignore */
    }
  }
}

function prewarmTour(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const iframe = document.createElement("iframe");
    const finish = () => {
      if (settled) return;
      settled = true;
      iframe.remove();
      resolve();
    };
    // Realistic size (offscreen) so the tour loads proper-resolution tiles.
    iframe.style.cssText =
      "position:absolute;left:-100000px;top:0;width:1280px;height:720px;border:0;pointer-events:none;";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    // After the page loads, give the tour time to fetch its player JS and
    // initial panorama, then tear the iframe down — assets stay cached.
    iframe.onload = () => setTimeout(finish, 15000);
    iframe.onerror = finish;
    iframe.src = TOUR_URL;
    document.body.appendChild(iframe);
    setTimeout(finish, 45000); // safety net
  });
}

function preloadImages(urls: string[], concurrency = 4): Promise<void> {
  return new Promise((resolve) => {
    const queue = [...urls];
    let active = 0;

    const next = () => {
      if (queue.length === 0 && active === 0) return resolve();
      while (active < concurrency && queue.length > 0) {
        const url = queue.shift()!;
        active++;
        const img = new Image();
        img.onload = img.onerror = () => {
          active--;
          next();
        };
        img.src = url;
      }
    };
    next();
  });
}

let started = false;

export function startWarmup(): void {
  if (started) return;
  started = true;

  (async () => {
    // Route JS first — it is tiny and removes the Suspense blank flash.
    await Promise.all(routeChunks.map((load) => load().catch(() => {})));
    await preloadImages(Object.values(stage1Images));
    await preloadImages(Object.values(stage2Images));
    await preloadImages(Object.values(stage3Images));
    await preloadImages(Object.values(stage4Images), 3);
    await prefetchVideos(Object.values(stageVideos));
    await prewarmTour();
  })().catch(() => {});
}
