import { Table } from "@cloudflare/kumo";

function EmptyRow({ cols }: { cols: number }) {
  return (
    <Table.Row>
      <Table.Cell colSpan={cols}>-</Table.Cell>
    </Table.Row>
  );
}

export default EmptyRow;
