export interface SleepSample {
  type: "awake" | "core" | "rem" | "deep";
  duration: string;
  start: string;
  end: string;
}

const VALID_SLEEP_TYPES = ["awake", "core", "rem", "deep"];
const ISO8601_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const DURATION_REGEX = /^\d+(:\d{2}){0,2}$/;

export function isSleepSample(value: unknown): value is SleepSample {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  if (typeof obj.type !== "string" || !VALID_SLEEP_TYPES.includes(obj.type)) {
    return false;
  }

  if (typeof obj.start !== "string" || !ISO8601_REGEX.test(obj.start)) {
    return false;
  }

  if (typeof obj.end !== "string" || !ISO8601_REGEX.test(obj.end)) {
    return false;
  }

  if (typeof obj.duration !== "string" || !DURATION_REGEX.test(obj.duration)) {
    return false;
  }

  return true;
}

export interface SleepStats {
  duration: {
    hours: number;
    minutes: number;
  };
  start: string;
  end: string;
  interruptions: number;
}
