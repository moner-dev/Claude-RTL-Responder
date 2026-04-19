# Changelog / سجل التغييرات

All notable changes to **Claude RTL Responder** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

*No unreleased changes at this time.*

---

## [0.1.1] — 2026-04-19

### 🌐 Cross-Browser Support / دعم متعدد المتصفحات

Added full support for Chrome and Edge browsers alongside Firefox.

تمت إضافة دعم كامل لمتصفحات Chrome و Edge بالإضافة إلى Firefox.

### Added / المُضاف

- **Chrome Support** — Full compatibility with Chrome 88+ and Chromium-based browsers
- **Edge Support** — Works with Microsoft Edge (Chromium-based)
- **Browser Polyfill** — Unified `browserAPI` namespace for cross-browser compatibility
- **Build System** — Node.js build scripts for generating browser-specific packages
- **Download Buttons** — Added download buttons with live counters to README

### Changed / المُغيَّر

- **Project Structure** — Reorganized source files into `src/` folder
- **Manifests** — Separate manifests for Firefox (`manifest.firefox.json`) and Chrome (`manifest.chrome.json`)
- **Documentation** — Updated all docs (README, INSTALL, CONTRIBUTING) for cross-browser support

### Technical / تقني

- Chrome uses `service_worker` instead of `background.scripts`
- Added `scripts/build.js` for automated builds
- Added `package.json` with npm build commands

---

## [0.1.0] — 2026-04-18

### 🎉 Initial Release / الإصدار الأول

The first public release of Claude RTL Responder — a browser extension (Firefox & Chrome) that enhances Claude.ai for Arabic-speaking users.

أول إصدار عام من Claude RTL Responder — إضافة متصفح (Firefox و Chrome) تُحسِّن تجربة Claude.ai للمستخدمين الناطقين بالعربية.

### Added / المُضاف

#### Core Features / الميزات الأساسية
- **Automatic RTL Detection** — Detects Arabic text using Unicode BiDi algorithm and first-strong character analysis
- **Mixed-Content Handling** — Intelligently handles Arabic text with embedded English terms and technical content
- **Code Block Preservation** — Keeps code blocks, inline code, and technical content in LTR direction
- **Streaming Support** — RTL applied during Claude's streaming responses, not just after completion

#### Customization / التخصيص
- **Font Size Options** — Small, Medium (default), Large
- **Line Spacing Options** — Compact, Normal (default), Relaxed
- **RTL Indicator** — Optional visual dot on RTL-applied elements with customizable color picker
- **Persistent Settings** — All preferences saved to `browser.storage.local`

#### User Interface / واجهة المستخدم
- **Popup Mode Switcher** — Quick toggle between Arabic (RTL active) and English (passive) modes
- **Options Page** — Full settings page with live preview
- **Bilingual UI** — Complete Arabic and English interface with instant language switching
- **Dark Mode Support** — Full dark mode across popup and options page

#### Keyboard Shortcuts / اختصارات لوحة المفاتيح
- <kbd>Alt</kbd>+<kbd>G</kbd> — Toggle between Arabic and English modes
- <kbd>Alt</kbd>+<kbd>O</kbd> — Open extension popup

#### Options Page Sections / أقسام صفحة الإعدادات
- **Live Preview** — Real-time preview of font size and line spacing changes
- **About the Extension** — Video placeholder, features list, installation methods, action buttons
- **About the Developer** — Developer identity, bio, other projects showcase, contact buttons

### Technical / تقني

- **Manifest Version** — MV3 (Manifest V3)
- **Firefox Minimum** — 109+
- **Chrome Minimum** — 88+
- **Architecture** — Isolated modules (detector, observer, content, background, popup, options)
- **Performance** — RAF-debounced MutationObserver, WeakSet tracking for processed elements
- **Storage** — `browser.storage.local` with real-time broadcasting to active tabs

### Privacy / الخصوصية

- All data stored locally
- No analytics or tracking
- No external network requests
- No user data transmitted
- Fully open source

---

## Version History Summary

| Version | Date | Highlights |
|:--------|:-----|:-----------|
| **0.1.1** | 2026-04-19 | Cross-browser support (Chrome, Edge), build system, restructured project |
| **0.1.0** | 2026-04-18 | Initial release with full RTL support, customization options, and bilingual UI |

---

## Links

- **Repository:** [github.com/moner-dev/Claude-RTL-Responder](https://github.com/moner-dev/Claude-RTL-Responder)
- **Issues:** [Report a bug](https://github.com/moner-dev/Claude-RTL-Responder/issues)
- **Releases:** [All releases](https://github.com/moner-dev/Claude-RTL-Responder/releases)

---

<div align="center">

**Claude RTL Responder** · © 2026 MONER INTELLIGENCE SYSTEMS

</div>
