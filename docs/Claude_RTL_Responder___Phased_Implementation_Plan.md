# Claude RTL Responder — Phased Implementation Plan (Revised)

**Version**: 2.0
**Last Updated**: Based on reference analysis of ai_rtl_extension, rtl-toggle, and Now2ai-RTL-Fixer
**Scope**: Arabic language support ONLY (no Hebrew, Farsi, or other RTL scripts)

---

## Project Overview

A Firefox extension that intelligently applies RTL (right-to-left) text direction to Arabic content on Claude.ai while preserving LTR for English text, code blocks, and technical content. The extension uses the Unicode first-strong character algorithm for Arabic detection and handles Claude's streaming responses via DOM observation.

---

## Arabic Unicode Specification

Based on analysis of Now2ai-RTL-Fixer (adapted for Arabic-only):

```javascript
// Arabic Unicode ranges (ARABIC ONLY - no Hebrew/Farsi)
const ARABIC_UNICODE_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
```

| Range | Name | Characters |
|-------|------|------------|
| `\u0600-\u06FF` | Arabic | Main Arabic block (255 chars) |
| `\u0750-\u077F` | Arabic Supplement | Additional letters (48 chars) |
| `\u08A0-\u08FF` | Arabic Extended-A | Extended letters (96 chars) |
| `\uFB50-\uFDFF` | Arabic Presentation Forms-A | Ligatures, contextual (688 chars) |
| `\uFE70-\uFEFF` | Arabic Presentation Forms-B | Contextual forms (144 chars) |

---

## Claude.ai DOM Selectors (from Reference Analysis)

Based on Now2ai-RTL-Fixer's tested selectors + ai_rtl_extension:

### RTL Target Selectors

```javascript
const RTL_SELECTORS = {
  // Primary message selectors (from Now2ai)
  streaming: '[data-is-streaming]',        // Claude's streaming response
  messageText: '.font-claude-message',     // Message text styling class

  // Input selectors
  contentEditable: '[contenteditable]',    // Rich text input
  textarea: 'textarea',                     // Fallback input

  // Combined query
  all: '[data-is-streaming], .font-claude-message, [contenteditable], textarea'
};
```

### Protected Selectors (Always LTR)

```javascript
const PROTECTED_SELECTORS = {
  code: 'pre, code, [data-language], .hljs, .code-block',
  math: '.katex, .katex-mathml, .katex-html, math',

  // Combined query
  all: 'pre, code, [data-language], .hljs, .code-block, .katex, math'
};
```

**Note**: These selectors require validation in Phase 0.5 against live Claude.ai DOM.

---

## Phase 0: Project Scaffold

**Goal**: Establish minimal extension structure loadable in Firefox
**Estimated Time**: 1-2 hours

### Deliverables

```
claude-rtl-responder/
├── manifest.json
├── icons/
│   ├── icon-48.png
│   └── icon-96.png
├── content/
│   └── content.js          # Entry point (empty shell)
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── styles/
    └── rtl.css             # Injected stylesheet
```

### manifest.json Specification

```json
{
  "manifest_version": 3,
  "name": "Claude RTL Responder",
  "version": "1.0.0",
  "description": "تحسين عرض النصوص العربية في Claude.ai",
  "browser_specific_settings": {
    "gecko": {
      "id": "claude-rtl@extension",
      "strict_min_version": "109.0"
    }
  },
  "permissions": ["storage", "activeTab"],
  "host_permissions": ["*://claude.ai/*"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "48": "icons/icon-48.png",
      "96": "icons/icon-96.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["*://claude.ai/*"],
      "js": ["content/content.js"],
      "css": ["styles/rtl.css"],
      "run_at": "document_end"
    }
  ],
  "icons": {
    "48": "icons/icon-48.png",
    "96": "icons/icon-96.png"
  }
}
```

### Technical Decisions
- **No background script initially** — add in Phase 5 if needed for cross-tab sync
- **CSS injected via manifest** — not dynamically, for reliability
- **`run_at: document_end`** — ensures DOM is ready

### Testing Strategy
1. Load extension in `about:debugging` > "This Firefox" > "Load Temporary Add-on"
2. Verify no errors in Browser Console (Ctrl+Shift+J)
3. Navigate to claude.ai, verify content script loads (`console.log` test)
4. Verify extension icon appears in toolbar

### Dependencies
- None (starting point)

---

## Phase 0.5: DOM Reconnaissance (NEW)

