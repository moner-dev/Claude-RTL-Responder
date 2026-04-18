# Reference Analysis: Open-Source RTL Extensions for Claude.ai

This document analyzes three open-source RTL extensions to extract best practices for the Claude RTL Responder extension. **All analysis is filtered for Arabic-only relevance per project constraints.**

---

## Executive Summary

| Aspect | ai_rtl_extension | rtl-toggle | Now2ai-RTL-Fixer |
|--------|------------------|------------|------------------|
| **License** | MIT | MIT | GPL-3.0 |
| **Manifest Version** | V3 | V3 | V3 |
| **Arabic Detection** | None (force RTL) | None (toggle) | Regex-based |
| **Claude.ai Support** | Yes | Generic | Yes |
| **Code Preservation** | CSS-based | None | CSS + isolate |
| **MutationObserver** | Basic | None | Comprehensive |
| **Complexity** | Low | Minimal | High |

**Recommendation**: Adopt Now2ai-RTL-Fixer's architecture with ai_rtl_extension's simplicity. Use Now2ai's Claude selectors and observer pattern, but simplify the config system and use Arabic-only detection.

---

## Repository 1: ai_rtl_extension

**Repository**: https://github.com/pouriasabaghi/ai_rtl_extension
**License**: MIT
**Approach**: Force RTL via `dir="rtl"` attribute on target elements

### Arabic Detection

**None.** This extension does not detect Arabic text. It blindly applies `dir="rtl"` to all matched elements when enabled for a platform.

```javascript
// From content.js - no text analysis, just attribute setting
function setAutoDirection({ aiResponseSelector, propmtInputSelector }) {
  const elements = document.querySelectorAll(aiResponseSelector);
  elements.forEach((element) => {
    if (!element.hasAttribute("dir") || element.getAttribute("dir") !== "rtl") {
      element.setAttribute("dir", "rtl");
    }
  });
}
```

### DOM Targeting for Claude.ai

```javascript
// From background.js
{
  key: "claude",
  aiResponseSelector: "[data-is-streaming]",
}
```

**Selector**: `[data-is-streaming]`

**Analysis**: This selector targets Claude's streaming response container. It's simple but limited—it only catches actively streaming responses, not completed messages.

### Code Block Preservation

