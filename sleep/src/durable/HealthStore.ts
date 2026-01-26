import { DurableObject } from "cloudflare:workers";
import { SleepSample, SleepStats } from "../types";

function toUTCString(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString();
}

function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 1) {
    return parts[0]; // seconds only
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1]; // minutes:seconds
  } else {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // hours:minutes:seconds
  }
}

export class HealthStore extends DurableObject<CloudflareBindings> {
  constructor(ctx: DurableObjectState, env: CloudflareBindings) {
    super(ctx, env);
    ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS sleep_samples (
        start TEXT PRIMARY KEY,
        end TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('awake', 'core', 'rem', 'deep')),
        duration TEXT NOT NULL
      )
    `);
  }

  async addSleepSample(sample: SleepSample): Promise<void> {
    const startUTC = toUTCString(sample.start);
    const endUTC = toUTCString(sample.end);

    this.ctx.storage.sql.exec(
      `INSERT INTO sleep_samples (start, end, type, duration)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(start) DO UPDATE SET
         end = excluded.end,
         type = excluded.type,
         duration = excluded.duration`,
      startUTC,
      endUTC,
      sample.type,
      sample.duration,
    );
  }

  getSleepStats(): SleepStats | null {
    // Calculate noon Central time (UTC-6) of the previous day
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    yesterday.setUTCHours(18, 0, 0, 0); // Noon Central = 18:00 UTC
    const cutoff = yesterday.toISOString();

    const cursor = this.ctx.storage.sql.exec<{
      start: string;
      end: string;
      type: string;
      duration: string;
    }>(
      `SELECT start, end, type, duration FROM sleep_samples
       WHERE start > ?
       ORDER BY start ASC`,
      cutoff,
    );

    const samples = cursor.toArray();

    if (samples.length === 0) {
      return null;
    }

    let totalSeconds = 0;
    let interruptions = 0;

    for (const sample of samples) {
      const durationSeconds = parseDurationToSeconds(sample.duration);

      if (sample.type !== "awake") {
        totalSeconds += durationSeconds;
      } else if (durationSeconds > 15 * 60) {
        interruptions++;
      }
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return {
      duration: { hours, minutes },
      start: samples[0].start,
      end: samples[samples.length - 1].end,
      interruptions,
    };
  }
}