**Goal**: Document Claude.ai's current DOM structure before implementation
**Estimated Time**: 2-3 hours

### Deliverables
- `docs/claude-dom-structure.md` — documented selectors and structure
- Screenshot evidence of DOM structure
- Validated selector list

### Investigation Checklist

| Element | Questions to Answer |
|---------|---------------------|
| Message containers | What wraps user vs. Claude messages? |
| Streaming indicator | Is `[data-is-streaming]` still used? Values? |
| Message text | Is `.font-claude-message` still the text class? |
| Code blocks | What classes/attributes mark code? `[data-language]`? |
| Input field | `[contenteditable]` div or `<textarea>`? |
| Artifacts | How are rendered previews structured? |
| Paragraphs | Are messages split into `<p>` elements or divs? |

### Method
1. Open Claude.ai in Firefox Developer Tools
2. Start a conversation with mixed Arabic/English
3. Inspect each element type, document selectors
4. Test selectors in console: `document.querySelectorAll('[data-is-streaming]')`
5. Compare with reference selectors from Now2ai-RTL-Fixer

### Output Format

```markdown
## Claude.ai DOM Structure (as of YYYY-MM-DD)

### Message Container
- User message wrapper: `[selector]`
- Claude message wrapper: `[selector]`
- Streaming attribute: `[data-is-streaming="true|false"]`

### Text Content
- Message text class: `.font-claude-message` ✓/✗
- Paragraph structure: `<p>` / `<div>` / other

### Code Blocks
- Code block wrapper: `[selector]`
- Language indicator: `[data-language="python"]`
- Inline code: `<code>`

### Input Area
- Type: contenteditable / textarea
- Selector: `[selector]`
```

### Dependencies
- Phase 0 complete (extension loads for testing)

---

## Phase 1: Basic Arabic Detection + RTL Application

**Goal**: Detect Arabic text and apply `dir="rtl"` to Arabic-dominant paragraphs
**Estimated Time**: 4-5 hours

### Deliverables
- `content/detector.js` — Arabic detection module
- `content/content.js` — Main entry applying detection
- `styles/rtl.css` — RTL styling rules

### Arabic Detection Implementation

```javascript
// content/detector.js

/**
 * Arabic Unicode ranges (Arabic only, no Hebrew/Farsi)
 */
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Latin letter detection (strong LTR)
 */
const LATIN_REGEX = /[A-Za-z\u00C0-\u024F]/;

/**
 * First-strong character algorithm for direction detection
 * @param {string} text - Text to analyze
 * @returns {'rtl' | 'ltr'} Detected direction
 */
export function detectDirection(text) {
  // Strip whitespace, digits, and punctuation (neutral characters)
  const stripped = text.replace(/[\s\d\p{P}\p{S}]/gu, '');

  if (!stripped) return 'ltr'; // Empty or neutral-only = LTR default

  // Find first strong directional character
  for (const char of stripped) {
    if (ARABIC_REGEX.test(char)) return 'rtl';
    if (LATIN_REGEX.test(char)) return 'ltr';
  }

  return 'ltr'; // Default
}

/**
 * Check if text contains any Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean}
 */
export function hasArabic(text) {
  return ARABIC_REGEX.test(text);
}
```

### CSS Rules

```css
/* styles/rtl.css */

/* Applied to elements detected as RTL */
.claude-rtl-detected {
  direction: rtl !important;
  text-align: right !important;
  unicode-bidi: isolate !important;
}

/* Alternative: Use dir="auto" for browser-native detection */
.claude-rtl-auto {
  direction: auto !important;
  unicode-bidi: isolate !important;
  text-align: start !important;  /* 'start' respects direction */
}
```

### Edge Cases to Handle

| Case | Input | Expected |
|------|-------|----------|
| Pure Arabic | "مرحباً كيف حالك" | RTL |
| Pure English | "Hello world" | LTR |
| Numbers only | "12345" | LTR (default) |
| Punctuation only | "..." | LTR (default) |
| Emoji only | "😀🎉" | LTR (default) |
| Arabic + emoji | "مرحباً 😀" | RTL |
| Number-first Arabic | "123 مرحباً" | RTL (first strong = Arabic) |

### Testing Strategy
1. Create test conversation with pure Arabic message
2. Verify `dir="rtl"` or `.claude-rtl-detected` is applied
3. Create test with pure English — verify no RTL applied
4. Test edge cases in console: `detectDirection("test input")`

### Dependencies
- Phase 0.5 complete (validated selectors)

---

## Phase 2: Mixed-Content Handling

