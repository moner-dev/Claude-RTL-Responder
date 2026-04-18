# Changelog / سجل التغييرات

All notable changes to **Claude RTL Responder** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

*No unreleased changes at this time.*

---

## [0.1.0] — 2026-04-18

### 🎉 Initial Release / الإصدار الأول

The first public release of Claude RTL Responder — a Firefox extension that enhances Claude.ai for Arabic-speaking users.

أول إصدار عام من Claude RTL Responder — إضافة Firefox تُحسِّن تجربة Claude.ai للمستخدمين الناطقين بالعربية.

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
