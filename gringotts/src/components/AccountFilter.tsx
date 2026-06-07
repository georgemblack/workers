import { Select } from "@cloudflare/kumo";

import { Account, AccountNames } from "@/lib/Types";

function AccountFilter({
  value,
  onSelect,
}: {
  value: Account | "Any";
  onSelect: (account: Account | "Any") => void;
}) {
  return (
    <Select
      value={value as string}
      onValueChange={(v) => onSelect(v as Account | "Any")}
    >
      <Select.Option value="Any">Any</Select.Option>
      {Object.values(Account).map((account) => (
        <Select.Option key={account} value={account}>
          {AccountNames[account]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default AccountFilter;