**Goal**: Handle Arabic + English in same message at paragraph level
**Estimated Time**: 3-4 hours

### Deliverables
- Updated `content/content.js` with paragraph-level processing
- Test documentation for mixed content

### Technical Approach

Process each block-level element independently:

```javascript
// content/content.js

const BLOCK_SELECTORS = 'p, li, h1, h2, h3, h4, h5, h6, div.paragraph';

function processMessage(messageContainer) {
  const blocks = messageContainer.querySelectorAll(BLOCK_SELECTORS);

  blocks.forEach(block => {
    // Skip if inside protected element
    if (block.closest(PROTECTED_SELECTORS.all)) return;

    const text = block.textContent || '';
    const direction = detectDirection(text);

    if (direction === 'rtl') {
      block.setAttribute('dir', 'rtl');
      block.classList.add('claude-rtl-detected');
    }
  });
}
```

### Mixed Content Examples

| Message | Paragraphs | Expected |
|---------|------------|----------|
| "مرحباً\n\nHello" | 2 | P1: RTL, P2: LTR |
| "Hello مرحباً" | 1 | LTR (English first) |
| "مرحباً hello كيف" | 1 | RTL (Arabic first) |
| "1. مرحباً" | 1 | RTL (number is neutral) |

### Inline Mixed Content

For a single paragraph with mixed content like "مرحباً hello كيف":
- Set `dir` based on first-strong character (Arabic → RTL)
- Browser's Unicode Bidi Algorithm handles inline English within RTL context
- No need to wrap inline segments

### Testing Strategy
1. Message with 2 paragraphs: Arabic, then English
2. Verify each paragraph has correct direction independently
3. Test inline mixed: "مرحباً hello world كيف حالك"
4. Verify punctuation positioning is correct

### Dependencies
- Phase 1 complete

---

## Phase 3: Code Block Preservation

**Goal**: Ensure code blocks and technical content remain LTR
**Estimated Time**: 2-3 hours

### Deliverables
- Updated `styles/rtl.css` with code protection rules
- Updated `content/content.js` with element filtering

### CSS Rules (from ai_rtl_extension pattern)

```css
/* styles/rtl.css - Code block protection */

/* Force LTR on all code elements */
pre,
code,
[data-language],
.hljs,
.code-block,
.claude-rtl-detected pre,
.claude-rtl-detected code,
.claude-rtl-detected [data-language] {
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: isolate !important;
}

/* Ensure code inside RTL messages stays LTR */
[dir="rtl"] pre,
[dir="rtl"] code,
[dir="rtl"] [data-language] {
  direction: ltr !important;
  text-align: left !important;
}

/* Math expressions (if Claude uses KaTeX) */
.katex,
.katex-mathml,
.katex-html,
math {
  direction: ltr !important;
  unicode-bidi: isolate !important;
}
```

### JavaScript Filter

```javascript
// content/content.js

const PROTECTED_ELEMENTS = 'pre, code, [data-language], .hljs, .katex, math';

function shouldProcess(element) {
  // Don't process if element IS a protected element
  if (element.matches(PROTECTED_ELEMENTS)) return false;

  // Don't process if element is INSIDE a protected element
  if (element.closest(PROTECTED_ELEMENTS)) return false;

  return true;
}
```

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Code block in Arabic message | Code stays LTR |
| Inline code: `console.log()` | Inline code stays LTR |
| Arabic string in code: `"مرحباً"` | Entire code block LTR |
| Arabic comment in code | Comment LTR (inside code) |

### Testing Strategy
1. Ask Claude for Python code in Arabic conversation
2. Verify code block alignment is left/LTR
3. Test inline code within Arabic sentence
4. Test copy-paste from code block works correctly

### Dependencies
- Phase 2 complete

---

## Phase 4: Dynamic Message Observation

**Goal**: Handle Claude's streaming responses via MutationObserver
**Estimated Time**: 4-5 hours

### Deliverables
- `content/observer.js` — MutationObserver wrapper
- Updated `content/content.js` with observer integration
- Debouncing implementation

### MutationObserver Configuration

Based on Now2ai-RTL-Fixer (comprehensive) + debouncing (new):

