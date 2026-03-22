import { Button } from "@cloudflare/kumo";
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
      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Merchant</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id} className="border-b even:bg-gray-50">
              <td className="p-2">{rule.merchant}</td>
              <td className="p-2">
                {CategoryNames[rule.category as Category]}
              </td>
              <td className="flex justify-end p-2">
                <Button
                  variant="secondary-destructive"
                  shape="square"
                  aria-label="Delete rule"
                  onClick={() => {
                    if (rule.id) handleDelete(rule.id);
                  }}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
