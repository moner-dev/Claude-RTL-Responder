#!/usr/bin/env node

/**
 * Claude RTL Responder - Build Script
 *
 * Produces clean, packaged ZIPs for Firefox and Chrome from the shared source.
 *
 * Usage:
 *   node scripts/build.js firefox   - Build Firefox extension
 *   node scripts/build.js chrome    - Build Chrome extension
 *   node scripts/build.js all       - Build both
 *
 * Output:
 *   dist/firefox/                    - Unpacked Firefox extension
 *   dist/chrome/                     - Unpacked Chrome extension
 *   dist/claude-rtl-responder-firefox-v<version>.zip
 *   dist/claude-rtl-responder-chrome-v<version>.zip
 *
 * Requirements:
 *   - Node.js 14+
 *   - PowerShell (Windows) or zip command (macOS/Linux)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// Configuration
// ============================================================================

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');

const VALID_TARGETS = ['firefox', 'chrome', 'all'];

// Files/folders to exclude from builds (relative to src/)
const EXCLUDE_PATTERNS = [
    'manifest.firefox.json',  // Handled separately
    'manifest.chrome.json',   // Handled separately
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.github',
    'node_modules',
];

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Print a colored message to console
 * @param {string} message - Message to print
 * @param {'info'|'success'|'error'|'warn'} type - Message type
 */
function log(message, type = 'info') {
    const prefix = {
        info: '\x1b[36mℹ\x1b[0m',     // Cyan
        success: '\x1b[32m✓\x1b[0m',  // Green
        error: '\x1b[31m✗\x1b[0m',    // Red
        warn: '\x1b[33m⚠\x1b[0m',     // Yellow
    };
    console.log(`${prefix[type] || ''} ${message}`);
}

/**
 * Print a section header
 * @param {string} title - Section title
 */
function logSection(title) {
    console.log(`\n\x1b[1m${'='.repeat(60)}\x1b[0m`);
    console.log(`\x1b[1m ${title}\x1b[0m`);
    console.log(`\x1b[1m${'='.repeat(60)}\x1b[0m\n`);
}

/**
 * Exit with error message
 * @param {string} message - Error message
 */
function exitWithError(message) {
    log(message, 'error');
    process.exit(1);
}

/**
 * Recursively delete a directory
 * @param {string} dirPath - Directory path to delete
 */
function removeDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
}

/**
 * Recursively create a directory
 * @param {string} dirPath - Directory path to create
 */
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Check if a path should be excluded
 * @param {string} relativePath - Path relative to src/
 * @returns {boolean}
 */
function shouldExclude(relativePath) {
    const basename = path.basename(relativePath);

    // Check exact matches and patterns
    for (const pattern of EXCLUDE_PATTERNS) {
        if (basename === pattern || relativePath.startsWith(pattern)) {
            return true;
        }
    }

    // Exclude hidden files (except specific ones we need)
    if (basename.startsWith('.') && basename !== '.gitkeep') {
        return true;
    }

    return false;
}

/**
 * Recursively copy directory with filtering
 * @param {string} srcDir - Source directory
 * @param {string} destDir - Destination directory
 * @param {string} basePath - Base path for relative path calculation
 * @returns {string[]} List of copied files
 */
function copyDirFiltered(srcDir, destDir, basePath = srcDir) {
    const copiedFiles = [];

    ensureDir(destDir);

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    // Sort entries for deterministic output
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);
        const relativePath = path.relative(basePath, srcPath);

        if (shouldExclude(relativePath)) {
            continue;
        }

        if (entry.isDirectory()) {
            const subFiles = copyDirFiltered(srcPath, destPath, basePath);
            copiedFiles.push(...subFiles);
        } else {
            fs.copyFileSync(srcPath, destPath);
            copiedFiles.push(relativePath);
        }
    }

    return copiedFiles;
}

/**
 * Create ZIP archive using platform-specific command
 * @param {string} sourceDir - Directory to zip
 * @param {string} zipPath - Output ZIP path
 */
function createZip(sourceDir, zipPath) {
    // Remove existing ZIP if present
    if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
    }

    const isWindows = process.platform === 'win32';

    if (isWindows) {
        // Use PowerShell's Compress-Archive
        const psCommand = `Compress-Archive -Path "${sourceDir}\\*" -DestinationPath "${zipPath}" -Force`;
        execSync(`powershell -Command "${psCommand}"`, { stdio: 'pipe' });
    } else {
        // Use zip command on macOS/Linux
        const originalDir = process.cwd();
        process.chdir(sourceDir);
        execSync(`zip -r "${zipPath}" .`, { stdio: 'pipe' });
        process.chdir(originalDir);
    }
}

/**
 * List files in a ZIP archive
 * @param {string} zipPath - Path to ZIP file
 * @returns {string[]} List of files in ZIP
 */