```javascript
// content/observer.js

const processedNodes = new WeakSet();
let rafId = null;
let observer = null;

const OBSERVER_CONFIG = {
  childList: true,           // Watch for added/removed nodes
  subtree: true,             // Watch entire subtree
  attributes: true,          // Watch attribute changes
  attributeFilter: [         // Only these attributes
    'data-is-streaming',
    'class'
  ]
};

function createObserver(processCallback) {
  return new MutationObserver((mutations) => {
    // Debounce using requestAnimationFrame
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      processMutationBatch(mutations, processCallback);
      rafId = null;
    });
  });
}

function processMutationBatch(mutations, callback) {
  const elementsToProcess = new Set();

  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          elementsToProcess.add(node);
        }
      });
    } else if (mutation.type === 'attributes') {
      if (mutation.target instanceof HTMLElement) {
        elementsToProcess.add(mutation.target);
      }
    }
  }

  elementsToProcess.forEach(element => {
    if (!processedNodes.has(element)) {
      callback(element);
      processedNodes.add(element);
    }
  });
}

export function startObserver(targetNode, processCallback) {
  if (observer) observer.disconnect();

  observer = createObserver(processCallback);
  observer.observe(targetNode, OBSERVER_CONFIG);

  // Process existing content
  processCallback(targetNode);
}

export function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}
```

### Streaming Handling Strategy

Claude streams responses token-by-token. Challenges:
1. Direction may flip as more text arrives
2. First-strong character may change during stream

**Strategy**: Use `[data-is-streaming]` attribute to detect streaming state:

```javascript
function processElement(element) {
  // If streaming, use dir="auto" to let browser handle
  const isStreaming = element.hasAttribute('data-is-streaming') ||
                      element.closest('[data-is-streaming]');

  if (isStreaming) {
    // During streaming: use browser's auto-detection
    element.setAttribute('dir', 'auto');
    element.style.setProperty('direction', 'auto', 'important');
  } else {
    // After streaming complete: apply our detection
    const direction = detectDirection(element.textContent || '');
    if (direction === 'rtl') {
      element.setAttribute('dir', 'rtl');
      element.classList.add('claude-rtl-detected');
    }
  }
}
```

### React Re-render Resilience

From Now2ai-RTL-Fixer: Use both attribute AND inline style with `!important`:

```javascript
function applyRTL(element) {
  // Attribute for semantics
  element.setAttribute('dir', 'rtl');

  // Inline style with !important for React resilience
  element.style.setProperty('direction', 'rtl', 'important');
  element.style.setProperty('unicode-bidi', 'isolate', 'important');
  element.style.setProperty('text-align', 'right', 'important');

  // Class for CSS hooks
  element.classList.add('claude-rtl-detected');
}
```

### Testing Strategy
1. Start Arabic conversation, watch streaming response
2. Verify no direction flip-flopping during stream
3. Verify final direction is correct after stream completes
4. Test "Regenerate" button — should reprocess correctly
5. Profile with DevTools Performance tab — ensure no jank

### Dependencies
- Phase 3 complete

---

## Phase 5: User Settings Popup + Persistence

**Goal**: Provide user controls via toolbar popup with persistent settings
**Estimated Time**: 3-4 hours

### Deliverables
- `popup/popup.html` — RTL layout, bilingual UI
- `popup/popup.css` — Styling
- `popup/popup.js` — Settings logic
- Updated `content/content.js` — Settings integration

### Settings Schema

```javascript
const DEFAULT_SETTINGS = {
  enabled: true,           // Master toggle
  useArabicFont: true,     // Apply custom Arabic font
  detectionMode: 'auto',   // 'auto' | 'force-rtl' | 'force-ltr'
  processInput: true       // Also process user's input field
};
```

### Popup UI (Bilingual)

```html
<!-- popup/popup.html -->
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="popup-container">
    <h1 class="title">Claude RTL</h1>
    <p class="subtitle">تحسين عرض النصوص العربية</p>

    <div class="setting-row">
      <label for="enabled">
        <span class="label-ar">تفعيل الإضافة</span>
        <span class="label-en">Enable Extension</span>
      </label>
      <input type="checkbox" id="enabled" checked>
    </div>

    <div class="setting-row">
      <label for="arabicFont">
        <span class="label-ar">استخدام خط عربي</span>
        <span class="label-en">Use Arabic Font</span>
      </label>
      <input type="checkbox" id="arabicFont" checked>
    </div>

    <div class="setting-row">
      <label>
        <span class="label-ar">وضع الكشف</span>
        <span class="label-en">Detection Mode</span>
      </label>
      <select id="detectionMode">
        <option value="auto">تلقائي / Auto</option>
        <option value="force-rtl">إجبار RTL / Force RTL</option>
        <option value="force-ltr">إجبار LTR / Force LTR</option>
      </select>
    </div>
  </div>

  <script src="popup.js"></script>
</body>
</html>
```

