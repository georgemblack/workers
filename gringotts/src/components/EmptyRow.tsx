function EmptyRow({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols}>-</td>
    </tr>
  );
}

export default EmptyRow;