```javascript
// From content.js - injected CSS
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    pre,code{ direction:ltr !important;text-align:left !important;}
  </style>`
);
```

**Approach**: Global CSS rule forcing `pre` and `code` elements to LTR. Simple but effective.

### MutationObserver Strategy

```javascript
// From content.js
function createObserver(request) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        setAutoDirection(request);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}
```

**Configuration**:
- `childList: true` — watches for added/removed nodes
- `subtree: true` — watches entire DOM tree

**Debouncing**: None. Reprocesses on every mutation.

**Processed Node Tracking**: None. Re-queries all elements on each mutation.

### Strengths
1. Simple, readable code
2. Effective code block preservation via CSS
3. Per-platform configuration system
4. Clean enable/disable toggle

### Weaknesses
1. No Arabic text detection — forces RTL on everything
2. No debouncing — potential performance issues during streaming
3. No processed node tracking — redundant work
4. Limited Claude selector — misses non-streaming content

---

## Repository 2: rtl-toggle

**Repository**: https://github.com/arismag/rtl-toggle
**License**: MIT
**Approach**: Document-level direction toggle

### Arabic Detection

**None.** This is a manual toggle that flips the entire page's direction.

```javascript
// From rtl-toggle.js
if (document.documentElement.getAttribute('dir') == null ||
    document.documentElement.getAttribute('dir') != 'rtl') {
  document.documentElement.setAttribute('dir', 'rtl');
} else {
  document.documentElement.setAttribute('dir', 'ltr');
}
```

### DOM Targeting

**Document-level only.** Sets `dir` on `<html>` element, affecting entire page.

### Code Block Preservation

**None.** No special handling for code blocks.

### MutationObserver Strategy

**None.** No DOM observation.

### Strengths
1. Extremely simple — ~20 lines of code
2. Zero performance overhead
3. Good for manual control

### Weaknesses
1. Too coarse-grained for mixed content
2. No automatic detection
3. No element-level control
4. Not suitable for AI chat interfaces

**Verdict**: Not applicable to our use case, but demonstrates the minimal toggle pattern.

---

## Repository 3: Now2ai-RTL-Fixer

**Repository**: https://github.com/idanmashaal/Now2ai-RTL-Fixer
**License**: GPL-3.0
**Approach**: Config-driven, auto-detection with `dir="auto"`

### Arabic Detection

Uses regex-based RTL character detection (includes Hebrew — we'll extract Arabic-only):

```javascript
// From src/utils/utils.js
export function hasRTLCharacters(text) {
  const rtlRanges = [
    /[\u0591-\u07FF]/, // Hebrew, Arabic, Syriac, Thaana
    /[\uFB1D-\uFDFD]/, // Hebrew and Arabic presentation forms
    /[\uFE70-\uFEFC]/, // Arabic presentation forms-B
  ];
  return rtlRanges.some((range) => range.test(text));
}
```

**Arabic-Only Extraction** (for our use):
```javascript
// Arabic Unicode ranges only
const ARABIC_RANGES = [
  /[\u0600-\u06FF]/,  // Arabic (main block)
  /[\u0750-\u077F]/,  // Arabic Supplement
  /[\u08A0-\u08FF]/,  // Arabic Extended-A
  /[\uFB50-\uFDFF]/,  // Arabic Presentation Forms-A
  /[\uFE70-\uFEFF]/,  // Arabic Presentation Forms-B
];
```

### DOM Targeting for Claude.ai

From `src/config/json/domains_config.json`:

```json
{
  "domain": "^(?:[^.]+\\.)?claude\\.ai$",
  "selectors": {
    "attributes": [
      { "selector": "contenteditable", "classes": ["rtl-auto"] },
      { "selector": "data-is-streaming", "classes": ["rtl-auto"] }
    ],
    "tags": [
      { "selector": "textarea", "classes": ["rtl-auto"] }
    ],
    "classes": [
      { "selector": "font-claude-message", "classes": ["rtl-auto"] },
      { "selector": "grid", "classes": ["rtl-auto"] },
      { "selector": "flex", "classes": ["rtl-auto"] },
      { "selector": "textarea", "classes": ["rtl-auto"] }
    ]
  }
}
```

**Key Claude.ai Selectors**:
| Type | Selector | Purpose |
|------|----------|---------|
| Attribute | `[data-is-streaming]` | Streaming response container |
| Attribute | `[contenteditable]` | Input field |
| Class | `.font-claude-message` | Claude's message text styling |
| Tag | `textarea` | Text input areas |

**Combined Selector**:
```css
[contenteditable],
[data-is-streaming],
textarea,
.font-claude-message
```

### Code Block Preservation

Uses `unicode-bidi: isolate` combined with `direction: auto`:

```json
// From styles_config.json
{
  "rtl-auto": {
    "cssRules": {
      "unicode-bidi": "isolate !important",
      "direction": "auto !important",
      "dir": "auto"
    }
  },
  "ltr-force": {
    "cssRules": {
      "direction": "ltr !important",
      "dir": "ltr"
    }
  }
}
```

**Key Insight**: Uses `direction: auto` rather than `direction: rtl`. This lets the browser's Unicode Bidirectional Algorithm determine direction based on content, which is more robust for mixed content.

### MutationObserver Strategy

From `src/core/dom-observer.js`:

```javascript
// Observer configuration
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: [
    ...domainConfig.selectors.attributes.map(({ selector }) => selector),
    "class",
    "style",
    "dir",
  ],
};

observer.observe(document.body, observerConfig);
```

**Features**:
1. **Attribute watching**: Monitors `class`, `style`, `dir` changes
2. **Processed tracking**: Uses `WeakMap` to avoid reprocessing
3. **Async processing**: Handlers are async for non-blocking

```javascript
// WeakMap for tracking processed elements
const processedElements = new WeakMap();

