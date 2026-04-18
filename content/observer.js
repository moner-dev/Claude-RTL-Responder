/**
 * Claude RTL Responder - MutationObserver Module
 *
 * Watches for DOM changes and triggers RTL processing on new/modified elements.
 * Uses requestAnimationFrame debouncing to handle Claude's streaming responses
 * efficiently without thrashing.
 */

(function() {
  'use strict';

  // Debug flag - set to true during development for console output
  const DEBUG = false;

  const LOG_PREFIX = '[Claude RTL Responder]';

  // Observer instance
  let observer = null;

  // Debouncing state
  let rafScheduled = false;
  let pendingElements = new Set();

  // Callback to process elements (set by content.js)
  let processCallback = null;

  // Observer configuration
  const OBSERVER_CONFIG = {
    childList: true,           // Watch for added/removed nodes
    subtree: true,             // Watch entire DOM tree
    attributes: true,          // Watch attribute changes
    attributeFilter: [         // Only these attributes (for performance)
      'data-is-streaming',
      'class',
      'dir'
    ]
  };

  /**
   * Debounced processing using requestAnimationFrame
   * Coalesces rapid mutations during streaming into single processing pass
   */
  function scheduleProcessing() {
    if (rafScheduled) return;

    rafScheduled = true;
    requestAnimationFrame(() => {
      processPendingElements();
      rafScheduled = false;
    });
  }

  /**
   * Process all pending elements
   */
  function processPendingElements() {
    if (!processCallback || pendingElements.size === 0) {
      pendingElements.clear();
      return;
    }

    // Copy and clear pending set before processing
    const elements = Array.from(pendingElements);
    pendingElements.clear();

    // Process each element
    elements.forEach(element => {
      try {
        processCallback(element);
      } catch (error) {
        console.error(LOG_PREFIX, 'Error processing element:', error);
      }
    });
  }

  /**
   * Handle mutations from MutationObserver
   * @param {MutationRecord[]} mutations - Array of mutations
   */
  function handleMutations(mutations) {
    const detector = window.ClaudeRTL?.detector;
    if (!detector) return;

    for (const mutation of mutations) {
      // Handle added nodes
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            // Add the node itself if it's a target
            if (detector.isRTLTarget(node)) {
              pendingElements.add(node);
            }

            // Also check children for targets
            const targets = node.querySelectorAll(detector.RTL_TARGET_SELECTORS);
            targets.forEach(target => pendingElements.add(target));
          }
        });
      }

      // Handle attribute changes (React re-renders, streaming state changes)
      if (mutation.type === 'attributes') {
        const target = mutation.target;
        if (target instanceof HTMLElement) {
          // If streaming attribute changed, re-process
          if (mutation.attributeName === 'data-is-streaming') {
            pendingElements.add(target);

            // When streaming ends, also process children
            const isStreaming = target.getAttribute('data-is-streaming');
            if (isStreaming === 'false' || isStreaming === null) {
              const children = target.querySelectorAll(detector.RTL_TARGET_SELECTORS);
              children.forEach(child => pendingElements.add(child));
            }
          }

          // If class changed, might be React re-render - re-process
          if (mutation.attributeName === 'class') {
            if (detector.isRTLTarget(target)) {
              pendingElements.add(target);
            }
          }

          // If dir attribute was removed (React override), re-process
          if (mutation.attributeName === 'dir') {
            if (detector.isRTLTarget(target)) {
              pendingElements.add(target);
            }
          }
        }
      }
    }

    // Schedule processing if we have pending elements
    if (pendingElements.size > 0) {
      scheduleProcessing();
    }
  }

  /**
   * Start observing DOM changes
   * @param {Function} callback - Function to call for each element to process
   */
  function startObserver(callback) {
    if (observer) {
      if (DEBUG) console.log(LOG_PREFIX, 'Observer already running');
      return;
    }

    processCallback = callback;

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, OBSERVER_CONFIG);

    if (DEBUG) console.log(LOG_PREFIX, 'MutationObserver started');
  }

  /**
   * Stop observing DOM changes
   */
  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
      processCallback = null;
      pendingElements.clear();
      rafScheduled = false;
      if (DEBUG) console.log(LOG_PREFIX, 'MutationObserver stopped');
    }
  }

  /**
   * Check if observer is currently running
   * @returns {boolean}
   */
  function isObserving() {
    return observer !== null;
  }

  // Export for use in content.js
  window.ClaudeRTL = window.ClaudeRTL || {};
  window.ClaudeRTL.observer = {
    startObserver,
    stopObserver,
    isObserving
  };

})();
