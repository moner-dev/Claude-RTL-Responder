/**
 * Claude RTL Responder - Background Script
 *
 * Handles keyboard commands that require access to storage + tabs.
 * The `_execute_action` command is handled natively by Firefox and
 * does not need a listener here.
 *
 * Storage key: 'claudeRtlMode' (consistent with popup.js and content.js)
 * Values: MODES.ARABIC | MODES.ENGLISH (default: MODES.ARABIC)
 */

// Debug flag - set to true during development for console output
const DEBUG = false;

const LOG_PREFIX = '[Claude RTL Responder]';
const STORAGE_KEY = 'claudeRtlMode';

// Mode constants to avoid magic strings
const MODES = Object.freeze({
  ARABIC: 'arabic',
  ENGLISH: 'english'
});

const DEFAULT_MODE = MODES.ARABIC;

browser.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-mode') return;

  try {
    // Read current mode (default to MODES.ARABIC if never set)
    const stored = await browser.storage.local.get(STORAGE_KEY);
    const currentMode = stored[STORAGE_KEY] === MODES.ENGLISH ? MODES.ENGLISH : MODES.ARABIC;
    const newMode = currentMode === MODES.ARABIC ? MODES.ENGLISH : MODES.ARABIC;

    // Persist the new mode
    await browser.storage.local.set({ [STORAGE_KEY]: newMode });

    // Notify the active claude.ai tab (if any)
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
      url: ['*://claude.ai/*', '*://*.claude.ai/*']
    });

    for (const tab of tabs) {
      try {
        await browser.tabs.sendMessage(tab.id, {
          type: 'MODE_CHANGE',
          mode: newMode
        });
      } catch (err) {
        // Content script not loaded in this tab - expected if user just opened claude.ai
        if (DEBUG) console.log(LOG_PREFIX, 'No content script in tab', tab.id);
      }
    }

    if (DEBUG) console.log(LOG_PREFIX, 'Mode toggled via keyboard:', newMode);
  } catch (err) {
    console.error(LOG_PREFIX, 'Toggle command failed:', err);
  }
});

if (DEBUG) console.log(LOG_PREFIX, 'Background script loaded');
