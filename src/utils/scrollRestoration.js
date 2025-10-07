/**
 * Utility functions for scroll restoration
 * Provides enhanced scroll position management with sessionStorage persistence
 */

const SCROLL_STORAGE_KEY = "scroll_positions";

/**
 * Save scroll position for a URL
 * @param {string} url - The URL to save scroll position for
 * @param {number} position - The scroll position (usually window.scrollY)
 */
export const saveScrollPosition = (url, position) => {
  try {
    const positions = getScrollPositions();
    positions[url] = position;
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
  } catch (error) {
    // SessionStorage might not be available in some browsers
    console.warn("Could not save scroll position:", error);
  }
};

/**
 * Get scroll position for a URL
 * @param {string} url - The URL to get scroll position for
 * @returns {number|null} The saved scroll position or null if not found
 */
export const getScrollPosition = (url) => {
  try {
    const positions = getScrollPositions();
    return positions[url] || null;
  } catch (error) {
    console.warn("Could not retrieve scroll position:", error);
    return null;
  }
};

/**
 * Get all saved scroll positions
 * @returns {Object} Object containing all saved scroll positions
 */
export const getScrollPositions = () => {
  try {
    const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
};

/**
 * Clear all saved scroll positions
 */
export const clearScrollPositions = () => {
  try {
    sessionStorage.removeItem(SCROLL_STORAGE_KEY);
  } catch (error) {
    console.warn("Could not clear scroll positions:", error);
  }
};

/**
 * Restore scroll position for a URL
 * @param {string} url - The URL to restore scroll position for
 * @param {boolean} smooth - Whether to use smooth scrolling
 */
export const restoreScrollPosition = (url, smooth = false) => {
  const position = getScrollPosition(url);
  if (position !== null) {
    window.scrollTo({
      top: position,
      behavior: smooth ? "smooth" : "instant",
    });
  }
};
