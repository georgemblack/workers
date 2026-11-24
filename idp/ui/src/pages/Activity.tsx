import { Button, Empty, LayerCard, Loader, Select } from "@cloudflare/kumo";
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ApiError, listActivity, type ActivityEntry, type ActivityEvent } from "../api";
import { ActivityRow, EVENT_NAMES } from "../admin/ActivityRow";
import { AdminLayout } from "../admin/AdminLayout";
import { SectionHeader, type Status } from "../admin/shared";
import { mount } from "../mount";

type Filter = ActivityEvent["event"] | "all";

// The activity log: successful sign-ins and changes, newest first, 50 at a time.
function Activity() {
  const [filter, setFilter] = useState<Filter>("all");
  const [entries, setEntries] = useState<ActivityEntry[] | null>(null);
  // Where the next page starts, or null if there are no older entries.
  const [next, setNext] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function fail(e: unknown) {
    // Signed out: go sign in, then come back here.
    if (e instanceof ApiError && e.status === 401) location.replace("/login?next=/admin/activity");
    else setStatus({ kind: "error", message: (e as Error).message });
  }

  // Start again from the newest entries whenever the filter changes.
  useEffect(() => {
    let current = true;
    setEntries(null);
    listActivity({ event: filter === "all" ? null : filter, before: null })
      .then((page) => {
        if (!current) return;
        setEntries(page.entries);
        setNext(page.next);
      })
      .catch((e: unknown) => current && fail(e));
    return () => {
      current = false;
    };
  }, [filter]);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const page = await listActivity({ event: filter === "all" ? null : filter, before: next });
      setEntries((shown) => [...(shown ?? []), ...page.entries]);
      setNext(page.next);
    } catch (e) {
      fail(e);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <AdminLayout page="activity" status={status}>
      <section className="grid gap-4">
        <SectionHeader
          title="Activity"
          description="Sign-ins and changes from the last 90 days."
          action={
            <Select
              aria-label="Show"
              size="sm"
              className="w-44"
              value={filter}
              // Changing the filter mid-load would mix two lists together.
              disabled={loadingMore}
              onValueChange={(value) => setFilter((value as Filter | null) ?? "all")}
              items={{ all: "All activity", ...EVENT_NAMES }}
            />
          }
        />

        {entries === null ? (
          !status && (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          )
        ) : (
          <LayerCard className="divide-y divide-kumo-line overflow-hidden p-0">
            {entries.length === 0 ? (
              <Empty
                size="sm"
                icon={<ClockCounterClockwiseIcon size={32} className="text-kumo-inactive" />}
                title="No activity"
                description={
                  filter === "all"
                    ? "Sign-ins and changes will show up here."
                    : "Nothing of this kind in the last 90 days."
                }
              />
            ) : (
              entries.map((entry) => <ActivityRow key={entry.id} entry={entry} />)
            )}
          </LayerCard>
        )}

        {next !== null && (
          <div className="flex justify-center">
            <Button size="sm" loading={loadingMore} onClick={loadMore}>
              Show older
            </Button>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

mount(<Activity />);
