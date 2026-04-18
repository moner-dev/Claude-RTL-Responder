/**
 * Claude RTL Responder - Browser API Polyfill
 *
 * This polyfill provides a unified `browserAPI` namespace that works
 * consistently across Firefox and Chrome browsers.
 *
 * WHY THIS EXISTS:
 * - Firefox uses the `browser.*` namespace with Promise-based APIs
 * - Chrome uses the `chrome.*` namespace (MV3 added Promise support)
 * - This polyfill detects which environment we're in and exposes
 *   a single `browserAPI` object that all extension code can use
 *
 * USAGE:
 * - All extension JavaScript should use `browserAPI.*` instead of
 *   `browser.*` or `chrome.*` directly
 * - This file MUST be loaded before any other extension scripts
 *
 * SUPPORTED APIs:
 * - browserAPI.storage.local.get/set/remove
 * - browserAPI.tabs.query/sendMessage
 * - browserAPI.runtime.onMessage/sendMessage/openOptionsPage/id
 * - browserAPI.commands.onCommand
 */

(function() {
  'use strict';

  // Detect browser environment and assign the appropriate API namespace
  // Firefox: `browser` is defined and preferred
  // Chrome: `chrome` is defined, `browser` may be undefined
  if (typeof globalThis.browserAPI === 'undefined') {
    if (typeof browser !== 'undefined' && browser.runtime) {
      // Firefox environment - use native browser namespace
      globalThis.browserAPI = browser;
    } else if (typeof chrome !== 'undefined' && chrome.runtime) {
      // Chrome environment - use chrome namespace
      globalThis.browserAPI = chrome;
    } else {
      // Fallback: create a stub to prevent errors during testing
      console.warn('[Browser Polyfill] No browser API detected');
      globalThis.browserAPI = {};
    }
  }
})();
