import type { Row as RowData } from "../../shared/contracts";

/** A dashboard row: title, timing line and nested sub-rows. Tapping refers to it in chat. */
export function Row({
  row,
  onPick,
}: {
  row: RowData;
  onPick: (row: RowData) => void;
}) {
  return (
    <li class="item">
      <button class="pick" onClick={() => onPick(row)}>
        {row.title}
      </button>
      {row.subtitle && <div class="meta">{row.subtitle}</div>}
      {row.children.length > 0 && (
        <ul class="items">
          {row.children.map((child) => (
            <Row key={child.id} row={child} onPick={onPick} />
          ))}
        </ul>
      )}
    </li>
  );
}
