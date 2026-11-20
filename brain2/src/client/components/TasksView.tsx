import type { Row as RowData, TasksView as View } from "../../shared/contracts";
import { Row } from "./Row";

export function TasksView({
  view,
  onPick,
}: {
  view: View;
  onPick: (row: RowData) => void;
}) {
  if (!view.priorities.length && !view.areas.length)
    return <p class="empty">Nothing on your list.</p>;
  return (
    <>
      {view.priorities.length > 0 && (
        <section class="section priorities">
          <h2>Priorities</h2>
          <ul class="items">
            {view.priorities.map((row) => (
              <Row key={row.id} row={row} onPick={onPick} />
            ))}
          </ul>
        </section>
      )}
      {view.areas.map((area) => (
        <section class="section" key={area.id}>
          <h2>{area.title}</h2>
          <ul class="items">
            {area.items.map((row) => (
              <Row key={row.id} row={row} onPick={onPick} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
