const CACHE_EXPIRY_HOUR_CENTRAL = 7;
const CACHE_EXPIRY_MINUTE_CENTRAL = 35;

/**
 * Calculate seconds until the next occurrence of the configured Central time,
 * accounting for daylight saving time.
 */
export function getSecondsUntilCacheExpiry(): number {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Helper function to calculate target time for a given date
  const calculateTargetTime = (date: Date): Date => {
    const dateStr = formatter.format(date);

    // Determine the UTC offset for America/Chicago on that date
    // by checking what hour it is in Chicago when it's noon UTC
    const testDate = new Date(`${dateStr}T12:00:00Z`);
    const chicagoHour = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric",
        hour12: false,
      }).format(testDate),
    );
    const offsetHours = chicagoHour - 12; // -6 for CST, -5 for CDT

    // Calculate target Central time in UTC
    const targetUTCHour = CACHE_EXPIRY_HOUR_CENTRAL - offsetHours;
    const targetMinute = String(CACHE_EXPIRY_MINUTE_CENTRAL).padStart(2, "0");
    return new Date(
      `${dateStr}T${String(targetUTCHour).padStart(2, "0")}:${targetMinute}:00Z`,
    );
  };

  // Try today first
  const todayTarget = calculateTargetTime(now);

  // If today's target time has already passed, use tomorrow
  const target =
    todayTarget.getTime() > now.getTime()
      ? todayTarget
      : calculateTargetTime(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  return Math.floor((target.getTime() - now.getTime()) / 1000);
}
