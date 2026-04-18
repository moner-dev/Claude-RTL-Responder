# Task: Create Professional INSTALL.md for Claude RTL Responder

## Context
`README.md` is complete. Now we're creating the dedicated installation guide `INSTALL.md`. This file is referenced from:
- The Options page's "About the Extension" section ("Installation Guide" button)
- The main README.md's Installation section (as "full guide" link)

So it needs to be standalone, comprehensive, and user-friendly — able to guide a non-technical Arabic-speaking user through installing the extension.

## Reference Style

Use the **Ghost Protocol Helpdesk** repository's installation-related documentation as the style reference. If Ghost Protocol has an `INSTALL.md`, `Installation-Guide.md`, or a detailed installation section in its README, study it first:

1. Read: `https://github.com/moner-dev/ghost-protocol-helpdesk`
2. Study its installation guide's:
   - Structure and section ordering
   - Tone and writing style
   - Use of screenshots/visuals (if any)
   - Troubleshooting patterns
   - Platform coverage
   - Bilingual pattern

Then apply the same aesthetic to the Claude RTL Responder INSTALL.md — **adapted for a browser extension**, not a desktop application.

## Target File

Create the file at: `claude-rtl-responder/INSTALL.md` (project root, alongside `README.md`).

## Content Structure

Bilingual throughout — Arabic first, English second for each section (matching the extension's existing pattern).

### 1. Header

Centered block:
- Title: `INSTALL · دليل التثبيت`
- Subtitle: `Claude RTL Responder — Installation Guide`
- Small badges row (same as README but focused on compatibility):
  - Firefox 109+
  - Windows / macOS / Linux
  - v0.1.0

### 2. Introduction / مقدمة

Brief bilingual intro — 2-3 lines each language:
- What this guide covers
- Two installation methods available
- Recommended method for most users

### 3. Table of Contents / جدول المحتويات

Clickable TOC linking to all main sections.

### 4. Prerequisites / المتطلبات

Before installing, user needs:

- **Firefox** version 109 or later (link to `https://www.mozilla.org/firefox/`)
- A Claude.ai account (link to `https://claude.ai`)
- No administrative privileges required (browser-level install)

Include a small table:

| Component / المكوّن | Minimum / الحد الأدنى | Recommended / الموصى به |
|---|---|---|
| Firefox | 109 | Latest |
| OS | Windows 10 / macOS 10.14 / Ubuntu 20.04 | Any current version |
| RAM | 2 GB | 4 GB+ |
| Disk | 5 MB for extension | — |

### 5. Method 1: Install from Firefox Add-ons Store (Recommended) / الطريقة الأولى: التثبيت من متجر Firefox (موصى بها)

This is the production method but currently "Coming Soon".

Structure:
- Status badge: `🟡 Coming Soon / قريباً`
- Brief explanation: extension is awaiting Mozilla AMO review
- Placeholder steps for when it's available:
  1. Visit the AMO listing page
  2. Click "Add to Firefox"
  3. Confirm the permissions prompt
  4. Done — extension is active
- Add TODO comment: `<!-- TODO: Replace AMO URL with the actual listing once approved -->`
- Visual placeholder for the "Add to Firefox" button

### 6. Method 2: Install from GitHub (Developer Edition / Temporary) / الطريقة الثانية: التثبيت من GitHub (نسخة المطور / مؤقتة)

This is the currently available method. Must be detailed step-by-step.

Structure:

**Step 1: Download the Extension / تنزيل الإضافة**
- Option A: Clone with git
```bash
  git clone https://github.com/moner-dev/Claude-RTL-Responder.git
```
- Option B: Download ZIP
  1. Visit `https://github.com/moner-dev/Claude-RTL-Responder/releases`
  2. Download the latest `claude-rtl-responder-vX.X.X.zip`
  3. Extract the ZIP to a folder you'll remember (e.g., `Documents/claude-rtl-responder`)

Include a bilingual note about choosing a permanent folder (since the folder must exist as long as the extension is used — Firefox references it directly).

**Step 2: Open Firefox Debugging Page / فتح صفحة تصحيح Firefox**
- Type in address bar: `about:debugging#/runtime/this-firefox`
- Press Enter
- Add a placeholder for a screenshot: `<!-- TODO: Add screenshot at docs/screenshots/install/01-debugging-page.png -->`

**Step 3: Load the Extension / تحميل الإضافة**
- Click the button: **"Load Temporary Add-on..."**
- In the file picker, navigate to the extracted folder
- Select the `manifest.json` file
- Click "Open"
- Placeholder: `<!-- TODO: Add screenshot at docs/screenshots/install/02-load-addon.png -->`

**Step 4: Verify Installation / التحقق من التثبيت**
- The extension icon should appear in the Firefox toolbar
- Click the icon → the popup should open showing the mode switcher
- Placeholder: `<!-- TODO: Add screenshot at docs/screenshots/install/03-popup-verified.png -->`

**Step 5: Test on Claude.ai / التجربة على Claude.ai**
- Visit `https://claude.ai`
- Start a conversation in Arabic
- Verify that Claude's responses are rendered right-to-left

**Important Limitation / تنبيه هام**

A **highlighted callout box** explaining that temporary add-ons are removed when Firefox restarts — this is a Firefox development limitation, not a bug. For permanent installation, users should wait for the AMO version or repeat the steps each session.

### 7. Post-Installation Configuration / الإعدادات بعد التثبيت

Walk users through initial setup:

1. **Pin the extension to the toolbar** — explain how to keep the icon visible
2. **Choose a mode** — explain Arabic Mode vs English Mode via the popup
3. **Customize settings** — briefly mention font size, line spacing, RTL indicator (with a link to the README's Usage section for details)
4. **Learn the keyboard shortcuts** — `Alt+G` to toggle mode, `Alt+O` to open popup

### 8. Updating the Extension / تحديث الإضافة

Two subsections:

**A. If installed from AMO**
- Firefox auto-updates extensions by default
- No action needed

**B. If installed from GitHub (temporary)**
- Check releases page for new versions
- Download the new ZIP
- Re-follow Method 2 steps with the new folder
- Your settings will NOT persist (since each install is a fresh temporary add-on)

### 9. Uninstalling / إلغاء التثبيت

**A. Remove via about:addons**
1. Navigate to `about:addons`
2. Find "Claude RTL Responder"
3. Click the three-dot menu → "Remove"
4. Confirm

**B. Remove the extracted folder** (for the GitHub method)
- Delete the local folder where you extracted the ZIP

### 10. Troubleshooting / استكشاف الأخطاء وإصلاحها

Common problems + solutions, bilingual. Use a structured format like this:

**Problem: Extension doesn't appear in toolbar after loading**
- Solution steps (bilingual)

**Problem: Claude.ai text still renders left-to-right**
- Possible causes + solutions

**Problem: Keyboard shortcuts don't work**
- Check Windows `Alt+Shift` conflict
- Customize shortcuts via `about:addons` → gear icon → "Manage Extension Shortcuts"

**Problem: Settings don't persist after Firefox restart**
- Explain temporary add-on limitation
- Suggest AMO version when available

**Problem: Extension conflicts with other RTL extensions**
- Disable other RTL extensions
- Only use one RTL extension at a time for Claude.ai

**Problem: Manifest loading error ("unexpected JSON...")**
- Indicates the ZIP wasn't fully extracted
- Re-extract and try again

Structure each problem as a collapsible `<details>` block for clean readability.

### 11. Firefox Version Compatibility / توافق إصدارات Firefox

A clear table:

| Firefox Version | Support | Notes |
|---|---|---|
| 109+ | ✅ Full | Recommended |
| 102 ESR | ⚠️ Limited | Manifest V3 partial support |
| <102 | ❌ Not supported | Upgrade Firefox |

### 12. Platform-Specific Notes / ملاحظات حسب نظام التشغيل

Three subsections (Windows, macOS, Linux), each bilingual with any specific quirks:

**Windows**
- Standard Firefox installer works
- Note about Windows Defender / SmartScreen on first extension load

**macOS**
- Standard installation
- Note about Gatekeeper (not applicable to extensions, but clarify for users)

**Linux**
- Works with Firefox from official repos, Snap, Flatpak
- Brief note about Snap sandboxing potentially affecting file access dialogs

### 13. Security & Privacy / الأمان والخصوصية

Reassurance paragraph (bilingual):
- All processing happens locally in your browser
- No data leaves your device
- No analytics or tracking
- Source code is fully open for review on GitHub
- The extension only requests `storage` permission + access to claude.ai

### 14. Getting Help / طلب المساعدة

Where to get help if installation fails:
- Open an issue on GitHub: `https://github.com/moner-dev/Claude-RTL-Responder/issues`
- Email: `moner.intelligence@gmail.com`
- Check the main README for general documentation

### 15. Next Steps / الخطوات التالية

Brief pointer after successful installation:
- Read the main README for usage details
- Explore the Options page for customization
- Try the keyboard shortcuts

Links to the README sections.

### 16. Footer
Same footer as other files:
- Horizontal rule
- `Claude RTL Responder v0.1.0 · © 2026 MONER INTELLIGENCE SYSTEMS · Installation Guide`
- Back to top link

## Design Rules

Match Ghost Protocol Helpdesk's documentation style:
- Centered header using `<div align="center">`
- Badge row at top
- Clear numbered steps with bold action words
- Code blocks for every command (`bash`, `url`)
- Use `<details>` for troubleshooting items
- Tables for compatibility info
- Callout/admonition boxes for important warnings (use blockquotes with emoji like `> ⚠️` or `> ℹ️`)
- Horizontal rules `---` between major sections
- Bilingual pattern consistent with the rest of the project (Arabic first in most sections, or paired side-by-side where it aids clarity)

## Language Guidelines

- Arabic text: use clear classical Arabic (فصحى) mixed with modern technical terms (no colloquial)
- English text: use straightforward technical English (beginner-friendly, not jargon-heavy)
- Both languages should convey the same meaning — not machine-translated; rewrite for each language's reader
- Use proper Arabic punctuation (،؛؟)
- For keyboard keys, use HTML `<kbd>` tags: `<kbd>Alt</kbd>+<kbd>G</kbd>`

## Constraints

- Only create `INSTALL.md` — do NOT create other files in this task
- Do NOT push to GitHub — local file only
- Do NOT modify any existing files (extension source or README)
- All external URLs must be HTTPS
- All screenshots must be TODO placeholders with clear HTML comments (user will add screenshots later under `docs/screenshots/install/`)
- Preserve `M.O.N.E.R` and `MONER INTELLIGENCE SYSTEMS` exactly
- No external tracking images — only trusted services (shields.io)
- Do NOT invent Firefox behaviors you're not sure about — if unclear, describe generically

## Deliverables

1. `INSTALL.md` at the project root
2. Brief chat report including:
   - Confirmation that Ghost Protocol Helpdesk was studied as reference
   - List of all TODO placeholders added (screenshots, AMO URL)
   - Any sections where Ghost Protocol's pattern was adapted differently (with reason)
   - Length of the file (approximate line count)

## Definition of Done

- Complete `INSTALL.md` at the project root
- All 16 sections present and substantive
- Bilingual throughout
- Matches the visual/structural style of Ghost Protocol Helpdesk's documentation
- Walks a complete beginner from zero to working extension
- Troubleshooting covers realistic common issues
- All TODO placeholders clearly marked
- All internal links (to README sections, other files) use correct paths
- No file creation beyond `INSTALL.md` in this task