/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string or date string
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", options);
}

