/**
 * scripts/rename-projects.mjs
 *
 * Walks public/projects/{category}/ and renames image files to a
 * canonical pattern: project-[category-slug]-NN.ext
 *
 * Modes:
 *   node scripts/rename-projects.mjs            → dry-run (prints plan, no writes)
 *   node scripts/rename-projects.mjs --apply    → renames files + writes rename-projects-log.txt
 *
 * Category slug mapping:  see CATEGORY_SLUGS below
 * Prefix is always "project" — no material tier above it.
 */

import { readdirSync, renameSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Configuration ────────────────────────────────────────────────────────────

/** Supported image extensions — compared case-insensitively */
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.bmp']);

/**
 * Maps the folder name under /projects/ to the segment used in the output filename.
 * Add new project types here as the folder tree grows.
 */
const CATEGORY_SLUGS = {
  buildings: 'buildings',
  villas:    'villas',
};

// ── CLI flag ─────────────────────────────────────────────────────────────────

/** --apply actually renames; without it the script is a read-only dry run */
const IS_DRY_RUN = !process.argv.includes('--apply');

// ── Path resolution ───────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
// scripts/ sits one level below the project root
const PROJECT_ROOT = resolve(__dirname, '..');
const PROJECTS_DIR = join(PROJECT_ROOT, 'public', 'projects');
const LOG_PATH     = join(__dirname, 'rename-projects-log.txt');

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns true when ext is a recognised image extension.
 * Comparison is case-insensitive so .JPG and .jpg both match.
 */
function isImage(filename) {
  return IMAGE_EXTS.has(extname(filename).toLowerCase());
}

/**
 * Left-pads n to at least two digits — "1" → "01", "12" → "12".
 * Sequential counters never exceed 99 for a single category folder.
 */
function pad2(n) {
  return String(n).padStart(2, '0');
}

// ── Core walk ────────────────────────────────────────────────────────────────

/**
 * Accumulated log lines keyed by folder path for grouped output.
 * Each value is an array of "old → new" strings.
 */
const logGroups = {};

/**
 * Processes one leaf folder: collects images, sorts alphabetically,
 * builds canonical names, renames (or prints) in sequence.
 *
 * @param {string} folderPath  Absolute path to the category folder
 * @param {string} category    Category subfolder name ("buildings", "villas", etc.)
 */
function processFolder(folderPath, category) {
  const categorySlug = CATEGORY_SLUGS[category];

  if (!categorySlug) {
    console.warn(`  ⚠  Unknown category "${category}" — skipping`);
    return;
  }

  // Read directory and filter to images only; skip .gitkeep, .DS_Store, and other assets
  const allFiles = readdirSync(folderPath);
  const images   = allFiles
    .filter(isImage)
    .sort(); // alphabetical so ordering is deterministic across platforms

  if (images.length === 0) {
    // Empty categories are valid — they'll receive images later
    console.log(`  (empty) ${category}`);
    return;
  }

  const logLines = [];

  images.forEach((filename, index) => {
    const ext     = extname(filename).toLowerCase();
    const counter = pad2(index + 1); // 1-based: first image is "01"
    // Prefix is always "project" — no material tier for projects
    const newName = `project-${categorySlug}-${counter}${ext}`;

    const oldPath = join(folderPath, filename);
    const newPath = join(folderPath, newName);

    const logLine = `  ${filename.padEnd(40)} → ${newName}`;

    if (IS_DRY_RUN) {
      console.log(`  [DRY-RUN] ${logLine.trim()}`);
    } else {
      // Skip if old and new names are already identical — avoids ENOENT on re-runs
      if (filename !== newName) {
        renameSync(oldPath, newPath);
      }
      console.log(`  ✓ ${logLine.trim()}`);
    }

    logLines.push(logLine);
  });

  // Group log output by folder path so the log file is easy to audit
  logGroups[category] = logLines;
}

// ── Entry point ───────────────────────────────────────────────────────────────

console.log('');
console.log(IS_DRY_RUN ? '🔍  DRY-RUN mode — pass --apply to rename files' : '✏️   APPLY mode — renaming files');
console.log(`Root: ${PROJECTS_DIR}`);
console.log('');

if (!existsSync(PROJECTS_DIR)) {
  console.error(`❌  projects directory not found at ${PROJECTS_DIR}`);
  process.exit(1);
}

// Walk one level deep — each subfolder is a category; ignore files at the root level
const categoryFolders = readdirSync(PROJECTS_DIR).sort();

for (const category of categoryFolders) {
  const categoryPath = join(PROJECTS_DIR, category);

  // Process only directories; skip stray files at the root level
  try {
    const stat = readdirSync(categoryPath); // throws if not a directory
    void stat;
  } catch {
    continue;
  }

  if (!CATEGORY_SLUGS[category]) {
    console.warn(`⚠  Unrecognised category folder "${category}" — skipping`);
    continue;
  }

  console.log(`📂  ${category}/`);
  processFolder(categoryPath, category);
  console.log('');
}

// ── Write log ────────────────────────────────────────────────────────────────

if (!IS_DRY_RUN) {
  const timestamp = new Date().toISOString();
  const sections  = Object.entries(logGroups).map(([folder, lines]) =>
    [`[${folder}]`, ...lines].join('\n'),
  );

  const logContent = [
    `# Emaar project image rename log`,
    `# Generated: ${timestamp}`,
    '',
    ...sections,
    '',
  ].join('\n');

  writeFileSync(LOG_PATH, logContent, 'utf8');
  console.log(`📝  Rename log written to scripts/rename-projects-log.txt`);
} else {
  console.log('ℹ️   No files changed. Pass --apply to execute renames.');
}
