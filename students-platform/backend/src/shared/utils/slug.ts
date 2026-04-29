/**
 * Converts a string to a URL-friendly slug format
 * @param text - The text to convert to a slug
 * @returns A kebab-case slug string
 * @example toSlug("My Cool Category!") // returns "my-cool-category"
 */
export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
