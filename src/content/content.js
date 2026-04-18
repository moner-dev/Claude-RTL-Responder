/**
 * Claude RTL Responder - Main Content Script
 *
 * Entry point that coordinates Arabic detection and RTL application
 * on claude.ai pages. Handles initial page scan, ongoing observation,
 * and responds to mode change commands from the popup.
 *
 * Modes:
 *   - 'arabic': Actively applies RTL to Arabic content (default)
 *   - 'english': Fully passive, no DOM modifications
 */

(function() {
  'use strict';

  // Debug flag - set to true during development for console output
  const DEBUG = false;

  const LOG_PREFIX = '[Claude RTL Responder]';
  const VERSION = '0.1.0';
  const STORAGE_KEY = 'claudeRtlMode';
  const OLD_STORAGE_KEY = 'claudeRtlEnabled'; // For backward compatibility
  const RTL_CLASS = 'claude-rtl-active';

  // Mode constants to avoid magic strings
  const MODES = Object.freeze({
    ARABIC: 'arabic',
    ENGLISH: 'english'
  });

  const DEFAULT_MODE = MODES.ARABIC;
  const DEFAULT_COLOR = '#2563eb';

  // Settings storage keys
  const SETTINGS_KEYS = {
    FONT_SIZE: 'claudeRtlFontSize',
    LINE_SPACING: 'claudeRtlLineSpacing',
    INDICATOR: 'claudeRtlIndicator'
  };

  // Default settings
  const DEFAULT_SETTINGS = {
    fontSize: 'medium',
    lineSpacing: 'normal',
    indicator: { enabled: false, color: DEFAULT_COLOR }
  };

  // Color validation regex
  const COLOR_HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

  /**
   * Validate and sanitize a hex color value
   * @param {string} color - Color value to validate
   * @returns {string} Valid hex color or default
   */
  function validateColor(color) {
    if (typeof color === 'string' && COLOR_HEX_REGEX.test(color)) {
      return color;
    }
    console.warn(LOG_PREFIX, 'Invalid color value, using default:', color);
    return DEFAULT_COLOR;
  }

  // Size mappings
  const FONT_SIZE_MAP = {
    small: '0.9em',
    medium: '1em',
    large: '1.15em'
  };

  const LINE_SPACING_MAP = {
    compact: '1.4',
    normal: '1.65',
    relaxed: '1.9'
  };

  // Track processed elements to avoid redundant work
  let processedElements = new WeakSet();

  // Current mode: MODES.ARABIC | MODES.ENGLISH
  let currentMode = DEFAULT_MODE;

  // Current settings
  let currentSettings = { ...DEFAULT_SETTINGS };

  // Dynamic stylesheet element
  let dynamicStylesheet = null;
  const DYNAMIC_STYLE_ID = 'claude-rtl-dynamic-styles';

  /**
   * Create or get the dynamic stylesheet element
   * @returns {HTMLStyleElement}
   */
  function getDynamicStylesheet() {
    if (!dynamicStylesheet) {
      dynamicStylesheet = document.getElementById(DYNAMIC_STYLE_ID);
      if (!dynamicStylesheet) {
        dynamicStylesheet = document.createElement('style');
        dynamicStylesheet.id = DYNAMIC_STYLE_ID;
        dynamicStylesheet.type = 'text/css';
        document.head.appendChild(dynamicStylesheet);
        if (DEBUG) console.log(LOG_PREFIX, 'Created dynamic stylesheet');
      }
    }
    return dynamicStylesheet;
  }

  /**
   * Build CSS rules based on current settings
   * @returns {string}
   */
  function buildDynamicCSS() {
    const fontSize = FONT_SIZE_MAP[currentSettings.fontSize] || FONT_SIZE_MAP.medium;
    const lineHeight = LINE_SPACING_MAP[currentSettings.lineSpacing] || LINE_SPACING_MAP.normal;
    const indicator = currentSettings.indicator || DEFAULT_SETTINGS.indicator;
    const indicatorColor = validateColor(indicator.color);

    let css = `
/* Claude RTL Responder - Dynamic Styles */
.${RTL_CLASS} {
  font-size: ${fontSize} !important;
  line-height: ${lineHeight} !important;
}

.${RTL_CLASS} p,
.${RTL_CLASS} div,
.${RTL_CLASS} span,
.${RTL_CLASS} li {
  font-size: inherit !important;
  line-height: inherit !important;
}
`;

    // Add RTL indicator styles if enabled
    if (indicator.enabled) {
      css += `
/* RTL Indicator */
.${RTL_CLASS}::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${indicatorColor};
  margin-left: 6px;
  margin-right: 0;
  vertical-align: middle;
  box-shadow: 0 0 3px ${indicatorColor}80;
  flex-shrink: 0;
}
`;
    }

    return css;
  }

  /**
   * Apply dynamic styles based on current settings
   */
  function applyDynamicStyles() {
    if (currentMode !== MODES.ARABIC) {
      // In English mode, clear dynamic styles
      clearDynamicStyles();
      return;
    }

    const stylesheet = getDynamicStylesheet();
    const css = buildDynamicCSS();
    stylesheet.textContent = css;
    if (DEBUG) console.log(LOG_PREFIX, 'Applied dynamic styles:', currentSettings);
  }

  /**
   * Clear all dynamic styles
   */
  function clearDynamicStyles() {
    if (dynamicStylesheet) {
      dynamicStylesheet.textContent = '';
      if (DEBUG) console.log(LOG_PREFIX, 'Cleared dynamic styles');
    }
  }

  /**
   * Load settings from storage
   * @returns {Promise<Object>}
   */
  async function loadSettings() {
    try {
      const result = await browserAPI.storage.local.get([
        SETTINGS_KEYS.FONT_SIZE,
        SETTINGS_KEYS.LINE_SPACING,
        SETTINGS_KEYS.INDICATOR
      ]);

      currentSettings = {
        fontSize: result[SETTINGS_KEYS.FONT_SIZE] || DEFAULT_SETTINGS.fontSize,
        lineSpacing: result[SETTINGS_KEYS.LINE_SPACING] || DEFAULT_SETTINGS.lineSpacing,
        indicator: result[SETTINGS_KEYS.INDICATOR] || { ...DEFAULT_SETTINGS.indicator }
      };

      if (DEBUG) console.log(LOG_PREFIX, 'Loaded settings:', currentSettings);
      return currentSettings;
    } catch (error) {
      console.error(LOG_PREFIX, 'Error loading settings:', error);
      currentSettings = { ...DEFAULT_SETTINGS };
      return currentSettings;
    }
  }

  /**
   * Update settings and apply changes
   * @param {Object} newSettings
   */
  function updateSettings(newSettings) {
    if (newSettings.fontSize !== undefined) {
      currentSettings.fontSize = newSettings.fontSize;
    }
    if (newSettings.lineSpacing !== undefined) {
      currentSettings.lineSpacing = newSettings.lineSpacing;
    }
    if (newSettings.indicator !== undefined) {
      currentSettings.indicator = newSettings.indicator;
    }

    if (DEBUG) console.log(LOG_PREFIX, 'Updated settings:', currentSettings);
    applyDynamicStyles();
  }

  /**
   * Apply RTL direction to an element using dual-write strategy
   * (attribute + class + inline styles for React resilience)
   * @param {HTMLElement} element
   */
  function applyRTL(element) {
    // Set dir attribute
    element.setAttribute('dir', 'auto');

    // Add CSS class for stylesheet rules
    element.classList.add(RTL_CLASS);

    // Apply inline styles with !important for React resilience
    element.style.setProperty('direction', 'auto', 'important');
    element.style.setProperty('unicode-bidi', 'isolate', 'important');
    element.style.setProperty('text-align', 'start', 'important');
  }

  /**
   * Remove RTL direction from an element
   * @param {HTMLElement} element
   */
  function removeRTL(element) {
    element.removeAttribute('dir');
    element.classList.remove(RTL_CLASS);
    element.style.removeProperty('direction');
    element.style.removeProperty('unicode-bidi');
    element.style.removeProperty('text-align');
  }

  /**
   * Process a single element for RTL application
   * @param {HTMLElement} element
   */
  function processElement(element) {
    // Only process in Arabic mode
    if (currentMode !== MODES.ARABIC) return;

    const detector = window.ClaudeRTL?.detector;
    if (!detector) {
      console.error(LOG_PREFIX, 'Detector module not loaded');
      return;
    }

    // Skip if already processed and unchanged
    const wasProcessed = processedElements.has(element);

    // Check if element should have RTL applied
    if (detector.shouldApplyRTL(element)) {
      // Apply RTL if not already applied
      if (!element.classList.contains(RTL_CLASS)) {
        applyRTL(element);
        if (DEBUG) console.log(LOG_PREFIX, 'Applied RTL to:', element.tagName, element.className?.substring(0, 30));
      }
      processedElements.add(element);
    } else if (wasProcessed && element.classList.contains(RTL_CLASS)) {
      // Element was processed before but no longer needs RTL (e.g., text changed)
      removeRTL(element);
      if (DEBUG) console.log(LOG_PREFIX, 'Removed RTL from:', element.tagName);
    }
  }

  /**
   * Scan all existing elements on the page and apply RTL where needed
   */
  function scanExistingElements() {
    const detector = window.ClaudeRTL?.detector;
    if (!detector) {
      console.error(LOG_PREFIX, 'Detector module not loaded');
      return;
    }

    const targets = document.querySelectorAll(detector.RTL_TARGET_SELECTORS);
    if (DEBUG) console.log(LOG_PREFIX, `Scanning ${targets.length} potential RTL targets`);

    targets.forEach(element => {
      processElement(element);
    });
  }

  /**
   * Clean up all RTL modifications from the page
   * Called when switching to English mode
   */
  function cleanupRTL() {
    // Find all elements with RTL class and remove styling
    const elements = document.querySelectorAll('.' + RTL_CLASS);
    elements.forEach(element => {
      removeRTL(element);
    });

    // Clear the WeakSet by replacing with new empty one
    processedElements = new WeakSet();

    // Clear dynamic styles
    clearDynamicStyles();

    if (DEBUG) console.log(LOG_PREFIX, `Cleaned up RTL from ${elements.length} elements`);
  }

  /**
   * Activate Arabic mode
   * Starts observing and applies RTL to Arabic content
   */
  function activateArabicMode() {
    const wasEnglish = currentMode === MODES.ENGLISH;
    currentMode = MODES.ARABIC;

    if (wasEnglish && DEBUG) {
      console.log(LOG_PREFIX, 'Activated Arabic mode');
    }

    // Apply dynamic styles
    applyDynamicStyles();

    // Scan existing elements
    scanExistingElements();

    // Start observer
    const observer = window.ClaudeRTL?.observer;
    if (observer && !observer.isObserving()) {
      observer.startObserver(processElement);
    }
  }

  /**
   * Activate English mode
   * Stops observing and removes all RTL modifications
   */
  function activateEnglishMode() {
    if (currentMode === MODES.ENGLISH) return;

    currentMode = MODES.ENGLISH;
    if (DEBUG) console.log(LOG_PREFIX, 'Activated English mode (passive)');

    // Stop observer first
    const observer = window.ClaudeRTL?.observer;
    if (observer) {
      observer.stopObserver();
    }

    // Clean up all RTL styling (including dynamic styles)
    cleanupRTL();
  }

  /**
   * Set the current mode
   * @param {'arabic' | 'english'} mode
   */
  function setMode(mode) {
    if (mode === MODES.ARABIC) {
      activateArabicMode();
    } else if (mode === MODES.ENGLISH) {
      activateEnglishMode();
    } else {
      console.warn(LOG_PREFIX, 'Unknown mode:', mode);
    }
  }

  /**
   * Load mode from storage with backward compatibility
   * @returns {Promise<'arabic' | 'english'>}
   */
  async function loadMode() {
    try {
      const result = await browserAPI.storage.local.get([STORAGE_KEY, OLD_STORAGE_KEY]);

      // Check for new storage format first
      if (result[STORAGE_KEY]) {
        if (DEBUG) console.log(LOG_PREFIX, 'Loaded mode from storage:', result[STORAGE_KEY]);
        return result[STORAGE_KEY];
      }

      // Backward compatibility: migrate from old boolean format
      if (result[OLD_STORAGE_KEY] !== undefined) {
        const migratedMode = result[OLD_STORAGE_KEY] === false ? MODES.ENGLISH : MODES.ARABIC;
        if (DEBUG) console.log(LOG_PREFIX, 'Migrating old storage format:', migratedMode);

        // Save in new format and remove old key
        await browserAPI.storage.local.set({ [STORAGE_KEY]: migratedMode });
        await browserAPI.storage.local.remove(OLD_STORAGE_KEY);

        return migratedMode;
      }

      // Default to arabic
      if (DEBUG) console.log(LOG_PREFIX, 'No saved mode, using default:', DEFAULT_MODE);
      return DEFAULT_MODE;
    } catch (error) {
      console.error(LOG_PREFIX, 'Error loading mode:', error);
      return DEFAULT_MODE;
    }
  }

  /**
   * Handle messages from popup and options page
   */
  function setupMessageListener() {
    browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Validate sender is our own extension
      if (sender.id !== browserAPI.runtime.id) return;

      if (DEBUG) console.log(LOG_PREFIX, 'Received message:', message);

      // Handle MODE_CHANGE message
      if (message.type === 'MODE_CHANGE') {
        const newMode = message.mode;
        setMode(newMode);
        sendResponse({ success: true, mode: currentMode });
        return true;
      }

      // Handle SETTINGS_CHANGE message from options page
      if (message.type === 'SETTINGS_CHANGE') {
        updateSettings(message.settings);
        sendResponse({ success: true, settings: currentSettings });
        return true;
      }

      // Legacy message handling for backward compatibility
      switch (message.action) {
        case 'getState':
          sendResponse({ enabled: currentMode === MODES.ARABIC, mode: currentMode });
          break;

        case 'enable':
          setMode(MODES.ARABIC);
          sendResponse({ success: true, enabled: true, mode: MODES.ARABIC });
          break;

        case 'disable':
          setMode(MODES.ENGLISH);
          sendResponse({ success: true, enabled: false, mode: MODES.ENGLISH });
          break;

        case 'toggle':
          const newMode = currentMode === MODES.ARABIC ? MODES.ENGLISH : MODES.ARABIC;
          setMode(newMode);
          sendResponse({ success: true, enabled: newMode === MODES.ARABIC, mode: newMode });
          break;

        default:
          sendResponse({ error: 'Unknown action' });
      }

      return true; // Keep channel open for async response
    });
  }

  /**
   * Initialize the extension
   */
  async function initialize() {
    if (DEBUG) console.log(LOG_PREFIX, `Content script loaded on ${window.location.hostname} (v${VERSION})`);

    // Wait for detector and observer modules to load
    if (!window.ClaudeRTL?.detector || !window.ClaudeRTL?.observer) {
      console.error(LOG_PREFIX, 'Required modules not loaded. Check manifest script order.');
      return;
    }

    // Set up message listener for popup/options communication
    setupMessageListener();

    // Load saved mode
    const savedMode = await loadMode();
    currentMode = savedMode;

    // Load saved settings
    await loadSettings();

    if (currentMode === MODES.ARABIC) {
      // Apply dynamic styles
      applyDynamicStyles();

      // Start observing for new content FIRST to avoid race condition
      // Any DOM mutations during scan will be captured by the observer
      window.ClaudeRTL.observer.startObserver(processElement);

      // Then scan existing elements
      scanExistingElements();
    } else {
      if (DEBUG) console.log(LOG_PREFIX, 'English mode - staying passive');
    }

    if (DEBUG) console.log(LOG_PREFIX, 'Initialization complete, mode:', currentMode);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded, initialize immediately
    initialize();
  }

})();