### Settings Persistence

```javascript
// popup/popup.js

const STORAGE_KEY = 'claudeRtlSettings';

async function loadSettings() {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || DEFAULT_SETTINGS;
}

async function saveSettings(settings) {
  await browser.storage.local.set({ [STORAGE_KEY]: settings });
}

// Listen for changes and update UI
document.getElementById('enabled').addEventListener('change', async (e) => {
  const settings = await loadSettings();
  settings.enabled = e.target.checked;
  await saveSettings(settings);
});
```

### Content Script Integration

```javascript
// content/content.js

async function getSettings() {
  const result = await browser.storage.local.get('claudeRtlSettings');
  return result.claudeRtlSettings || DEFAULT_SETTINGS;
}

// Listen for setting changes
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.claudeRtlSettings) {
    const newSettings = changes.claudeRtlSettings.newValue;
    applySettings(newSettings);
  }
});

function applySettings(settings) {
  if (!settings.enabled) {
    stopObserver();
    removeAllRTLStyles();
  } else {
    startObserver(document.body, processElement);
  }
}
```

### Testing Strategy
1. Open popup, toggle each setting
2. Refresh popup — verify settings persisted
3. Change setting — verify content script reacts immediately
4. Open two Claude tabs — change setting — verify both update

### Dependencies
- Phase 4 complete

---

## Phase 6: Arabic Font Loading + Styling Polish

**Goal**: Apply Arabic-optimized font and visual polish
**Estimated Time**: 2-3 hours

### Deliverables
- `fonts/` directory with bundled font (if chosen)
- Updated `styles/rtl.css` with font rules
- Visual refinements

### Font Strategy Decision

| Option | Pros | Cons |
|--------|------|------|
| Bundle locally | Guaranteed, no external requests | +200KB size |
| Google Fonts CDN | Small size | External dependency |
| System fonts only | Zero overhead | Less optimal rendering |

**Recommendation**: Bundle **IBM Plex Sans Arabic** (subset: Regular 400 only, ~100KB woff2)

### CSS Implementation

```css
/* styles/rtl.css */

/* Font loading (if bundled) */
@font-face {
  font-family: 'IBM Plex Arabic';
  src: url('../fonts/IBMPlexSansArabic-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Apply font to RTL content (when enabled) */
.arabic-font-enabled .claude-rtl-detected,
.arabic-font-enabled [dir="rtl"] {
  font-family: 'IBM Plex Arabic', 'Segoe UI', Tahoma, Arial, sans-serif;
}

/* Typography refinements for Arabic */
.claude-rtl-detected,
[dir="rtl"] {
  line-height: 1.7;        /* Arabic needs more line height */
  letter-spacing: 0;       /* No extra spacing for Arabic */
}

/* Ensure English within RTL still looks good */
.claude-rtl-detected code,
.claude-rtl-detected .english-text {
  font-family: inherit;    /* Use Claude's default for code */
}
```

### Conditional Font Loading

```javascript
// content/content.js

async function applyFontSetting(enabled) {
  if (enabled) {
    document.body.classList.add('arabic-font-enabled');
  } else {
    document.body.classList.remove('arabic-font-enabled');
  }
}
```

### Testing Strategy
1. Enable Arabic font — verify it applies to Arabic text
2. Verify English text uses Claude's default font
3. Toggle setting off — verify font reverts
4. Test with slow network (throttle) — verify no FOUT issues

### Dependencies
- Phase 5 complete
- Font files obtained and licensed

---

## Phase 7: Testing, Documentation, and Polish

**Goal**: Comprehensive testing and documentation
**Estimated Time**: 3-4 hours

### Deliverables
- `docs/TESTING.md` — Manual test checklist
- `docs/KNOWN-ISSUES.md` — Documented limitations
- `README.md` — User documentation (Arabic + English)
- Final polished icons

### Testing Checklist

#### Functional Tests
- [ ] Pure Arabic messages render RTL
- [ ] Pure English messages render LTR
- [ ] Mixed paragraphs detected correctly
- [ ] Code blocks always LTR
- [ ] Inline code in Arabic renders correctly
- [ ] Streaming responses handled without flicker
- [ ] Settings persist across browser restart
- [ ] All popup controls functional
- [ ] Arabic font applies when enabled
- [ ] Extension disabled = no page modifications

