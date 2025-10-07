/**
 * Utility for managing team member images
 * Add new team member images to the public/images/team/ folder
 * and update this mapping accordingly
 */

export const teamImageMap = {
  mahakmujawdiya: "/images/team/mahak.webp",
  shrutipatel: "/images/team/shruti.webp",
  jayprakashkhatri: "/images/team/jay.png",
  harshadtahiliani: "/images/team/harshad.jpeg",
  // Add more team members here as images become available
  // 'jayveerchavda': '/images/team/jayveer.webp',
  // 'shreyanshgohil': '/images/team/shreyansh.webp',
};

/**
 * Get team member image path by name
 * @param {string} name - Team member name (lowercase)
 * @returns {string|null} - Image path or null if not available
 */
export const getTeamMemberImage = (name) => {
  const key = name.toLowerCase().replace(/\s+/g, "");
  return teamImageMap[key] || null;
};

/**
 * Check if team member has an image
 * @param {string} name - Team member name
 * @returns {boolean} - True if image exists
 */
export const hasTeamMemberImage = (name) => {
  return getTeamMemberImage(name) !== null;
};
