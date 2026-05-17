import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export type StoredProject = {
  id: string;
  title: string;
  meta: string;
  image: string; // data URL or imported asset URL
};

export const PROJECTS_STORAGE_KEY = "solara.projects.v1";

const SEED: StoredProject[] = [
  { id: "seed-1", title: "Banjara Hills Residence", meta: "5 KW · Hyderabad", image: p1 },
  { id: "seed-2", title: "Jubilee Hills Villa", meta: "8 KW · Hyderabad", image: p2 },
  { id: "seed-3", title: "Kondapur Family Home", meta: "3 KW · Hyderabad", image: p3 },
  { id: "seed-4", title: "Gachibowli Penthouse", meta: "10 KW · Hyderabad", image: p4 },
];

export function loadProjects(): StoredProject[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as StoredProject[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED;
  } catch {
    return SEED;
  }
}

export function saveProjects(items: StoredProject[]) {
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("projects:updated"));
}

export function resetProjects() {
  window.localStorage.removeItem(PROJECTS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("projects:updated"));
}

/** Read a File and return a downscaled JPEG data URL to keep localStorage manageable. */
export function fileToCompressedDataUrl(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
