/**
 * Claude RTL Responder - Popup Script
 *
 * Handles the mode selector (Arabic/English) and communicates
 * with the content script to switch modes.
 *
 * Storage schema: { mode: 'arabic' | 'english' }
 * Default: 'arabic'
 */

(function() {
  'use strict';

  // Debug flag - set to true during development for console output
  const DEBUG = false;

  const LOG_PREFIX = '[Claude RTL Responder Popup]';
  const STORAGE_KEY = 'claudeRtlMode';
  const OLD_STORAGE_KEY = 'claudeRtlEnabled'; // For backward compatibility

  // Mode constants to avoid magic strings
  const MODES = Object.freeze({
    ARABIC: 'arabic',
    ENGLISH: 'english'
  });

  const DEFAULT_MODE = MODES.ARABIC;

  // DOM elements
  let modeArabicBtn = null;
  let modeEnglishBtn = null;
  let statusIndicator = null;
  let statusTextAr = null;
  let statusTextEn = null;

  /**
   * Update the UI to reflect the current mode
   * @param {'arabic' | 'english'} mode
   */
  function updateUI(mode) {
    // Update button states
    if (mode === MODES.ARABIC) {
      modeArabicBtn.classList.add('active');
      modeArabicBtn.setAttribute('aria-checked', 'true');
      modeEnglishBtn.classList.remove('active');
      modeEnglishBtn.setAttribute('aria-checked', 'false');
    } else {
      modeEnglishBtn.classList.add('active');
      modeEnglishBtn.setAttribute('aria-checked', 'true');
      modeArabicBtn.classList.remove('active');
      modeArabicBtn.setAttribute('aria-checked', 'false');
    }

    // Update status indicator
    if (statusIndicator) {
      if (mode === MODES.ARABIC) {
        statusIndicator.classList.remove('status-english');
        statusIndicator.classList.add('status-arabic');
        statusTextAr.textContent = 'مُفعَّل';
        statusTextEn.textContent = 'Arabic Mode Active';
      } else {
        statusIndicator.classList.remove('status-arabic');
        statusIndicator.classList.add('status-english');
        statusTextAr.textContent = 'مُعطَّل';
        statusTextEn.textContent = 'English Mode (No Changes)';
      }
    }
  }

  /**
   * Send mode change message to content script in the active tab
   * @param {'arabic' | 'english'} mode
   * @returns {Promise<Object|null>}
   */
  async function sendModeChange(mode) {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });

      if (tabs.length === 0) {
        if (DEBUG) console.log(LOG_PREFIX, 'No active tab found');
        return null;
      }

      const tab = tabs[0];

      // Check if we're on claude.ai
      if (!tab.url || !tab.url.includes('claude.ai')) {
        if (DEBUG) console.log(LOG_PREFIX, 'Not on claude.ai, updating storage only');
        return null;
      }

      const response = await browser.tabs.sendMessage(tab.id, {
        type: 'MODE_CHANGE',
        mode: mode
      });

      return response;
    } catch (error) {
      console.error(LOG_PREFIX, 'Error sending mode change:', error);
      return null;
    }
  }

  /**
   * Load the current mode from storage with backward compatibility
   * @returns {Promise<'arabic' | 'english'>}
   */
  async function loadMode() {
    try {
      const result = await browser.storage.local.get([STORAGE_KEY, OLD_STORAGE_KEY]);

      // Check for new storage format first
      if (result[STORAGE_KEY]) {
        return result[STORAGE_KEY];
      }

      // Backward compatibility: migrate from old boolean format
      if (result[OLD_STORAGE_KEY] !== undefined) {
        const migratedMode = result[OLD_STORAGE_KEY] === false ? MODES.ENGLISH : MODES.ARABIC;
        if (DEBUG) console.log(LOG_PREFIX, 'Migrating old storage format:', migratedMode);

        // Save in new format and remove old key
        await browser.storage.local.set({ [STORAGE_KEY]: migratedMode });
        await browser.storage.local.remove(OLD_STORAGE_KEY);

        return migratedMode;
      }

      // Default to arabic
      return DEFAULT_MODE;
    } catch (error) {
      console.error(LOG_PREFIX, 'Error loading mode:', error);
      return DEFAULT_MODE;
    }
  }

  /**
   * Save mode to storage
   * @param {'arabic' | 'english'} mode
   */
  async function saveMode(mode) {
    try {
      await browser.storage.local.set({ [STORAGE_KEY]: mode });
      if (DEBUG) console.log(LOG_PREFIX, 'Saved mode:', mode);
    } catch (error) {
      console.error(LOG_PREFIX, 'Error saving mode:', error);
    }
  }

  /**
   * Handle mode button click
   * @param {'arabic' | 'english'} mode
   */
  async function handleModeClick(mode) {
    if (DEBUG) console.log(LOG_PREFIX, 'Mode button clicked:', mode);

    // Update UI immediately for responsiveness
    updateUI(mode);

    // Save to storage
    await saveMode(mode);

    // Send message to content script
    const response = await sendModeChange(mode);

    if (response && DEBUG) {
      console.log(LOG_PREFIX, 'Content script response:', response);
    }
  }

  /**
   * Initialize the popup
   */
  async function initialize() {
    if (DEBUG) console.log(LOG_PREFIX, 'Initializing popup');

    // Get DOM references
    modeArabicBtn = document.getElementById('modeArabic');
    modeEnglishBtn = document.getElementById('modeEnglish');
    statusIndicator = document.getElementById('statusIndicator');
    statusTextAr = statusIndicator?.querySelector('.status-text-ar');
    statusTextEn = statusIndicator?.querySelector('.status-text-en');

    if (!modeArabicBtn || !modeEnglishBtn) {
      console.error(LOG_PREFIX, 'Mode buttons not found');
      return;
    }

    // Load current mode
    const currentMode = await loadMode();
    if (DEBUG) console.log(LOG_PREFIX, 'Current mode:', currentMode);

    // Update UI to reflect current mode
    updateUI(currentMode);

    // Attach event listeners
    modeArabicBtn.addEventListener('click', () => handleModeClick(MODES.ARABIC));
    modeEnglishBtn.addEventListener('click', () => handleModeClick(MODES.ENGLISH));

    // Keyboard navigation for accessibility
    const buttons = [modeArabicBtn, modeEnglishBtn];
    buttons.forEach((btn, index) => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (index + 1) % 2;
          buttons[nextIndex].focus();
          buttons[nextIndex].click();
        }
      });
    });

    // Settings button - opens options page
    const settingsBtn = document.getElementById('openSettings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        browser.runtime.openOptionsPage();
      });
    }

    if (DEBUG) console.log(LOG_PREFIX, 'Popup initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