#### Edge Case Tests
- [ ] Numbers at start of Arabic sentence
- [ ] Punctuation at start of sentence
- [ ] Emoji mixed with Arabic
- [ ] Very long messages (1000+ words)
- [ ] Nested lists with mixed content
- [ ] Arabic URLs/links
- [ ] Edit/regenerate message
- [ ] Multiple conversation tabs

#### Compatibility Tests
- [ ] Firefox 109+
- [ ] Firefox Developer Edition
- [ ] Private browsing mode
- [ ] With uBlock Origin
- [ ] Windows / macOS / Linux

#### Performance Tests
- [ ] No visible lag during streaming
- [ ] Memory usage stable over time
- [ ] No console errors

### Known Limitations (Expected)

Document these in `KNOWN-ISSUES.md`:

1. **User input styling**: Depends on Phase 0.5 findings
2. **Claude.ai only**: Other sites not supported
3. **Mobile web**: May have different DOM structure
4. **Artifacts**: Rendered HTML previews may not be styled
5. **DOM changes**: Claude UI updates may break selectors

### Dependencies
- All previous phases complete

---

## Phase Timeline Summary

| Phase | Description | Estimated Hours |
|-------|-------------|-----------------|
| 0 | Project scaffold | 1-2 |
| 0.5 | DOM reconnaissance | 2-3 |
| 1 | Basic Arabic detection | 4-5 |
| 2 | Mixed-content handling | 3-4 |
| 3 | Code block preservation | 2-3 |
| 4 | Dynamic observation | 4-5 |
| 5 | Settings popup | 3-4 |
| 6 | Font + polish | 2-3 |
| 7 | Testing + docs | 3-4 |
| **Total** | | **24-33 hours** |

---

## Open Questions (Updated)

### Resolved by Reference Analysis

| Question | Resolution |
|----------|------------|
| Claude.ai selectors | Use Now2ai's: `[data-is-streaming]`, `.font-claude-message` (validate in 0.5) |
| Arabic regex | `[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]` |
| MutationObserver config | `childList + subtree + attributes` with `requestAnimationFrame` debounce |
| React resilience | Dual approach: `dir` attribute + inline style with `!important` |

### Still Requiring Decision

1. **User input styling**: Should the extension style the input textarea/contenteditable while typing? (Recommendation: Yes, via `dir="auto"`)

2. **Font bundling**: Bundle IBM Plex Arabic (~100KB) or use system fonts only?

3. **Force-RTL mode**: In "Force RTL" mode, should code blocks remain LTR? (Recommendation: Yes, always)

4. **Storage sync**: Use `browser.storage.sync` for cross-device sync or `local` only?

5. **Visual indicator**: Add subtle badge on processed messages for debugging? (Recommendation: No, keep clean)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Claude.ai Page                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│  │   Message    │     │   Message    │     │   Streaming  │   │
│  │  Container   │     │  Container   │     │   Response   │   │
│  │  [complete]  │     │  [complete]  │     │  [active]    │   │
│  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘   │
│         │                    │                    │            │
│         └────────────────────┼────────────────────┘            │
│                              │                                 │
│                              ▼                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                   MutationObserver                        │ │
│  │    - childList: true                                      │ │
│  │    - subtree: true                                        │ │
│  │    - attributes: [data-is-streaming, class]               │ │
│  └───────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │               requestAnimationFrame Debounce              │ │
│  └───────────────────────────────────────────────────────────┘ │
│                              │                                 │
│                              ▼                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Element Processor                       │ │
│  │                                                            │ │
│  │  1. Check: Is element protected? (code/math) → SKIP       │ │
│  │  2. Check: Is element already processed? → SKIP           │ │
│  │  3. Check: Is element streaming? → Apply dir="auto"       │ │
│  │  4. Detect: First-strong character → 'rtl' or 'ltr'       │ │
│  │  5. Apply: dir attribute + inline style + class           │ │
│  │  6. Track: Add to WeakSet                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        Extension Popup                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐                                            │
│  │  Toggle: On/Off │ ──────► browser.storage.local             │
│  │  Font: On/Off   │                    │                       │
│  │  Mode: Auto     │                    │                       │
│  └─────────────────┘                    │                       │
│                                         ▼                       │
│                              storage.onChanged                  │
│                                         │                       │
│                                         ▼                       │
│                              Content Script reacts              │
└─────────────────────────────────────────────────────────────────┘
```

---

*This revised plan incorporates concrete patterns from reference extensions. Ready for Phase 0 implementation upon approval.*
