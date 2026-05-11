/**
 * Validates and normalizes Facebook video URLs
 */

export const facebookUrlPatterns = [
  /facebook\.com/i,
  /fb\.watch/i,
  /fb\.com/i,
  /fb\.gg/i,
];

/**
 * Validates if a URL is a valid Facebook video/post URL
 */
export const isValidFacebookUrl = (url: string): boolean => {
  if (!url) return false;
  
  const trimmedUrl = url.trim();
  
  // Very permissive: if it's one of the FB domains, consider it valid for the attempt
  return facebookUrlPatterns.some(pattern => pattern.test(trimmedUrl));
};

/**
 * Normalizes the URL by trimming and removing unnecessary tracking parameters
 */
export const normalizeFacebookUrl = (url: string): string => {
  if (!url) return "";
  
  let normalized = url.trim();
  
  try {
    const urlObj = new URL(normalized);
    
    // List of common tracking parameters to remove
    const trackingParams = ["fbclid", "ref", "mibextid", "__tn__", "extid"];
    
    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    return urlObj.toString();
  } catch (e) {
    // If URL parsing fails, return trimmed original
    return normalized;
  }
};
