/**
 * Time range utility functions for handling date calculations and formatting
 */

export type TimeRange = '1Y' | '5Y' | '10Y' | 'MAX';

/**
 * Get the start date based on a time range relative to today
 * @param range - The time range string
 * @returns Date string in YYYY-MM-DD format
 */
export function getStartDateFromRange(range: TimeRange): string {
  const today = new Date();
  let startDate: Date;

  switch (range) {
    case '1Y':
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case '5Y':
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 5);
      break;
    case '10Y':
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 10);
      break;
    case 'MAX':
      startDate = new Date('1900-01-01');
      break;
    default:
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 5);
  }

  return formatDateForAPI(startDate);
}

/**
 * Format a date for the FRED API (YYYY-MM-DD)
 * @param date - The Date object to format
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateForAPI(date: Date): string {
  try {
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date for API:', error);
    // Return a fallback date
    return '2000-01-01';
  }
}

/**
 * Get the current date in YYYY-MM-DD format
 * @returns Current date string
 */
export function getCurrentDate(): string {
  return formatDateForAPI(new Date());
}

/**
 * Format a date for display in the UI
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date for display:', error);
    return 'Invalid Date';
  }
}

/**
 * Get a friendly display string for a time range
 * @param range - The time range
 * @returns User-friendly string
 */
export function getTimeRangeDisplay(range: TimeRange): string {
  switch (range) {
    case '1Y':
      return '1 Year';
    case '5Y':
      return '5 Years';
    case '10Y':
      return '10 Years';
    case 'MAX':
      return 'Maximum';
    default:
      return '5 Years';
  }
} 