// Loads the brochure PDF once (bundled pdf.js, no CDN) and caches the parsed
// document + virtual page layout so the Brochure page opens instantly.
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import pdfFile from "../assets/Hiranandani sand brochure Plots.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export interface VirtualPage {
    id: string;
    pdfPageNumber: number;
    isDoubleWidth: boolean;
    half: "left" | "right" | "full";
    width: number;
    height: number;
}

export interface BrochureData {
    pdf: pdfjsLib.PDFDocumentProxy;
    virtualPages: VirtualPage[];
}

export { pdfFile };

let brochurePromise: Promise<BrochureData> | null = null;

export function loadBrochure(): Promise<BrochureData> {
    if (!brochurePromise) {
        brochurePromise = (async () => {
            const pdf = await pdfjsLib.getDocument(pdfFile).promise;

            // Fetch all page dimensions in parallel
            const dims = await Promise.all(
                Array.from({ length: pdf.numPages }, async (_, i) => {
                    const page = await pdf.getPage(i + 1);
                    const viewport = page.getViewport({ scale: 1.0 });
                    return {
                        pageNumber: i + 1,
                        width: viewport.width,
                        height: viewport.height,
                    };
                })
            );

            // Generate virtual pages list (double-width spreads split into halves)
            const pagesList: VirtualPage[] = [];
            for (const { pageNumber, width, height } of dims) {
                const isDouble = width > height * 1.5;

                if (isDouble) {
                    // Left half of spread must start on an odd virtual index to display on the left side
                    if (pagesList.length % 2 === 0) {
                        pagesList.push({
                            id: `filler-${pageNumber}`,
                            pdfPageNumber: -1,
                            isDoubleWidth: false,
                            half: "full",
                            width: height,
                            height: height,
                        });
                    }

                    pagesList.push({
                        id: `pdf-p${pageNumber}-left`,
                        pdfPageNumber: pageNumber,
                        isDoubleWidth: true,
                        half: "left",
                        width: width / 2,
                        height: height,
                    });

                    pagesList.push({
                        id: `pdf-p${pageNumber}-right`,
                        pdfPageNumber: pageNumber,
                        isDoubleWidth: true,
                        half: "right",
                        width: width / 2,
                        height: height,
                    });
                } else {
                    pagesList.push({
                        id: `pdf-p${pageNumber}-full`,
                        pdfPageNumber: pageNumber,
                        isDoubleWidth: false,
                        half: "full",
                        width: width,
                        height: height,
                    });
                }
            }

            return { pdf, virtualPages: pagesList };
        })();

        // Allow a retry on failure instead of caching the rejection forever
        brochurePromise.catch(() => {
            brochurePromise = null;
        });
    }
    return brochurePromise;
}

// Kick off download + parse in the background without blocking anything
export function preloadBrochure(): void {
    loadBrochure().catch(() => {
        /* silent — Brochure page will surface the error on demand */
    });
}
