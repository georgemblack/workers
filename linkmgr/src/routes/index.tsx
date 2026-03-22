import { Button } from "@cloudflare/kumo";
import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

import { deleteLink, Link as LinkType, listLinks } from "@/data/db";

export const Route = createFileRoute("/")({
  component: LinksPage,
  loader: async () => await listLinks(),
});

function LinksPage() {
  const links = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await deleteLink({ data: id });
    await router.invalidate();
  };

  return (
    <>
      <h1 className="text-xl font-bold">Links</h1>
      <div className="mt-4 flex flex-col gap-3">
        {links.length === 0 && (
          <p className="text-sm opacity-60">No links yet.</p>
        )}
        {links.map((link: LinkType) => (
          <div
            key={link.id}
            className="flex items-start gap-2 rounded-lg border border-[var(--color-gray-7,#d1d5db)] p-3"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 flex-1"
            >
              <div className="truncate font-semibold">
                {link.title || link.url}
              </div>
              {link.description && (
                <div className="mt-1 line-clamp-2 text-sm opacity-70">
                  {link.description}
                </div>
              )}
              <div className="mt-1 truncate text-xs opacity-50">{link.url}</div>
            </a>
            <Button
              variant="secondary"
              shape="square"
              size="sm"
              aria-label="Delete link"
              onClick={() => handleDelete(link.id)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
