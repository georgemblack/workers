import { createFileRoute, useRouter } from "@tanstack/react-router";

import { deleteRule, getRules } from "@/data/db";
import { Category, CategoryNames } from "@/lib/Types";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
  loader: async () => await getRules(),
});

function RulesPage() {
  const rules = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await deleteRule({ data: id });
    await router.invalidate();
  };

  return (
    <main className="page-standard-width">
      <table className="is-striped is-narrow mt-4 table w-full">
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.merchant}</td>
              <td>{CategoryNames[rule.category as Category]}</td>
              <td className="flex justify-end">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (rule.id) handleDelete(rule.id);
                  }}
                >
                  X
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
