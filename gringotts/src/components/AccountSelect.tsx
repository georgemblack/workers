import { Select } from "@cloudflare/kumo";

import { Account, AccountNames } from "@/lib/Types";

function AccountSelect({
  value,
  onSelect,
}: {
  value: Account;
  onSelect: (account: Account) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onSelect(v as Account)}>
      {Object.values(Account).map((account) => (
        <Select.Option key={account} value={account}>
          {AccountNames[account]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default AccountSelect;