export function isElementProcessed(element) {
  return processedElements.has(element);
}
```

### CSS Application Strategy

```javascript
// From rtl-handler.js
export async function applyRTLStyles(element) {
  if (processedElements.has(element)) return;

  // Clear conflicting inline styles first
  const directionProps = ["direction", "unicode-bidi"];
  directionProps.forEach((prop) => {
    if (element.style[prop]) {
      element.style.removeProperty(prop);
    }
  });

  // Apply with !important
  Object.entries(rules).forEach(([prop, value]) => {
    if (prop === "dir") {
      element.setAttribute(prop, value);
    } else {
      const cleanValue = value.replace(" !important", "");
      element.style.setProperty(prop, cleanValue, "important");
    }
  });

  processedElements.set(element, new Set(classNames));
}
```

**Key Pattern**: Sets both the `dir` attribute AND inline styles with `!important` to override React's styling.

### Strengths
1. Sophisticated config system
2. Comprehensive Claude.ai selectors
3. `WeakMap` for memory-efficient tracking
4. `direction: auto` leverages browser's Unicode bidi algorithm
5. Handles React re-renders via `!important` + attribute setting
6. Visibility change handling for tab focus

### Weaknesses
1. Over-engineered (webpack build, background fetch, multiple config files)
2. Mixes Hebrew with Arabic in detection regex
3. GPL-3.0 license (more restrictive)
4. `.grid` and `.flex` selectors are overly broad

---

## Comparative Analysis

### Arabic Detection Comparison

| Extension | Method | Arabic Ranges |
|-----------|--------|---------------|
| ai_rtl_extension | None | N/A |
| rtl-toggle | None | N/A |
| Now2ai-RTL-Fixer | Regex | Mixed (Hebrew + Arabic) |

**Recommendation**: Use Now2ai's approach but with Arabic-only ranges:

```javascript
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function hasArabicCharacters(text) {
  return ARABIC_REGEX.test(text);
}

function getFirstStrongDirection(text) {
  // First-strong character algorithm
  for (const char of text) {
    if (ARABIC_REGEX.test(char)) return 'rtl';
    if (/[A-Za-z]/.test(char)) return 'ltr';
  }
  return 'ltr'; // Default to LTR for neutral-only text
}
```

### Claude.ai Selectors Comparison

| Extension | Selectors |
|-----------|-----------|
| ai_rtl_extension | `[data-is-streaming]` |
| Now2ai-RTL-Fixer | `[data-is-streaming]`, `[contenteditable]`, `.font-claude-message`, `textarea` |

**Best-of-Breed Selectors for Claude.ai**:

```javascript
const CLAUDE_SELECTORS = {
  // Message containers
  streaming: '[data-is-streaming]',
  messageText: '.font-claude-message',

  // Input areas
  input: '[contenteditable]',
  textarea: 'textarea',

  // Combined selector for all RTL-eligible elements
  all: '[data-is-streaming], .font-claude-message, [contenteditable], textarea'
};

// Elements to EXCLUDE (always LTR)
const PROTECTED_SELECTORS = {
  code: 'pre, code, [data-language], .code-block',
  math: '.katex, .katex-mathml, .katex-html, math'
};
```

### MutationObserver Comparison

| Extension | childList | subtree | attributes | Debouncing | Tracking |
|-----------|-----------|---------|------------|------------|----------|
| ai_rtl_extension | Yes | Yes | No | No | No |
| rtl-toggle | N/A | N/A | N/A | N/A | N/A |
| Now2ai-RTL-Fixer | Yes | Yes | Yes | No | WeakMap |

**Recommended Configuration**:

```javascript
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['data-is-streaming', 'class', 'dir'],
  characterData: false // Not needed, adds overhead
};
```

**Debouncing Strategy** (missing from both):

```javascript
let pendingProcess = null;

function scheduleProcessing() {
  if (pendingProcess) return;
  pendingProcess = requestAnimationFrame(() => {
    processNewElements();
    pendingProcess = null;
  });
}
```

### CSS Strategy Comparison

| Extension | Direction Value | Bidi | Attribute | Inline Style |
|-----------|-----------------|------|-----------|--------------|
| ai_rtl_extension | `rtl` (forced) | None | Yes | No |
| Now2ai-RTL-Fixer | `auto` | `isolate` | Yes | Yes + !important |

**Recommendation**: Use Now2ai's dual approach (attribute + inline style) for React resilience:

```css
/* Injected stylesheet */
.rtl-auto {
  direction: auto !important;
  unicode-bidi: isolate !important;
  text-align: start !important;
}

