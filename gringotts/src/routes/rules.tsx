import { Button, Table } from "@cloudflare/kumo";
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
      <Table className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.Head>Merchant</Table.Head>
            <Table.Head>Category</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rules.map((rule) => (
            <Table.Row key={rule.id}>
              <Table.Cell>{rule.merchant}</Table.Cell>
              <Table.Cell>
                {CategoryNames[rule.category as Category]}
              </Table.Cell>
              <Table.Cell className="flex justify-end">
                <Button
                  variant="destructive"
                  size="xs"
                  onClick={() => {
                    if (rule.id) handleDelete(rule.id);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </main>
  );
}
