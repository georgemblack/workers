import type { FC } from "hono/jsx";
import type { SleepStats } from "../types";

type HomePageProps = {
  stats: SleepStats | null;
};

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  });
}

function reaction(hours: number): string {
  if (hours <= 4) return "🤬";
  if (hours === 5) return "👎🏻";
  if (hours === 6) return "🤷🏻‍♂️";
  if (hours === 7) return "😁";
  return "🤩";
}

function interruption(count: number) {
  const labels = [
    <span class="good">no interruptions</span>,
    <span class="neutral">one interruption 🤨</span>,
    <span class="bad">two interruptions</span>,
    <span class="bad">three interruptions</span>,
    <span class="bad">four interruptions</span>,
    <span class="bad">five interruptions</span>,
  ];

  return labels[count];
}

export const HomePage: FC<HomePageProps> = ({ stats }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#131f25" />
        <title>George's Sleep</title>
        <link rel="stylesheet" type="text/css" href="main.css" />
      </head>
      <body>
        <main>
          {stats === null ? (
            <p>George did not track his sleep last night</p>
          ) : (
            <>
              <p>George slept for</p>
              <div class="duration">
                <span class="hours">{stats.duration.hours}h</span>{" "}
                <span class="minutes">{stats.duration.minutes}m</span>
                <span>{reaction(stats.duration.hours)}</span>
              </div>
              <p class="startend">
                {formatTime(stats.start)} → {formatTime(stats.end)}
              </p>
              <p class="interruption">
                With {interruption(stats.interruptions)}
              </p>
            </>
          )}
        </main>
      </body>
    </html>
  );
};
