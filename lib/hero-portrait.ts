import fs from "node:fs";
import path from "node:path";

const PORTRAIT_FILE = "profile_pic.jpeg";

/**
 * Public hero portrait with a cache-busting query param from file mtime.
 * Bump cache when you replace `public/profile_pic.jpeg` without renaming it.
 */
export function getHeroPortraitSrc(): string {
  const filePath = path.join(process.cwd(), "public", PORTRAIT_FILE);
  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `/${PORTRAIT_FILE}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return `/${PORTRAIT_FILE}`;
  }
}