function listZipContents(zipPath) {
    const isWindows = process.platform === 'win32';

    try {
        if (isWindows) {
            // Use PowerShell to list ZIP contents
            const psCommand = `
                Add-Type -AssemblyName System.IO.Compression.FileSystem;
                [System.IO.Compression.ZipFile]::OpenRead('${zipPath}').Entries |
                ForEach-Object { $_.FullName } |
                Sort-Object
            `;
            const output = execSync(`powershell -Command "${psCommand}"`, { encoding: 'utf8' });
            return output.trim().split('\n').filter(line => line.trim());
        } else {
            // Use unzip on macOS/Linux
            const output = execSync(`unzip -l "${zipPath}"`, { encoding: 'utf8' });
            const lines = output.split('\n');
            const files = [];
            for (const line of lines) {
                const match = line.match(/^\s*\d+\s+[\d-]+\s+[\d:]+\s+(.+)$/);
                if (match && match[1] && !match[1].endsWith('/')) {
                    files.push(match[1]);
                }
            }
            return files.sort();
        }
    } catch (error) {
        log(`Could not list ZIP contents: ${error.message}`, 'warn');
        return [];
    }
}

/**
 * Get file size in human-readable format
 * @param {string} filePath - Path to file
 * @returns {string} Size string (e.g., "32.5 KB")
 */
function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ============================================================================
// Build Functions
// ============================================================================

/**
 * Build extension for a specific browser
 * @param {'firefox'|'chrome'} browser - Target browser
 * @returns {Object} Build result with paths and stats
 */
function buildForBrowser(browser) {
    logSection(`Building for ${browser.toUpperCase()}`);

    const browserDir = path.join(DIST_DIR, browser);
    const manifestSource = path.join(SRC_DIR, `manifest.${browser}.json`);
    const manifestDest = path.join(browserDir, 'manifest.json');

    // Validate manifest exists
    if (!fs.existsSync(manifestSource)) {
        exitWithError(`Manifest not found: ${manifestSource}`);
    }

    // Step 1: Clean output directory
    log(`Cleaning ${browserDir}...`, 'info');
    removeDir(browserDir);
    ensureDir(browserDir);

    // Step 2: Copy source files (excluding manifests)
    log('Copying source files...', 'info');
    const copiedFiles = copyDirFiltered(SRC_DIR, browserDir);

    // Step 3: Copy and rename target manifest
    log(`Copying ${browser} manifest...`, 'info');
    fs.copyFileSync(manifestSource, manifestDest);

    // Step 4: Read version from manifest
    const manifestContent = JSON.parse(fs.readFileSync(manifestDest, 'utf8'));
    const version = manifestContent.version || '0.0.0';

    // Step 5: Create ZIP
    const zipName = `claude-rtl-responder-${browser}-v${version}.zip`;
    const zipPath = path.join(DIST_DIR, zipName);

    log(`Creating ${zipName}...`, 'info');
    createZip(browserDir, zipPath);

    // Step 6: Gather stats
    const zipSize = getFileSize(zipPath);
    const zipContents = listZipContents(zipPath);

    // Add manifest to copied files list for display
    const allFiles = [...copiedFiles, 'manifest.json'].sort();

    log(`Build complete for ${browser}!`, 'success');

    return {
        browser,
        version,
        browserDir,
        zipPath,
        zipName,
        zipSize,
        fileCount: allFiles.length,
        files: allFiles,
        zipContents,
    };
}

/**
 * Print build results summary
 * @param {Object[]} results - Array of build results
 */
function printSummary(results) {
    logSection('BUILD SUMMARY');

    for (const result of results) {
        console.log(`\x1b[1m${result.browser.toUpperCase()}\x1b[0m`);
        console.log(`  Version:    ${result.version}`);
        console.log(`  Output:     ${result.browserDir}`);
        console.log(`  ZIP:        ${result.zipPath}`);
        console.log(`  ZIP Size:   ${result.zipSize}`);
        console.log(`  Files:      ${result.fileCount}`);
        console.log('');

        // Print file listing
        console.log('  \x1b[2mFiles in ZIP:\x1b[0m');
        for (const file of result.zipContents) {
            console.log(`    ${file}`);
        }
        console.log('');
    }

    log('All builds completed successfully!', 'success');
}

// ============================================================================
// Main Entry Point
// ============================================================================

function main() {
    const args = process.argv.slice(2);
    const target = args[0]?.toLowerCase();

    // Show usage if no argument
    if (!target) {
        console.log(`
\x1b[1mClaude RTL Responder - Build Script\x1b[0m

Usage:
  node scripts/build.js <target>

Targets:
  firefox   Build Firefox extension only
  chrome    Build Chrome extension only
  all       Build both extensions

Output:
  dist/firefox/                              Unpacked extension
  dist/chrome/                               Unpacked extension
  dist/claude-rtl-responder-firefox-v*.zip   Firefox package
  dist/claude-rtl-responder-chrome-v*.zip    Chrome package
`);
        process.exit(0);
    }

    // Validate target
    if (!VALID_TARGETS.includes(target)) {
        exitWithError(`Invalid target: "${target}". Must be one of: ${VALID_TARGETS.join(', ')}`);
    }

    // Validate source directory exists
    if (!fs.existsSync(SRC_DIR)) {
        exitWithError(`Source directory not found: ${SRC_DIR}`);
    }

    // Ensure dist directory exists
    ensureDir(DIST_DIR);

    // Build target(s)
    const results = [];

    if (target === 'all' || target === 'firefox') {
        results.push(buildForBrowser('firefox'));
    }

    if (target === 'all' || target === 'chrome') {
        results.push(buildForBrowser('chrome'));
    }

    // Print summary
    printSummary(results);
}

// Run
main();
