import { useMemo, useState } from "react";
import { deletePost, listPosts } from "@/data/db";
import { PostStatus } from "@/data/types";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Badge, Breadcrumbs, Button, Input, Select } from "@cloudflare/kumo";

const STATUS_OPTIONS: Array<PostStatus | "all"> = [
  "all",
  "draft",
  "published",
  "idea",
  "hidden",
];

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await listPosts(),
});

function App() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }
    await deletePost({ data: postId });
    await router.invalidate();
  };

  return (
    <div>
      <Breadcrumbs>
        <Breadcrumbs.Current>Home</Breadcrumbs.Current>
      </Breadcrumbs>
      <div className="mt-4">
        <div className="flex gap-2">
          <Input
            className="w-60"
            placeholder="Search posts..."
            aria-label="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            className="w-30"
            value={statusFilter}
            onValueChange={(status) => setStatusFilter(status || "all")}
          >
            {STATUS_OPTIONS.map((status) => (
              <Select.Option value={status}>
                {status.toLowerCase()}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="mt-4 flex flex-col gap-6">
          {filteredPosts.map((post) => (
            <div
              className="orange flex justify-between items-center"
              key={post.id}
            >
              <Link to="/posts/$postId" params={{ postId: post.id }}>
                <h2 className="font-bold">{post.title}</h2>
                <div className="flex gap-4">
                  <span>
                    {new Date(post.published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>
                    <Badge variant="secondary">{post.status}</Badge>
                  </span>
                </div>
              </Link>
              <Button
                variant="secondary"
                shape="square"
                onClick={() => handleDelete(post.id, post.title)}
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