pre, code, [data-language] {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  text-align: left !important;
}
```

---

## Best-of-Breed Recommendations

### 1. Arabic Detection (from Now2ai, simplified)

```javascript
// Arabic-only Unicode regex
const ARABIC_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function detectDirection(text) {
  const stripped = text.replace(/[\s\d\p{P}]/gu, ''); // Remove whitespace, digits, punctuation
  if (!stripped) return 'ltr';

  for (const char of stripped) {
    if (ARABIC_PATTERN.test(char)) return 'rtl';
    if (/[A-Za-z]/.test(char)) return 'ltr';
  }
  return 'ltr';
}
```

### 2. DOM Selectors (from Now2ai)

```javascript
const SELECTORS = {
  // Target these for RTL processing
  rtlTargets: [
    '[data-is-streaming]',      // Streaming responses
    '.font-claude-message',      // Message text
    '[contenteditable]',         // Input field
    'textarea'                   // Fallback input
  ].join(', '),

  // Always keep these LTR
  protected: [
    'pre',
    'code',
    '[data-language]',
    '.hljs',                     // Highlight.js
    '.code-block'
  ].join(', ')
};
```

### 3. MutationObserver (hybrid approach)

```javascript
// From Now2ai: comprehensive config
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['data-is-streaming', 'class']
};

// NEW: Add debouncing (missing from all references)
const processedNodes = new WeakSet();
let rafId = null;

const observer = new MutationObserver((mutations) => {
  if (rafId) return; // Already scheduled

  rafId = requestAnimationFrame(() => {
    processMutations(mutations);
    rafId = null;
  });
});
```

### 4. CSS Strategy (from Now2ai, enhanced)

```javascript
// Use dir="auto" for browser-native bidi
function applyDirection(element) {
  if (processedNodes.has(element)) return;
  if (element.closest(SELECTORS.protected)) return;

  // Dual approach for React resilience
  element.setAttribute('dir', 'auto');
  element.style.setProperty('direction', 'auto', 'important');
  element.style.setProperty('unicode-bidi', 'isolate', 'important');

  processedNodes.add(element);
}
```

### 5. Code Block Preservation (from ai_rtl_extension, enhanced)

```css
/* Inject once on load */
pre, code, [data-language], .hljs, .code-block,
pre *, code *, [data-language] * {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  text-align: left !important;
}
```

---

## React Re-render Resilience

Claude.ai is a React application. When React re-renders a component, it may:
1. Remove/recreate DOM nodes (losing our `dir` attributes)
2. Override inline styles
3. Replace className strings

**Strategies from references**:

| Strategy | Source | Effectiveness |
|----------|--------|---------------|
| `!important` inline styles | Now2ai | High |
| Both attribute + style | Now2ai | High |
| Re-process on mutation | Both | High |
| WeakSet/WeakMap tracking | Now2ai | Prevents duplicates |

**Recommended Approach**:
1. Use CSS stylesheet injection for base rules (survives re-renders)
2. Use inline styles with `!important` for dynamic elements
3. Use MutationObserver to catch re-renders and reapply
4. Track with `WeakSet` to avoid redundant processing

---

## Summary: What to Adopt from Each

| Component | Source | Rationale |
|-----------|--------|-----------|
| Claude.ai selectors | Now2ai | Most comprehensive, tested |
| Code block CSS | ai_rtl_extension | Simple, effective |
| `dir="auto"` approach | Now2ai | Leverages browser bidi |
| WeakSet tracking | Now2ai | Memory-efficient |
| Observer config | Now2ai | Includes attribute watching |
| Architecture | ai_rtl_extension | Simpler, no build step |
| Arabic regex | Custom | Extract from Now2ai, Arabic-only |
| Debouncing | NEW | Neither has it, but needed |

---

## Open Items Requiring DOM Reconnaissance

Before implementation, we must verify on live Claude.ai:

1. **Selector validation**: Do `.font-claude-message` and `[data-is-streaming]` still exist?
2. **Code block classes**: What classes does Claude use for syntax highlighting?
3. **Artifact containers**: How are rendered artifacts structured?
4. **Input field**: Is it `[contenteditable]` or `<textarea>` currently?
5. **Message boundaries**: What separates user messages from Claude responses?

These should be documented in Phase 0.5: DOM Reconnaissance.
