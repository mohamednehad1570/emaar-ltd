/**
 * scripts/rename-products.mjs
 *
 * Walks public/products/{material}/{category}/ and renames image files to a
 * canonical pattern: [material-prefix]-[category-slug]-NN.ext
 *
 * Modes:
 *   node scripts/rename-products.mjs            → dry-run (prints plan, no writes)
 *   node scripts/rename-products.mjs --apply    → renames files + writes rename-log.txt
 *
 * Material prefix mapping:  upvc → "upvc"   |   aluminum → "al"
 * Category slug mapping:    see CATEGORY_SLUGS below
 */

import { readdirSync, renameSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Configuration ────────────────────────────────────────────────────────────

/** Supported image extensions — compared case-insensitively */
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.bmp']);

/** Maps the folder name under /material/ to the segment used in the output filename */
const CATEGORY_SLUGS = {
  windows:           'window',
  doors:             'door',
  'doors-and-windows': 'doors-windows',
  staircases:        'staircase',
  'stained-glass':   'stained-glass',
  sandblast:         'sandblast',
  hebeschibe:        'hebeschibe',
  skylights:         'skylight',
};

/** Maps the top-level material folder to the short prefix used in filenames */
const MATERIAL_PREFIXES = {
  upvc:     'upvc',
  aluminum: 'al',
};

// ── CLI flag ─────────────────────────────────────────────────────────────────

/** --apply actually renames; without it the script is a read-only dry run */
const IS_DRY_RUN = !process.argv.includes('--apply');

// ── Path resolution ───────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
// scripts/ sits one level below the project root
const PROJECT_ROOT = resolve(__dirname, '..');
const PRODUCTS_DIR = join(PROJECT_ROOT, 'public', 'products');
const LOG_PATH     = join(__dirname, 'rename-log.txt');

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
 * @param {string} material    Top-level material name ("upvc" | "aluminum")
 * @param {string} category    Category subfolder name ("windows", "doors", etc.)
 */
function processFolder(folderPath, material, category) {
  const materialPrefix = MATERIAL_PREFIXES[material];
  const categorySlug   = CATEGORY_SLUGS[category];

  if (!materialPrefix) {
    console.warn(`  ⚠  Unknown material "${material}" — skipping`);
    return;
  }
  if (!categorySlug) {
    console.warn(`  ⚠  Unknown category "${category}" — skipping`);
    return;
  }

  // Read directory and filter to images only; skip .gitkeep and other assets
  const allFiles = readdirSync(folderPath);
  const images   = allFiles
    .filter(isImage)
    .sort(); // alphabetical so ordering is deterministic across platforms

  if (images.length === 0) {
    // Empty categories are valid — they'll receive images later
    console.log(`  (empty) ${material}/${category}`);
    return;
  }

  const logLines = [];

  images.forEach((filename, index) => {
    const ext     = extname(filename).toLowerCase();
    const counter = pad2(index + 1); // 1-based: first image is "01"
    const newName = `${materialPrefix}-${categorySlug}-${counter}${ext}`;

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
  const relFolder = `${material}/${category}`;
  logGroups[relFolder] = logLines;
}

// ── Entry point ───────────────────────────────────────────────────────────────

console.log('');
console.log(IS_DRY_RUN ? '🔍  DRY-RUN mode — pass --apply to rename files' : '✏️   APPLY mode — renaming files');
console.log(`Root: ${PRODUCTS_DIR}`);
console.log('');

if (!existsSync(PRODUCTS_DIR)) {
  console.error(`❌  products directory not found at ${PRODUCTS_DIR}`);
  process.exit(1);
}

// Walk material → category two levels deep; ignore files at the material level
for (const material of Object.keys(MATERIAL_PREFIXES)) {
  const materialDir = join(PRODUCTS_DIR, material);
  if (!existsSync(materialDir)) {
    console.warn(`⚠  Missing material folder: ${material}`);
    continue;
  }

  console.log(`📁  ${material}/`);

  const categoryFolders = readdirSync(materialDir).sort();

  for (const category of categoryFolders) {
    const categoryPath = join(materialDir, category);

    // Process only directories; skip stray files at the material level
    try {
      const stat = readdirSync(categoryPath); // throws if not a directory
      void stat;
    } catch {
      continue;
    }

    if (!CATEGORY_SLUGS[category]) {
      console.warn(`  ⚠  Unrecognised category folder "${category}" — skipping`);
      continue;
    }

    console.log(`  📂  ${category}/`);
    processFolder(categoryPath, material, category);
  }

  console.log('');
}

// ── Write log ────────────────────────────────────────────────────────────────

if (!IS_DRY_RUN) {
  const timestamp = new Date().toISOString();
  const sections  = Object.entries(logGroups).map(([folder, lines]) =>
    [`[${folder}]`, ...lines].join('\n'),
  );

  const logContent = [
    `# Emaar product image rename log`,
    `# Generated: ${timestamp}`,
    '',
    ...sections,
    '',
  ].join('\n');

  writeFileSync(LOG_PATH, logContent, 'utf8');
  console.log(`📝  Rename log written to scripts/rename-log.txt`);
} else {
  console.log('ℹ️   No files changed. Pass --apply to execute renames.');
}
