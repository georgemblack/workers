import type { Row, StateResponse } from "../../shared/contracts";
import type { Ref } from "../logic";
import { TasksView } from "./TasksView";
import { PeopleView } from "./PeopleView";
import { PersonDetail } from "./PersonDetail";

export function Dashboard({
  state,
  tab,
  detail,
  onTab,
  onOpen,
  onPick,
  onError,
}: {
  state: StateResponse;
  tab: string;
  detail: Ref | null;
  onTab: (id: string) => void;
  onOpen: (ref: Ref | null) => void;
  onPick: (ref: Ref) => void;
  onError: (message: string) => void;
}) {
  const active = state.tabs.some((t) => t.id === tab) ? tab : state.tabs[0]?.id;
  const pickRow = (row: Row) => onPick({ id: row.id, title: row.title });
  return (
    <div class="dashboard">
      <nav class="tabs">
        {state.tabs.map((t) => (
          <button
            key={t.id}
            class={t.id === active && !detail ? "tab active" : "tab"}
            onClick={() => {
              onOpen(null);
              onTab(t.id);
            }}
          >
            {t.title}
          </button>
        ))}
      </nav>
      {detail ? (
        <PersonDetail
          id={detail.id}
          rev={state.rev}
          onBack={() => onOpen(null)}
          onOpen={onOpen}
          onPick={onPick}
          onError={onError}
        />
      ) : active === "tasks" ? (
        <TasksView view={state.views.tasks} onPick={pickRow} />
      ) : active === "people" ? (
        <PeopleView view={state.views.people} onOpen={onOpen} onPick={onPick} />
      ) : null}
    </div>
  );
}
