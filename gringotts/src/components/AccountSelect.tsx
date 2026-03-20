import { Account, AccountNames } from "../lib/Types";

function AccountSelect({
  value,
  onSelect,
}: {
  value: Account;
  onSelect: (account: Account) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as Account);
  };

  return (
    <div className="select">
      <select value={value} onChange={handleChange}>
        {Object.values(Account).map((account) => {
          return (
            <option key={account} value={account}>
              {AccountNames[account]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default AccountSelect;
