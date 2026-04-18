/**
 * Claude RTL Responder - Options Page Script
 *
 * Handles settings UI, live preview updates, storage persistence,
 * and broadcasting settings changes to claude.ai tabs.
 *
 * Storage keys:
 *   - claudeRtlFontSize: 'small' | 'medium' | 'large'
 *   - claudeRtlLineSpacing: 'compact' | 'normal' | 'relaxed'
 *   - claudeRtlIndicator: { enabled: boolean, color: string }
 *   - claudeRtlUiLang: 'ar' | 'en'
 */

(function() {
  'use strict';

  // Debug flag - set to true during development for console output
  const DEBUG = false;

  const LOG_PREFIX = '[Claude RTL Options]';
  const DEFAULT_COLOR = '#2563eb';
  const COLOR_HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

  // Storage keys
  const STORAGE_KEYS = {
    FONT_SIZE: 'claudeRtlFontSize',
    LINE_SPACING: 'claudeRtlLineSpacing',
    INDICATOR: 'claudeRtlIndicator',
    UI_LANG: 'claudeRtlUiLang'
  };

  // Default values
  const DEFAULTS = {
    fontSize: 'medium',
    lineSpacing: 'normal',
    indicator: {
      enabled: false,
      color: DEFAULT_COLOR
    },
    uiLang: 'ar'
  };

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

  // Current settings state
  let currentSettings = {
    fontSize: DEFAULTS.fontSize,
    lineSpacing: DEFAULTS.lineSpacing,
    indicator: { ...DEFAULTS.indicator }
  };

  // Current UI language
  let currentUiLang = DEFAULTS.uiLang;

  // DOM elements
  let previewBox = null;
  let previewIndicator = null;
  let indicatorToggle = null;
  let indicatorColor = null;
  let colorPickerContainer = null;
  let saveToast = null;
  let langSwitchAr = null;
  let langSwitchEn = null;

  // Toast timeout reference
  let toastTimeout = null;

  // Color picker debounce timer
  let colorDebounceTimer = null;
  const COLOR_DEBOUNCE_MS = 150;

  /**
   * Show the save toast notification
   */
  function showSaveToast() {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    saveToast.classList.add('visible');

    toastTimeout = setTimeout(() => {
      saveToast.classList.remove('visible');
    }, 1500);
  }

  /**
   * Broadcast settings change to all open claude.ai tabs
   */
  async function broadcastSettingsChange() {
    try {
      const tabs = await browser.tabs.query({
        url: ['*://claude.ai/*', '*://*.claude.ai/*']
      });

      for (const tab of tabs) {
        try {
          await browser.tabs.sendMessage(tab.id, {
            type: 'SETTINGS_CHANGE',
            settings: currentSettings
          });
          if (DEBUG) console.log(LOG_PREFIX, 'Sent settings to tab:', tab.id);
        } catch (err) {
          // Content script not loaded in this tab - normal for newly opened tabs
          if (DEBUG) console.log(LOG_PREFIX, 'No content script in tab:', tab.id);
        }
      }
    } catch (error) {
      console.error(LOG_PREFIX, 'Error broadcasting settings:', error);
    }
  }

  /**
   * Update the live preview based on current settings
   */
  function updatePreview() {
    if (!previewBox) return;

    // Apply font size
    previewBox.style.fontSize = FONT_SIZE_MAP[currentSettings.fontSize];

    // Apply line spacing
    previewBox.style.lineHeight = LINE_SPACING_MAP[currentSettings.lineSpacing];

    // Apply RTL indicator
    if (currentSettings.indicator.enabled) {
      previewIndicator.style.backgroundColor = currentSettings.indicator.color;
      previewIndicator.style.boxShadow = `0 0 4px ${currentSettings.indicator.color}80`;
      previewIndicator.classList.add('visible');
    } else {
      previewIndicator.classList.remove('visible');
    }

    if (DEBUG) console.log(LOG_PREFIX, 'Preview updated:', currentSettings);
  }

  /**
   * Update UI controls to reflect current settings
   */
  function updateUI() {
    document.querySelectorAll('.section').forEach((section, index) => {
      if (index === 1) { // Font size section (0 is preview)
        const buttons = section.querySelectorAll('.segment-btn');
        buttons.forEach(btn => {
          const isActive = btn.dataset.value === currentSettings.fontSize;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-checked', isActive.toString());
        });
      }
      if (index === 2) { // Line spacing section
        const buttons = section.querySelectorAll('.segment-btn');
        buttons.forEach(btn => {
          const isActive = btn.dataset.value === currentSettings.lineSpacing;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-checked', isActive.toString());
        });
      }
    });

    // Update indicator toggle
    indicatorToggle.checked = currentSettings.indicator.enabled;

    // Update color picker
    indicatorColor.value = currentSettings.indicator.color;

    // Enable/disable color picker based on toggle
    if (currentSettings.indicator.enabled) {
      colorPickerContainer.classList.remove('disabled');
    } else {
      colorPickerContainer.classList.add('disabled');
    }
  }

  /**
   * Update language switcher UI
   */
  function updateLanguageSwitcherUI() {
    if (!langSwitchAr || !langSwitchEn) return;

    if (currentUiLang === 'ar') {
      langSwitchAr.classList.add('active');
      langSwitchEn.classList.remove('active');
    } else {
      langSwitchEn.classList.add('active');
      langSwitchAr.classList.remove('active');
    }
  }

  /**
   * Apply UI language to the page
   */
  function applyUiLanguage() {
    const html = document.documentElement;

    if (currentUiLang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }

    updateLanguageSwitcherUI();
    if (DEBUG) console.log(LOG_PREFIX, 'Applied UI language:', currentUiLang);
  }

  /**
   * Save settings to storage and broadcast to tabs
   */
  async function saveSettings() {
    try {
      await browser.storage.local.set({
        [STORAGE_KEYS.FONT_SIZE]: currentSettings.fontSize,
        [STORAGE_KEYS.LINE_SPACING]: currentSettings.lineSpacing,
        [STORAGE_KEYS.INDICATOR]: currentSettings.indicator
      });

      if (DEBUG) console.log(LOG_PREFIX, 'Settings saved:', currentSettings);
      showSaveToast();

      // Broadcast to all claude.ai tabs
      await broadcastSettingsChange();
    } catch (error) {
      console.error(LOG_PREFIX, 'Error saving settings:', error);
    }
  }

  /**
   * Save UI language to storage
   */
  async function saveUiLanguage() {
    try {
      await browser.storage.local.set({
        [STORAGE_KEYS.UI_LANG]: currentUiLang
      });
      if (DEBUG) console.log(LOG_PREFIX, 'UI language saved:', currentUiLang);
    } catch (error) {
      console.error(LOG_PREFIX, 'Error saving UI language:', error);
    }
  }

  /**
   * Load settings from storage
   */
  async function loadSettings() {
    try {
      const result = await browser.storage.local.get([
        STORAGE_KEYS.FONT_SIZE,
        STORAGE_KEYS.LINE_SPACING,
        STORAGE_KEYS.INDICATOR,
        STORAGE_KEYS.UI_LANG
      ]);

      // Apply loaded values or defaults
      currentSettings.fontSize = result[STORAGE_KEYS.FONT_SIZE] || DEFAULTS.fontSize;
      currentSettings.lineSpacing = result[STORAGE_KEYS.LINE_SPACING] || DEFAULTS.lineSpacing;
      currentSettings.indicator = result[STORAGE_KEYS.INDICATOR] || { ...DEFAULTS.indicator };
      currentUiLang = result[STORAGE_KEYS.UI_LANG] || DEFAULTS.uiLang;

      if (DEBUG) console.log(LOG_PREFIX, 'Settings loaded:', currentSettings);
      if (DEBUG) console.log(LOG_PREFIX, 'UI language loaded:', currentUiLang);
    } catch (error) {
      console.error(LOG_PREFIX, 'Error loading settings:', error);
      // Use defaults on error
      currentSettings = {
        fontSize: DEFAULTS.fontSize,
        lineSpacing: DEFAULTS.lineSpacing,
        indicator: { ...DEFAULTS.indicator }
      };
      currentUiLang = DEFAULTS.uiLang;
    }
  }

  /**
   * Handle font size button click
   */
  function handleFontSizeClick(event) {
    const btn = event.target.closest('.segment-btn');
    if (!btn) return;

    const value = btn.dataset.value;
    if (value && value !== currentSettings.fontSize) {
      currentSettings.fontSize = value;
      updateUI();
      updatePreview();
      saveSettings();
    }
  }

  /**
   * Handle line spacing button click
   */
  function handleLineSpacingClick(event) {
    const btn = event.target.closest('.segment-btn');
    if (!btn) return;

    const value = btn.dataset.value;
    if (value && value !== currentSettings.lineSpacing) {
      currentSettings.lineSpacing = value;
      updateUI();
      updatePreview();
      saveSettings();
    }
  }

  /**
   * Handle indicator toggle change
   */
  function handleIndicatorToggle() {
    currentSettings.indicator.enabled = indicatorToggle.checked;
    updateUI();
    updatePreview();
    saveSettings();
  }

  /**
   * Handle indicator color change (debounced)
   */
  function handleColorChange() {
    // Clear existing timer
    if (colorDebounceTimer) {
      clearTimeout(colorDebounceTimer);
    }

    // Validate and apply color for immediate preview
    const validColor = validateColor(indicatorColor.value);
    currentSettings.indicator.color = validColor;
    updatePreview();

    // Debounce the save and broadcast
    colorDebounceTimer = setTimeout(() => {
      saveSettings();
      colorDebounceTimer = null;
    }, COLOR_DEBOUNCE_MS);
  }

  /**
   * Handle language switch
   * @param {'ar' | 'en'} lang
   */
  function handleLanguageSwitch(lang) {
    if (lang === currentUiLang) return;

    currentUiLang = lang;
    applyUiLanguage();
    saveUiLanguage();
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Get all sections
    const sections = document.querySelectorAll('.section');

    // Font size section (index 1, after preview)
    if (sections[1]) {
      const fontSizeSegmented = sections[1].querySelector('.segmented-control');
      if (fontSizeSegmented) {
        fontSizeSegmented.addEventListener('click', handleFontSizeClick);
      }
    }

    // Line spacing section (index 2)
    if (sections[2]) {
      const lineSpacingSegmented = sections[2].querySelector('.segmented-control');
      if (lineSpacingSegmented) {
        lineSpacingSegmented.addEventListener('click', handleLineSpacingClick);
      }
    }

    // Indicator toggle
    indicatorToggle.addEventListener('change', handleIndicatorToggle);

    // Color picker
    indicatorColor.addEventListener('input', handleColorChange);
    indicatorColor.addEventListener('change', handleColorChange);

    // Language switcher
    if (langSwitchAr) {
      langSwitchAr.addEventListener('click', () => handleLanguageSwitch('ar'));
    }
    if (langSwitchEn) {
      langSwitchEn.addEventListener('click', () => handleLanguageSwitch('en'));
    }
  }

  /**
   * Initialize the options page
   */
  async function initialize() {
    if (DEBUG) console.log(LOG_PREFIX, 'Initializing options page');

    // Get DOM references
    previewBox = document.getElementById('previewBox');
    previewIndicator = document.getElementById('previewIndicator');
    indicatorToggle = document.getElementById('indicatorToggle');
    indicatorColor = document.getElementById('indicatorColor');
    colorPickerContainer = document.getElementById('colorPickerContainer');
    saveToast = document.getElementById('saveToast');
    langSwitchAr = document.getElementById('langSwitchAr');
    langSwitchEn = document.getElementById('langSwitchEn');

    if (!previewBox || !indicatorToggle || !indicatorColor) {
      console.error(LOG_PREFIX, 'Required DOM elements not found');
      return;
    }

    // Load saved settings
    await loadSettings();

    // Apply UI language
    applyUiLanguage();

    // Update UI to reflect settings
    updateUI();

    // Update preview
    updatePreview();

    // Set up event listeners
    setupEventListeners();

    if (DEBUG) console.log(LOG_PREFIX, 'Options page initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
