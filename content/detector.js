/**
 * Claude RTL Responder - Arabic Detection Module
 *
 * Provides functions to detect Arabic text and determine
 * if RTL direction should be applied to elements.
 *
 * SCOPE: Arabic language ONLY - no Hebrew, Farsi, or other RTL scripts
 *
 * SELECTORS: Verified against live claude.ai DOM (not from outdated references)
 */

// Arabic Unicode ranges (comprehensive coverage)
// - \u0600-\u06FF: Arabic (main block - 255 characters)
// - \u0750-\u077F: Arabic Supplement (48 characters)
// - \u08A0-\u08FF: Arabic Extended-A (96 characters)
// - \uFB50-\uFDFF: Arabic Presentation Forms-A (688 characters)
// - \uFE70-\uFEFF: Arabic Presentation Forms-B (144 characters)
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

// Latin alphabet for LTR detection (basic + extended)
const LATIN_REGEX = /[A-Za-z\u00C0-\u024F]/;

// Selectors for elements that should receive RTL treatment
// VERIFIED against live claude.ai DOM - NOT from outdated references
const RTL_TARGET_SELECTORS = [
  '[data-is-streaming]',              // Streaming response container
  '.font-claude-response',            // Claude's response wrapper (NOT .font-claude-message)
  '.font-claude-response-body',       // Individual paragraphs inside Claude's response
  '[data-testid="user-message"]',     // User's sent messages
  '.font-user-message',               // User message class
  '[contenteditable="true"]',         // Rich text input field
  'textarea'                          // Fallback text input
].join(', ');

// Selectors for elements that must ALWAYS remain LTR
const PROTECTED_SELECTORS = [
  'pre',
  'code',
  '[data-language]',
  '.hljs',
  '.code-block',
  '.katex',
  '.katex-mathml',
  '.katex-html',
  'math',
  'svg',
  'iframe'  // Artifact iframes - cross-origin, don't touch
].join(', ');

/**
 * Check if text contains any Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic
 */
function hasArabic(text) {
  if (!text || typeof text !== 'string') return false;
  return ARABIC_REGEX.test(text);
}

/**
 * Get the dominant text direction based on first strong directional character
 * (First-strong algorithm as per Unicode Bidi spec)
 * @param {string} text - Text to analyze
 * @returns {'rtl' | 'ltr' | 'neutral'} Detected direction
 */
function getTextDirection(text) {
  if (!text || typeof text !== 'string') return 'neutral';

  // Iterate through characters to find first strong directional char
  for (const char of text) {
    if (ARABIC_REGEX.test(char)) return 'rtl';
    if (LATIN_REGEX.test(char)) return 'ltr';
  }

  return 'neutral'; // Only neutral characters (numbers, punctuation, whitespace)
}

/**
 * Check if an element is protected from RTL application
 * @param {Element} element - Element to check
 * @returns {boolean} True if element should NOT have RTL applied
 */
function isProtectedElement(element) {
  if (!element || !(element instanceof Element)) return true;

  // Check if element itself matches protected selectors
  if (element.matches(PROTECTED_SELECTORS)) return true;

  // Check if element is inside a protected ancestor
  if (element.closest(PROTECTED_SELECTORS)) return true;

  return false;
}

/**
 * Check if an element is a valid RTL target
 * @param {Element} element - Element to check
 * @returns {boolean} True if element matches RTL target selectors
 */
function isRTLTarget(element) {
  if (!element || !(element instanceof Element)) return false;
  return element.matches(RTL_TARGET_SELECTORS);
}

/**
 * Determine if RTL should be applied to an element
 * @param {Element} element - Element to check
 * @returns {boolean} True if RTL should be applied
 */
function shouldApplyRTL(element) {
  // Must be a valid element
  if (!element || !(element instanceof Element)) return false;

  // Must not be protected
  if (isProtectedElement(element)) return false;

  // Get text content
  const text = element.textContent || '';

  // Skip empty or whitespace-only content
  if (!text.trim()) return false;

  // Check if contains Arabic
  return hasArabic(text);
}

// Export for use in content.js
window.ClaudeRTL = window.ClaudeRTL || {};
window.ClaudeRTL.detector = {
  hasArabic,
  getTextDirection,
  isProtectedElement,
  isRTLTarget,
  shouldApplyRTL,
  RTL_TARGET_SELECTORS,
  PROTECTED_SELECTORS
};
